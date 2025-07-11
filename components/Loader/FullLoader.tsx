import { Spinner } from "./Spinner";

export const FullLoader = () => {
  return (
    <div className="flex justify-center flex-col items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 bg-[#00000047]">
      <Spinner />
    </div>
  );
};
