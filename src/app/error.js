"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { IoRefresh } from "react-icons/io5";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application Crash Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-black text-white px-4 relative overflow-hidden">
      
      {/* গ্লো ইফেক্ট থেকে বেগুনী কালার বাদ দিয়ে পিওর রেড/রোজ মেডিকেল থিম দেওয়া হয়েছে */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-red-500/10 via-transparent to-rose-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center max-w-md gap-4">
        
        {/* এরর আইকন */}
        <div className="text-red-500 text-6xl animate-bounce">
          <BiSolidErrorCircle />
        </div>

        {/* হেডিং গ্রেডিয়েন্ট ফিক্সড */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 via-neutral-200 to-rose-400 bg-clip-text text-transparent">
          Something Went Wrong!
        </h2>
        
        {/* টেক্সট পরিবর্তন: Matrix বাদ দিয়ে CarePulse Clinical Server সেট করা হয়েছে */}
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed px-4">
          An unexpected error occurred while syncing with CarePulse Clinical Services. Don't worry, your medical records are safe. Let's try reloading this section.
        </p>

        {/* এরর মেসেজ বক্স */}
        {error?.message && (
          <div className="w-full p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-[11px] font-mono text-red-400/80 break-all max-h-24 overflow-y-auto">
            Code: {error.message}
          </div>
        )}

        {/* ট্রাই এগেইন বাটন */}
        <Button
          color="danger"
          variant="flat"
          radius="lg"
          size="md"
          className="mt-2 font-medium tracking-wide gap-2 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300"
          onClick={() => reset()} 
        >
          <IoRefresh className="text-lg" />
          Try Again
        </Button>
      </div>
    </div>
  );
}