import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ContactPopupProps {
  showPopup: boolean;
  popupType: 'success' | 'error';
  popupMessage: string;
  onClose: () => void;
}

const ContactPopup = ({
  showPopup,
  popupType,
  popupMessage,
  onClose,
}: ContactPopupProps) => {
  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-4"
          onClick={onClose}
        >
          <div
            className="relative bg-red-900 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Section */}
            <div
              className={`px-6 py-8 text-center ${
                popupType === "success" ? "bg-green-200" : "bg-red-50"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  popupType === "success" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {popupType === "success" ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600" />
                )}
              </div>

              <h3
                className={`text-2xl font-bold mb-3 ${
                  popupType === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {popupType === "success"
                  ? "We've received your message!"
                  : "Something went wrong. Please try again."}
              </h3>

              <p
                className={`text-base leading-relaxed ${
                  popupType === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {popupMessage}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Footer Section */}
            <div className="px-6 py-4 bg-gray-50">
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  popupType === "success"
                    ? "text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
                onClick={onClose}
              >
                {popupType === "success" ? "" : "Try again"}
              </button>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClose}
              aria-label="Close popup"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Timing progress bar */}
            <div className="h-1.5 w-full bg-gray-200">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={`h-full ${
                  popupType === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;