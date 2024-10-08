import { Button } from "@mantine/core";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <Button onClick={() => signIn("Google", { redirectTo: "/dashboard" })}>
      Sign In
    </Button>
  );
}
