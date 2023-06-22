import { CryptoElements, OnrampElement } from '@components/StripeCryptoElements';
import StripeOnramp from '@components/StripeOnramp';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        OceanVault
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> NFT Marketplace</span>
      </h1>
      <p className="desc text-center">
        OceanVault is the world's smallest web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using OceanVault today.
      </p>
      <StripeOnramp />
    </section>
  )
}

export default Home;