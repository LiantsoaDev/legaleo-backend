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

  const sessionName = session.user.name ?? "";

  let lastName = user?.name ?? "";
  let firstName = user?.last_name ?? "";

  if ((!firstName || !lastName) && sessionName) {
    const [first = "", ...rest] = sessionName.trim().split(/\s+/);
    if (!firstName && first) {
      firstName = first;
    }
    if (!lastName && rest.length > 0) {
      lastName = rest.join(" ");
    }
    if (!lastName && !first && sessionName) {
      lastName = sessionName;
    }
  }

  const initialFirstName = savedOnboarding?.firstName ?? firstName;
  const initialLastName = savedOnboarding?.lastName ?? lastName;

  return (
    <div className=" h-screen flex flex-col gap-7">
      <Onboarding
        initialUser={{ firstName: initialFirstName, lastName: initialLastName }}
        savedOnboarding={
          savedOnboarding
            ? {
                firstName: savedOnboarding.firstName,
                lastName: savedOnboarding.lastName,
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
