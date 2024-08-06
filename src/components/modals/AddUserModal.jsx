import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider, Modal } from "rsuite";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import {
  useAddUserMutation,
  useGetAllUsersQuery,
} from "../../store/api/userApi";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  address: yup.string().required("Address is required"),
  contactNo: yup.string().required("Contact No is required"),
  roleId: yup.string().required("Role is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export default function AddUserModal({ open, handleClose }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const [addUser] = useAddUserMutation();
  const { refetch } = useGetAllUsersQuery();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      const response = await addUser(data);

      if (response.data && !response.data.error) {
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
          title: "User Registered Successfully",
        });
      } else {
        console.log("User adding failed", response);
        Swal.fire({
          title: "Oops...",
          text:
            response?.error?.data?.payload ||
            response?.data?.payload ||
            "user registration failed",
          icon: "error",
        });
      }
    } catch (error) {
      console.log("User Reg Error", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className="!w-2/5 !mt-36">
      <Modal.Body className="!h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center !h-16 mt-4 rounded-t-md px-10">
            <p className="font-semibold text-2xl ">User Registration</p>
            <div className="border-double border-4 text-txtblue border-slate-100 bg-white rounded-full h-12 w-12 items-center flex justify-center">
              <span className="material-symbols-outlined">person_add</span>
            </div>
          </div>
          <Divider className="text-txtgray !mt-2 w-11/12 !mx-auto" />
          <div className="px-10">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic name"
                  label="Name"
                  variant="outlined"
                  className=" w-full"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
          </div>
          <div className="flex justify-between w-full mt-5 px-10 space-x-10">
            <div className="flex-col w-1/2">
              <Controller
                name="contactNo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Contact No"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.contactNo}
                    helperText={
                      errors.contactNo ? errors.contactNo.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.address}
                    helperText={errors.address ? errors.address.message : ""}
                  />
                )}
              />
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ""}
                  />
                )}
              />
            </div>
            <div className="flex-col w-1/2 text-right">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="!mb-4 w-full"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                )}
              />
              <Controller
                name="roleId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    className="w-full !mb-5 !text-left"
                    error={!!errors.roleId}
                  >
                    <InputLabel id="demo-simple-select-label" className="">
                      Role
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>User</MenuItem>
                    </Select>

                    {errors.roleId && (
                      <FormHelperText>{errors.roleId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    variant="outlined"
                    className="!mb-5 w-full"
                    error={!!errors.roleId}
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      className=""
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <span className="material-symbols-outlined">
                                visibility_off
                              </span>
                            ) : (
                              <span className="material-symbols-outlined">
                                visibility
                              </span>
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={!!errors.password}
                    />
                    {errors.password && (
                      <FormHelperText>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-row justify-end mt-5 mb-4 px-10">
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
              type="submit"
              className="w-1/2 h-10 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300"
            >
              Create
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
