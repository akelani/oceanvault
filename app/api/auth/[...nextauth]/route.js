import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import CircleWallet from '@models/circle_wallet';
import { connectToDB } from '@utils/database';

import { createDefaultCircleWalletAddress, createNewCircleWallet, getCircleWalletBalances } from '@utils/circle';
import CircleDepositAddress from '@models/circle_deposit_address';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      const sessionWallets = await CircleWallet.find({ owner: session.user.id }).populate("depositAddresses");
      session.user.wallets = sessionWallets;
      
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          }).then(async (user) => {
            //console.log("user" + user);

            // check if user has a wallet
            const walletExists = await CircleWallet.findOne({ owner: user._id.toString() });

            if (!walletExists) {
              const wallet = await createNewCircleWallet();
              //console.log(wallet);

              await CircleWallet.create({
                owner: user._id.toString(),
                walletId: parseInt(wallet.walletId),
                entityId: wallet.entityId,
                type: wallet.type,
                description: wallet.description,
              }).then(async (newWallet) => {
                //console.log(newWallet);

                user.wallets = [newWallet];
                await user.save();

                const address = await createDefaultCircleWalletAddress(newWallet.walletId);
                //console.log(address);

                await CircleDepositAddress.create({
                  wallet: newWallet._id.toString(),
                  address: address.address,
                  currency: address.currency,
                  chain: address.chain,
                }).then(async (address) => {
                  //console.log(address);

                  newWallet.depositAddresses = [address];
                  await newWallet.save();
                });
              });
            }
          });
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }