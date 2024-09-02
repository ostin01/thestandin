import {
  _getAllUsers,
  _getConversationParticipants,
  _getLoggedInUser,
} from "@/api/lib";

export default async function Page() {
  return (
    <div className="bg-white w-full mt-4 rounded-lg hidden md:flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center mb-4">
        Click on chat header on the left to view your messages
      </h1>
    </div>
  );
}
