import { _getMessages } from "@/api/lib";
import Link from "next/link";

export default async function ChatHeader({ messgParticipants }: any) {
  const messages = await _getMessages(messgParticipants._id);
  const lastMessage = messages.at(-1);

  return (
    <Link href={`/messages/${messgParticipants._id}`}>
      <div className="mx-auto w-fit flex md:items-center gap-2 mt-4 pb-4 border-b">
        <div className="">
          <div className="w-[50px] h-[50px] rounded-full bg-gray-500"></div>
        </div>

        <div>
          <h2>{messgParticipants.firstName}</h2>
          <span className="truncate block w-[250px]">
            {lastMessage.message}
          </span>
        </div>
      </div>
    </Link>
  );
}
