"use client";
import { useEffect, useRef } from "react";

export default function Message({
  messages,
  params,
}: {
  messages: any;
  params: any;
}) {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>
      {messages.map((message: any, index: number) => (
        <div
          className={`relative mb-6 ${
            message.senderId !== params.id && "flex items-end flex-col"
          }`}
          key={message._id}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          <div
            className={`absolute -bottom-4 ${
              message.senderId !== params.id ? "right-0" : "left-0"
            } mt-[100px]`}
          >
            <div
              className={`w-[15px] h-[15px] rounded-lg ${
                message.senderId !== params.id ? "bg-black" : "bg-slate-400"
              }`}
            />
          </div>
          <p
            className={`max-w-[500px] w-fit text-white px-4 py-2 rounded-2xl ${
              message.senderId !== params.id
                ? "bg-black mr-2"
                : "bg-slate-400 ml-2"
            }`}
          >
            {message.message}
          </p>
        </div>
      ))}
    </div>
  );
}
