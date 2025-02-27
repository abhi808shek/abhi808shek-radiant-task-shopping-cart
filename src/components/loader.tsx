import { useAppSelector } from "@/hooks/reduxHook";
import { Loader2 } from "lucide-react";

const FullPageLoader = () => {
  const { isLoading } = useAppSelector((state) => state.globalLoader);
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
        <p className="text-white mt-2 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
