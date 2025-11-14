"use client";

import { clearUser, setUser } from "@/lib/features/slice/userSlice";
import { useAppDispatch } from "@/lib/hook";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function AuthWatcher() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setUser({
          id: session.user.id!,
          name: session.user.name!,
          lastName: session.user.last_name ?? null,
          email: session.user.email!,
          image: session.user.image || "",
        })
      );
      // router.replace("/onboarding");
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
      router.replace("/");
    }
  }, [status, session, dispatch]);

  return null;
}
