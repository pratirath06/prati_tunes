
import { Play, Pause, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PlayerControlsProps {
  className?: string;
  compactMode?: boolean;
  centerMode?: boolean;
  showVolume?: boolean;
}

export const PlayerControls = ({ 
  className, 
  compactMode = false, 
  centerMode = false,
  showVolume = false
}: PlayerControlsProps) => {
  const { isPlaying, togglePlayPause, nextSong, prevSong, volume, setVolume } = useMusicPlayer();
  const [previousVolume, setPreviousVolume] = useState(volume);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  
  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume || 0.5);
    }
  };
  
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={compactMode ? 16 : 18} />;
    if (volume < 0.3) return <Volume size={compactMode ? 16 : 18} />;
    if (volume < 0.7) return <Volume1 size={compactMode ? 16 : 18} />;
    return <Volume2 size={compactMode ? 16 : 18} />;
  };

  // For center mode, we show just the basic controls
  if (centerMode) {
    return (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-player-muted/70 backdrop-blur-md hover:bg-player-muted text-player-foreground"
          onClick={prevSong}
        >
          <SkipBack size={18} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-player-accent/90 backdrop-blur-md hover:bg-player-accent text-player-accent-foreground"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-player-muted/70 backdrop-blur-md hover:bg-player-muted text-player-foreground"
          onClick={nextSong}
        >
          <SkipForward size={18} />
        </Button>
      </div>
    );
  }
  
  // For the regular/compact mode with volume control
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      {!showVolume ? (
        <div className="flex gap-1 items-center justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "rounded-full hover:bg-player-muted text-player-foreground",
              compactMode ? "h-7 w-7" : "h-10 w-10"
            )}
            onClick={prevSong}
          >
            <SkipBack size={compactMode ? 16 : 18} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "rounded-full bg-player-accent hover:bg-player-accent/90 text-player-accent-foreground",
              compactMode ? "h-8 w-8" : "h-12 w-12"
            )}
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause size={compactMode ? 18 : 22} fill="currentColor" />
            ) : (
              <Play size={compactMode ? 18 : 22} fill="currentColor" className="ml-0.5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "rounded-full hover:bg-player-muted text-player-foreground",
              compactMode ? "h-7 w-7" : "h-10 w-10"
            )}
            onClick={nextSong}
          >
            <SkipForward size={compactMode ? 16 : 18} />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 min-w-24">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full hover:bg-player-muted text-player-foreground"
            onClick={toggleMute}
          >
            {getVolumeIcon()}
          </Button>
          
          <div className="w-full max-w-24">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 rounded-full bg-player-muted appearance-none cursor-pointer volume-slider"
              style={{
                background: `linear-gradient(to right, hsl(var(--player-accent)) 0%, hsl(var(--player-accent)) ${volume * 100}%, hsl(var(--player-muted)) ${volume * 100}%, hsl(var(--player-muted)) 100%)`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
