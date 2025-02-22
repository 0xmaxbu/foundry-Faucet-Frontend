import { useAccount, useSwitchChain } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ContactInteraction } from './ContactInteraction';

export const ConnectBtn = () => {
  const { isConnected, address, addresses, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  if(isConnected && chain?.id !== 15511) {
    switchChain({ chainId: 15511 });
  }

  return (
    <>

        <ConnectButton />
        {isConnected ? (
            <ContactInteraction address={address} />
        ) : (
            <></>
        )}
    </>
  );
};