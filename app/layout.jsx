import '@styles/globals.css';

export const metadata = {
    title: "OceanVault",
    description: "OceanVault is the world's smallest web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using OceanVault today.",
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout;