import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../util/useUser";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //
  const [message, setMessage] = useState(null);

  const [user, setUser] = useUser();

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
    console.log(user);
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <div>
      <h1>SignIn</h1>
      {message ? <div>{message}</div> : null}
      {!isLoading && !user ? (
        <form onSubmit={onSubmit}>
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
          <input type="submit" value="LogIn" />
        </form>
      ) : (
        "loading..."
      )}
    </div>
  );
};
