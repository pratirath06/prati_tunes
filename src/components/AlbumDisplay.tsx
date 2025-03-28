
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { cn } from "@/lib/utils";

interface AlbumDisplayProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export const AlbumDisplay = ({ className, size = "medium" }: AlbumDisplayProps) => {
  const { currentSong, isPlaying } = useMusicPlayer();
  
  if (!currentSong) return null;
  
  const sizeClasses = {
    small: "h-12 w-12",
    medium: "h-40 w-40 md:h-60 md:w-60",
    large: "h-64 w-64 md:h-80 md:w-80",
  };
  
  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden shadow-xl",
        sizeClasses[size],
        isPlaying && size !== "small" && "animate-pulse-subtle",
        className
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat", 
          isPlaying && size !== "small" && "animate-rotate-album"
        )}
        style={{ 
          backgroundImage: `url(${currentSong.coverArt})`,
          animationPlayState: isPlaying ? "running" : "paused",
          animationDuration: size === "large" ? "20s" : "30s"
        }}
      />
      {size !== "small" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      )}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/90",
          {
            "h-3 w-3": size === "small",
            "h-8 w-8": size === "medium",
            "h-10 w-10": size === "large",
          }
        )}
      />
    </div>
  );
};
