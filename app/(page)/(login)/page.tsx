import { auth } from "@/auth";
import { Login } from "@/components/Login";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session?.user) {
    console.log("Current user", session?.user);
    redirect("/onboarding");
  }

  return <Login />;
};

export default page;
