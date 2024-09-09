import React, { useState } from "react";
import { AutoComplete, Col, Container, InputGroup, Row } from "rsuite";
import UserDetails from "../components/common/UserDetails";
import WaitingOrdersTable from "../components/tables/WaitingOrdersTable";
import OngoingOrdersTable from "../components/tables/OngoingOrdersTable";
import UpcomingOrdersTable from "../components/tables/UpcomingOrdersTable";
import PastOrdersTable from "../components/tables/PastOrdersTable";
import { useNavigate } from "react-router-dom";
import { useGetOrderMatricesQuery } from "../store/api/orderApi";

export default function Orders() {
  const { data: orderMatrices } = useGetOrderMatricesQuery();
  const [searchValue, setSearchValue] = useState("");
  const [orderType, setOrderType] = useState("waiting");
  const navigate = useNavigate();
  const handleClearSearch = () => {
    setSearchValue("");
  };
  
  const ongoingOrdersCount = orderMatrices?.payload?.ongoing;
  const upcomingOrdersCount = orderMatrices?.payload?.upcoming;
  const waitingOrdersCount = orderMatrices?.payload?.waiting;
  const pastOrdersCount = orderMatrices?.payload?.past;

  const orderTypeMapping = {
    waiting: { icon: "calendar_clock", title: "Waiting Orders" },
    ongoing: { icon: "event", title: "Ongoing Orders" },
    upcoming: { icon: "event_upcoming", title: "Upcoming Orders" },
    past: { icon: "event_available", title: "Past Orders" },
  };

  const currentOrderType = orderTypeMapping[orderType];

  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Row className="flex items-center mb-5">
          <span className="material-symbols-outlined sidebar-icon text-black">
            {currentOrderType.icon}
          </span>
          <p className="text-2xl font-bold ml-4">{currentOrderType.title}</p>
        </Row>
        <UserDetails />
      </Row>
      <Row className="flex-col">
        <Row className="mr-8 w-full bg-white h-20 rounded-md pl-5 flex justify-between items-center">
          <InputGroup
            inside
            className="flex border-2 !w-2/5 min-w-48 h-10 px-3 mr-5 !rounded-full items-center justify-evenly"
          >
            <AutoComplete
              placeholder="Search by Name or ID"
              // data={}
              value={searchValue}
              onChange={setSearchValue}
              // onSelect={handleSelect}
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
          <Row
            className="min-w-52 flex items-center cursor-pointer"
            onClick={() => navigate("/home/newOrder")}
          >
            <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 ">
              add_circle
            </span>
            <p className="text-lg font-medium text-txtdarkblue">
              Add New Event
            </p>
          </Row>
        </Row>
        <Row className="mr-8 w-full flex my-8 justify-between items-center">
          <Row
            onClick={() => setOrderType("waiting")}
            className={`bg-white w-1/5 h-28 rounded-md py-3 px-5 flex justify-between items-center cursor-pointer ${
              orderType === "waiting"
                ? "scale-105 shadow-md"
                : "hover:scale-105 hover:shadow-md"
            } transform transition-transform duration-300`}
          >
            <Col>
              <p className="text-lg font-medium">Waiting</p>
              <p className="text-xs text-txtgray">Add Items</p>
              <p className="text-2xl text-txtblue mt-3">
                0{waitingOrdersCount}
              </p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                calendar_clock
              </span>
            </Col>
          </Row>
          <Row
            onClick={() => setOrderType("upcoming")}
            className={`bg-white w-1/5 h-28 rounded-md py-3 px-5 flex justify-between items-center cursor-pointer ${
              orderType === "upcoming"
                ? "scale-105 shadow-md"
                : "hover:scale-105 hover:shadow-md"
            } transform transition-transform duration-300`}
          >
            <Col>
              <p className="text-lg font-medium">Upcoming</p>
              <p className="text-xs text-txtgray">Release Items</p>
              <p className="text-2xl text-txtblue mt-3">
                0{upcomingOrdersCount}
              </p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                event_upcoming
              </span>
            </Col>
          </Row>
          <Row
            onClick={() => setOrderType("ongoing")}
            className={`bg-white w-1/5 h-28 rounded-md py-3 px-5 flex justify-between items-center cursor-pointer ${
              orderType === "ongoing"
                ? "scale-105 shadow-md"
                : "hover:scale-105 hover:shadow-md"
            } transform transition-transform duration-300`}
          >
            <Col>
              <p className="text-lg font-medium">Ongoing</p>
              <p className="text-xs text-txtgray">Return Items</p>
              <p className="text-2xl text-txtblue mt-3">
                0{ongoingOrdersCount}
              </p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                event
              </span>
            </Col>
          </Row>
          <Row
            onClick={() => setOrderType("past")}
            className={`bg-white w-1/5 h-28 rounded-md py-3 px-5 flex justify-between items-center cursor-pointer ${
              orderType === "past"
                ? "scale-105 shadow-md"
                : "hover:scale-105 hover:shadow-md"
            } transform transition-transform duration-300`}
          >
            <Col>
              <p className="text-lg font-medium">Past</p>
              <p className="text-xs text-txtgray">Finished Events</p>
              <p className="text-2xl text-txtblue mt-3">0{pastOrdersCount}</p>
            </Col>
            <Col>
              <span className="material-symbols-outlined text-4xl font-light text-txtblue">
                event_available
              </span>
            </Col>
          </Row>
        </Row>
      </Row>
      <Row className="bg-white h-96 rounded-md flex flex-col">
        <div className="flex-grow">
          {orderType === "waiting" && <WaitingOrdersTable />}
          {orderType === "ongoing" && <OngoingOrdersTable />}
          {orderType === "upcoming" && <UpcomingOrdersTable />}
          {orderType === "past" && <PastOrdersTable />}
        </div>
      </Row>
    </Container>
  );
}
