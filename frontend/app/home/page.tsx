import {
  _getAllUsers,
  _getConversationParticipants,
  _getLoggedInUser,
} from "@/api/lib";

export default async function Page() {
  const conversation = await _getConversationParticipants();
  return (
    <div className="bg-white w-full mt-4 rounded-lg flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center mb-4">
        Click on chat header on the right to view your messages
      </h1>
    </div>
  );
}
