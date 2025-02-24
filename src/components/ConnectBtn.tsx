import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ContactInteraction } from './ContactInteraction';

export const ConnectBtn = () => {
  const { isConnected, address, addresses, chain } = useAccount();
  const { switchChain } = useSwitchChain();
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