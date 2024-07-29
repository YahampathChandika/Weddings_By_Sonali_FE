import React from "react";
import { Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

export default function UpcomingOrdersTable() {
  const defaultData = [
    {
      id: 1,
      customer: "John Doe",
      phone: "123-456-7890",
      event: "Wedding",
      eventDate: "2023-08-01",
      eventTime: "18:00",
      returnDate: "2023-08-02",
    },
    {
      id: 2,
      customer: "Jane Smith",
      phone: "987-654-3210",
      event: "Birthday",
      eventDate: "2023-08-05",
      eventTime: "12:00",
      returnDate: "2023-08-06",
    },
    // Add more data as needed
  ];

  const data = defaultData;

  return (
    <Table height={400} data={data}>
      <Column flexGrow={1} align="center">
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
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

      <Column flexGrow={2}>
        <HeaderCell>Event Date</HeaderCell>
        <Cell dataKey="eventDate" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Event Time</HeaderCell>
        <Cell dataKey="eventTime" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Release Date</HeaderCell>
        <Cell dataKey="returnDate" />
      </Column>

      <Column flexGrow={2}>
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
