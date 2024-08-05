import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Checkbox } from "rsuite";
import {
  useGetReleaseItemListQuery,
  useReleaseEventItemsMutation,
  useGetReturnItemsListQuery,
} from "../../store/api/eventItemsApi";
import Swal from "sweetalert2";

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

export default function Release() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: eventItems, refetch: eventItemsRefetch } =
    useGetReleaseItemListQuery(orderId);
  const { refetch: returnItemsRefetch } = useGetReturnItemsListQuery(orderId);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [releaseEventItems] = useReleaseEventItemsMutation();

  console.log("eventItems", eventItems);

  useEffect(() => {
    if (eventItems && eventItems.payload) {
      const initialCheckedKeys = eventItems.payload
        .filter((item) => item.isSelect === 1)
        .map((item) => item.itemId);
      setCheckedKeys(initialCheckedKeys);
    }
  }, [eventItems]);

  const data = eventItems?.payload || [];

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.itemId) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const checked = checkedKeys.length === data.length;
  const indeterminate =
    checkedKeys.length > 0 && checkedKeys.length < data.length;

  const handleSave = async () => {
    const items = data.map((item) => ({
      itemId: item.itemId,
      isSelect: checkedKeys.includes(item.itemId) ? 1 : 0,
    }));

    const payload = {
      eventId: orderId,
      items: items,
    };

    console.log("Saving order", payload);

    try {
      const response = await releaseEventItems(payload);
      if (response.error) {
        console.log("Failed to release event items", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Failed to release event items",
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
          title: "Event items released successfully",
        });
        eventItemsRefetch();
        returnItemsRefetch();
        navigate(`/home/orders/trackOrder/${orderId}/return`);
      }
    } catch (error) {
      console.log("Failed to release event items", error);
      Swal.fire({
        title: "Failed to release event items",
        icon: "error",
      });
    }
  };
  return (
    <div className="w-full">
      <p className="font-bold text-black text-2xl mb-5">Item Checklist</p>

      <Table height={300} data={data} id="table">
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
            dataKey="itemId"
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
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Quantity</HeaderCell>
          <Cell dataKey="quantity" />
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
          Save
        </button>
      </div>
    </div>
  );
}
