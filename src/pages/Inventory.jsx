import React from "react";
import { Container, Input, InputGroup } from "rsuite";
import UserDetails from "../components/common/UserDetails";
import SearchIcon from "@rsuite/icons/Search";
import InventoryTable from "../components/tables/InventoryTable";

function Inventory() {
  const styles = {
    width: 300,
    marginBottom: 10,
  };
  return (
    <Container>
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5 ">
          <span className="material-symbols-outlined sidebar-icon  text-black">
            inventory_2
          </span>
          <p className="text-2xl font-bold ml-4  text-black">Inventory</p>
        </div>
        <UserDetails />
      </div>
      <div className="max-w-full h-20 bg-white rounded-md flex items-center justify-between mb-10">
        <div className="ml-8 w-1/2 ">
          <p className="text-xl font-medium  text-txtgray ">20 items Total</p>
        </div>
        <div className="flex   w-1/2  justify-end">
          <div className="mr-5 w-2/3">
            <InputGroup
              inside
              className="flex border-2 border-txtdarkblue  h-10 px-3 mr-5 !rounded-full items-center justify-evenly"
            >
              <Input />
              <InputGroup.Button>
                <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer ">
                  search
                </span>
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div className="min-w-52 flex items-center cursor-pointer">
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 ">
              add_circle
            </span>
            <p className="text-lg font-medium text-txtdarkblue">Add New Item</p>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <InventoryTable />
      </div>
    </Container>
  );
}

export default Inventory;
