import { _getLoggedInUser } from "@/api/lib";
import { User } from "@/app/schema/index";

export default async function Page() {
  const user: User = await _getLoggedInUser();
  const { firstName, lastName } = user;
  return (
    <div>
      <h1>{`${firstName} ${lastName}`}</h1>
    </div>
  );
}
