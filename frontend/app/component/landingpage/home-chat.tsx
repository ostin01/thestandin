import ChatHeader from "./chat-header";

export default function HomeChat() {
  return (
    <div>
      <ChatHeader user="user" text="hello" />
      <ChatHeader user="standin" text="Hi" />
      <ChatHeader
        user="user"
        text="I need a plus one to a Tennis game, are you up for it ?"
      />
      <ChatHeader user="standin" text="Yeah, I am" />
      <ChatHeader user="standin" text="Is there a theme ?" />
      <ChatHeader
        user="user"
        text="No, Just show up, we have all you need set and ready"
      />
      <ChatHeader user="standin" text="Alright, I charge $100 per hour" />
    </div>
  );
}
