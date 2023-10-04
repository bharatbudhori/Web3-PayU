const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;
const ABI = require("./abi.json");

app.use(cors());
app.use(express.json());


app.get("/getNameAndBalance", async (req, res) => {

  const { userAddress } = req.query;

  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: "0x13881",
    abi: ABI,
    contractAddress: process.env.CONTRACT_ADDRESS,
    functionName: "getNameAndBalance",
    params: {
      userAddress: userAddress,
    },
  });

  return res.status(200).json({});
});



Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
