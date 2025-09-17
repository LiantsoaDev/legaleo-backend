import { auth } from "@/auth";
import { Generer } from "@/components/Pages/Projets";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return <Generer />;
};

export default page;
