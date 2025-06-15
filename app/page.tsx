import Heading from "@/app/components/Heading";
import FormEmail from "./components/FormEmail";
import { auth, signOut } from "@/auth";
import ButtonWrapperGitHub from "./components/ButtonWrapperGithub";
import { Button } from "@/components/ui/button";
import ButtonSignOutWrapper from "./components/ButtonSignOut";
import CreateUserByEmail from "./components/CreateUserByEmail";

export default async function page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-8 min-w-[400px] w-1/3">
      <Heading title={"OTP Login"} />
      <CreateUserByEmail />
      <hr />
      <FormEmail />
      <hr />
      <ButtonWrapperGitHub />
      <hr />
      <div className="flex flex-row w-full justify-between gap-2">
        {session ? JSON.stringify(session.user?.email) : "No user"}
        <ButtonSignOutWrapper />
      </div>
    </div>
  );
}
