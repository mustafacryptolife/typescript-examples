import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(
  "https://mainnet.helius-rpc.com/?api-key=YOUR_HELIUS_API_KEY",
  "confirmed"
);

// init referral provider and project pubkey
const provider = new ReferralProvider(connection);
const projectPubKey = new PublicKey(
  "DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc"
);

async function getReferralAccountViaName() {
  const mint = new PublicKey("So11111111111111111111111111111111111111112"); // the token mint you want to collect fees in

  const referralAccount = await provider.getReferralAccountWithNamePubKey({
    projectPubKey,
    name: "Jupiter-DevRel",
  });

  console.log(referralAccount.toBase58());
}

getReferralAccountViaName();
