
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { useWriteContract, useConnectors, useAccount } from 'wagmi';
// import { writeContract as write } from '@wagmi/core'
import { ethers } from 'ethers';
import { abi } from './abi';
import { config } from '../config';

interface ContactInteractionProps {
    address: string|undefined;
  }

export const ContactInteraction = (props: ContactInteractionProps) => {

    const { chain, connector } = useAccount();
    const [amount, setAmount] = useState('');
    console.log(connector);
    const { isPending, writeContract } = useWriteContract({config });

    async function handleClick() {
        const weiAmount = ethers.parseUnits('0.1', 18);
        const result = await writeContract({
            address: import.meta.env.VITE_FAUCET_CONTRACT_ADDRESS,
            abi,
            functionName: 'withdraw',
            args: [weiAmount],
        }, {
            onSuccess:() => {
                console.log('pending');
            }, 
            onSettled: () => {
                console.log('setteld');
            }, 
            onError:(err) => {
                console.log('error:', err);
        } });

        console.log(result);
    }

    return (
        <div>
            <hr />
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >

                <TextField
                    label="Address"
                    id="outlined-size-small"
                    defaultValue={props.address}
                    size="small"
                />
                <TextField
                    label="Amount"
                    id="outlined-size-small"
                    defaultValue="0.1"
                    onChange={(e) => setAmount(e.target.value)}
                    size="small"
                />
                <Button 
                    variant="contained"
                    disabled={isPending || chain?.id !== 15511}
                    onClick={handleClick}
                    >Get faucet
                </Button>
            </Box>
        </div>
    )
}