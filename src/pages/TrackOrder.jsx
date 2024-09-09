import React, { useState } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import UserDetails from "../components/common/UserDetails";
import { AutoComplete, Divider, InputGroup } from "rsuite";
import {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
} from "../store/api/orderApi";

export default function TrackOrder() {
  const steps = [
    { name: "Details", path: "details", icon: "event_note" },
    { name: "Packing List", path: "items", icon: "list_alt" },
    { name: "Release", path: "release", icon: "local_shipping" },
    { name: "Return", path: "return", icon: "deployed_code_update" },
  ];

  const [value, setValue] = useState("");
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: orderData } = useGetOrderByIdQuery(orderId);
  const { data: allOrdersData } = useGetAllOrdersQuery();

  const allOrders = allOrdersData?.payload?.map((order) => {
    return `${order.id} | ${order.eventName} | ${order.customer.name}`;
  });

  const handleSearchChange = (searchValue) => {
    setValue(searchValue);
  };

  const handleSelectOrder = (selectedOrder) => {
    const selectedOrderId = selectedOrder.split(" | ")[0]; // Assuming the order ID is the first part of the string
    navigate(`/home/orders/trackOrder/${selectedOrderId}/details`);
    setValue("");
  };

  const handleClearSearch = () => {
    setValue("");
    navigate(`/home/orders/trackOrder/${orderId}/details`);
  };

  const renderStep = (step, index) => {
    const isActive = location.pathname.includes(step.path);
    const isCompleted = orderData?.payload?.state >= index + 1;

    return (
      <React.Fragment key={index}>
        <NavLink
          to={`/home/orders/trackOrder/${orderId}/${step.path}`}
          className="flex flex-col items-center cursor-pointer"
        >
          <div
            className={`flex items-center justify-center w-20 h-20 border-2 rounded-full transition-all duration-200 ${
              isActive && isCompleted
                ? "border-8 border-green"
                : isActive && !isCompleted
                ? "border-8 border-txtgray"
                : isCompleted
                ? "border-green"
                : "border-txtgray"
            }`}
          >
            <span
              className={`material-symbols-outlined text-4xl ${
                isCompleted
                  ? "text-green font-bold"
                  : "text-txtgray font-semibold"
              }`}
            >
              {step.icon}
            </span>
          </div>
          <div className="flex pl-1">
            <p
              className={`${
                isActive || isCompleted
                  ? "text-black font-bold"
                  : "text-txtgray font-semibold"
              }`}
            >
              {step.name}
            </p>
            {isCompleted && (
              <span className="material-symbols-outlined text-green font-semibold ml-1">
                check
              </span>
            )}
          </div>
        </NavLink>
        {index < steps.length - 1 && (
          <div className="flex w-1/6 mb-5">
            <Divider
              className={`w-full border-2 ${
                orderData?.payload?.state > index + 1
                  ? "border-green"
                  : "border-txtgray"
              }`}
            />
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="w-full">
      <div className="pb-10 flex justify-between">
        <div className="flex items-center mb-5 ">
          <span className="material-symbols-outlined sidebar-icon text-black">
            calendar_month
          </span>
          <p className="text-2xl font-bold ml-4">Track Order</p>
        </div>
        <div className="w-5/12">
          <InputGroup
            inside
            className="flex border-2 h-10 px-3 !rounded-full items-center justify-evenly"
          >
            <AutoComplete
              placeholder="Search by Order ID or Name"
              data={allOrders}
              value={value}
              onChange={handleSearchChange}
              onSelect={handleSelectOrder}
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
        </div>
        <UserDetails />
      </div>

      <div className="bg-white w-full flex flex-col justify-center items-center py-8 rounded-md">
        <p className="text-black text-xl font-semibold">
          {orderData?.payload?.customer?.name} | {orderData?.payload?.venue} |{" "}
          {orderData?.payload?.pax} PAX
        </p>
        <div className="flex items-center justify-evenly w-10/12 mt-10">
          {steps.map((step, index) => renderStep(step, index))}
        </div>
      </div>

      <div className="bg-white w-full flex flex-col justify-center items-center py-8 px-10 mt-10 rounded-md">
        <Outlet />
      </div>
    </div>
  );
}
