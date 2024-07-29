import React, { useState } from "react";
import { Col, Container, Row } from "rsuite";
import OverviewLineChart from "../components/charts/OverviewLineChart";
import OverviewPieChart from "../components/charts/OverviewPieChart";
import OverviewTable from "../components/tables/OverviewTable";
import { useGetSignedUserQuery } from "../store/api/userApi";
import UserDetails from "../components/common/UserDetails";

export default function Overview() {

  const { data: signedUser } = useGetSignedUserQuery();
  const user = signedUser?.payload;
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
        <UserDetails/>
      </Row>

      <Row className="flex">
        <Col className="mr-8 w-2/12">
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">New Orders</p>
            <p className="text-xs text-txtgray">This month</p>
            <p className="text-2xl text-txtblue mt-3">0</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Ongoing</p>
            <p className="text-xs text-txtgray">Orders</p>
            <p className="text-2xl text-txtblue mt-3">10</p>
          </Row>
        </Col>
        <Col className="mr-8 w-2/12">
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Upcoming</p>
            <p className="text-xs text-txtgray">Orders</p>
            <p className="text-2xl text-txtblue mt-3">03</p>
          </Row>
          <Row className="bg-white h-28 rounded-md pt-3 pl-5 mt-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer">
            <p className="text-lg font-medium">Completed</p>
            <p className="text-xs text-txtgray">This month</p>
            <p className="text-2xl text-txtblue mt-3">01</p>
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
        <p className="text-lg p-5 font-medium">Orders</p>
        <div className="flex-grow">
          <OverviewTable />
        </div>
      </Row>
    </Container>
  );
}
