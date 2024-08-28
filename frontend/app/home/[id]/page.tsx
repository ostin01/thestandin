import {
  _getConversationParticipants,
  _getLoggedInUser,
  _getMessages,
} from "@/api/lib";
import MessageBox from "@/app/component/chat/message-box";
import { Call, Setting, Video } from "iconsax-react";

export default async function Page({ params }: { params: { id: string } }) {
  const messages = await _getMessages(params.id);
  const conversation = await _getConversationParticipants();
  const person = conversation.find((p: any) => p._id === params.id);

  return (
    <div className="bg-white w-full m-4 rounded-lg p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <div>
            <div className="bg-gray-600 rounded-full w-[50px] h-[50px]"></div>
          </div>
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
      <div>
        {messages.map((message: any) =>
          message.senderId !== params.id ? (
            <div
              className="relative flex items-end flex-col mb-6"
              key={message._id}
            >
              <div className="absolute -bottom-4 right-0 mt-[100px]">
                <div className="w-[15px] h-[15px] rounded-lg bg-black"></div>
              </div>
              <p className="max-w-[500px] w-fit text-white px-4 py-2 bg-black rounded-2xl mr-2">
                {message.message}
              </p>
            </div>
          ) : (
            <div className="relative mb-6" key={message._id}>
              <div className="absolute -bottom-4 left-0 mt-[100px]">
                <div className="w-[15px] h-[15px] rounded-lg bg-slate-400"></div>
              </div>
              <p className="max-w-[500px] w-fit text-white px-4 py-2 bg-slate-400 rounded-2xl ml-2">
                {message.message}
              </p>
            </div>
          )
        )}
      </div>
      <MessageBox />
    </div>
  );
}
