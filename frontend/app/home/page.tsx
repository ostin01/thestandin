import {
  _getAllUsers,
  _getConversationParticipants,
  _getLoggedInUser,
} from "@/api/lib";
import ChatHeader from "../component/chat/chat-header";

export default async function Page() {
  const mssgP = await _getLoggedInUser();
  // console.log(mssgP);
  const conversation = await _getConversationParticipants();
  return (
    <div>
      {conversation.map((messgParticipants: any) => (
        <ChatHeader
          key={messgParticipants._id}
          messgParticipants={messgParticipants}
        />
      ))}
    </div>
  );
}
