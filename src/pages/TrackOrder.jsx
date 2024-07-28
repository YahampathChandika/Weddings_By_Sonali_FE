import React, { useState } from "react";
import UserDetails from "../components/common/UserDetails";
import { AutoComplete, Divider, InputGroup } from "rsuite";

export default function TrackOrder() {
  const steps = [
    { name: "Details", icon: "event_note" },
    { name: "Items", icon: "list_alt" },
    { name: "Release", icon: "local_shipping" },
    { name: "Return", icon: "deployed_code_update" },
  ];

  const [activeStep, setActiveStep] = useState("Details");

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
              // data={data}
              // value={value}
              // onChange={handleSearchChange}
              // onSelect={handleSelectUser}
            />
            <InputGroup.Addon>
              {/* {value && (
              <span
                className="material-symbols-outlined sidebar-icon text-lg font-medium text-red cursor-pointer mr-5"
                onClick={handleClearSearch}
              >
                close
              </span>
            )} */}
              <span className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue cursor-pointer">
                search
              </span>
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <UserDetails />
      </div>

      <div className="bg-white w-full flex flex-col justify-center items-center py-5 rounded-md">
        <p className="text-black text-xl font-semibold">
          ANTHIRA & MAX | BLUE WATER - WADDUWA | 260 PAX
        </p>
        <div className="flex items-center justify-evenly w-10/12 mt-10">
          {steps.map((step, index) => (
            <>
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer"
              >
                <div
                  className={`flex items-center justify-center w-20 h-20 border-2 rounded-full transition-all duration-200 ${
                    activeStep === step.name
                      ? "border-8 border-green"
                      : "border-txtgray"
                  }`}
                  onClick={() => setActiveStep(step.name)}
                >
                  <span
                    className={`material-symbols-outlined text-4xl ${
                      activeStep === step.name
                        ? "text-green font-bold"
                        : "text-txtgray font-semibold"
                    }`}
                  >
                    {step.icon}
                  </span>
                </div>
                <div className="flex">
                  <p
                    className={`${
                      activeStep === step.name
                        ? "text-black font-bold"
                        : "text-txtgray font-semibold"
                    }`}
                  >
                    {step.name}
                  </p>
                  {activeStep === step.name && (
                    <span class="material-symbols-outlined text-green font-semibold">
                      check
                    </span>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
              <Divider className="border-txtgray w-1/6 border-2" />
            )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
