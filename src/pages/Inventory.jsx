import React, { useState, useEffect } from "react";
import { AutoComplete, Container, InputGroup } from "rsuite";
import UserDetails from "../components/common/UserDetails";
import InventoryTable from "../components/tables/InventoryTable";
import { useGetAllItemsQuery } from "../store/api/inventoryApi";
import AddInventoryModal from "../components/modals/AddInventory";

function Inventory() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const {
    data: getAllItems,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllItemsQuery();

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
          <p className="text-xl font-medium text-txtgray">20 items Total</p>
        </div>
        <div className="flex w-1/2 justify-between">
          <div className="w-8/12">
            <InputGroup
              inside
              className="flex border-2 h-10 px-3 !rounded-full items-center justify-evenly"
            >
              <AutoComplete
                placeholder="Search by Item ID or Name"
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
        <InventoryTable Items={filteredItems} />
      </div>
      <AddInventoryModal open={modalOpen} handleClose={handleModalClose} />
    </Container>
  );
}

export default Inventory;
