import { useSetAtom } from 'jotai';
import { ChevronRight, Wallet } from 'lucide-react';
import { toast } from 'sonner';

import { walletAddressAtom } from '#/atoms/wallet';
import { Modal } from '#/components/ui/modal';
import { cn } from '#/lib/utils';

interface EIP6963ProviderInfo {
	uuid: string;
	name: string;
	icon: string;
	rdns: string;
}

interface EIP6963ProviderDetail {
	info: EIP6963ProviderInfo;
	provider: EthereumProvider;
}

const providers: EIP6963ProviderDetail[] = [];

if (typeof window !== 'undefined') {
	window.addEventListener('eip6963:announceProvider', (event) => {
		const detail = (event as CustomEvent<EIP6963ProviderDetail>).detail;
		if (!providers.find((p) => p.info.uuid === detail.info.uuid)) {
			providers.push(detail);
		}
	});
	window.dispatchEvent(new Event('eip6963:requestProvider'));
}

interface WalletOption {
	id: string;
	name: string;
	tagline: string;
	iconBg: string;
	disabled?: boolean;
	onClick?: () => void;
}

interface WalletDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function WalletDialog({ open, onOpenChange }: WalletDialogProps) {
	const setWalletAddress = useSetAtom(walletAddressAtom);

	const handleConnectMetaMask = async () => {
		const metamask = providers.find((p) => p.info.rdns === 'io.metamask');

		if (!metamask) {
			toast.error('MetaMask not detected', {
				description: 'Install the MetaMask extension and reload the page.',
			});
			return;
		}

		try {
			await metamask.provider.request({
				method: 'wallet_requestPermissions',
				params: [{ eth_accounts: {} }],
			});
			const accounts = await metamask.provider.request({
				method: 'eth_accounts',
			});

			const address = accounts[0];
			if (!address) {
				toast.error('No account selected');
				return;
			}

			setWalletAddress(address);
			toast.success('Wallet connected', {
				description: `${address.slice(0, 6)}...${address.slice(-4)}`,
			});
			onOpenChange(false);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Connection failed';
			toast.error('Connection rejected', { description: message });
		}
	};

	const wallets: WalletOption[] = [
		{
			id: 'metamask',
			name: 'MetaMask',
			tagline: 'Connect using your browser wallet',
			iconBg: 'bg-linear-to-br from-orange-400 to-orange-600',
			onClick: handleConnectMetaMask,
		},
		{
			id: 'phantom',
			name: 'Phantom',
			tagline: 'Coming soon',
			iconBg: 'bg-linear-to-br from-violet-400 to-violet-600',
			disabled: true,
		},
	];

	return (
		<Modal
			open={open}
			onOpenChange={onOpenChange}
			title="Connect a wallet"
			description="Choose which wallet you want to use to connect to this app."
		>
			<div className="flex flex-col gap-2">
				{wallets.map((wallet) => (
					<button
						key={wallet.id}
						type="button"
						disabled={wallet.disabled}
						onClick={wallet.onClick}
						className={cn(
							'group flex items-center gap-4 rounded-xl border border-border bg-surface-3 p-4 text-left transition-colors',
							'hover:border-border-strong hover:bg-surface-3/80',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
							'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-surface-3',
						)}
					>
						<div
							className={cn(
								'flex size-10 shrink-0 items-center justify-center rounded-lg shadow-lg',
								wallet.iconBg,
							)}
						>
							<Wallet className="size-5 text-white" />
						</div>

						<div className="flex flex-1 flex-col">
							<span className="text-sm font-semibold text-fg">{wallet.name}</span>
							<span className="text-xs text-fg-muted">{wallet.tagline}</span>
						</div>

						<ChevronRight className="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg-muted group-disabled:group-hover:translate-x-0" />
					</button>
				))}
			</div>
		</Modal>
	);
}
