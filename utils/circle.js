import { Circle, CircleEnvironments, SubscriptionRequest } from "@circle-fin/circle-sdk";
import { v4 } from "uuid";

const circle = new Circle(
    process.env.CIRCLE_API_KEY,
    CircleEnvironments.sandbox      // API base url
);

export const createNewCircleWallet = async () => {
    const res = await circle.wallets.createWallet({
        idempotencyKey: v4(),
        description: "User Wallet",
    });

    return res.data.data;
}

export const createDefaultCircleWalletAddress = async (id) => {
    const res = await circle.wallets.generateAddress(id, {
        idempotencyKey: v4(),
        currency: "USD",
        "chain": "ETH",
    })

    return res.data.data;
}

export const getCircleWalletBalances = async () => {
    const res = await circle.balances.listBalances();

    return res.data.data;
}