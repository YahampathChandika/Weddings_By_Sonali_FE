import React from "react";
import { Divider } from "rsuite";

export default function Details() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="font-bold text-black text-2xl">Order Details</p>
        <span class="material-symbols-outlined rounded-full h-12 w-12 flex justify-center items-center cursor-pointer text-black bg-bggray">
          edit
        </span>
      </div>
      <Divider className="text-txtgray w-full !my-10" />
      <div className="flex w-full justify-between">
        <div className="flex-col w-4/12">
          <p className="text-txtgray text-xl font-semibold">Customer</p>
        </div>
        <div className="flex-col w-4/12">
          <p className="text-txtgray font-medium text-lg">Name</p>
          <p className="text-black font-medium text-xl mt-2">Pathum Nissanka</p>
          <p className="text-txtgray font-medium text-lg mt-5">Address</p>
          <p className="text-black font-medium text-xl mt-2">
            221'B, Colombo 7.
          </p>
        </div>
        <div className="flex-col w-3/12">
          <p className="text-txtgray font-medium text-lg">ID</p>
          <p className="text-black font-medium text-xl mt-2">2000123487654</p>
        </div>
        <div className="flex-col w-1/12">
          <p className="text-txtgray font-medium text-lg">Contact</p>
          <p className="text-black font-medium text-xl mt-2">779817119</p>
        </div>
      </div>
      <Divider className="text-txtgray w-full !my-10" />
      <div className="flex w-full justify-between">
        <div className="flex-col w-4/12">
          <p className="text-txtgray text-xl font-semibold">Event</p>
        </div>
        <div className="flex-col w-4/12">
          <p className="text-txtgray font-medium text-lg">Event Name</p>
          <p className="text-black font-medium text-xl mt-2">Pathum Nissanka</p>
          <p className="text-txtgray font-medium text-lg mt-5">Event Time</p>
          <p className="text-black font-medium text-xl mt-2">18.00</p>
          <p className="text-txtgray font-medium text-lg mt-5">Notes</p>
          <p className="text-black font-medium text-xl mt-2">No notes</p>
        </div>
        <div className="flex-col w-3/12">
          <p className="text-txtgray font-medium text-lg">Venue</p>
          <p className="text-black font-medium text-xl mt-2">2000123487654</p>
          <p className="text-txtgray font-medium text-lg mt-5">Return Date</p>
          <p className="text-black font-medium text-xl mt-2">21/08/2024</p>
        </div>
        <div className="flex-col w-1/12">
          <p className="text-txtgray font-medium text-lg">Date</p>
          <p className="text-black font-medium text-xl mt-2">779817119</p>
          <p className="text-txtgray font-medium text-lg mt-5">Pax</p>
          <p className="text-black font-medium text-xl mt-2">250</p>
        </div>
      </div>
    </div>
  );
}
