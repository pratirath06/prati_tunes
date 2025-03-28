
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Song, formatTime } from "@/data/songs";
import { Play, Clock, ListMusic, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SongListProps {
  className?: string;
  showQueue?: boolean;
}

export const SongList = ({ className, showQueue = false }: SongListProps) => {
  const { 
    songs: allSongs, 
    queue, 
    currentSong, 
    setCurrentSong, 
    isPlaying, 
    addToQueue, 
    removeFromQueue 
  } = useMusicPlayer();
  
  const handleSongSelect = (song: Song) => {
    if (showQueue) {
      return; // We don't play songs directly from the queue view
    }
    
    if (currentSong?.id === song.id) {
      // Do nothing if it's already the current song
      return;
    }
    
    setCurrentSong(song);
  };
  
  const songsToRender = showQueue ? queue : allSongs;
  
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListMusic size={16} className="text-player-foreground/70" />
          <h3 className="text-player-foreground font-medium">
            {showQueue ? "Queue" : "Songs"}
          </h3>
        </div>
        {!showQueue && songsToRender.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-player-foreground/70">
            <Clock size={14} />
            <span>{songsToRender.length} songs</span>
          </div>
        )}
      </div>
      
      <ScrollArea className="h-full max-h-[320px] pr-2">
        {songsToRender.length > 0 ? (
          <div className="space-y-1">
            {songsToRender.map((song) => (
              <div 
                key={song.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md group",
                  currentSong?.id === song.id 
                    ? "bg-player-accent/10 text-player-accent" 
                    : "hover:bg-player-muted/60 text-player-foreground",
                )}
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => handleSongSelect(song)}
                >
                  <div className="relative h-10 w-10 rounded overflow-hidden shrink-0">
                    <img 
                      src={song.coverArt} 
                      alt={song.album} 
                      className="h-full w-full object-cover"
                    />
                    {currentSong?.id === song.id && isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="w-1.5 h-4 bg-white mx-0.5 animate-pulse-subtle"></span>
                        <span className="w-1.5 h-6 bg-white mx-0.5 animate-pulse-subtle" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-1.5 h-3 bg-white mx-0.5 animate-pulse-subtle" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col min-w-0">
                    <div className="font-medium truncate">{song.title}</div>
                    <div className="text-xs text-player-foreground/70 truncate">{song.artist}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-player-foreground/70">
                    {formatTime(song.duration)}
                  </span>
                  
                  {!showQueue ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => addToQueue(song)}
                    >
                      <Plus size={14} />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromQueue(song.id)}
                    >
                      <Plus size={14} className="rotate-45" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-20 text-player-foreground/50">
            <p>{showQueue ? "Your queue is empty" : "No songs available"}</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
