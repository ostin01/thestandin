import {
  _getConversationParticipants,
  _getLoggedInUser,
  _getMessages,
} from "@/api/lib";
import Message from "@/app/component/chat/message";
import MessageBox from "@/app/component/chat/message-box";
import UserMessageHeader from "@/app/component/chat/user-message-header";

export default async function Page({ params }: { params: { id: string } }) {
  const messages = await _getMessages(params.id);
  const conversation = await _getConversationParticipants();
  const person = conversation.find((p: any) => p._id === params.id);
  return (
    <div className="bg-white w-full m-4 rounded-lg p-4 relative h-screen">
      <UserMessageHeader person={person} />
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
