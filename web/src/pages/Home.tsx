import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
interface HomeProps {
  data: any;
}

export const Home = (props: HomeProps) => {
  console.log("data in store is like ", props);
  return (
    <div className="page">
      <h1>i am home page</h1>
    </div>
  );
};

export default graphql(gql`
  query Me {
    me {
      email
    }
  }
`)(
  // @ts-ignore
  Home
);
