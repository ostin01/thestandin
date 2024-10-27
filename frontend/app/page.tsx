import { _getLoggedInUser } from "@/api/lib";
import { redirect } from "next/navigation";
import { ApiResponse, User } from "@/app/schema/index";
import LandingPage from "./component/landingpage/landing-page";
import SocketIoConnection from "./component/common/socket";

export default async function Home() {
  const user: ApiResponse<User> = await _getLoggedInUser();
  if (user) {
    return redirect("/home");
  }
  return (
    <div>
      <LandingPage />
      <SocketIoConnection />;
    </div>
  );
}
