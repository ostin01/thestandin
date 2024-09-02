import { _getMessages } from "@/api/lib";
import Link from "next/link";

export default async function ChatHeader({ messgParticipants }: any) {
  const messages = await _getMessages(messgParticipants._id);
  const lastMessage = messages.at(-1);

  return (
    <div>
      <Link href={`/messages/${messgParticipants._id}`} className="md:hidden">
        <div className="flex items-center gap-2 mt-4 pb-4 border-b">
          <div>
            <div className="bg-gray-600 rounded-full w-[50px] h-[50px]"></div>
          </div>
          <div>
            <h1 className="font-bold">{messgParticipants.firstName}</h1>
            <span className="text-sm opacity-70 truncate block w-[250px]">
              {lastMessage.message}
            </span>
          </div>
        </div>
      </Link>

      <Link href={`/home/${messgParticipants._id}`} className="hidden md:block">
        <div className="flex items-center gap-2 mt-4 pb-4 border-b">
          <div>
            <div className="bg-gray-600 rounded-full w-[50px] h-[50px]"></div>
          </div>
          <div>
            <h1 className="font-bold">{messgParticipants.firstName}</h1>
            <span className="text-sm opacity-70 truncate block w-[250px]">
              {lastMessage.message}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
