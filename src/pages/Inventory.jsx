import React, { useState, useEffect } from "react";
import { AutoComplete, Container, InputGroup, Table } from "rsuite";
import UserDetails from "../components/common/UserDetails";
import {
  useGetAllItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} from "../store/api/inventoryApi";
import AddInventoryModal from "../components/modals/AddInventory";
import FailModal from "../components/modals/Delete";

const { Column, HeaderCell, Cell } = Table;

export default function Inventory() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const { data: getAllItems } = useGetAllItemsQuery();
  const [addItem] = useAddItemMutation();

  const [deleteItem] = useDeleteItemMutation();
  const { refetch } = useGetAllItemsQuery();

  const handleModalOpen = () => setModalOpen(true);

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentItem(null);
  };

  const handleDeleteOpen = (id) => {
    setDeleteUserId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteUserId(null);
  };

  useEffect(() => {
    if (getAllItems?.payload) {
      const filtered = getAllItems.payload.filter(
        (item) =>
          item.itemName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.id.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [getAllItems, searchValue]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleEditItem = (item) => {
    console.log("handleEditItem", item);
    setCurrentItem(item);
    handleModalOpen();
  };

  const getData = () => {
    if (!filteredItems) return [];
    const sortedData = [...filteredItems];

    if (sortColumn && sortType) {
      sortedData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        if (typeof x === "string") x = x.toLowerCase();
        if (typeof y === "string") y = y.toLowerCase();

        if (x < y) return sortType === "asc" ? -1 : 1;
        if (x > y) return sortType === "asc" ? 1 : -1;
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
    <Container>
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5">
          <span className="material-symbols-outlined sidebar-icon text-black">
            inventory_2
          </span>
          <p className="text-2xl font-bold ml-4 text-black">Inventory</p>
        </div>
        <UserDetails />
      </div>
      <div className="max-w-full h-20 bg-white rounded-md flex items-center justify-between mb-10">
        <div className="ml-8 w-1/2">
          <p className="text-xl font-medium text-txtgray">
            0{filteredItems.length} Items Total
          </p>
        </div>
        <div className="flex w-1/2 justify-between">
          <div className="w-8/12">
            <InputGroup
              inside
              className="flex border-2 h-10 px-3 !rounded-full items-center justify-evenly"
            >
              <AutoComplete
                placeholder="Search by Item Name"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <InputGroup.Addon>
                {searchValue && (
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
          </div>
          <div
            className="min-w-52 flex items-center cursor-pointer"
            onClick={handleModalOpen}
          >
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3">
              add_circle
            </span>
            <p className="text-lg font-medium text-txtdarkblue">Add New Item</p>
          </div>
        </div>
      </div>
      <div className="flex-grow">
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
          <Column flexGrow={2} align="center" fixed>
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
              {(rowData) => (
                <>
                  <span
                    className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer"
                    onClick={() => handleEditItem(rowData)}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer"
                    onClick={() => handleDeleteOpen(rowData.id)}
                  >
                    delete
                  </span>
                </>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
      <AddInventoryModal
        open={modalOpen}
        handleClose={handleModalClose}
        item={currentItem}
        onSubmit={addItem}
      />
      <FailModal
        open={deleteOpen}
        handleClose={handleDeleteClose}
        headtxt="Delete Item"
        bodytxt="Are you sure you want to delete this Item? This action cannot be undone!"
        btntxt="Delete"
        id={deleteUserId}
        deleteApi={deleteItem}
        refetchTable={refetch}
      />
    </Container>
  );
}
