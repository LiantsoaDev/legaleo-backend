import { auth } from "@/auth";
import { Login } from "@/components/Login";

const page = async () => {
  const session = await auth();

  if (session?.user) {
    console.log(session?.user.name);
  }

  return <Login />;
};

export default page;
