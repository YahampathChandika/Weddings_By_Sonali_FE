import React, { useState } from "react";
import { Table, Button, AutoComplete, InputGroup } from "rsuite";
import {
  useGetAllItemsQuery,
  useGetItemByIdQuery,
} from "../../store/api/inventoryApi";
import noDataImage from "../../assets/images/nodata.svg";
import Swal from "sweetalert2";

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === "EDIT";
  return (
    <Cell {...props} className={editing ? "table-content-editing" : ""}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

const ActionCell = ({
  rowData,
  dataKey,
  onEditClick,
  onDeleteClick,
  ...props
}) => {
  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <div className="flex">
        <div
          className="flex"
          onClick={() => {
            onEditClick(rowData.id);
          }}
        >
          {rowData.status === "EDIT" ? (
            <span className="material-symbols-outlined sidebar-icon text-xl font-medium text-txtdarkblue cursor-pointer">
              save_as
            </span>
          ) : (
            <span className="material-symbols-outlined sidebar-icon text-xl font-medium text-txtdarkblue cursor-pointer">
              edit
            </span>
          )}
        </div>
        <span
          className="material-symbols-outlined sidebar-icon text-xl font-medium text-red cursor-pointer ml-4"
          onClick={() => onDeleteClick(rowData.id)}
        >
          delete
        </span>
      </div>
    </Cell>
  );
};

export default function Items() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const { data: allItemsData } = useGetAllItemsQuery();

  const allItems = allItemsData?.payload?.map((item) => {
    return `${item.id} | ${item.itemName} | ${item.availableunits}`;
  });

  const handleSearchChange = (searchValue) => {
    setValue(searchValue);
  };

  const handleSelectItem = (selectedItem) => {
    const selectedItemId = selectedItem.split(" | ")[0];
    const selectedItemData = allItemsData.payload.find(
      (item) => item.id.toString() === selectedItemId
    );

    // Check if the item is already in the data array
    const itemExists = data.some(
      (item) => item.id.toString() === selectedItemId
    );

    if (itemExists) {
      Swal.fire({
        title: "Item is already added.",
        icon: "warning"
      });
      return;
    }

    if (selectedItemData) {
      const newItem = {
        id: selectedItemData.id,
        code: selectedItemData.code,
        name: selectedItemData.itemName,
        type: selectedItemData.type,
        usage: selectedItemData.usedTimes,
        available: selectedItemData.availableunits,
        quantity: selectedItemData.quantity,
      };
      setValue("");
      setData([...data, newItem]);
    }
  };

  const handleClearSearch = () => {
    setValue("");
  };

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find((item) => item.id === id)[key] = value;
    setData(nextData);
  };

  const handleEditState = (id) => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find((item) => item.id === id);
    activeItem.status = activeItem.status ? null : "EDIT";
    setData(nextData);
  };

  const handleDeleteItem = (id) => {
    const nextData = data.filter((item) => item.id !== id);
    setData(nextData);
  };

  return (
    <div className="w-full">
      <div className="w-4/12 mb-4">
        <InputGroup
          inside
          className="flex border-2 h-12 px-3 !rounded-2 items-center justify-evenly"
        >
          <AutoComplete
            placeholder="Search Items"
            data={allItems}
            value={value}
            onChange={handleSearchChange}
            onSelect={handleSelectItem}
          />
          <InputGroup.Addon>
            {value && (
              <span
                className="material-symbols-outlined sidebar-icon text-lg font-medium text-red cursor-pointer mr-5"
                onClick={handleClearSearch}
              >
                close
              </span>
            )}
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
              search
            </span>
          </InputGroup.Addon>
        </InputGroup>
      </div>

      <Table
        height={420}
        data={data}
        rowHeight={55}
        renderEmpty={() => (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <img src={noDataImage} alt="No Data" className="w-44 h-auto" />
            <p className="mt-5 text-lg text-red">No Items Added!</p>
            <p className="mt-2 text-lg text-gray-600">
              Search and select items to add.
            </p>
          </div>
        )}
      >
        <Column flexGrow={1} align="center" fixed sortable>
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => {
              return <span>{rowIndex + 1}</span>;
            }}
          </Cell>
        </Column>

        <Column flexGrow={2}>
          <HeaderCell align="center">Code</HeaderCell>
          <Cell align="center" dataKey="code" />
        </Column>

        <Column flexGrow={4}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={4}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Usage</HeaderCell>
          <Cell dataKey="usage" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Available</HeaderCell>
          <Cell dataKey="available" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Quantity</HeaderCell>
          <EditableCell dataKey="quantity" onChange={handleChange} />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell
            dataKey="id"
            onEditClick={handleEditState}
            onDeleteClick={handleDeleteItem}
          />
        </Column>
      </Table>
      <div className="flex justify-end space-x-10">
        <button className="w-48 h-10 bg-green text-white p-4 text-lg flex items-center justify-center  rounded-md">
          PDF
        </button>
        <button className="w-48 h-10 bg-txtdarkblue text-white p-4 text-lg flex items-center justify-center  rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}
