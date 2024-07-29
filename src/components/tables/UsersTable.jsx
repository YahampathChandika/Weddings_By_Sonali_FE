import React, { useState } from "react";
import { Table } from "rsuite";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../store/api/userApi";
import FailModal from "../modals/Delete";
import noDataImage from "../../assets/images/nofound.svg";

export default function UsersTable({ users }) {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [deleteUser] = useDeleteUserMutation();
  const { refetch } = useGetAllUsersQuery();

  const handleDeleteOpen = (id) => {
    setDeleteUserId(id);
    setDeleteOpen(true);
    console.log("handleDeleteOpen", id);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteUserId(null);
  };

  const { Column, HeaderCell, Cell } = Table;

  const getData = () => {
    if (!users) return [];
    const sortedData = [...users];

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

  const ActionCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer">
        edit
      </span>
      <span
        className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer"
        onClick={() => handleDeleteOpen(rowData.id)}
      >
        delete
      </span>
    </Cell>
  );

  return (
    <>
      <Table
        height={420}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        rowHeight={55}
        renderEmpty={() => (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <img src={noDataImage} alt="No Data" className="w-44 h-auto" />
            <p className="mt-5 text-lg text-gray-600">No users found!</p>
          </div>
        )}
      >
        <Column flexGrow={1} align="center" fixed sortable>
          <HeaderCell>Role</HeaderCell>
          <Cell dataKey="role" />
        </Column>

        <Column flexGrow={3} fixed sortable>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Contact</HeaderCell>
          <Cell dataKey="contactNo" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Address</HeaderCell>
          <Cell dataKey="address" />
        </Column>

        <Column flexGrow={1} align="center">
          <HeaderCell>Actions</HeaderCell>
          <ActionCell />
        </Column>
      </Table>
      <FailModal
        open={deleteOpen}
        handleClose={handleDeleteClose}
        headtxt="Delete User"
        bodytxt="Are you sure you want to delete this User? This action cannot be undone!"
        btntxt="Delete"
        id={deleteUserId}
        deleteApi={deleteUser}
        refetchTable={refetch}
      />
    </>
  );
}
