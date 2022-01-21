import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../lib/useUser";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //
  const [message, setMessage] = useState(null);

  const { user, mutateUser } = useUser(); //[user, setUser] = useUser();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        });

        const data = await response.json();

        console.log(data);

        if (data.user) {
          // setUser(data.user);
          mutateUser(data, false);
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
  }, [user, router]);

  return (
    <div className="box">
      <h1>SignIn</h1>
      {message ? <div>{message}</div> : null}
      {!isLoading && !user ? (
        <form onSubmit={onSubmit}>
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
          <input className="button" type="submit" value="LogIn" />
          <Link href="/signup">
            <a
              style={{
                gridColumn: " 1 / 3",
                textAlign: "center",
                marginTop: 10,
              }}
              // href="/signup"
            >
              Not registered? Signup Here.
            </a>
          </Link>
        </form>
      ) : (
        "Authenticating..."
      )}
    </div>
  );
};
