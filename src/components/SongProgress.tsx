
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { formatTime } from "@/data/songs";
import { cn } from "@/lib/utils";

interface SongProgressProps {
  className?: string;
}

export const SongProgress = ({ className }: SongProgressProps) => {
  const { currentSong, currentTime, seekTo } = useMusicPlayer();
  
  if (!currentSong) return null;
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(Number(e.target.value));
  };
  
  const progress = (currentTime / currentSong.duration) * 100;
  
  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      <input
        type="range"
        min="0"
        max={currentSong.duration}
        value={currentTime}
        onChange={handleProgressChange}
        className="w-full h-1.5 rounded-full bg-player-muted appearance-none cursor-pointer player-progress"
        style={{
          background: `linear-gradient(to right, hsl(var(--player-accent)) 0%, hsl(var(--player-accent)) ${progress}%, hsl(var(--player-muted)) ${progress}%, hsl(var(--player-muted)) 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-player-foreground/70">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(currentSong.duration)}</span>
      </div>
    </div>
  );
};
