import { Input } from "@mantine/core";
import { SearchNormal } from "iconsax-react";
import styles from "@/app/styles/inputstyles.module.css";
import ChatHeader from "../chat/chat-header";
import { _getConversationParticipants } from "@/api/lib";

export default async function RightSection() {
  const conversation = await _getConversationParticipants();

  return (
    <div className="flex my-4 ml-4">
      <div className="bg-white w-[100px] py-4 rounded-lg flex flex-col items-center">
        <div className="bg-gray-600 rounded-full w-[50px] h-[50px]"></div>
      </div>
      <div className="mx-4">
        <Input
          placeholder="search"
          classNames={styles}
          leftSection={<SearchNormal />}
        />

        <div className="bg-white w-[300px] rounded-lg mt-6 p-4 shadow-sm">
          <h1 className="font-semibold text-[32px] mb-4">Chats</h1>

          {conversation.map((messgParticipants: any) => (
            <ChatHeader
              key={messgParticipants._id}
              messgParticipants={messgParticipants}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
