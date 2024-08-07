import React from "react";
import { Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

function InventoryTable({ Items }) {
  console.log(Items);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const getData = () => {
    if (!Items) return [];
    const sortedData = [...Items];

    if (sortColumn && sortType) {
      sortedData.sort((a, b) => {
        let x, y;

        if (sortColumn === "name") {
          x = `${a.firstName} ${a.lastName}`.toLowerCase();
          y = `${b.firstName} ${b.lastName}`.toLowerCase();
        } else {
          x = a[sortColumn];
          y = b[sortColumn];

          if (typeof x === "string") {
            x = x.toLowerCase();
          }
          if (typeof y === "string") {
            y = y.toLowerCase();
          }
        }

        if (x < y) {
          return sortType === "asc" ? -1 : 1;
        }
        if (x > y) {
          return sortType === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedData;
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
        <Column flexGrow={1} align="center" fixed>
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => {
              return <span>{rowIndex + 1}</span>;
            }}
          </Cell>
        </Column>

        <Column flexGrow={2} align="center" fixed >
          <HeaderCell>Code</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column flexGrow={4} fixed sortable>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="itemName" />
        </Column>

        <Column flexGrow={3} sortable>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={2} sortable>
          <HeaderCell>Usage</HeaderCell>
          <Cell dataKey="usedTimes" />
        </Column>

        <Column flexGrow={2} sortable>
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>

        <Column flexGrow={2} sortable>
          <HeaderCell>Available</HeaderCell>
          <Cell dataKey="availableunits" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Damaged</HeaderCell>
          <Cell dataKey="damaged" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Missed</HeaderCell>
          <Cell dataKey="missing" />
        </Column>

        <Column flexGrow={2}>
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
  );
}

export default InventoryTable;
