import { _getLoggedInUser } from "@/api/lib";
import Navbar from "./component/landingpage/navbar";
import { redirect } from "next/navigation";
import { ApiResponse, User } from "@/app/schema/index";

export default async function Home() {
  const user: ApiResponse<User> = await _getLoggedInUser();
  if (user) {
    return redirect("/onboarding");
  }
  return (
    <div>
      <Navbar />
    </div>
  );
}
