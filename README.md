# Linea SDK Claim Issue POC

This repository demonstrates how to use the Linea SDK to claim messages between L1 and L2.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
L1_RPC_URL=your-l1-rpc-url
L2_RPC_URL=your-l2-rpc-url
L1_SIGNER_PRIVATE_KEY=your-l1-private-key
L2_SIGNER_PRIVATE_KEY=your-l2-private-key
```

You can get RPC URLs from providers like Infura, Alchemy, or QuickNode.

## Usage

To run the claim script:
```bash
npm start
```

## Important Notes

- Make sure you have sufficient funds in both L1 and L2 accounts
- The private keys should be for accounts that have the necessary permissions to claim messages
- Never commit your `.env` file or expose your private keys
