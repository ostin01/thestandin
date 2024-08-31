import {
  _getConversationParticipants,
  _getLoggedInUser,
  _getMessages,
} from "@/api/lib";
import Message from "@/app/component/chat/message";
import MessageBox from "@/app/component/chat/message-box";
import { Call, Setting, Video } from "iconsax-react";

export default async function Page({ params }: { params: { id: string } }) {
  const messages = await _getMessages(params.id);
  const conversation = await _getConversationParticipants();
  const person = conversation.find((p: any) => p._id === params.id);

  return (
    <div className="bg-white w-full m-4 rounded-lg p-4 relative">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
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
      <div
        className="overflow-y-scroll"
        style={{ height: `calc(100% - 110px)` }}
      >
        <Message messages={messages} params={params} />
      </div>
      <MessageBox id={params.id} />
    </div>
  );
}
