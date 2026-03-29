import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceActivationCardProps {
  isListening: boolean;
  lastHeard: string;
  onStart: () => void;
  onStop: () => void;
}

const VoiceActivationCard = ({ isListening, lastHeard, onStart, onStop }: VoiceActivationCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="w-5 h-5 text-coral" />
        <h3 className="font-display font-semibold text-foreground">Voice Activation</h3>
      </div>

      <p className="text-muted-foreground text-xs mb-4">
        Say <span className="text-sos font-semibold">"Help me"</span> to trigger SOS automatically
      </p>

      <div className="flex items-center gap-3">
        <Button
          variant={isListening ? 'sos' : 'secondary'}
          size="sm"
          onClick={isListening ? onStop : onStart}
          className="flex-1"
        >
          {isListening ? (
            <><MicOff className="w-4 h-4 mr-2" /> Stop Listening</>
          ) : (
            <><Mic className="w-4 h-4 mr-2" /> Start Listening</>
          )}
        </Button>
      </div>

      {isListening && lastHeard && (
        <div className="mt-3 p-2 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground">Heard: <span className="text-foreground">{lastHeard}</span></p>
        </div>
      )}

      {isListening && (
        <div className="flex items-center gap-2 mt-3">
          <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
          <span className="text-xs text-safe">Actively listening...</span>
        </div>
      )}
    </div>
  );
};

export default VoiceActivationCard;
