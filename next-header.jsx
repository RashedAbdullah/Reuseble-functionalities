"use client";

import { useState } from "react";
import { PopoverGroup } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobileMenu from "./mobile-menu";
import { navigations } from "./navigations";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`fixed w-full z-10`}>
      <MobileMenu open={open} setOpen={setOpen} />

      <header className={`relative bg-primaryHover text-textWhite shadow-lg`}>
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
            <div className="flex h-16 justify-between items-center">
              {!open && (
                <button
                  type="button"
                  className="relative rounded-md bg-textWhite p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              )}

              {/* User info */}
              <div className="ml-4 flex lg:ml-0">user info</div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-center">
                <div className="flex h-full space-x-8 gap-8">
                  {navigations.map((page) => (
                    <Link
                      key={page.name}
                      href={page.navlink}
                      className={`flex items-center text-lg font-medium hover:text-gray-500`}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
