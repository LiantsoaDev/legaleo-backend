import { auth } from "@/auth";
import { Onboarding } from "@/components/Pages/Onboarding/Onboarding";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type DocumentKey = "status_entreprise" | "kbis" | "pacte_associe";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const [user, savedOnboarding] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        last_name: true,
      },
    }),
    prisma.onboardingResponse.findUnique({
      where: { userId: session.user.id },
      include: {
        documents: true,
      },
    }),
  ]);

  let firstName = user?.name ?? session.user.name ?? "";
  let lastName = user?.last_name ?? "";

  if (!lastName && firstName.includes(" ")) {
    const [first, ...rest] = firstName.split(" ");
    firstName = first ?? firstName;
    lastName = rest.join(" ");
  }

  if (!firstName && session.user.name) {
    const [first, ...rest] = session.user.name.split(" ");
    firstName = first ?? session.user.name;
    if (!lastName) {
      lastName = rest.join(" ");
    }
  }

  return (
    <div className=" h-screen flex flex-col gap-7">
      <Onboarding
        initialUser={{ firstName, lastName }}
        savedOnboarding={
          savedOnboarding
            ? {
                networkName: savedOnboarding.networkName,
                networkActivity: savedOnboarding.networkActivity,
                franchiseeCount: savedOnboarding.franchiseeCount ?? [],
                networkType: savedOnboarding.networkType,
                networkTypeOther: savedOnboarding.networkTypeOther,
                legalSupportPreference:
                  savedOnboarding.legalSupportPreference,
                documents: savedOnboarding.documents.map((doc) => ({
                  id: doc.id,
                  name: doc.name as DocumentKey,
                  originalName: doc.originalName,
                  path: doc.path,
                })),
              }
            : undefined
        }
      />
    </div>
  );
};

export default page;
