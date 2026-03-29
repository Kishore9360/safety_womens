import { useCallback, useRef } from 'react';
import { toast } from 'sonner';
import SOSButton from '@/components/SOSButton';
import EmergencyContacts from '@/components/EmergencyContacts';
import FakeCallOverlay from '@/components/FakeCallOverlay';
import LocationCard from '@/components/LocationCard';
import VoiceActivationCard from '@/components/VoiceActivationCard';
import QuickActions from '@/components/QuickActions';
import StatusBar from '@/components/StatusBar';
import { useFakeCall } from '@/hooks/useFakeCall';
import { useVoiceActivation } from '@/hooks/useVoiceActivation';
import { useLocation } from '@/hooks/useLocation';

const Index = () => {
  const { isRinging, isOnCall, triggerFakeCall, answerCall, endCall } = useFakeCall();
  const { getLocation, shareLocation, latitude, longitude } = useLocation();
  const sirenRef = useRef<AudioContext | null>(null);

  const handleSOS = useCallback(() => {
    toast.error('🚨 SOS Alert Activated!', {
      description: 'Emergency contacts are being notified with your location.',
      duration: 5000,
    });
    getLocation();
    // Vibrate if supported
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
  }, [getLocation]);

  const { isListening, lastHeard, startListening, stopListening } = useVoiceActivation(handleSOS);

  const handleSiren = useCallback(() => {
    if (sirenRef.current) {
      sirenRef.current.close();
      sirenRef.current = null;
      return;
    }
    try {
      const ctx = new AudioContext();
      sirenRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      gain.gain.value = 0.5;
      osc.frequency.value = 800;
      osc.start();
      // Siren sweep
      const sweep = () => {
        if (!sirenRef.current) return;
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5);
        osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 1);
        setTimeout(sweep, 1000);
      };
      sweep();
      toast.warning('🔊 Siren Active - Tap again to stop');
    } catch {}
  }, []);

  const handleShareLocation = useCallback(() => {
    if (latitude && longitude) {
      shareLocation();
      toast.success('📍 Location shared!');
    } else {
      getLocation();
      toast.info('Getting your location...');
    }
  }, [latitude, longitude, shareLocation, getLocation]);

  return (
    <div className="min-h-screen bg-background">
      <FakeCallOverlay
        isRinging={isRinging}
        isOnCall={isOnCall}
        onAnswer={answerCall}
        onEnd={endCall}
      />

      <div className="max-w-md mx-auto px-4 pb-8">
        <StatusBar />

        {/* Hero SOS Section */}
        <div className="flex flex-col items-center py-10">
          <p className="text-muted-foreground text-sm mb-6 font-body">
            Your safety, one tap away
          </p>
          <SOSButton onActivate={handleSOS} />
          <p className="text-muted-foreground text-xs mt-6 text-center max-w-[200px]">
            Sends your location to all emergency contacts instantly
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <QuickActions
            onFakeCall={() => {
              triggerFakeCall(3);
              toast.info('📞 Fake call incoming in 3 seconds...');
            }}
            onShareLocation={handleShareLocation}
            onSiren={handleSiren}
          />
        </div>

        {/* Cards Grid */}
        <div className="space-y-4">
          <LocationCard />
          <VoiceActivationCard
            isListening={isListening}
            lastHeard={lastHeard}
            onStart={startListening}
            onStop={stopListening}
          />
          <EmergencyContacts />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-4">
          <p className="text-muted-foreground text-xs">
            SafeGuard · Always watching over you 🛡️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
