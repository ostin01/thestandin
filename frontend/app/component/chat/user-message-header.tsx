"use client";
import { ArrowLeft, Call, Setting, Video } from "iconsax-react";
import { useRouter } from "next/navigation";

export default function UserMessageHeader({ person }: { person: any }) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center border-b pb-2 mb-4">
      <div className="flex items-center gap-2">
        <ArrowLeft onClick={router.back} />
        <div className="bg-gray-600 rounded-full w-[50px] h-[50px]" />
        <div>
          <h1>{person.firstName}</h1>
          <span>online</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Call />
        <Video />
        <Setting />
      </div>
    </div>
  );
}
