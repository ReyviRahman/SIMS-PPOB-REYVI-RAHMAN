import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Menu as MenuIcon, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="relative border-gray-300 border-b">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-20">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <MenuIcon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <X
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-between">
            <Link
              to={'/'}>
              <div className="flex shrink-0 items-center pe-2 sm:pe-0 gap-2">
                <img alt="Logo" src={logo} className="h-8 w-auto" />
                <h1 className="font-semibold">SIMS PPOB</h1>
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to={"/topup"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 px-3 py-2 text-sm font-medium"
                      : "px-3 py-2 text-sm font-medium hover:text-red-500"
                  }
                >
                  Top Up
                </NavLink>
                <NavLink
                  to={"/transaction"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 px-3 py-2 text-sm font-medium"
                      : "px-3 py-2 text-sm font-medium hover:text-red-500"
                  }
                >
                  Transaction
                </NavLink>
                <NavLink
                  to={"/akun"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 px-3 py-2 text-sm font-medium"
                      : "px-3 py-2 text-sm font-medium hover:text-red-500"
                  }
                >
                  Akun
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <NavLink
            to={"/topup"}
            className={({ isActive }) =>
              isActive
                ? "bg-red-500 text-white px-3 py-2 text-base font-medium rounded-md block"
                : "px-3 py-2 text-base font-medium hover:text-red-500 block"
            }
          >
            Top Up
          </NavLink>
          <NavLink
            to={"/transaction"}
            className={({ isActive }) =>
              isActive
                ? "bg-red-500 text-white px-3 py-2 text-base font-medium rounded-md block"
                : "px-3 py-2 text-base font-medium hover:text-red-500 block"
            }
          >
            Transaction
          </NavLink>
          <NavLink
            to={"/akun"}
            className={({ isActive }) =>
              isActive
                ? "bg-red-500 text-white px-3 py-2 text-base font-medium rounded-md block"
                : "px-3 py-2 text-base font-medium hover:text-red-500 block"
            }
          >
            Akun
          </NavLink>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
