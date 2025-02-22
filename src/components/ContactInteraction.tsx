
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useWriteContract, useAccount } from 'wagmi';
import { abi } from './abi';

interface ContactInteractionProps {
    address: string|undefined;
  }

export const ContactInteraction = (props: ContactInteractionProps) => {

    const { chain } = useAccount();
    const { data: hash, isPending, writeContract } = useWriteContract();

    function handleClick() {
        writeContract({
            address: import.meta.env.VITE_FAUCET_CONTRACT_ADDRESS,
            abi,
            functionName: 'withdraw',
            args: [BigInt(5e16)],
          });
    }

    return (
        <div>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >

                <TextField
                label="Address"
                id="outlined-size-small"
                defaultValue={props.address}
                size="small"
                />
                <Button 
                variant="contained"
                    disabled={isPending || chain?.id !== 15511}
                    onClick={handleClick}
                >Get faucet</Button>
            </Box>
        </div>
    )
}