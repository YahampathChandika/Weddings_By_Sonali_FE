import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "rsuite";
import { useGetOrdersByStateQuery } from "../../store/api/orderApi";
import noDataImage from "../../assets/images/nodata.svg";

const { Column, HeaderCell, Cell } = Table;

export default function OngoingOrdersTable() {
  const navigate = useNavigate();
  const { data: orders } = useGetOrdersByStateQuery(3);
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState("");

  const transformedData = useMemo(
    () =>
      orders?.payload.map((order, index) => ({
        index: index + 1,
        id: order.id,
        customer: order.customer?.name,
        phone: order.customer?.contactNo,
        event: order.eventName,
        eventDate: order.eventDate,
        eventTime: order.eventTime,
        returnDate: order.returnDate,
        releaseDate: order.releaseDate,
      })) || [],
    [orders]
  );

  const handleRowClick = (rowData) => {
    navigate(`/home/orders/trackOrder/${rowData.id}/details`);
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const sortedData = useMemo(() => {
    if (sortColumn && sortType) {
      return transformedData.sort((a, b) => {
        let result = 0;
        if (a[sortColumn] > b[sortColumn]) {
          result = 1;
        } else if (a[sortColumn] < b[sortColumn]) {
          result = -1;
        }
        return sortType === "asc" ? result : -result;
      });
    }
    return transformedData;
  }, [sortColumn, sortType, transformedData]);

  return (
    <Table
      height={400}
      data={sortedData}
      onRowClick={handleRowClick}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      rowClassName="cursor-pointer"
      renderEmpty={() => (
        <div className="flex flex-col items-center justify-center h-full bg-white">
          <img src={noDataImage} alt="No Data" className="w-44 h-auto" />
          <p className="mt-5 text-lg text-gray-600">No Orders Found!</p>
        </div>
      )}
    >
      <Column flexGrow={1} align="center">
        <HeaderCell>#</HeaderCell>
        <Cell dataKey="index" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Customer</HeaderCell>
        <Cell dataKey="customer" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Phone</HeaderCell>
        <Cell dataKey="phone" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Event</HeaderCell>
        <Cell dataKey="event" />
      </Column>

      <Column flexGrow={2} sortable>
        <HeaderCell>Event Date</HeaderCell>
        <Cell dataKey="eventDate" />
      </Column>

      <Column flexGrow={2} sortable>
        <HeaderCell>Event Time</HeaderCell>
        <Cell dataKey="eventTime" />
      </Column>

      <Column flexGrow={2} sortable>
        <HeaderCell>Release Date</HeaderCell>
        <Cell dataKey="releaseDate" />
      </Column>

      <Column flexGrow={2} sortable>
        <HeaderCell>Return Date</HeaderCell>
        <Cell dataKey="returnDate" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Action</HeaderCell>
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
  );
}
