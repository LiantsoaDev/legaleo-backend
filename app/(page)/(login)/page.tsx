import { auth } from "@/auth";
import { Login } from "@/components/Login";
import { hasCompletedOnboarding } from "@/lib/workflows";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session?.user?.id) {
    const isOnboardingCompleted = await hasCompletedOnboarding(
      session.user.id
    );
    redirect(isOnboardingCompleted ? "/dashboard" : "/onboarding");
  }

  return <Login />;
};

export default page;
