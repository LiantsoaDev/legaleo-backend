import { auth } from "@/auth";
import { Models } from "@/components/Pages/Projets";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return <Models />;
};

export default page;
