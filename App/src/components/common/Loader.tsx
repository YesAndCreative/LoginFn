import { Loader2Icon } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-9999 flex items-center justify-center">
      <Loader2Icon className="animate-spin" />;
    </div>
  );
};

export default Loader;
