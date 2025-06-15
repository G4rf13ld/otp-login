"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const ButtonWrapperGitHub = () => {
  return <Button onClick={() => signIn("github")}>Sign with GitHub</Button>;
};

export default ButtonWrapperGitHub;
