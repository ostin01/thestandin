import SigninForm from "@/app/component/signup/signinForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-0 h-screen">
      <div className="hidden md:block w-1/2">
        <img
          src="https://img.freepik.com/premium-photo/photo-group-people-friends-are-sitting-dancing-laughing-around-table-with-light_763111-205483.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-1/2 h-full md:h-auto">
        <h1 className="text-[30px] font-extrabold md:p-4">The Standin</h1>
        <div className="max-w-[500px] flex flex-col justify-center mx-auto h-full md:h-auto md:block md:mt-[30px]">
          <h2 className="text-center text-[20px] font-semibold mb-4">
            Sign in to your account
          </h2>
          <h2 className="text-center">
            Already have an account ?{" "}
            <Link href="/signup" className="text-blue-600">
              Sign up
            </Link>
          </h2>
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
