import CircleWallet from "@models/circle_wallet";

export const POST = async (request) => {
    const { userId, walletId, entityId, type, description } = await request.json();

    try {
        const newWallet = new Wallet({ owner: userId, walletId, entityId, type, description });

        await newWallet.save();
        return new Response(JSON.stringify(newWallet), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new wallet", { status: 500 });
    }
}