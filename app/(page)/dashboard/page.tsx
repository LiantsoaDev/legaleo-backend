import { auth } from "@/auth";
import { ClientDashboard } from "@/components/Pages/Dashboard";
import { hasCompletedOnboarding } from "@/lib/workflows";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  if (session.user?.id) {
    const isOnboardingCompleted = await hasCompletedOnboarding(
      session.user.id
    );
    if (!isOnboardingCompleted) {
      redirect("/onboarding");
    }
  }
  return <ClientDashboard />;
};

export default page;
