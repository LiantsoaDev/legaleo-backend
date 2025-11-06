import { auth } from "@/auth";
import { OnboardingJeuneReseau } from "@/components/Pages/Onboarding/OnboardingJeuneReseau";
import { getOnboardings } from "@/server";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  const onboardings = await getOnboardings();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className=" h-screen flex flex-col gap-7">
      <OnboardingJeuneReseau user={session.user} />
    </div>
  );
};

export default page;
