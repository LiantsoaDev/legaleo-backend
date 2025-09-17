import { auth } from "@/auth";
import { NewProject } from "@/components/Pages/Projets";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return <NewProject />;
};

export default page;
