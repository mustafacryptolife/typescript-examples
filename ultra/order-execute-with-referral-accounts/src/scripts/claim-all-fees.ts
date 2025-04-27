import { ReferralProvider } from "@jup-ag/referral-sdk";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmRawTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";

const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=YOUR_HELIUS_API_KEY",
  "confirmed"
);

// init wallet
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
const secretKey = bs58.decode(PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(secretKey);
console.log("Wallet public key:", wallet.publicKey.toBase58());

// init referral provider and project pubkey
const provider = new ReferralProvider(connection);
const referralAccountPubKey = new PublicKey("YOUR_REFERRAL_ACCOUNT");
console.log("Referral account public key:", referralAccountPubKey.toBase58());

async function claimAllFees() {
  console.log("Starting to claim all fees...");

  console.log("Fetching all claimable transactions...");
  const transactions = await provider.claimAllV2({
    payerPubKey: wallet.publicKey,
    referralAccountPubKey: referralAccountPubKey,
  });

  console.log(`Found ${transactions.length} transaction(s) to process`);

  // Send each claim transaction one by one
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    console.log(`Processing transaction ${i + 1} of ${transactions.length}...`);

    transaction.sign([wallet]);
    console.log("Transaction signed, sending to network...");

    const signature = await sendAndConfirmRawTransaction(
      connection,
      Buffer.from(transaction.serialize())
    );
    console.log(`Transaction ${i + 1} confirmed!`);
    console.log("Signature:", `https://solscan.io/tx/${signature}`);
  }

  console.log("All fees have been claimed successfully!");
}

claimAllFees();
