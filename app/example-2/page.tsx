import React from "react";
import { getPrivateData } from "../data/user/get-all-users";

const ThisWillBeExampleTwo = async () => {
  const privateData = await getPrivateData();

  return (
    <div className="px-5">
      <h1>Private Data</h1>
      <pre>{JSON.stringify(privateData, null, 2)}</pre>
    </div>
  );
};

export default ThisWillBeExampleTwo;
