# Linea SDK Claim Issue POC

This poc demonstrates the issue with the linea sdk on the valid withdrawal transaction

```
jacobfirek@jacobs-mbp linea-sdk-claim-issue-POC % pnpm start

> linea-sdk-claim-issue-poc@1.0.0 start /Users/jacobfirek/etherfi/linea-sdk-claim-issue-POC
> node claim.js

Error: Error: could not coalesce error (error={ "code": -32603, "message": "input does not match format" }, payload={ "id": 2, "jsonrpc": "2.0", "method": "eth_getLogs", "params": [ { "address": "0xd19d4b5d358258f05d7b411e21a1460d11b0876f", "fromBlock": "0x0", "toBlock": "latest", "topics": [ "0x3c116827db9db3a30c1a25db8b0ee4bab9d2b223560209cfd839601b621c726d", "0x000000000000000000000000000000000000000000000000000000000122911e" ] } ] }, code=UNKNOWN_ERROR, version=6.14.1)
    at makeError (/Users/jacobfirek/etherfi/linea-sdk-claim-issue-POC/node_modules/@consensys/linea-sdk/node_modules/ethers/lib.commonjs/utils/errors.js:129:21)
    at JsonRpcProvider.getRpcError (/Users/jacobfirek/etherfi/linea-sdk-claim-issue-POC/node_modules/@consensys/linea-sdk/node_modules/ethers/lib.commonjs/providers/provider-jsonrpc.js:749:41)
    at /Users/jacobfirek/etherfi/linea-sdk-claim-issue-POC/node_modules/@consensys/linea-sdk/node_modules/ethers/lib.commonjs/providers/provider-jsonrpc.js:302:45
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'UNKNOWN_ERROR',
  error: { message: 'input does not match format', code: -32603 },
  payload: {
    method: 'eth_getLogs',
    params: [ [Object] ],
    id: 2,
    jsonrpc: '2.0'
  },
  shortMessage: 'could not coalesce error'
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
SIGNER_PRIVATE_KEY=your-private-key
```

You can get RPC URLs from providers like Infura, Alchemy, or QuickNode.

## Usage

To run the claim script:
```bash
npm start
```
