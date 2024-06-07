import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { navigations } from "./navigations";
import Link from "next/link";

const MobileMenu = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile menu */}
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden font-Siliguri"
          onClose={setOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-textBlack bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            {/* Transition from left site */}
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel
                onClick={() => setOpen(false)}
                className="relative flex max-w-xs flex-col overflow-y-auto bg-textBlack text-textWhite bg-opacity-80 pb-12 shadow-xl"
              >
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6 text-center">
                  {navigations?.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.navlink}
                        onClick={() => setOpen(false)}
                        className="-m-2 block p-2 font-medium text-textWhite w-60 hover:bg-teal-950 transition "
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileMenu;
