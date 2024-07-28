import { Route, Routes } from "react-router-dom";
import Home from "./components/common/Home";
import Overview from "./pages/Overview";
import Users from "./pages/Users";
import Admitted from "./pages/Admitted";
import Login from "./pages/Login";
import PatientDetails from "./pages/PatientDetails";
import PatientHistory from "./pages/PatientHistory";
import NewOrder from "./pages/NewOrder";
import Orders from "./pages/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />}>
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="newOrder" element={<NewOrder />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />

        
        <Route path="admitted" element={<Admitted />} />
        <Route path="patients" element={<Orders />} />
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route path="patientDetails/:id" element={<PatientDetails />} />
        <Route path="patientHistory/:id" element={<PatientHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
