import {
  IconArrowsSort,
  IconBulbFilled,
  IconChevronDown,
  IconFilterSearch,
  IconRosetteDiscountCheck,
  IconRosetteDiscountFilled,
  IconWallet,
} from "@tabler/icons-react";
import React from "react";
import Footer from "../Footer";

function CollectionsHeader() {
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 font-title">
        <div className="flex items-center md:gap-1 lg:gap-3 ">
          <div className="bg-white rounded-3xl text-xs md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1">
            <h1>All NFTs</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-xs md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1">
            <h1>Arts</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-xs md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1">
            <h1>Music</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-xs md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1">
            <h1>Sports</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-xs md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1">
            <h1>Photography</h1>
          </div>
          <div className="bg-transparent rounded-3xl text-xs md:text-base lg:text-lg md:px-3 px-2 cursor-pointer py-1">
            <h1>Trading Card</h1>
          </div>
        </div>
        <div className="flex items-center md:justify-between justify-center cursor-pointer bg-black text-white md:py-4 py-2 px-4 my-4 rounded-[52px] w-full md:w-[10%]">
          <div className="flex items-center gap-1">
            <IconFilterSearch />
            <h1 className="font-title text-lg">Filter</h1>
          </div>
          <IconChevronDown />
        </div>
      </div>
      <div className="bg-white w-full h-[0.5px] my-6"></div>
      <div className="flex items-center md:gap-1 lg:gap-3 flex-wrap">
        <div className="bg-white rounded-[52px] text-xs md:text-base lg:text-lg md:px-6 px-2 cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 ">
          <IconWallet />
          <h1>0.01 - 10 ICP</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 font-title cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 ">
          <IconBulbFilled />
          <h1>Auction</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 font-title cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 ">
          <IconRosetteDiscountCheck />
          <h1>Verified creator</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 font-title cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 ">
          <IconArrowsSort />
          <h1>Sort order</h1>
          <IconChevronDown />
        </div>
        <div className="bg-white rounded-[52px]  text-xs md:text-base lg:text-lg md:px-3 px-6 font-title cursor-pointer py-1 flex items-center gap-2 my-2 md:my-0 mx-1 ">
          <IconRosetteDiscountFilled />
          <h1>On sale</h1>
          <IconChevronDown />
        </div>
      </div>
    </section>
  );
}

function CollectionsPage() {
  return (
    <div className="bg-primary max-w-[96rem] mx-auto my-0 rounded-3xl px-4 pt-6">
      <h1 className="font-bold font-body md:text-3xl text-2xl mb-6">
        Featured NFTs
      </h1>
      <CollectionsHeader />
    </div>
  );
}

export default CollectionsPage;
