import { FaRocket, FaUser } from "react-icons/fa";
import avatar from "../../../public/avatar1.svg";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-[#0C0C0C] w-full flex items-center justify-between py-2 font-body">
      <div className="flex items-center">
        <img
          src="../../logo.png"
          alt="Logo"
          width={56}
          height={56}
          className=""
          onClick={() => setIsOpen(!isOpen)}
        />
        <span className="text-[#ffa503] font-body text-[24.58px] leading-[56px] font-bold">
          FRYS
        </span>
      </div>

      <div className="md:flex items-center space-x-8 hidden">
        <a
          href="#"
          className="text-white font-semibold font-body text-[20.96px] leading-[24.84px] w-[131px] h-[25px] hover:text-[#ffa503] hover:text-[22.96px] transition-all duration-500"
        >
          COLLECTION
        </a>
        <a
          href="#"
          className="text-white font-semibold font-body text-[20.96px] leading-[24.84px] w-[131px] h-[25px] hover:text-[#ffa503] hover:text-[22.96px] transition-all duration-500"
        >
          MINT
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <img
            src={avatar}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <button className="bg-transparent border-[2.66px] border-[#ffa503] font-body rounded-[17.47px] text-white px-4 py-2 flex items-center hover:bg-[#ffa503] hover:text-black transition-all duration-500">
          <span className="mr-2">COOK</span>
          <FaRocket />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
