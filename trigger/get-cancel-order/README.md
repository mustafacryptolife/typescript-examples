# Trigger API (Limit Order) - Get & Cancel Order(s)

This scripts shows how to use the V1 Trigger API and get all trigger orders and either:

- Cancel the first order in the list (`getAndCancelOrder()`).
- Cancel all orders in a single transaction (`getAndCancelMultipleOrders()`).

## Prerequisites

- Node.js (v16 or higher)
- npm (v10 or higher)
- Solana Wallet Public Address
- Helius RPC API Key
- Solana Wallet Private Key

## Usage

1. Clone the repository

```bash
git clone https://github.com/Jupiter-DevRel/typescript-examples.git
```

2. Navigate to the `trigger/get-cancel-order` directory

```bash
cd trigger/get-cancel-order
```

3. Install the dependencies

```bash
npm install
```

4. Run the script

```bash
npm run example
```
