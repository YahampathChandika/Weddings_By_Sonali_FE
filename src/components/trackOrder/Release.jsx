import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Checkbox, FlexboxGrid, Col, Row } from "rsuite";
import {
  useGetReleaseItemListQuery,
  useReleaseEventItemsMutation,
  useGetReturnItemsListQuery,
} from "../../store/api/eventItemsApi";
import Swal from "sweetalert2";
import { useGetOrderByIdQuery } from "../../store/api/orderApi";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/images/logo.jpg";

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
  const { data: orderData } = useGetOrderByIdQuery(orderId);
  const { refetch: returnItemsRefetch } = useGetReturnItemsListQuery(orderId);
  const { refetch: refetchOrderData } = useGetOrderByIdQuery(orderId);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [releaseEventItems] = useReleaseEventItemsMutation();

  const contentToPrint = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  console.log("orderData", orderData);

  const handlePrint = useReactToPrint({
    documentTitle: `${orderData?.payload?.eventName} Packing List`,
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    content: () => contentToPrint.current,
    removeAfterPrint: true,
  });

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
        refetchOrderData();
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

      <Table autoHeight height={340} data={data} id="table">
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

      <div className="flex justify-end space-x-10 mt-10">
        <button
          className="w-48 h-10 bg-green text-white p-4 text-lg flex items-center justify-center  rounded-md"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          className="w-48 h-10 bg-txtdarkblue text-white p-4 text-lg flex items-center justify-center  rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div
        style={{ width: "100%", display: isPrinting ? "block" : "none" }}
        ref={contentToPrint}
      >
        <div className="h-full w-full p-10">
          <FlexboxGrid className="flex justify-between mb-10 items-center">
            <FlexboxGrid.Item colspan={12} className="flex justify-end">
              <Col>
                <Row className="flex items-center">
                  <img src={logo} className="mr-5" style={{width:100}}/>
                  <p className="text-2xl font-semibold">Weddings By Sonali</p>
                </Row>
                <p className="text-xl font-medium mt-8">Customer Details :</p>
                <Row className="flex mt-2">
                  <p className="w-28">Name :</p>
                  <p className="ml-2">{orderData?.payload?.customer?.name}</p>
                </Row>
                <Row className="flex">
                  <p className="w-28">Contact No :</p>
                  <p className="ml-2">
                    {orderData?.payload?.customer?.contactNo}
                  </p>
                </Row>
                <Row className="flex">
                  <p className="w-28">Address :</p>
                  <p className="ml-2">
                    {orderData?.payload?.customer?.address}
                  </p>
                </Row>
              </Col>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} className="flex-col">
              <Col>
                <p className="text-2xl font-semibold h-24 flex items-center">Packing List</p>
                <p className="text-xl font-medium mt-8">Event Details :</p>
                <Row className="flex mt-2">
                  <p className="w-16">Date :</p>
                  <p className="ml-2">{orderData?.payload?.eventDate}</p>
                </Row>
                <Row className="flex">
                  <p className="w-16">Time :</p>
                  <p className="ml-2">{orderData?.payload?.eventTime}</p>
                </Row>
                <Row className="flex">
                  <p className="w-16">Venue :</p>
                  <p className="ml-2">{orderData?.payload?.venue}</p>
                </Row>
              </Col>
            </FlexboxGrid.Item>
          </FlexboxGrid>

          <Table autoHeight bordered height={340} data={data} id="table">
            <Column align="center" width={70}>
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

            <Column width={230}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={150}>
              <HeaderCell>Type</HeaderCell>
              <Cell dataKey="type" />
            </Column>

            <Column width={90}>
              <HeaderCell>Quantity</HeaderCell>
              <Cell dataKey="quantity" />
            </Column>

            <Column width={90}>
              <HeaderCell>Returned</HeaderCell>
              <Cell dataKey="" />
            </Column>

            <Column width={90}>
              <HeaderCell>Damaged</HeaderCell>
              <Cell dataKey="" />
            </Column>

            <Column width={90}>
              <HeaderCell>Missing</HeaderCell>
              <Cell dataKey="" />
            </Column>
          </Table>
        </div>
        <style>
          {`
              @media print {
                [style*="display: none"] {
                  display: block !important;
                }
              }
            `}
        </style>
      </div>
    </div>
  );
}
