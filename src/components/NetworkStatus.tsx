
import { useOffline } from '@/hooks/useOffline';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

export const NetworkStatus = () => {
  const { isOnline } = useOffline();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground p-2">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">You're currently offline</span>
        <Badge variant="outline" className="bg-destructive-foreground text-destructive">
          Offline Mode
        </Badge>
      </div>
    </div>
  );
};
