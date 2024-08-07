import React, { useState, useEffect } from "react";
import { AutoComplete, Container, InputGroup, Table, Checkbox } from "rsuite";
import UserDetails from "../components/common/UserDetails";
import {
  useGetWashlistQuery,
  useMarkWashedMutation,
} from "../store/api/eventItemsApi";
import Swal from "sweetalert2";
import { useGetAllItemsQuery } from "../store/api/inventoryApi";

const { Column, HeaderCell, Cell } = Table;

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

export default function Washing() {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { data: washList, refetch: washListRefetch } = useGetWashlistQuery();
  const { refetch: inventoryRefetch } = useGetAllItemsQuery();
  const [markWashed] = useMarkWashedMutation();

  useEffect(() => {
    if (washList?.payload) {
      const filtered = washList.payload.filter(
        (item) =>
          item.itemName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.code.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [washList, searchValue]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleCheckAll = (value, checked) => {
    const keys = checked ? filteredItems.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const checked = checkedKeys.length === filteredItems.length;
  const indeterminate =
    checkedKeys.length > 0 && checkedKeys.length < filteredItems.length;

  const handleSave = async () => {
    const items = checkedKeys.map((id) => {
      const item = filteredItems.find((item) => item.id === id);
      return {
        itemId: item.itemId,
        eventId: item.eventId,
      };
    });

    const payload = {
      items,
    };

    console.log("Saving order", payload);

    try {
      const response = await markWashed(payload);
      if (response.error) {
        console.log("Failed to mark items as washed", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to mark items as washed",
          icon: "error",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Items returned to the inventory",
        });
        inventoryRefetch();
        washListRefetch();
      }
    } catch (error) {
      console.log("Failed to mark items as washed", error);
      Swal.fire({
        title: "Failed to mark items as washed",
        icon: "error",
      });
    }
  };

  return (
    <Container>
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5">
          <span className="material-symbols-outlined sidebar-icon text-black">
            local_laundry_service
          </span>
          <p className="text-2xl font-bold ml-4 text-black">Washing Items</p>
        </div>
        <UserDetails />
      </div>
      <div className="max-w-full h-20 bg-white rounded-md flex items-center justify-between px-8 mb-10">
        <div className="w-1/2">
          <p className="text-xl font-medium text-txtgray">
            0{filteredItems.length} Items Total
          </p>
        </div>
        <div className="flex w-1/3 justify-between">
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
      </div>
      <div className="w-full">
        <Table height={300} data={filteredItems} id="table">
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
            <Cell dataKey="itemName" />
          </Column>

          <Column flexGrow={2}>
            <HeaderCell>Type</HeaderCell>
            <Cell dataKey="type" />
          </Column>

          <Column flexGrow={2}>
            <HeaderCell>Quantity</HeaderCell>
            <Cell dataKey="returned" />
          </Column>
        </Table>
        <style jsx>{`
          .custom-checkbox input[type="checkbox"] {
            cursor: pointer;
          }
        `}</style>

        <div className="flex justify-end mt-5">
          <button
            className="w-60 h-10 bg-txtdarkblue text-white p-4 text-lg flex items-center justify-center rounded-md"
            onClick={handleSave}
          >
            Return
          </button>
        </div>
      </div>
    </Container>
  );
}
