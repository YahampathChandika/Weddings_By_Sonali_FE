import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../../assets/css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../modals/Logout";

function SidebarComp() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("overview");
  const [LogoutOpen, setLogoutOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutOpen = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
    setLogoutModalOpen(false);
  };

  const navigate = useNavigate();
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    navigate(menuItem);
  };

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        width="200px"
        collapsedWidth="70px"
        transitionDuration={500}
        className="sidebar"
      >
        <Menu>
          <p className="sidebar-title">Weddings <br/>By Sonali</p>

          {/* <div
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span
              style={{ fontWeight: "600" }}
              className="material-symbols-outlined sidebar-icon"
            >
              menu
            </span>
          </div> */}
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "overview" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  home
                </span>
              }
              onClick={() => handleMenuItemClick("overview")}
            >
              Overview
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "newOrder" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  add_box
                </span>
              }
              onClick={() => handleMenuItemClick("newOrder")}
            >
              New Order
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "patients" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  {/* personal_injury */}
                  patient_list
                </span>
              }
              onClick={() => handleMenuItemClick("patients")}
            >
              Waiting List
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "profile" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  inventory_2
                </span>
              }
              onClick={() => handleMenuItemClick("profile")}
            >
              Inventory
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "admitted" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  group
                </span>
              }
              onClick={() => handleMenuItemClick("admitted")}
            >
              Users
            </MenuItem>
          </div>
        </Menu>
        <div className="sidebar-logout" onClick={handleLogoutOpen}>
          <span className="material-symbols-outlined sidebar-logout-icon">
            logout
          </span>
          <p>Logout</p>
        </div>
      </Sidebar>
      <LogoutModal open={logoutModalOpen} handleClose={handleLogoutClose}/>
    </>
  );
}
export default SidebarComp;
