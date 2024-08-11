import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Checkbox, Divider, Modal } from "rsuite";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import {
  useAddItemMutation,
  useGetAllItemsQuery,
  useUpdateItemMutation,
} from "../../store/api/inventoryApi";

export default function AddInventoryModal({ open, handleClose, item }) {
  const schema = yup.object().shape({
    itemName: yup.string().required("Item name is required"),
    itemType: yup.string().required("Item type is required"),
    itemQuantity: yup.string().required("Item quantity is required"),
    itemCode: yup.string().required("Item code is required"),
    ...(item && {
      itemAvailable: yup.string().required("Items Available is required"),
      itemUsage: yup.string().required("Item Usage is required"),
      itemDamaged: yup.string().required("Items Damaged is required"),
      itemMissing: yup.string().required("Items Missing is required"),
    }),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addItem] = useAddItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const { refetch } = useGetAllItemsQuery();

  useEffect(() => {
    if (item) {
      setValue("itemName", item.itemName);
      setValue("itemType", item.type);
      setValue("itemQuantity", item.quantity);
      setValue("itemCode", item.code);
      setValue("itemAvailable", item.availableunits);
      setValue("itemUsage", item.usedTimes);
      setValue("itemDamaged", item.damaged);
      setValue("itemMissing", item.missing);
      setValue("wash", item.wash === "1");
    } else {
      reset();
    }
  }, [item, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        itemName: data.itemName,
        type: data.itemType,
        quantity: parseInt(data.itemQuantity),
        availableunits: item ? parseInt(data.itemAvailable) : null,
        usedTimes: item ? parseInt(data.itemUsage) : null,
        damaged: item ? parseInt(data.itemDamaged) : 0,
        missing: item ? parseInt(data.itemMissing) : null,
        code: data.itemCode,
        wash: data.wash ? "1" : "0",
      };

      if (item) {
        const updateRes = await updateItem({ id: item.id, ...updatedData });
        if (updateRes.data && !updateRes.data.error) {
          reset();
          handleClose();
          refetch();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Item Updated Successfully",
          });
        } else {
          console.log("Item updating failed", updateRes);
          Swal.fire({
            title: "Oops...",
            text:
              updateRes?.error?.data?.payload ||
              updateRes?.data?.payload ||
              "Item updating failed",
            icon: "error",
          });
        }
      } else {
        const addRes = await addItem(updatedData);

        if (addRes.data && !addRes.data.error) {
          reset();
          handleClose();
          refetch();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Item Added Successfully",
          });
        } else {
          console.log("Item adding failed", addRes);
          Swal.fire({
            title: "Oops...",
            text:
              addRes?.error?.data?.payload ||
              addRes?.data?.payload ||
              "Item adding failed",
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while adding the item.",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-2/5 !mt-36">
      <Modal.Body className="!h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
            <p className="font-semibold text-2xl ">
              {item ? "Update Item" : "Add Inventory Item"}
            </p>
            <div className="border-double border-4 text-txtblue border-slate-100 bg-white rounded-full h-12 w-12 items-center flex justify-center">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="flex justify-between w-full mt-7 px-10 space-x-10">
            <div className="flex-col w-1/2">
              <Controller
                name="itemName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Item Name"
                    variant="outlined"
                    className="!mb-7 w-full"
                    error={!!errors.itemName}
                    helperText={errors.itemName ? errors.itemName.message : ""}
                  />
                )}
              />
              <Controller
                name="itemQuantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Item Quantity"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.itemQuantity}
                    helperText={
                      errors.itemQuantity ? errors.itemQuantity.message : ""
                    }
                  />
                )}
              />
              {item && (
                <>
                  <Controller
                    name="itemAvailable"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Item Available"
                        variant="outlined"
                        className="!mb-5 w-full"
                        error={!!errors.itemAvailable}
                        helperText={
                          errors.itemAvailable
                            ? errors.itemAvailable.message
                            : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    name="itemUsage"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Item Usage"
                        variant="outlined"
                        className="!mb-5 w-full"
                        error={!!errors.itemUsage}
                        helperText={
                          errors.itemUsage ? errors.itemUsage.message : ""
                        }
                      />
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex-col w-1/2 text-right">
              <Controller
                name="itemType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Item Type"
                    variant="outlined"
                    className="!mb-7 w-full"
                    error={!!errors.itemType}
                    helperText={errors.itemType ? errors.itemType.message : ""}
                  />
                )}
              />
              <Controller
                name="itemCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Item Code"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.itemCode}
                    helperText={errors.itemCode ? errors.itemCode.message : ""}
                  />
                )}
              />
              {item && (
                <>
                  <Controller
                    name="itemDamaged"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Item Damaged"
                        variant="outlined"
                        className="!mb-5 w-full"
                        error={!!errors.itemDamaged}
                        helperText={
                          errors.itemDamaged ? errors.itemDamaged.message : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    name="itemMissing"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Item Missing"
                        variant="outlined"
                        className="!mb-5 w-full"
                        error={!!errors.itemMissing}
                        helperText={
                          errors.itemMissing ? errors.itemMissing.message : ""
                        }
                      />
                    )}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex w-full px-10">
            <Controller
              name="wash"
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(value, checked) => field.onChange(checked)}
                >
                  Requires Wash
                </Checkbox>
              )}
            />
          </div>
          <div className="w-full flex flex-row justify-end mt-7 mb-4 px-10">
            <button
              type="button"
              onClick={() => {
                reset();
                handleClose();
              }}
              className="w-1/2 h-10 rounded-md mr-4 border-solid border border-slate-300 hover:bg-slate-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              className="w-1/2 h-10 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
              type="submit"
            >
              {item ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
