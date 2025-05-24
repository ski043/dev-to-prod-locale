import { prisma } from "@/lib/db";
import React from "react";

async function getPrivateData() {
  const data = await prisma.user.findMany();
  return data;
}

const ThisWillBeExampleTwo = async () => {
  const privateData = await getPrivateData();

  return (
    <div>
      <h1>Private Data</h1>
      <pre>{JSON.stringify(privateData, null, 2)}</pre>
    </div>
  );
};

export default ThisWillBeExampleTwo;
