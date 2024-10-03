import { AnimatedTooltip } from "../../../components/ui/animated-tooltip";
import { Avatar } from "./nft-data";

export function AvatarsCard({ avatars }: { avatars: Avatar[] }) {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={avatars} />
    </div>
  );
}
