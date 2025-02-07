import { providerMap, signIn } from "@/auth";
import { Button, Container } from "@mantine/core";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import classes from "./signinpage.module.css";
export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className={classes.wrapper}>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${"/"}?error=${error.type}`);
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <Container size={"md"}>
            <h2>Select an Option to sign in</h2>
            <Button type="submit">
              <span> {provider.name}</span>
            </Button>
          </Container>
        </form>
      ))}
    </div>
  );
}
