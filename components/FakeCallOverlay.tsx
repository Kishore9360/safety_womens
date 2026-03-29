import { Phone, PhoneOff } from 'lucide-react';

interface FakeCallOverlayProps {
  isRinging: boolean;
  isOnCall: boolean;
  onAnswer: () => void;
  onEnd: () => void;
}

const FakeCallOverlay = ({ isRinging, isOnCall, onAnswer, onEnd }: FakeCallOverlayProps) => {
  if (!isRinging && !isOnCall) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-secondary mx-auto flex items-center justify-center">
          <span className="text-3xl">👩</span>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Mom</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {isRinging ? 'Incoming call...' : 'Connected · 00:00'}
          </p>
        </div>
      </div>

      <div className="mt-16 flex gap-8">
        {isRinging ? (
          <>
            <button
              onClick={onEnd}
              className="w-16 h-16 rounded-full bg-sos flex items-center justify-center shadow-[var(--shadow-sos)]"
            >
              <PhoneOff className="w-7 h-7 text-sos-foreground" />
            </button>
            <button
              onClick={onAnswer}
              className="w-16 h-16 rounded-full bg-safe flex items-center justify-center shadow-[0_0_30px_hsl(145_65%_42%/0.4)]"
            >
              <Phone className="w-7 h-7 text-safe-foreground" />
            </button>
          </>
        ) : (
          <button
            onClick={onEnd}
            className="w-16 h-16 rounded-full bg-sos flex items-center justify-center shadow-[var(--shadow-sos)]"
          >
            <PhoneOff className="w-7 h-7 text-sos-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FakeCallOverlay;
