import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../util/useUser";

export const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useUser();
  const [message, setMessage] = useState(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        console.log(
          nameRef.current.value,
          emailRef.current.value,
          passwordRef.current.value
        );
        const response = await fetch("/api/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        });

        const data = await response.json();

        if (data.user) {
          setUser(data.user);
          setMessage(null);

          router.push("/dashboard");
        } else {
          setMessage(data.message);
          //console.log(data);
        }

        //console.log(data);
        // mutate({ user: response.user }, false);
        // console.log("YOUR ACCOUNT HAS BEEN CREATED");
        // router.replace("/");
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    //SignOut if active user (we assume user wants to create a new account if they are on this page)
    if (user) {
      setUser(null);
    }
  }, []); //Empty dependecny array. Only run this effect once after initial render.

  console.log(user);

  return (
    <div>
      <h1>Create Account</h1>

      {!isLoading && !user? (
        <>
          <form onSubmit={onSubmit} className={"box"}>
            <input
              ref={nameRef}
              autoComplete="name"
              placeholder="Your Name"
              required
            />

            <input
              ref={emailRef}
              autoComplete="email"
              placeholder="Email Address"
              required
              type="email"
            />
            <input
              ref={passwordRef}
              autoComplete="new-password"
              placeholder="Password"
              required
              type="password"
            />
            <input type="submit" value="Register" />
          </form>
          {message ? (
            <>
              <br />
              <div>{message}</div>
              <br />
              <Link href={"/login"}>
                <a href={"/login"}>Already have an account? Login here</a>
              </Link>
            </>
          ) : null}
        </>
      ) : (
        "...Loading"
      )}
    </div>
  );
};
