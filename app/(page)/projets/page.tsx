import { auth } from "@/auth";
import { ClientDashboard } from "@/components/Pages/Dashboard";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return <ClientDashboard />;
};

export default page;
