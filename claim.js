import * as dotenv from "dotenv";
import { LineaSDK, OnChainMessageStatus } from "@consensys/linea-sdk";
import { BigNumber } from 'ethers';


dotenv.config();

const sdk = new LineaSDK({
    l1RpcUrl: "https://eth.llamarpc.com",
    l2RpcUrl:  "https://rpc.linea.build",
    l1SignerPrivateKey: process.env.SIGNER_PRIVATE_KEY,
    l2SignerPrivateKey: process.env.SIGNER_PRIVATE_KEY,
    network: "linea-mainnet",
    mode: "read-write",
  });

  const l1ClaimingService = sdk.getL1ClaimingService();

  /********************* Three approaches to claim on L1 *********************/

  async function approach1(messageHash) {
    let messageStatus = await l1ClaimingService.getMessageStatus(messageHash);
    console.log(messageStatus);
  }

  async function main() {
    // the message hash for https://lineascan.build/tx/0xaf0e3dd47f012c1af93cb8e882ecf64655014430a63dd19200db48ca03cfc8e0#eventlog
    const messageHash = "0xa78d81cd76a731d480533c801ad8f790331641051efb33c0e6bee5aab2e9ec43";
    try {
      await approach1(messageHash);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  main();

