import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../lib/useUser";

export const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { user, mutateUser } = useUser();

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
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        });

        const data = await response.json();

        console.log(data);

        if (data.user) {
          mutateUser(data, false); // asign to useUser (prevents need to login after creating account)
          setMessage(null);

          router.push("/dashboard");
        } else {
          setMessage(data.message);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [router, mutateUser]
  );

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]); //Empty dependecny array. Only run this effect once after initial render.

  return (
    <div className="box">
      <h1>Create Account</h1>

      {!isLoading && !user ? (
        <>
          <form onSubmit={onSubmit}>
            <label>Name</label>
            <input ref={nameRef} placeholder="Your Name" required />
            <label>Email</label>
            <input
              ref={emailRef}
              autoComplete="email"
              placeholder="Email Address"
              required
              type="email"
            />
            <label>Password</label>
            <input
              ref={passwordRef}
              autoComplete="new-password"
              placeholder="Password"
              required
              type="password"
            />
            <input className="button" type="submit" value="Register" />
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
        "...Creating Account"
      )}
    </div>
  );
};
