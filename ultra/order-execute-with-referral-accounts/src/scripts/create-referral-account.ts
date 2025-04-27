import { ReferralProvider } from "@jup-ag/referral-sdk";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
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

// init referral provider and project pubkey
const provider = new ReferralProvider(connection);
const projectPubKey = new PublicKey(
  "DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc"
);

async function initReferralAccount() {
  // Initialize referral account
  const transaction = await provider.initializeReferralAccountWithName({
    payerPubKey: wallet.publicKey,
    partnerPubKey: wallet.publicKey,
    projectPubKey: projectPubKey,
    name: "Jupiter-DevRel",
  });

  const referralAccount = await connection.getAccountInfo(
    transaction.referralAccountPubKey
  );

  if (!referralAccount) {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction.tx,
      [wallet]
    );
    console.log("signature:", `https://solscan.io/tx/${signature}`);
    console.log(
      "created referralAccount:",
      transaction.referralAccountPubKey.toBase58()
    );
  } else {
    console.log(
      `referralAccount ${transaction.referralAccountPubKey.toBase58()} already exists`
    );
  }
}

initReferralAccount();
