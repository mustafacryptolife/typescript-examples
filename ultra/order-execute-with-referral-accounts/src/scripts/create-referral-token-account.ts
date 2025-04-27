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

// init referral provider
const provider = new ReferralProvider(connection);

async function initReferralTokenAccount() {
  const mint = new PublicKey("So11111111111111111111111111111111111111112"); // the token mint you want to collect fees in

  const transaction = await provider.initializeReferralTokenAccountV2({
    payerPubKey: wallet.publicKey,
    referralAccountPubKey: new PublicKey("YOUR_REFERRAL_ACCOUNT"),
    mint,
  });

  const referralTokenAccount = await connection.getAccountInfo(
    transaction.tokenAccount
  );

  if (!referralTokenAccount) {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction.tx,
      [wallet]
    );
    console.log("signature:", `https://solscan.io/tx/${signature}`);
    console.log(
      "created referralTokenAccount:",
      transaction.tokenAccount.toBase58()
    );
    console.log("mint:", mint.toBase58());
  } else {
    console.log(
      `referralTokenAccount ${transaction.tokenAccount.toBase58()} for mint ${mint.toBase58()} already exists`
    );
  }
}

initReferralTokenAccount();
