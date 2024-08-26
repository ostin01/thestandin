import {
  _getLoggedInUser,
  _getMessageParticipants,
  _getMessages,
} from "@/api/lib";
import { User } from "@/app/schema/index";

export default async function Page() {
  const user: User = await _getLoggedInUser();
  const participants = await _getMessageParticipants();
  const messages = await _getMessages();
  const { firstName, lastName } = user;

  return (
    <div>
      <h1>{`${firstName} ${lastName}`}</h1>
      {participants.map((person: any) => (
        <div key={person._id}>
          <h1>{person.firstName}</h1>
        </div>
      ))}

      {messages.map((message: any) => (
        <div key={message._id}>{message.message}</div>
      ))}
    </div>
  );
}
