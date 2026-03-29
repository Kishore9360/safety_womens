import { ShieldCheck, Wifi } from 'lucide-react';

const StatusBar = () => (
  <div className="flex items-center justify-between px-1 py-3">
    <div className="flex items-center gap-2">
      <ShieldCheck className="w-6 h-6 text-sos" />
      <h1 className="font-display font-bold text-lg text-foreground">SafeGuard</h1>
    </div>
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-safe" />
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <Wifi className="w-3 h-3" /> Active
      </span>
    </div>
  </div>
);

export default StatusBar;
