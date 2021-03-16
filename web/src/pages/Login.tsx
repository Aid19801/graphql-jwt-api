import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { ME_QUERY } from "../graphql/queries";
import { setAccessToken } from "../accessToken";

interface Props {
  history: any;
}

export const Login: React.FC<Props> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const { data: fooData, loading: fooLoading, error: fooError } = useQuery(
    ME_QUERY
  );

  const handleLogin = async () => {
    try {
      const res = await login({ variables: { email, password } });
      setAccessToken(res.data.login.accessToken);
      document.cookie = `jid=${res.data.login.accessToken}`;

      console.log("me fooLoading: ", fooLoading);
      console.log("me fooData: ", fooData);
      console.log("me fooError: ", fooError);
      // history.push("/");
    } catch (err) {
      console.log("err", err);
      return err;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="page">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("form submitted");
          handleLogin(); // 1. login
          // 2. stash user{} in data.me
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
            value={password}
            type="password"
            hidden={false}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <p>{error?.message || ""}</p>
    </div>
  );
};
