import { Button } from "../ui/button";
import { Wallet } from "lucide-react";

const ConnectWallet = () => {
  return (
    <Button variant="gradient" size="sm">
      <Wallet />
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
