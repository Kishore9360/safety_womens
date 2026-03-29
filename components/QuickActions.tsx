import { Phone, MapPin, Shield, Volume2 } from 'lucide-react';

interface QuickActionsProps {
  onFakeCall: () => void;
  onShareLocation: () => void;
  onSiren: () => void;
}

const QuickActions = ({ onFakeCall, onShareLocation, onSiren }: QuickActionsProps) => {
  const actions = [
    { icon: Phone, label: 'Fake Call', onClick: onFakeCall, color: 'text-coral' },
    { icon: MapPin, label: 'Share Location', onClick: onShareLocation, color: 'text-safe' },
    { icon: Volume2, label: 'Loud Siren', onClick: onSiren, color: 'text-warning' },
    { icon: Shield, label: 'Call 112', onClick: () => window.open('tel:112'), color: 'text-sos' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:bg-secondary transition-colors shadow-[var(--shadow-card)]"
        >
          <action.icon className={`w-6 h-6 ${action.color}`} />
          <span className="text-xs text-muted-foreground font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
