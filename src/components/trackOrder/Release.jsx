import React, { useState } from "react";
import { Table, Checkbox } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const defaultData = [
  { id: 1, code: "A001", name: "Item 1", type: "Type A", quantity: 10 },
  { id: 2, code: "A002", name: "Item 2", type: "Type B", quantity: 20 },
  { id: 3, code: "A003", name: "Item 3", type: "Type B", quantity: 15 },
  { id: 4, code: "A004", name: "Item 4", type: "Type C", quantity: 25 },
  { id: 5, code: "A005", name: "Item 5", type: "Type A", quantity: 30 },
  // Add more data as needed
];

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div className="flex items-center">
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
        className="custom-checkbox"
      />
    </div>
  </Cell>
);

export default function Release() {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const data = defaultData;

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const checked = checkedKeys.length === data.length;
  const indeterminate =
    checkedKeys.length > 0 && checkedKeys.length < data.length;

  return (
    <div className="w-full">
      <p className="font-bold text-black text-2xl mb-5">Item Checklist</p>

      <Table height={300} data={data} id="table">
        <Column flexGrow={2} align="center">
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: "40px" }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
                className="custom-checkbox"
              />
            </div>
          </HeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
          />
        </Column>

        <Column flexGrow={2}>
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
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>
      </Table>
      <style jsx>{`
        .custom-checkbox input[type="checkbox"] {
          cursor: pointer;
        }
      `}</style>

      <div className="flex justify-end mt-5">
        <button className="w-60 h-10 bg-txtdarkblue text-white p-4 text-lg flex items-center justify-center  rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}
