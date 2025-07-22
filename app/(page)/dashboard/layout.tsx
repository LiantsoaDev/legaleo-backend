import { HeaderDashboard } from "@/components/Header";
import { Left } from "@/components/Pages/Dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col gap-0 bg-dark-green pb-5 pr-8">
      <HeaderDashboard />
      <div className="flex h-full flex-row gap-0">
        <Left />
        <div className="w-4/5 bg-white rounded-2xl py-8 px-10 shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}
