# V1 API - Quote, Build & Send (with Referral Accounts) Script

This script demonstrates how to get a quote for a swap, build the swap (with referral accounts), and then send the swap using the Jupiter V1 API. This is useful for when you want to earn fees from the swaps.

## How to set up referral keys

There are 3 ways you can set up referral keys:

1. Head to [Jupiter Referral Dashboard](https://referral.jup.ag/dashboard), select the tokens that you want to earn fees from, and create a referral account. From the referral account, you will need to obtain your `Referral Key`.
2. Create a new referral account programatically using the scripts in...
3. Create a new referral account via Jupiter Referral APIs using the scripts in...

## Prerequisites

- Node.js (v16 or higher)
- npm (v10 or higher)
- Solana Wallet Private Key
- Helius RPC API key
- Jupiter V1 API Key (optional) - get it [here](https://portal.jup.ag/)

## Usage

1. Clone the repository

```bash
git clone https://github.com/Jupiter-DevRel/typescript-examples.git
```

2. Navigate to the `examples/v1/quote-build-send-with-referral-accounts` directory

```bash
cd examples/v1/quote-build-send-with-referral-accounts
```

3. Install the dependencies

```bash
npm install
```

4. Run the script

```bash
npm run example
```
