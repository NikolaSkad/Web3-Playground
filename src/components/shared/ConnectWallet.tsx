import { useAtom } from 'jotai';
import { Wallet } from 'lucide-react';
import { useState } from 'react';

import { walletAddressAtom } from '#/atoms/wallet';
import { Button } from '../ui/button';
import { WalletDialog } from './WalletDialog';

const ConnectWallet = () => {
	const [open, setOpen] = useState(false);
	const [address, setAddress] = useAtom(walletAddressAtom);

	const handleDisconnect = () => {
		setAddress(null);
	};

	if (address) {
		return (
			<button
				type="button"
				onClick={handleDisconnect}
				className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface-3"
			>
				<span className="size-2 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
				<span className="font-mono text-xs">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
				<span className="hidden text-xs text-fg-muted group-hover:inline">Disconnect</span>
			</button>
		);
	}

	return (
		<>
			<Button variant="gradient" size="sm" onClick={() => setOpen(true)}>
				<Wallet />
				Connect Wallet
			</Button>
			<WalletDialog open={open} onOpenChange={setOpen} />
		</>
	);
};

export default ConnectWallet;
