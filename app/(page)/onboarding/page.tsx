import { Onboarding } from "@/components/Onboarding/Onboarding";

const options = ["Option 1", "Option 2", "Option 3"];

const page = () => {
  return (
    <div className=" h-screen flex flex-col gap-7">
      <Onboarding />
    </div>
  );
};

export default page;
