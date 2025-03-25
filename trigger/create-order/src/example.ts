import { PublicKey, Connection } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");

interface OrderParams {
    inputMint: string;
    outputMint: string;
    maker: string;
    payer: string;
    makingAmount: number;
    takingAmount: number;
    expiredAt?: number;
    feeBps?: number;
    referral?: string;
    computeUnitPrice?: "auto" | number;
    inputTokenProgram?: string;
    outputTokenProgram?: string;
    wrapAndUnwrapSol?: boolean;
}

interface CreateOrderResponse {
    transaction: string;
    orderId: string;
    [key: string]: any;
}

class TriggerApiClient {
    private readonly baseUrl: string = "https://api.jup.ag/trigger/v1";

    async createOrder(params: OrderParams): Promise<CreateOrderResponse> {
        try {
            const requestBody = {
                inputMint: params.inputMint,
                outputMint: params.outputMint,
                maker: params.maker,
                payer: params.payer,
                params: {
                    makingAmount: params.makingAmount.toString(),
                    takingAmount: params.takingAmount.toString(),
                    ...(params.expiredAt && { expiredAt: params.expiredAt.toString() }),
                    ...(params.feeBps && { feeBps: params.feeBps.toString() }),
                },
                computeUnitPrice: params.computeUnitPrice || "auto",
                ...(params.referral && { referral: params.referral }),
                inputTokenProgram: params.inputTokenProgram || "",
                outputTokenProgram: params.outputTokenProgram || "",
                wrapAndUnwrapSol: params.wrapAndUnwrapSol !== false,
            };
            console.log("Request Body:", JSON.stringify(requestBody, null, 2));

            const response = await fetch(`${this.baseUrl}/createOrder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data: CreateOrderResponse = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    }
}

async function createOrderOnly() {
    const client = new TriggerApiClient();

    const inputMint = new PublicKey("So11111111111111111111111111111111111111112"); // SOL
    const outputMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC

    const inputMintInfo = await connection.getAccountInfo(inputMint);
    const outputMintInfo = await connection.getAccountInfo(outputMint);

    const inputMintTokenProgram = inputMintInfo ? inputMintInfo.owner.toString() : "";
    const outputMintTokenProgram = outputMintInfo ? outputMintInfo.owner.toString() : "";

    console.log("Input Token Program:", inputMintTokenProgram);
    console.log("Output Token Program:", outputMintTokenProgram);

    const orderParams: OrderParams = {
        inputMint: inputMint.toString(),
        outputMint: outputMint.toString(),
        maker: "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H", // Replace with your address
        payer: "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H", // Replace with your address
        makingAmount: 1000000000, // 1 SOL
        takingAmount: 300000000, // 300 USDC
        expiredAt: Math.floor(Date.now() / 1000) + 3600,
        computeUnitPrice: "auto",
        inputTokenProgram: inputMintTokenProgram,
        outputTokenProgram: outputMintTokenProgram,
        wrapAndUnwrapSol: true,
    };

    try {
        const order = await client.createOrder(orderParams);
        console.log("Create Order Response:");
        console.log(JSON.stringify(order, null, 2));
    } catch (error) {
        console.error("Failed to create order:", error);
    }
}

createOrderOnly().catch(console.error);