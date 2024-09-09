import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../../assets/css/Sidebar.css";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../modals/Logout";
import image from "../../assets/images/logo.png";

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
          <p className="sidebar-title">
            Weddings <br />
            By Sonali
          </p>
          {/* <div className="flex items-center justify-center pt-5">
            <img src={image} alt="Your Image" className="login-image w-36 " />
          </div> */}

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
              New Event
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "orders" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  event_note
                </span>
              }
              onClick={() => handleMenuItemClick("orders")}
            >
              Events
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "inventory" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  inventory_2
                </span>
              }
              onClick={() => handleMenuItemClick("inventory")}
            >
              Inventory
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "washList" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  local_laundry_service
                </span>
              }
              onClick={() => handleMenuItemClick("washList")}
            >
              Washing List
            </MenuItem>
          </div>
          <div className="sidebar-link">
            <MenuItem
              className={
                selectedMenuItem === "users" ? "selected-menu-item" : ""
              }
              icon={
                <span className="material-symbols-outlined sidebar-icon">
                  group
                </span>
              }
              onClick={() => handleMenuItemClick("users")}
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
      <LogoutModal open={logoutModalOpen} handleClose={handleLogoutClose} />
    </>
  );
}
export default SidebarComp;
