import Link from "next/link";
import { Send } from "iconsax-react";
import HomeChat from "./home-chat";

export default function LandingPage() {
  return (
    <div className="max-w-[900px] mx-auto mt-4 relative">
      <div className="flex items-center justify-between p-4 mb-11 sticky top-0 bg-white z-30">
        <h1 className="text-[20px] md:text-[40px] font-extrabold">
          The Standin
        </h1>
        <button className="bg-black text-white px-4 py-2 rounded-xl">
          Get the App
        </button>
      </div>

      <div className="flex justify-center items-center h-screen bg-gray-200 rounded-lg">
        <div className="w-80 h-[40rem] bg-black rounded-3xl shadow-lg relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full w-24 h-1"></div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full w-16 h-1"></div>

          <div className="relative w-full h-full bg-white rounded-3xl p-4">
            {/* Screen content */}
            <div className="h-full bg-gray-200 rounded-md">
              <HomeChat />
              <div className="flex items-center gap-1 mt-4 ml-4 mr-2">
                <div className="w-full rounded-xl bg-slate-300 h-[40px]"></div>
                <div className="bg-black p-2 rounded-full">
                  <Send color="white" size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full w-24 h-1"></div>
        </div>
      </div>
      <div className="flex items-center justify-center my-5">
        <Link
          href="/signup"
          className="bg-black text-white px-4
       py-2 rounded-lg"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
