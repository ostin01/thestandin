"use client";
import { useSendMessage } from "@/api/hooks/message";
import { Input } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Send } from "iconsax-react";
import { z } from "zod";

export const messageValidaor = z.object({
  text: z.string(),
});
export default function MessageBox({ id }: { id: string }) {
  const messageInput = useForm({
    initialValues: {
      message: "",
    },
    validate: zodResolver(messageValidaor),
  });
  // const {sendmessage} = useSendMessage(id)

  const { mutate: sendText } = useSendMessage(id);

  function handleSubmitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendText(messageInput.values);
    messageInput.reset();
  }
  return (
    <form
      className="flex items-center justify-between gap-1 mt-4 ml-4 mr-2 absolute left-0 right-0 bottom-8"
      onSubmit={handleSubmitMessage}
    >
      <div className="flex-grow">
        <Input
          classNames={{
            input: "!rounded-xl !bg-slate-300 !h-[46px] !border-none",
          }}
          placeholder="Type your message..."
          {...messageInput.getInputProps("message")}
        />
      </div>
      <div className="bg-black p-2 rounded-full">
        <button type="submit">
          <Send color="white" size={16} />
        </button>
      </div>
    </form>
  );
}
