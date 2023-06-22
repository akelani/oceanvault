import CircleWallet from "@models/circle_wallet"

export const GET = async (request, { params }) => {
    try {
        const wallets = await CircleWallet.find({ creator: params.id }).populate("creator")
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch wallets created by user", { status: 500 })
    }
} 