import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=YOUR_HELIUS_API_KEY",
  "confirmed"
);

// init referral provider and project pubkey
const provider = new ReferralProvider(connection);
const referralAccountPubKey = new PublicKey("YOUR_REFERRAL_ACCOUNT");
const tokenProgramId = TOKEN_PROGRAM_ID; // if it is Token2022, use TOKEN_2022_PROGRAM_ID

async function getReferralTokenAccount() {
  const mint = new PublicKey("So11111111111111111111111111111111111111112"); // the token mint you want to collect fees in

  const referralTokenAccount = await provider.getReferralTokenAccountPubKeyV2({
    referralAccountPubKey,
    tokenProgramId,
    mint,
  });

  console.log(referralTokenAccount.toBase58());
}

getReferralTokenAccount();
