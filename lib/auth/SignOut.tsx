import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";

export function SignOut() {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
