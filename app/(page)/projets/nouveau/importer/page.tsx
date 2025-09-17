import { auth } from "@/auth";
import { Importer } from "@/components/Pages/Projets";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return <Importer />;
};

export default page;
