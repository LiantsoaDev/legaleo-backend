import franchiseur from "@/app/assets/images/logo_franchiseur.png";
import { auth } from "@/auth";
import { Personnaliser } from "@/components/Pages/Projets";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <Personnaliser
      description="Modèle de contrat pour encadrer la relation entre franchiseur et franchisé."
      logo={franchiseur}
      nom="Contrat de franchise"
      type="Franchiseur"
    />
  );
};

export default page;
