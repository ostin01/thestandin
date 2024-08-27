import { _getLoggedInUser, _getMessages } from "@/api/lib";

export default async function Page({ params }: { params: { id: string } }) {
  const messages = await _getMessages(params.id);

  return (
    <div className="w-fit mx-auto mt-4">
      {messages.map((message: any) => (
        <div
          key={message._id}
          className={`${
            message.senderId !== params.id
              ? "bg-black text-white"
              : "bg-gray-500 text-black"
          } mt-2`}
        >
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
}
