import { Button } from "@mantine/core";
import { signIn } from "next-auth/react";

export function SignIn({ returnPath }: { returnPath: string }) {
  return (
    <Button onClick={() => signIn("Google", { redirectTo: returnPath })}>
      Sign In
    </Button>
  );
}
