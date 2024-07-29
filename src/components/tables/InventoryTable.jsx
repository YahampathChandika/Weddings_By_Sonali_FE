import React from 'react'
import { Table } from 'rsuite';
import { mockUsers } from '../../assets/mocks/mockUsers';

const { Column, HeaderCell, Cell } = Table;
const data = mockUsers(100);



function InventoryTable() {
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const [loading, setLoading] = React.useState(false);
  
    const getData = () => {
      if (sortColumn && sortType) {
        return data.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === 'string') {
            x = x.charCodeAt();
          }
          if (typeof y === 'string') {
            y = y.charCodeAt();
          }
          if (sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        });
      }
      return data;
    };
  
    const handleSortColumn = (sortColumn, sortType) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSortColumn(sortColumn);
        setSortType(sortType);
      }, 500);
    };
  
  return (
    <div>
       <Table
      height={550}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
    >
      <Column width={180} align="center" fixed sortable>
        <HeaderCell>Code</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={250} fixed sortable>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={180} sortable>
        <HeaderCell>Type</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column width={180} sortable>
        <HeaderCell>Usage</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={180} sortable>
        <HeaderCell>Quantity</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={180} sortable>
        <HeaderCell>Available</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={180} sortable>
        <HeaderCell>Demaged</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={180} sortable>
        <HeaderCell>Missed</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column flexGrow={120} sortable>
        <HeaderCell>Actions</HeaderCell>
        <Cell>
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer">
            edit
          </span>
          <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer">
            delete
          </span>
        </Cell>
      </Column>
    </Table>
    </div>
  )
}

export default InventoryTable
