"use client";

import { useState } from "react";
import { BiMenu } from "react-icons/bi";

import Avatar from "@/app/components/AvatarComponent";
import MenuItem from "@/app/components/navbar/MenuItemComponent";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export default function UserMenuComponent() {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BiMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Login" onClick={() => {}} />
            <MenuItem label="Sign Up" onClick={() => registerModal.onOpen()} />
          </div>
        </div>
      )}
    </div>
  );
}
