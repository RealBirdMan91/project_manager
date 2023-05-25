"use client";
import { Popover } from "@headlessui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {
  user: Session["user"];
};

function MobileMenu({ user }: Props) {
  return (
    <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
      <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4"></div>
      <div className="border-t border-gray-200 pb-3 pt-4">
        <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">
              {user.name}
            </div>
            <div className="text-sm font-medium text-gray-500">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
          <button
            onClick={() => signOut()}
            type="button"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </Popover.Panel>
  );
}

export default MobileMenu;
