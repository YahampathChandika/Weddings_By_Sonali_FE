import React, { useState } from "react";
import { Table, Button, AutoComplete, InputGroup } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const defaultData = [
  {
    id: 1,
    code: "A001",
    name: "Item 1",
    type: "Type A",
    usage: "05",
    available: "Yes",
    quantity: 10,
  },
  {
    id: 2,
    code: "A002",
    name: "Item 2",
    type: "Type B",
    usage: "10",
    available: "No",
    quantity: 20,
  },
  {
    id: 2,
    code: "A002",
    name: "Item 2",
    type: "Type B",
    usage: "10",
    available: "No",
    quantity: 20,
  },
  {
    id: 2,
    code: "A002",
    name: "Item 2",
    type: "Type B",
    usage: "10",
    available: "No",
    quantity: 20,
  },
];

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

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <div className="flex">
        <div
          className="flex"
          onClick={() => {
            onClick(rowData.id);
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
        <span className="material-symbols-outlined sidebar-icon text-xl font-medium text-red cursor-pointer ml-4">
          delete
        </span>
      </div>
    </Cell>
  );
};

export default function Items() {
  const [data, setData] = useState(defaultData);

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

  return (
    <div className="w-full">
      <div className="w-4/12 mb-4">
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

      <Table height={420} data={data} rowHeight={55}>
        <Column flexGrow={1}>
          <HeaderCell align="center">Code</HeaderCell>
          <Cell align="center" dataKey="code" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Usage</HeaderCell>
          <Cell dataKey="usage" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Available</HeaderCell>
          <Cell dataKey="available" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Quantity</HeaderCell>
          <EditableCell dataKey="quantity" onChange={handleChange} />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey="id" onClick={handleEditState} />
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
