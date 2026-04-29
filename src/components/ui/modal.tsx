import type * as React from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '#/components/ui/dialog';
import { cn } from '#/lib/utils';

const sizeMap = {
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	xl: 'max-w-2xl',
} as const;

export interface ModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode;
	footer?: React.ReactNode;
	size?: keyof typeof sizeMap;
	className?: string;
	hideClose?: boolean;
}

export function Modal({
	open,
	onOpenChange,
	title,
	description,
	children,
	footer,
	size = 'md',
	className,
	hideClose,
}: ModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={cn(sizeMap[size], className)} hideClose={hideClose}>
				{(title || description) && (
					<DialogHeader>
						{title && <DialogTitle>{title}</DialogTitle>}
						{description && <DialogDescription>{description}</DialogDescription>}
					</DialogHeader>
				)}

				{children && <div className="mt-2">{children}</div>}

				{footer && <DialogFooter className="mt-4">{footer}</DialogFooter>}
			</DialogContent>
		</Dialog>
	);
}
