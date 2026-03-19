import { MessageCircle } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
        <MessageCircle className="w-5 h-5 text-white fill-current" />
      </div>
      <span className="text-xl font-bold tracking-tight">이음</span>
    </div>
  );
};

export default Logo;
