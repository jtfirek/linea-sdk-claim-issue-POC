import * as dotenv from "dotenv";
import { LineaSDK, OnChainMessageStatus } from "@consensys/linea-sdk";
import { BigNumber } from 'ethers';


dotenv.config();

const sdk = new LineaSDK({
    l1RpcUrl: process.env.L1_RPC_URL ?? "",
    l2RpcUrl: process.env.L2_RPC_URL ?? "",
    l1SignerPrivateKey: process.env.L1_SIGNER_PRIVATE_KEY ?? "",
    l2SignerPrivateKey: process.env.L2_SIGNER_PRIVATE_KEY ?? "",
    network: "linea-mainnet",
    mode: "read-write",
  });

  const l1Contract = sdk.getL1Contract();
  const l2Contract = sdk.getL2Contract();
  const l1ClaimingService = sdk.getL1ClaimingService();

  /********************* Three approaches to claim on L1 *********************/

  async function approach1(messageHash) {
    const message = await l2Contract.getMessageByMessageHash(messageHash);
    const messageStatus = await l1ClaimingService.getMessageStatus(messageHash);

    if (messageStatus == OnChainMessageStatus.CLAIMABLE) {
      const estimatedGas = await l1ClaimingService.estimateClaimMessageGas(message); // Optional
      await l1ClaimingService.claimMessage(message);
    }
  }

  async function approach2(messageHash) {
    const message = await l2Contract.getMessageByMessageHash(messageHash);
    const messageStatus = await l1ClaimingService.getMessageStatus(messageHash);

    if (messageStatus == OnChainMessageStatus.CLAIMABLE) {
      const isProofNeeded = await l1ClaimingService.isClaimingNeedingProof(messageHash);
      if (!isProofNeeded) {
        const estimatedGas = await l1Contract.estimateClaimGas(message); // Optional
        await l1Contract.claim(message);
      } else {
        const proofInfo = await l1ClaimingService.getMessageProof(messageHash);
        const estimatedGas = await l1Contract.estimateClaimWithProofGas({
          ...message,
          proof: proofInfo.proof,
          leafIndex: proofInfo.leafIndex,
          merkleRoot: proofInfo.root,
        }); // Optional

        await l1Contract.claimWithProof({
          ...message,
          proof: proofInfo.proof,
          leafIndex: proofInfo.leafIndex,
          merkleRoot: proofInfo.root,
        });
      }
    }
  }

  async function main() {
    const messageHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
    try {
      await approach1(messageHash);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  main();

