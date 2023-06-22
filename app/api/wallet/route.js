import CircleWallet from "@models/circle_wallet";

export const GET = async (request) => {
    try {

        const wallets = await Wallet.find({}).populate('owner')

        return new Response(JSON.stringify(wallets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all wallets", { status: 500 })
    }
} 