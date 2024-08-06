import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, AutoComplete, InputGroup } from "rsuite";
import {
  useGetReturnItemsListQuery,
  useReturnEventItemsMutation,
} from "../../store/api/eventItemsApi";
import Swal from "sweetalert2";
import { useGetOrderByIdQuery } from "../../store/api/orderApi";

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === "EDIT";
  return (
    <Cell {...props} className={editing ? "table-content-editing" : ""}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.itemId, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

export default function Return() {
  const [returnEventItems] = useReturnEventItemsMutation();
  const { orderId } = useParams();
  const { data: returnItemsData, refetch: refetchReturnList } =
    useGetReturnItemsListQuery(orderId);
  const { refetch: refetchOrderData } = useGetOrderByIdQuery(orderId);
  const returnItems = returnItemsData?.payload;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (returnItems) {
      setData(returnItems.map((item) => ({ ...item, status: null })));
    }
  }, [returnItems]);

  const handleEditState = (id) => {
    const nextData = data.map((item) => {
      if (item.itemId === id) {
        return { ...item, status: item.status ? null : "EDIT" };
      }
      return item;
    });
    setData(nextData);
  };

  const handleChange = (id, key, value) => {
    const nextData = data.map((item) => {
      if (item.itemId === id) {
        return { ...item, [key]: Number(value) };
      }
      return item;
    });
    setData(nextData);
  };

  const handleSave = async () => {
    const eventItems = {
      eventId: orderId,
      items: data.map((item) => ({
        itemId: item.itemId,
        returned: item.returned,
        damaged: item.damaged,
      })),
    };
    console.log(eventItems);

    try {
      const response = await returnEventItems(eventItems);

      if (response.error) {
        console.log("Items returning failed", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "Items returning failed",
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
        refetchReturnList();
        refetchOrderData();
        Toast.fire({
          icon: "success",
          title: "Items Returned Successfully",
        });
        // navigate(`/home/orders/trackOrder/${orderId}/release`);
      }
    } catch (error) {
      console.log("Items Adding Error", error);
      Swal.fire({
        title: "Error saving items",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-4/12 mb-5">
        <InputGroup
          inside
          className="flex border-2 h-12 px-3 !rounded-2 items-center justify-evenly"
        >
          <AutoComplete placeholder="Search Items" />
          <InputGroup.Addon>
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
              search
            </span>
          </InputGroup.Addon>
        </InputGroup>
      </div>

      <Table height={300} data={data} id="table" rowHeight={55}>
        <Column flexGrow={1} align="center" fixed>
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => {
              return <span>{rowIndex + 1}</span>;
            }}
          </Cell>
        </Column>

        <Column flexGrow={2} align="center">
          <HeaderCell>Code</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column flexGrow={3}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="itemName" />
        </Column>

        <Column flexGrow={3}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Released</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Returned</HeaderCell>
          <EditableCell dataKey="returned" onChange={handleChange} />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Damaged</HeaderCell>
          <EditableCell dataKey="damaged" onChange={handleChange} />
        </Column>

        <Column flexGrow={2} align="center">
          <HeaderCell>Missing</HeaderCell>
          <Cell>
            {(rowData) => {
              const missing =
                rowData.quantity - (rowData.returned + rowData.damaged);
              return missing;
            }}
          </Cell>
        </Column>

        <Column flexGrow={1} align="center">
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <div
                className="flex"
                onClick={() => handleEditState(rowData.itemId)}
              >
                {rowData.status === "EDIT" ? (
                  <span className="material-symbols-outlined sidebar-icon text-xl font-medium text-txtdarkblue cursor-pointer">
                    save_as
                  </span>
                ) : (
                  <span className="material-symbols-outlined sidebar-icon text-xl font-medium text-txtdarkblue cursor-pointer">
                    edit
                  </span>
                )}
              </div>
            )}
          </Cell>
        </Column>
      </Table>
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
