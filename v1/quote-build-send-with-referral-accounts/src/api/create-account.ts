import { PublicKey } from "@solana/web3.js";

interface CreateAccountParams {
  referralPubKey: string;
  mint: string;
  feePayer: string;
}

interface CreateAccountResponse {
  tx: string;
}

class ReferralClient {
  private readonly baseUrl: string = "https://referral.jup.ag/api/referral";

  async createAccount(
    params: CreateAccountParams
  ): Promise<CreateAccountResponse> {
    try {
      const url = new URL(
        `${this.baseUrl}/${params.referralPubKey}/token-accounts/create`
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mint: params.mint,
          feePayer: params.feePayer,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create referral account: ${response.statusText}`
        );
      }

      const data: CreateAccountResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating referral account:", error);
      throw error;
    }
  }
}

async function createReferralAccount() {
  const referralClient = new ReferralClient();
  const referralPubKey = "YOUR_REFERRAL_KEY"; // create a referral key from https://referral.jup.ag
  const feePayer = "YOUR_WALLET_PUBLIC_KEY"; // your wallet public key

  const mintAccount = new PublicKey(
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
  ); // JUP mint

  console.log("Mint account:", mintAccount.toBase58());

  const response = await referralClient.createAccount({
    referralPubKey,
    mint: mintAccount.toBase58(),
    feePayer,
  });

  console.log("Referral account created (Transaction):", response);
}

createReferralAccount();
