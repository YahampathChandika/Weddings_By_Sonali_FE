import React, { useState, useEffect } from "react";
import { AutoComplete, Col, Container, InputGroup, Row } from "rsuite";
import UsersTable from "../components/tables/UsersTable";
import AddUserModal from "../components/modals/AddUserModal";
import { useGetAllUsersQuery } from "../store/api/userApi";
import UserDetails from "../components/common/UserDetails";

export default function Users() {
  const [value, setValue] = useState("");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const handleUserModalOpen = () => setUserModalOpen(true);
  const handleUserModalClose = () => setUserModalOpen(false);
  const {
    data: getAllUsers,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllUsersQuery();


  useEffect(() => {
    if (getAllUsers?.payload) {
      setFilteredUsers(getAllUsers.payload);
    }
  }, [getAllUsers]);

  const totalUsers = getAllUsers?.payload?.length || 0;
  const admins =
    getAllUsers?.payload?.filter((user) => user.role === "Admin").length || 0;
  const users =
    getAllUsers?.payload?.filter((user) => user.role === "User").length || 0;

  const handleSearchChange = (searchValue) => {
    setValue(searchValue);

    if (searchValue) {
      const filtered = getAllUsers?.payload?.filter((user) =>
        `${user.name}`.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(getAllUsers?.payload || []);
    }
  };

  const handleClearSearch = () => {
    setValue("");
    setFilteredUsers(getAllUsers?.payload || []);
  };

  const handleSelectUser = (selectedUser) => {
    const user = getAllUsers?.payload?.find(
      (user) => `${user.name}` === selectedUser
    );
    setFilteredUsers(user ? [user] : []);
  };

  const data = getAllUsers?.payload?.map((user) => {
    return `${user.name}`;
  });

  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Row className="flex items-center mb-5">
          <span className="material-symbols-outlined text-black">group</span>
          <p className="text-2xl font-bold ml-4">Users</p>
        </Row>
        <UserDetails />
      </Row>

      <Row className="flex-col">
        <Row className="mr-8 w-full bg-white h-20 rounded-md pl-5 flex justify-between items-center">
          <p className="text-lg font-medium text-txtgray">
            0{totalUsers} Users Total
          </p>

          <Row className="flex mr-5 w-1/2">
            <InputGroup
              inside
              className="flex border-2 min-w-48 h-10 px-3 !rounded-full items-center justify-evenly"
            >
              <AutoComplete
                placeholder="Search by User's Name"
                data={data}
                value={value}
                onChange={handleSearchChange}
                onSelect={handleSelectUser}
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
            <Row
              className="min-w-48 flex ml-8 items-center cursor-pointer"
              onClick={handleUserModalOpen}
            >
              <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 ml-6">
                add_circle
              </span>
              <p className="text-lg font-medium text-txtdarkblue">
                Add New User
              </p>
            </Row>
          </Row>
        </Row>
        <Row className="mr-8 w-full flex mt-6 justify-start items-center space-x-36">
          <Row className="bg-white w-1/5 h-32 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Admins</p>
              <p className="text-xs text-txtgray">Total</p>
              <p className="text-2xl text-txtblue mt-3">0{admins}</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                admin_panel_settings
              </span>
            </Col>
          </Row>
          <Row className="bg-white w-1/5 h-32 rounded-md py-3 px-5 flex justify-between items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <Col>
              <p className="text-lg font-medium">Users</p>
              <p className="text-xs text-txtgray">Total</p>
              <p className="text-2xl text-txtblue mt-3">0{users}</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                account_circle
              </span>
            </Col>
          </Row>
        </Row>
      </Row>

      <Row className="bg-white h-96 rounded-md p-5 mt-6 flex flex-col">
        <div className="flex-grow">
          <UsersTable users={filteredUsers} />
        </div>
      </Row>

      <AddUserModal open={userModalOpen} handleClose={handleUserModalClose} />
    </Container>
  );
}
