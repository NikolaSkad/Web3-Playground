interface TransactionRequest {
	from?: string;
	to?: string;
	value?: string;
	gas?: string;
	gasPrice?: string;
	maxFeePerGas?: string;
	maxPriorityFeePerGas?: string;
	data?: string;
	nonce?: string;
}

interface AddEthereumChainParameter {
	chainId: string;
	chainName: string;
	nativeCurrency: { name: string; symbol: string; decimals: number };
	rpcUrls: string[];
	blockExplorerUrls?: string[];
	iconUrls?: string[];
}

interface WatchAssetParams {
	type: 'ERC20';
	options: {
		address: string;
		symbol: string;
		decimals: number;
		image?: string;
	};
}

interface WalletPermission {
	parentCapability: string;
	invoker?: string;
	caveats?: { type: string; value: unknown }[];
	date?: number;
}

interface ProviderRpcError extends Error {
	code: number;
	data?: unknown;
}

interface EthereumRequestMap {
	eth_requestAccounts: { params?: []; return: string[] };
	eth_accounts: { params?: []; return: string[] };
	eth_chainId: { params?: []; return: string };
	eth_blockNumber: { params?: []; return: string };
	eth_getBalance: {
		params: [address: string, blockTag?: string];
		return: string;
	};
	eth_sendTransaction: { params: [TransactionRequest]; return: string };
	eth_sign: { params: [address: string, message: string]; return: string };
	personal_sign: {
		params: [message: string, address: string];
		return: string;
	};
	eth_signTypedData_v4: {
		params: [address: string, typedData: string];
		return: string;
	};
	wallet_switchEthereumChain: {
		params: [{ chainId: string }];
		return: null;
	};
	wallet_addEthereumChain: {
		params: [AddEthereumChainParameter];
		return: null;
	};
	wallet_watchAsset: { params: WatchAssetParams; return: boolean };
	wallet_requestPermissions: {
		params: [Record<string, Record<string, unknown>>];
		return: WalletPermission[];
	};
	wallet_getPermissions: { params?: []; return: WalletPermission[] };
}

interface EthereumEventMap {
	accountsChanged: (accounts: string[]) => void;
	chainChanged: (chainId: string) => void;
	connect: (info: { chainId: string }) => void;
	disconnect: (error: ProviderRpcError) => void;
	message: (message: { type: string; data: unknown }) => void;
}

interface EthereumProvider {
	isMetaMask?: boolean;

	request<M extends keyof EthereumRequestMap>(
		args: { method: M } & (EthereumRequestMap[M] extends { params: infer P }
			? { params: P }
			: { params?: [] }),
	): Promise<EthereumRequestMap[M]['return']>;

	request<T = unknown>(args: {
		method: string;
		params?: unknown[] | Record<string, unknown>;
	}): Promise<T>;

	on<E extends keyof EthereumEventMap>(event: E, handler: EthereumEventMap[E]): void;
	removeListener<E extends keyof EthereumEventMap>(event: E, handler: EthereumEventMap[E]): void;
}

interface Window {
	ethereum?: EthereumProvider;
}
