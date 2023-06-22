"use client";

import { useState, useEffect } from 'react';

import { CryptoElements, OnrampElement } from './StripeCryptoElements';
import { loadStripeOnramp } from '@stripe/crypto';

import { useSession } from 'next-auth/react';

const stripeOnrampPromise = loadStripeOnramp("pk_test_51ImUWoDG1tfuocbIv2WkCLHsk9WEfeyz41RLPc857Z9Q8K79eyp7wKDxjGOBN6hK1V8jjMujO4O9wadcNIi9D0AP00NcePcKVw")
const StripeOnramp = () => {

    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");

    const { data: session } = useSession();

    useEffect(() => {
        const fetchOnrampSession = async () => {
            try {
                const response = await fetch(
                    "/api/stripe-crypto-onramp/new",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            transaction_details: {
                                destination_currency: "usdc",
                                destination_exchange_amount: "10.00",
                                destination_network: "polygon",
                            }
                        }),
                    })
                if (response.ok) {
                    const data = await response.json();
                    //console.log("onramp" + data);
                    setClientSecret(data);
                }
            } catch (error) {
                console.log(error)
            }

        };

        fetchOnrampSession();
    }, []);

    const onChange = async ({ session }) => {
        setMessage(`OnrampSession is now in ${session.status} state.`);
    };

    return (
        <CryptoElements stripeOnramp={stripeOnrampPromise}>
            {clientSecret && (
                <OnrampElement
                    id="onramp-element"
                    clientSecret={clientSecret}
                    appearance={{ theme: "dark" }}
                    onChange={onChange}
                />
            )}
        </CryptoElements>
    )
}

export default StripeOnramp