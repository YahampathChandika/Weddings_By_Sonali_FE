import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, AutoComplete, InputGroup } from "rsuite";
import { useGetReturnItemsListQuery } from "../../store/api/eventItemsApi";
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

export default function Return() {
  const { orderId } = useParams();
  const { data: returnItemsData } = useGetReturnItemsListQuery(orderId);
  const returnItems = returnItemsData?.payload;
  const [data, setData] = useState(returnItems);

  console.log("data", returnItems);

  const handleEditState = (id) => {
    const nextData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: item.status ? null : "EDIT" };
      }
      return item;
    });
    setData(nextData);
  };

  const handleChange = (id, key, value) => {
    const nextData = data.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: Number(value) };
      }
      return item;
    });
    setData(nextData);
  };

  return (
    <div className="w-full">
      <div className="w-4/12 mb-5">
        <InputGroup
          inside
          className="flex border-2 h-12 px-3 !rounded-2 items-center justify-evenly"
        >
          <AutoComplete
            placeholder="Search Items"
            // data={data}
            // value={value}
            // onChange={handleSearchChange}
            // onSelect={handleSelectUser}
          />
          <InputGroup.Addon>
            {/* {value && (
            <span
              className="material-symbols-outlined sidebar-icon text-lg font-medium text-red cursor-pointer mr-5"
              onClick={handleClearSearch}
            >
              close
            </span>
          )} */}
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
              search
            </span>
          </InputGroup.Addon>
        </InputGroup>
      </div>

      <Table height={300} data={data} id="table" rowHeight={55}>
        <Column flexGrow={1} align="center" fixed>
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => {
              return <span>{rowIndex + 1}</span>;
            }}
          </Cell>
        </Column>

        <Column flexGrow={2} align="center">
          <HeaderCell>Code</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column flexGrow={3}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="itemName" />
        </Column>

        <Column flexGrow={3}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Released</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Returned</HeaderCell>
          <EditableCell dataKey="returned" onChange={handleChange} />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Damaged</HeaderCell>
          <EditableCell dataKey="damaged" onChange={handleChange} />
        </Column>

        <Column flexGrow={2} align="center">
          <HeaderCell>Missing</HeaderCell>
          <Cell>
            {(rowData) => {
              const missing =
                rowData.released - (rowData.returned + rowData.damaged);
              return missing;
            }}
          </Cell>
        </Column>

        <Column flexGrow={1} align="center">
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <div className="flex" onClick={() => handleEditState(rowData.id)}>
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
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
}
