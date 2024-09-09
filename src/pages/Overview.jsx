import React, { useState } from "react";
import { Col, Container, Row } from "rsuite";
import OverviewLineChart from "../components/charts/OverviewLineChart";
import OverviewPieChart from "../components/charts/OverviewPieChart";
import { useGetSignedUserQuery } from "../store/api/userApi";
import UserDetails from "../components/common/UserDetails";
import {
  useGetOrderMatricesQuery,
  useGetOrdersByStateQuery,
} from "../store/api/orderApi";
import OngoingOrdersTable from "../components/tables/OngoingOrdersTable";
import WaitingOrdersTable from "../components/tables/WaitingOrdersTable";

export default function Overview() {
  const { data: orderMatrices } = useGetOrderMatricesQuery();
  const { data: pastOrders } = useGetOrdersByStateQuery(4);
  const { data: signedUser } = useGetSignedUserQuery();
  const user = signedUser?.payload;

  const now = new Date();
  const thisMonthPastOrders = pastOrders?.payload.filter((order) => {
    const createdAt = new Date(order.createdAt);
    return (
      createdAt >= new Date(now.getFullYear(), now.getMonth(), 1) &&
      createdAt <= new Date(now.getFullYear(), now.getMonth() + 1, 0)
    );
  });

  const pastOrdersCount = thisMonthPastOrders?.length;
  const ongoingOrdersCount = orderMatrices?.payload?.ongoing;
  const waitingOrdersCount = orderMatrices?.payload?.waiting;
  const upcomingOrdersCount = orderMatrices?.payload?.upcoming;

  return (
    <Container className="w-full">
      <Row className="pb-10 flex justify-between">
        <Col>
          <p className="text-2xl font-bold">
            {/* Welcome, Mr. {user?.firstName} {user?.lastName}! */}
            Welcome, Mr. {user?.name}!
          </p>
          <p className="text-txtgray">
            Check the latest updates on your account
          </p>
        </Col>
        <UserDetails />
      </Row>

      <Row className="flex">
        <Col className="mr-8 w-2/12">
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">New Event</p>
            <p className="text-xs text-txtgray">This month</p>
            <p className="text-2xl text-txtblue mt-3">0{waitingOrdersCount}</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Ongoing</p>
            <p className="text-xs text-txtgray">Events</p>
            <p className="text-2xl text-txtblue mt-3">0{ongoingOrdersCount}</p>
          </Row>
        </Col>
        <Col className="mr-8 w-2/12">
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Upcoming</p>
            <p className="text-xs text-txtgray">Events</p>
            <p className="text-2xl text-txtblue mt-3">0{upcomingOrdersCount}</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Completed</p>
            <p className="text-xs text-txtgray">This month</p>
            <p className="text-2xl text-txtblue mt-3">0{pastOrdersCount}</p>
          </Row>
        </Col>

        <Col className="bg-white w-1/3 rounded-md mr-8 flex-col items-center justify-center">
          <p className="mt-3 ml-5 pb-1 text-lg font-medium">Sales</p>
          <OverviewLineChart />
        </Col>
        <Col className="bg-white w-1/3 rounded-md">
          <p className="mt-3 ml-5 pb-1 text-lg font-medium">Most Used Items</p>
          <OverviewPieChart />
        </Col>
      </Row>

      <Row className="bg-white h-96 rounded-md mt-8 flex flex-col">
        <p className="text-lg p-5 font-medium">Events</p>
        <div className="flex-grow">
          {/* <OngoingOrdersTable /> */}
          <WaitingOrdersTable />
        </div>
      </Row>
    </Container>
  );
}
