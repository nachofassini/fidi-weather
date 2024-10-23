import { BranchNavigator } from "@/components/BranchNavigator";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col lg:flex-row lg:overflow-hidden w-full gap-4">
      <div className="flex-none lg:w-64">
        <BranchNavigator />
      </div>
      <div className="flex-grow lg:overflow-y-auto w-full">{children}</div>
    </div>
  );
}
