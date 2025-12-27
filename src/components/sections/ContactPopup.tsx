import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';

interface ContactPopupProps {
  showPopup: boolean;
  popupType: 'success' | 'error';
  popupMessage: string;
  onClose: () => void;
}

const ContactPopup = ({ showPopup, popupType, popupMessage, onClose }: ContactPopupProps) => {
  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <div 
            className={`relative px-6 py-6 md:px-8 md:py-8 rounded-2xl shadow-2xl text-center w-full max-w-sm md:max-w-md mx-auto ${
              popupType === 'success' 
                ? 'bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400' 
                : 'bg-gradient-to-r from-red-200 via-red-300 to-red-400'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-purple-600 hover:text-purple-800 transition-colors z-10"
              onClick={onClose}
              aria-label="Close popup"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 shadow-lg ${
                popupType === 'success' ? 'bg-emerald-400/30' : 'bg-red-400/30'
              }`}>
                {popupType === 'success' ? (
                  <Send className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                ) : (
                  <X className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                )}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-purple-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {popupType === 'success' ? 'Message Sent!' : 'Error!'}
              </h3>
              
              <p className="text-base md:text-lg font-medium text-purple-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] px-2">
                {popupMessage}
              </p>
            </div>
            
            {/* Timing progress bar */}
            <div className="mt-6 h-1.5 w-full bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={`h-full ${
                  popupType === 'success' 
                    ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700' 
                    : 'bg-gradient-to-r from-red-500 via-red-400 to-red-300'
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