import { Image } from "@mantine/core";
import SignupForm from "../component/signup/signupForm";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-0">
      <div className="hidden md:block w-1/2 h-screen">
        <Image
          src="https://img.freepik.com/premium-photo/photo-group-people-friends-are-sitting-dancing-laughing-around-table-with-light_763111-205483.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-[40px] font-extrabold md:p-4">The Standin</h1>

        <div className="max-w-[500px] mx-auto mt-[40px] md:mt-[30px]">
          <h2 className="text-center text-3xl font-semibold mb-4">
            Create your account
          </h2>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}
