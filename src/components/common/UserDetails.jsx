import React from "react";
import { useGetSignedUserQuery } from "../../store/api/userApi";
import profileImage from "../../assets/images/profile.png"

export default function UserDetails() {
  const { data: signedUser } = useGetSignedUserQuery();
  const user = signedUser?.payload;
  return (
    <div className="flex">
      <img
        // src={`http://localhost:4000/${user?.image}`}
        src={profileImage}
        alt="Profile"
        className="w-12 h-12 rounded-full mr-5"
      />
      <div>
        <p className="text-xl font-semibold">{user?.name}</p>
        <p className="text-txtgray">{user?.roles?.role}</p>
      </div>
    </div>
  );
}
