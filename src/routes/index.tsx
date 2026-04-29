import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-fg">
        Welcome to{" "}
        <span className="bg-linear-to-r from-gradient-from via-gradient-via to-gradient-to bg-clip-text text-transparent">
          Web3 Playground
        </span>
      </h1>
      <p className="mt-4 text-lg text-fg-muted">
        Edit <code className="text-accent-400">src/routes/index.tsx</code> to
        get started.
      </p>
    </div>
  );
}
