import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import bs58 from "bs58";

async function createTokenAccount() {
  // Initialize connection
  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=YOUR_HELIUS_API_KEY"
  );

  // Initialize provider
  const provider = new ReferralProvider(connection);

  // Initialze wallet
  const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
  const secretKey = bs58.decode(PRIVATE_KEY);
  const wallet = Keypair.fromSecretKey(secretKey);

  const referralAccount = new PublicKey("YOUR_REFERRAL_KEY");

  const mintAccount = new PublicKey("YOUR_MINT_TOKEN_ADDRESS"); // USDC

  console.log("Creating referral token account...");

  try {
    const { referralTokenAccountPubKey } =
      await provider.initializeReferralTokenAccount({
        payerPubKey: wallet.publicKey,
        referralAccountPubKey: referralAccount,
        mint: mintAccount,
      });

    console.log(
      "Referral token account created:",
      referralTokenAccountPubKey.toBase58()
    );
  } catch (error) {
    console.error("Error creating token account:", error);
    throw error;
  }
}

// Execute the function
createTokenAccount()
  .then(() => {
    console.log("Token account creation completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Token account creation failed:", error);
    process.exit(1);
  });
