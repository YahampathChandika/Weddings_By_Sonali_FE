import React from "react";
import { Modal, Divider } from "rsuite";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LogoutModal({ open, handleClose, headtxt, bodytxt, btntxt }) {
  const navigate = useNavigate();

  const handlerLogout = async () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-1/4 !mt-36">
      <Modal.Body className="!h-auto">
        <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
          <p className="font-semibold text-2xl">Logout</p>
          <div className="border-double border-4 text-red-600 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
            <span className="material-symbols-outlined text-red">error</span>
          </div>
        </div>
        <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
        <div className="px-10">
          <p className="text-txtgray font-medium text-lg my-3">
            Are you sure you want to logout?
          </p>
        </div>
        <div className="w-full flex justify-between mt-6 mb-4 px-10">
          <button
            type="button"
            onClick={handleClose}
            className="w-1/2 h-10 rounded-md mr-4 border-solid border border-slate-300 transition-transform duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handlerLogout}
            className="w-1/2 h-10 rounded-md bg-red text-white transition-transform duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LogoutModal;
