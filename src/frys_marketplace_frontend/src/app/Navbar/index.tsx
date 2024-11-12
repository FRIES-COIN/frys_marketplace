import { FaRocket, FaUser } from "react-icons/fa";
import avatar from "../../../public/avatar1.svg";
import Logo from "../Footer/Logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../..//components/ui/drawer";
import { Button } from "../../../components/ui/button";
import { IconMenu2, IconX } from "@tabler/icons-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full md:mt-2 mx-2 lg:px-6 flex items-center justify-between font-body bg-gradient-to-r from-[#0C0C0C] to-transparent z-0">
      <div className="w-full flex items-center justify-between py-2 font-body bg-transparent z-0">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="../../logo.png"
              alt="Logo"
              width={56}
              height={56}
              className=""
              onClick={() => setIsOpen(!isOpen)}
            />
            <Logo />
          </Link>
        </div>

        <div className="md:flex items-center space-x-8 hidden">
          <Link
            to="/collections"
            className="text-white font-semibold font-body text-[20.96px] leading-[24.84px] w-[131px] h-[25px] hover:text-[#ffa503] hover:text-[22.96px] transition-all duration-500"
          >
            COLLECTION
          </Link>
          <Link
            to="/mint"
            className="text-white font-semibold font-body text-[20.96px] leading-[24.84px] w-[131px] h-[25px] hover:text-[#ffa503] hover:text-[22.96px] transition-all duration-500"
          >
            MINT
          </Link>
        </div>
        <div className="md:flex hidden items-center space-x-4 mx-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <Link to="/profile">
              <img
                src={avatar}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>
          <Link to="/profile">
            <button className="bg-transparent border-[2.66px] border-[#ffa503] font-body rounded-[17.47px] text-white px-4 py-2 flex items-center hover:bg-[#ffa503] hover:text-black transition-all duration-500">
              <span className="mr-2">COOK</span>
              <FaRocket />
            </button>
          </Link>
        </div>
      </div>
      <div className="px-2 bg-black">
        <IconMenu2
          size={44}
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`backdrop-blur-lg h-screen w-full md:hidden flex flex-col fixed top-0 left-0 z-50 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <section className="flex justify-between items-center p-4">
          <div className="flex items-center ">
            <Link to="/" className="flex items-center">
              <img
                src="../../logo.png"
                alt="Logo"
                width={56}
                height={56}
                className=""
                onClick={() => setIsOpen(!isOpen)}
              />
              <Logo />
            </Link>
          </div>
          <IconX
            size={44}
            className="text-primary"
            onClick={() => setIsOpen(!isOpen)}
          />
        </section>
        <div className="flex flex-col items-center justify-center mt-28 gap-12 absolute top-1/4 right-[33%]">
          <Link
            to="/collections"
            className="text-white font-semibold font-body text-3xl leading-[24.84px] w-[131px] h-[25px] hover:text-[#ffa503] hover:text-[22.96px] transition-all duration-500"
          >
            COLLECTION
          </Link>
          <Link
            to="/mint"
            className="text-white font-semibold font-body text-3xl leading-[24.84px] w-[131px] h-[25px] hover:text-[#ffa503] hover:text-[22.96px] transition-all duration-500"
          >
            MINT
          </Link>
          <div className="flex items-center space-x-4 mx-2">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <Link to="/profile">
                <img
                  src={avatar}
                  alt="Profile"
                  width={46}
                  height={46}
                  className="rounded-full"
                />
              </Link>
            </div>
            {/* Desktop Cook button */}
            <Link to="/profile">
              <button className="bg-transparent border-[2.66px] border-[#ffa503] font-body rounded-[17.47px] text-white px-4 py-2 flex items-center hover:bg-[#ffa503] hover:text-black transition-all duration-500">
                <span className="mr-2">COOK</span>
                <FaRocket />
              </button>
            </Link>

            {/* Mobile Cook button */}
            <Link to="/profile">
              <button className="bg-transparent border-[2.66px] border-[#ffa503] font-body rounded-[17.47px] text-white px-4 py-2 flex items-center hover:bg-[#ffa503] hover:text-black transition-all duration-500">
                <span className="mr-2 text-2xl">COOK</span>
                <FaRocket />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
