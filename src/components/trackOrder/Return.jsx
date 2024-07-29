import React, { useState } from "react";
import { Table, Button, AutoComplete, InputGroup } from "rsuite";
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
  const defaultData = [
    {
      id: 1,
      code: "A001",
      name: "Item 1",
      type: "Type A",
      released: 10,
      returned: null,
      damaged: null,
    },
    {
      id: 2,
      code: "A002",
      name: "Item 2",
      type: "Type B",
      released: 20,
      returned: null,
      damaged: null,
    },
    {
      id: 3,
      code: "A003",
      name: "Item 3",
      type: "Type C",
      released: 30,
      returned: null,
      damaged: null,
    },
    // Add more data as needed
  ];

  const [data, setData] = useState(defaultData);

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
        <Column flexGrow={2} align="center">
          <HeaderCell>Code</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Released</HeaderCell>
          <Cell dataKey="released" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Returned</HeaderCell>
          <EditableCell dataKey="returned" onChange={handleChange} />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Damaged</HeaderCell>
          <EditableCell dataKey="damaged" onChange={handleChange} />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Missing</HeaderCell>
          <Cell>
            {(rowData) => {
              const missing =
                rowData.released - (rowData.returned + rowData.damaged);
              return missing;
            }}
          </Cell>
        </Column>

        <Column flexGrow={1} align="left">
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
