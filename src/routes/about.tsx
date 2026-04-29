import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({ component: About });

function About() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16">
			<h1 className="text-3xl font-bold tracking-tight text-fg">About</h1>
			<p className="mt-4 text-fg-muted">
				This is an example page to demonstrate routing. Edit{' '}
				<code className="rounded bg-surface-2 px-1.5 py-0.5 text-sm text-accent-400">
					src/routes/about.tsx
				</code>{' '}
				to change this content.
			</p>
		</div>
	);
}
