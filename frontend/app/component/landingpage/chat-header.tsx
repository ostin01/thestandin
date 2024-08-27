interface ChatInterface {
  user: string;
  text: string;
}

export default function ChatHeader({ user, text }: ChatInterface) {
  const isUser = user === "user";
  const isStandin = user === "standin";
  const alignment = isUser ? "start" : "end";
  const bgColor = isUser ? "black" : "white";
  const textColor = isUser ? "white" : "black";

  return (
    <div className={`flex items-start justify-${alignment} gap-2 px-2 pt-4`}>
      {isUser && (
        <div>
          <div className="bg-slate-400 w-[30px] h-[30px] rounded-full"></div>
        </div>
      )}
      <div className={`text-sm flex flex-col items-${alignment}`}>
        <p className="font-bold">{user}</p>
        <p className={`bg-${bgColor} text-${textColor} p-2 rounded-lg`}>
          {text}
        </p>
      </div>
      {isStandin && (
        <div className="bg-slate-900 w-[30px] h-[30px] rounded-full"></div>
      )}
    </div>
  );
}
