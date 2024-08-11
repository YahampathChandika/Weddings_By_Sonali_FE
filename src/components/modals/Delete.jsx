import React from "react";
import { Modal, Divider } from "rsuite";
import Swal from "sweetalert2";

function FailModal({
  open,
  handleClose,
  headtxt,
  bodytxt,
  btntxt,
  id,
  deleteApi,
  refetchTable,
  otherRefetch,
}) {
  const handleDelete = async () => {
    try {
      const response = await deleteApi(id);
      console.log("Oops...", response);
      if (response.error) {
        console.log("error");
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload,
          icon: "error",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: response?.data?.payload,
        });
        await refetchTable();
        if (otherRefetch) {
          await otherRefetch();
        }
        handleClose();
      }
    } catch {
      console.log("Error During the Delete");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-1/4 !mt-36">
      <Modal.Body className="!h-auto">
        <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
          <p className="font-semibold text-2xl">{headtxt}</p>
          <div className="border-double border-4 text-red-600 border-slate-100 bg-slate-200 rounded-full h-12 w-12 items-center flex justify-center">
            <span className="material-symbols-outlined text-red">error</span>
          </div>
        </div>
        <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
        <div className="px-10">
          <p className="text-txtgray font-medium text-lg my-3">{bodytxt}</p>
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
            onClick={handleDelete}
            className="w-1/2 h-10 rounded-md bg-red text-white transition-transform duration-300 hover:scale-105"
          >
            {btntxt}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FailModal;
