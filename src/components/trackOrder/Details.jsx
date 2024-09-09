// import React from "react";
// import { useParams } from "react-router-dom";
// import { Divider } from "rsuite";
// import { useGetOrderByIdQuery } from "../../store/api/orderApi";

// export default function Details() {
//   const { orderId } = useParams();
//   const { data } = useGetOrderByIdQuery(orderId);

//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center">
//         <p className="font-bold text-black text-2xl">Event Details</p>
//         <span class="material-symbols-outlined rounded-full h-12 w-12 flex justify-center items-center cursor-pointer text-black bg-bggray">
//           edit
//         </span>
//       </div>
//       <Divider className="text-txtgray w-full !my-10" />
//       <div className="flex w-full justify-between">
//         <div className="flex-col w-4/12">
//           <p className="text-txtgray text-xl font-semibold">Customer</p>
//         </div>
//         <div className="flex-col w-4/12">
//           <p className="text-txtgray font-medium text-lg">Name</p>
//           <p className="text-black font-medium text-xl mt-2">
//             {data?.payload?.customer?.name}
//           </p>
//           <p className="text-txtgray font-medium text-lg mt-5">Address</p>
//           <p className="text-black font-medium text-xl mt-2">
//             {data?.payload?.customer?.address}
//           </p>
//         </div>
//         <div className="flex-col w-4/12">
//           <p className="text-txtgray font-medium text-lg">NIC</p>
//           <p className="text-black font-medium text-xl mt-2">
//             {data?.payload?.customer?.nic}
//           </p>
//           <p className="text-txtgray font-medium text-lg mt-5">Contact No</p>
//           <p className="text-black font-medium text-xl mt-2">
//             {data?.payload?.customer?.contactNo}
//           </p>
//         </div>
//       </div>
//       <Divider className="text-txtgray w-full !my-10" />
//       <div className="flex w-full justify-between">
//         <div className="flex-col w-4/12">
//           <p className="text-txtgray text-xl font-semibold">Event</p>
//         </div>
//         <div className="flex-col w-4/12">
//           <p className="text-txtgray font-medium text-lg">Event Name</p>
//           <p className="text-black font-medium text-xl mt-2">{data?.payload?.eventName}</p>
//           <p className="text-txtgray font-medium text-lg mt-5">Event Time</p>
//           <p className="text-black font-medium text-xl mt-2">{data?.payload?.eventTime}</p>
//           <p className="text-txtgray font-medium text-lg mt-5">Notes</p>
//           <p className="text-black font-medium text-xl mt-2">No notes</p>
//         </div>
//         <div className="flex-col w-3/12">
//           <p className="text-txtgray font-medium text-lg">Venue</p>
//           <p className="text-black font-medium text-xl mt-2">{data?.payload?.venue}</p>
//           <p className="text-txtgray font-medium text-lg mt-5">Return Date</p>
//           <p className="text-black font-medium text-xl mt-2">{data?.payload?.returnDate}</p>
//         </div>
//         <div className="flex-col w-1/12">
//           <p className="text-txtgray font-medium text-lg">Event Date</p>
//           <p className="text-black font-medium text-xl mt-2">{data?.payload?.eventDate}</p>
//           <p className="text-txtgray font-medium text-lg mt-5">Pax</p>
//           <p className="text-black font-medium text-xl mt-2">{data?.payload?.pax}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useParams } from "react-router-dom";
import { Divider } from "rsuite";
import { useGetOrderByIdQuery } from "../../store/api/orderApi";

export default function Details() {
  const { orderId } = useParams();
  const { data } = useGetOrderByIdQuery(orderId);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p className="font-bold text-black text-2xl">Event Details</p>
        <span className="material-symbols-outlined rounded-full h-12 w-12 flex justify-center items-center cursor-pointer text-black bg-bggray">
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
          <p className="text-black font-medium text-xl mt-2">
            {data?.payload?.customer?.name}
          </p>
          <p className="text-txtgray font-medium text-lg mt-5">Address</p>
          <p className="text-black font-medium text-xl mt-2">
            {data?.payload?.customer?.address}
          </p>
        </div>
        <div className="flex-col w-4/12">
          <p className="text-txtgray font-medium text-lg">NIC</p>
          <p className="text-black font-medium text-xl mt-2">
            {data?.payload?.customer?.nic}
          </p>
          <p className="text-txtgray font-medium text-lg mt-5">Contact No</p>
          <p className="text-black font-medium text-xl mt-2">
            {data?.payload?.customer?.contactNo}
          </p>
        </div>
      </div>
      <Divider className="text-txtgray w-full !my-10" />
      <div className="flex w-full justify-between">
        <div className="flex-col w-4/12">
          <p className="text-txtgray text-xl font-semibold">Event</p>
        </div>
        <div className="flex-col w-4/12">
          <p className="text-txtgray font-medium text-lg">Event Name</p>
          <p className="text-black font-medium text-xl mt-2">{data?.payload?.eventName}</p>
          <p className="text-txtgray font-medium text-lg mt-5">Event Time</p>
          <p className="text-black font-medium text-xl mt-2">{data?.payload?.eventTime}</p>
          <p className="text-txtgray font-medium text-lg mt-5">Notes</p>
          <p className="text-black font-medium text-xl mt-2">No notes</p>
        </div>
        <div className="flex-col w-3/12">
          <p className="text-txtgray font-medium text-lg">Venue</p>
          <p className="text-black font-medium text-xl mt-2">{data?.payload?.venue}</p>
          <p className="text-txtgray font-medium text-lg mt-5">Return Date</p>
          <p className="text-black font-medium text-xl mt-2">{data?.payload?.returnDate}</p>
        </div>
        <div className="flex-col w-1/12">
          <p className="text-txtgray font-medium text-lg">Event Date</p>
          <p className="text-black font-medium text-xl mt-2">{data?.payload?.eventDate}</p>
          <p className="text-txtgray font-medium text-lg mt-5">Pax</p>
          <p className="text-black font-medium text-xl mt-2">{data?.payload?.pax}</p>
        </div>
      </div>
    </div>
  );
}
