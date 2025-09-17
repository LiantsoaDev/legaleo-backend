import { auth } from "@/auth";
import { DocumentVierge } from "@/components/Pages/Projets";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return <DocumentVierge />;
};

export default page;
