
import { Shield, ShieldCheck, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  type: "verified" | "unverified" | "pending";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const VerificationBadge = ({ 
  type, 
  size = "md", 
  showLabel = false 
}: VerificationBadgeProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const configs = {
    verified: {
      icon: <ShieldCheck className={`${sizeClasses[size]} text-emerald-500`} />,
      label: "Verified",
      tooltip: "This listing has been verified by our team. The information has been confirmed and the property is available.",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200"
    },
    pending: {
      icon: <Shield className={`${sizeClasses[size]} text-amber-500`} />,
      label: "Pending Verification",
      tooltip: "This listing is currently undergoing our verification process. Some details may change after verification.",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200"
    },
    unverified: {
      icon: <InfoIcon className={`${sizeClasses[size]} text-gray-400`} />,
      label: "Not Verified",
      tooltip: "This listing has not been verified by our team yet. Please do your own due diligence before proceeding.",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      borderColor: "border-gray-200"
    }
  };

  const { icon, label, tooltip, bgColor, textColor, borderColor } = configs[type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${bgColor} ${textColor} ${borderColor} border ${showLabel ? '' : 'p-1'}`}
          >
            {icon}
            {showLabel && (
              <span className={`font-medium ${textSizeClasses[size]}`}>{label}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
