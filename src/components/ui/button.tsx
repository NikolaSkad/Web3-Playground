import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '#/lib/utils';

const buttonVariants = cva(
	'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
				secondary: 'bg-surface-2 text-fg hover:bg-surface-3 border border-border',
				outline: 'border border-border-strong bg-transparent text-fg hover:bg-surface-2',
				ghost: 'bg-transparent text-fg hover:bg-surface-2',
				destructive: 'bg-danger text-white hover:bg-danger/90',
				link: 'text-accent-400 underline-offset-4 hover:underline',
				gradient:
					'text-white bg-linear-to-r from-gradient-from via-gradient-via to-gradient-to hover:opacity-90 shadow-lg shadow-primary-500/20',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-11 rounded-xl px-6 text-base',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button';
	return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
