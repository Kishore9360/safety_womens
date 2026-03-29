import { MapPin, Share2, Navigation, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/hooks/useLocation';

const LocationCard = () => {
  const { latitude, longitude, loading, error, getLocation, shareLocation } = useLocation();

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-coral" />
        <h3 className="font-display font-semibold text-foreground">Live Location</h3>
      </div>

      {latitude && longitude ? (
        <div className="space-y-3">
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Navigation className="w-4 h-4 text-safe" />
              <span className="text-foreground font-mono text-xs">
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </span>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden h-40 bg-secondary">
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`}
            />
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={shareLocation}>
            <Share2 className="w-4 h-4 mr-2" /> Share Location
          </Button>
        </div>
      ) : (
        <div className="text-center py-6">
          {error && <p className="text-sos text-xs mb-2">{error}</p>}
          <Button variant="secondary" size="sm" onClick={getLocation} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
            {loading ? 'Getting location...' : 'Enable Location'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
