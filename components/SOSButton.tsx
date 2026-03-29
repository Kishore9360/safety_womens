import { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface SOSButtonProps {
  onActivate: () => void;
}

const SOSButton = ({ onActivate }: SOSButtonProps) => {
  const [activated, setActivated] = useState(false);

  const handleSOS = () => {
    setActivated(true);
    onActivate();
    setTimeout(() => setActivated(false), 5000);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Ripple rings */}
      <div className="absolute w-52 h-52 rounded-full border-2 border-sos/20 sos-ring" />
      <div className="absolute w-44 h-44 rounded-full border-2 border-sos/30 sos-ring" style={{ animationDelay: '0.5s' }} />
      
      <button
        onClick={handleSOS}
        className={`
          relative z-10 w-36 h-36 rounded-full font-display font-bold text-2xl
          flex flex-col items-center justify-center gap-1 transition-all duration-300
          ${activated 
            ? 'bg-safe text-safe-foreground scale-95 shadow-[0_0_40px_hsl(145_65%_42%/0.4)]' 
            : 'bg-sos text-sos-foreground sos-pulse shadow-[var(--shadow-sos)] hover:scale-105'
          }
        `}
      >
        {activated ? (
          <>
            <Shield className="w-8 h-8" />
            <span className="text-sm">ALERT SENT</span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-8 h-8" />
            <span>SOS</span>
            <span className="text-xs font-body font-normal opacity-80">Tap for help</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SOSButton;
