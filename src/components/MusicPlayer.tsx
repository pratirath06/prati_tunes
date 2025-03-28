
import { useState } from "react";
import { AlbumDisplay } from "./AlbumDisplay";
import { PlayerControls } from "./PlayerControls";
import { SongProgress } from "./SongProgress";
import { SongList } from "./SongList";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { ThemeToggle } from "./ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTime } from "@/data/songs";

export const MusicPlayer = () => {
  const { currentSong, isPlaying } = useMusicPlayer();
  const [view, setView] = useState<"songs" | "queue">("songs");
  
  if (!currentSong) return null;
  
  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-xl overflow-hidden shadow-2xl animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-6">
        {/* Album Cover and Main Info - Left Side */}
        <div className="flex flex-col items-center md:items-start justify-start gap-6">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-player-accent to-player-accent/80 text-transparent bg-clip-text">
              Rhythm Shift
            </h1>
            <ThemeToggle />
          </div>
          
          <div className="relative w-full flex justify-center">
            <AlbumDisplay size="large" className="mx-auto" />
          </div>
          
          <div className="w-full text-center md:text-left px-4 md:px-0">
            <h2 className="text-2xl font-bold truncate">{currentSong.title}</h2>
            <p className="text-player-foreground/70">{currentSong.artist}</p>
            <p className="text-xs text-player-foreground/60 mt-1">{currentSong.album}</p>
          </div>
          
          <div className="w-full px-4 md:px-0">
            <SongProgress />
            <div className="mt-4">
              <PlayerControls />
            </div>
          </div>
        </div>
        
        {/* Playlist/Queue - Right Side */}
        <div className="flex flex-col h-full">
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="songs" onClick={() => setView("songs")}>Songs</TabsTrigger>
              <TabsTrigger value="queue" onClick={() => setView("queue")}>Queue</TabsTrigger>
            </TabsList>
            <TabsContent value="songs" className="h-full">
              <SongList showQueue={false} />
            </TabsContent>
            <TabsContent value="queue" className="h-full">
              <SongList showQueue={true} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Mini Player for Mobile (Fixed at Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/80 backdrop-blur-lg border-t shadow-lg p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <AlbumDisplay size="small" />
            <div className="min-w-0">
              <p className="font-medium truncate">{currentSong.title}</p>
              <p className="text-xs text-player-foreground/70 truncate">{currentSong.artist}</p>
            </div>
          </div>
          <PlayerControls compactMode={true} />
        </div>
      </div>
    </div>
  );
};
