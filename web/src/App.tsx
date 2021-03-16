import React, { useState } from "react";
import { Routes } from "./routes";

function App() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routes />;
}

export default App;
