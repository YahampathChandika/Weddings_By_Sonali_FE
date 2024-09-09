import React, { useState, useEffect } from "react";
import { Table, AutoComplete, InputGroup } from "rsuite";
import { useGetAllItemsQuery } from "../../store/api/inventoryApi";
import noDataImage from "../../assets/images/nodata.svg";
import Swal from "sweetalert2";
import {
  useAddEventItemsMutation,
  useGetEventItemsByIdQuery,
  useGetReleaseItemListQuery,
} from "../../store/api/eventItemsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../store/api/orderApi";

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
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { data: eventItems, refetch: refetchEventItems } =
    useGetEventItemsByIdQuery(orderId);
  const { refetch: refetchReleaseItems } = useGetReleaseItemListQuery(orderId);
  const { refetch: refetchOrderData } = useGetOrderByIdQuery(orderId);
  const [data, setData] = useState([]);
  const { data: allItemsData } = useGetAllItemsQuery();
  const [addEventItems] = useAddEventItemsMutation();
  const allItems = allItemsData?.payload?.map((item) => {
    return `${item.code} | ${item.itemName} | ${item.availableunits}`;
  });

  useEffect(() => {
    if (eventItems?.payload) {
      const updatedEventItems = eventItems.payload.map((item) => ({
        id: item.itemId,
        code: item.code,
        name: item.name,
        type: item.type,
        usage: item.usage,
        available: item.available,
        quantity: item.quantity,
        status: null,
      }));
      setData(updatedEventItems);
    }
  }, [eventItems]);

  const handleSearchChange = (searchValue) => {
    setValue(searchValue);
  };

  const handleSelectItem = (selectedItem) => {
    const selectedItemId = selectedItem.split(" | ")[0];
    const selectedItemData = allItemsData.payload.find(
      (item) => item.code.toString() === selectedItemId
    );

    if (!selectedItemData) {
      return;
    }

    // Check if the item is already in the data array
    const itemExists = data.some(
      (item) => item.code.toString() === selectedItemId
    );

    if (itemExists) {
      Swal.fire({
        title: "Item is already added.",
        icon: "warning",
      });
      return;
    }

    const newItem = {
      id: selectedItemData.id,
      code: selectedItemData.code,
      name: selectedItemData.itemName,
      type: selectedItemData.type,
      usage: selectedItemData.usedTimes,
      available: selectedItemData.availableunits,
      quantity: null,
      status: null,
    };
    setValue("");
    setData([...data, newItem]);
  };

  const handleClearSearch = () => {
    setValue("");
  };

  const handleChange = (id, key, value) => {
    const nextData = data.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setData(nextData);
  };

  const handleEditState = (id) => {
    const nextData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: item.status ? null : "EDIT" };
      }
      return item;
    });
    setData(nextData);
  };

  const handleDeleteItem = (id) => {
    const nextData = data.filter((item) => item.id !== id);
    setData(nextData);
  };

  const handleSave = async () => {
    const items = data.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
    }));
    const payload = {
      eventId: orderId,
      items: items,
    };

    try {
      const response = await addEventItems(payload);

      if (response.error) {
        console.log("Items adding failed", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Items adding failed",
          icon: "error",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Items Added Successfully",
        });
        refetchReleaseItems();
        refetchEventItems();
        refetchOrderData();
        navigate(`/home/orders/trackOrder/${orderId}/release`);
      }
    } catch (error) {
      console.log("Items Adding Error", error);
      Swal.fire({
        title: "Error saving items",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-4/12 mb-4">
        <InputGroup
          inside
          className="flex border-2 h-12 px-3 !rounded-2 items-center justify-evenly"
        >
          <AutoComplete
            placeholder="Search Items by Code or Name"
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
        autoHeight
        height={340}
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
      <div className="flex justify-end mt-10">
        <button
          className="w-60 h-10 bg-txtdarkblue text-white p-4 text-lg flex items-center justify-center rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
