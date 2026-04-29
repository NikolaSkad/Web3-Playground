import { Link } from "@tanstack/react-router";
import { cn } from "#/lib/utils";
import ConnectWallet from '../shared/ConnectWallet';

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-linear-to-br from-gradient-from via-gradient-via to-gradient-to" />
            <span className="text-sm font-semibold tracking-tight text-fg">
              Web3 Playground
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg",
                )}
                activeProps={{
                  className: "text-fg bg-surface-2",
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

       <ConnectWallet/>
      </div>
    </header>
  );
}
