// 애니메이션 미포함 버전 --------------------------

// import { AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import Button from "./ui/Button";

// interface alertType {
//   title: string;
//   description: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function AlertDemo({ title, description, isOpen, onClose }: alertType) {
//   return (
//     <div
//       className={`${isOpen ? "fixed inset-0 bg-black/40 z-10 focus:outline-none" : "hidden"}`}
//     >
//       <div className="not-even:grid w-full max-w-md items-start gap-4">
//         <Alert>
//           <CheckCircle2Icon />
//           <AlertTitle>{title}</AlertTitle>
//           <AlertDescription>{description}</AlertDescription>
//         </Alert>
//         <Alert variant="destructive">
//           <AlertCircleIcon />
//           <AlertTitle>{title}</AlertTitle>
//           <AlertDescription>{description}</AlertDescription>
//           <Button
//             className="bg-blue-600 text-white"
//             onClick={onClose}
//             label=" 확인"
//           />
//         </Alert>
//       </div>
//     </div>
//   );
// }

// -----------------------------------------------------------------

// 애니메이션 포함 버전 --------------------------

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircleIcon, CheckCircle2Icon, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface alertType {
  title: string;
  description: string;
  variant?: boolean;
  onCustomClose?: () => void;
}

interface alertDemoProps {
  alert: alertType | null;
  onClose: () => void;
}

export function AlertDemo({ alert, onClose }: alertDemoProps) {
  return (
    <AnimatePresence>
      {alert && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-start pt-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }} // 시작 위치 (위로 50px, 투명)
            animate={{ opacity: 1, y: 0 }} // 나타날 때 위치 (제자리)
            exit={{ opacity: 0, y: -50 }} // 사라질 때 위치 (다시 위로)
            transition={{ duration: 0.3, ease: "easeOut" }} // 부드러움 조절
            className="w-full max-w-md px-4"
          >
            <div className="grid gap-4">
              <Alert variant={`${alert.variant ? "destructive" : "default"}`}>
                {alert.variant ? (
                  <AlertCircleIcon className="h-4 w-4" />
                ) : (
                  <CheckCircle2Icon className="h-4 w-4" />
                )}

                <AlertTitle>{alert.title}</AlertTitle>
                <button
                  type="button"
                  onClick={alert.onCustomClose || onClose}
                  className="shrink-0 self-center"
                >
                  <X className="h-4 w-4" />
                </button>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
