// import { Route, Routes } from "react-router-dom";
// import Home from "./components/common/Home";
// import Overview from "./pages/Overview";
// import Users from "./pages/Users";
// // import Admitted from "./pages/Admitted";
// import Login from "./pages/Login";
// // import PatientDetails from "./pages/PatientDetails";
// // import PatientHistory from "./pages/PatientHistory";
// import NewOrder from "./pages/NewOrder";
// import Orders from "./pages/Orders";
// import TrackOrder from "./pages/TrackOrder";
// import Inventory from "./pages/Inventory";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="home" element={<Home />}>
//         <Route index element={<Overview />} />
//         <Route path="overview" element={<Overview />} />
//         <Route path="newOrder" element={<NewOrder />} />
//         <Route path="orders" element={<Orders />} />
//         <Route path="orders/trackOrder/:orderId" element={<TrackOrder />} />
//         <Route path="users" element={<Users />} />
//         <Route path="inventory" element={<Inventory />} />
//         {/* <Route path="admitted" element={<Admitted />} /> */}
//         {/* <Route path="patients" element={<Orders />} /> */}
//         {/* <Route path="patientDetails/:id" element={<PatientDetails />} /> */}
//         {/* <Route path="patientHistory/:id" element={<PatientHistory />} /> */}
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./components/common/Home";
import Overview from "./pages/Overview";
import Users from "./pages/Users";
import Login from "./pages/Login";
import NewOrder from "./pages/NewOrder";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";
import Details from "./components/trackOrder/Details";
import Items from "./components/trackOrder/Items";
import Release from "./components/trackOrder/Release";
import Return from "./components/trackOrder/Return";
import Inventory from "./pages/Inventory";
import Washing from "./pages/Washing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />}>
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="newOrder" element={<NewOrder />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/trackOrder/:orderId" element={<TrackOrder />}>
          <Route path="details" element={<Details />} />
          <Route path="items" element={<Items />} />
          <Route path="release" element={<Release />} />
          <Route path="return" element={<Return />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="washList" element={<Washing />} />
      </Route>
    </Routes>
  );
}

export default App;
