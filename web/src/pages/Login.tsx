import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { setAccessToken } from "../accessToken";

interface Props {}

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const res = await login({ variables: { email, password } });
      setAccessToken(res.data.login.accessToken);
    } catch (error) {
      console.log("login error", error);
      return error;
    }
    return;
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");
        handleLogin();
        // 1. login
        //@ts-ignore
        // const res = await login({ variables: { email, password } });
        // const {
        //   data: {
        //     login: { accessToken },
        //   },
        //   error,
        // } = await login({ variables: { email, password } });
        // console.log("res is ", res);
        // 2. stash user{} in data.me
        // 3. setAccessToken
        // setAccessToken(accessToken);
        // 4. Route to homepage
      }}
    >
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
