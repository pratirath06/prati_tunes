import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Song, songs } from '@/data/songs';

interface MusicPlayerContextProps {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  songs: Song[];
  queue: Song[];
  setCurrentSong: (song: Song) => void;
  togglePlayPause: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  setCurrentTime: (time: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(undefined);

interface MusicPlayerProviderProps {
  children: ReactNode;
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  
  // Start progress simulation when playing
  useEffect(() => {
    let interval: number | undefined;
    
    if (isPlaying && currentSong) {
      interval = window.setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= currentSong.duration) {
            // When song ends, play the next one
            nextSong();
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, currentSong]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextSong = () => {
    // First check if there's anything in the queue
    if (queue.length > 0) {
      const nextInQueue = queue[0];
      setCurrentSong(nextInQueue);
      setQueue(queue.slice(1));
      setCurrentTime(0);
      return;
    }
    
    // Otherwise play the next song in the list
    if (currentSong) {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
      setCurrentTime(0);
    }
  };
  
  const prevSong = () => {
    if (currentSong) {
      // If we're past 3 seconds in the song, go back to the beginning
      if (currentTime > 3) {
        setCurrentTime(0);
        return;
      }
      
      // Otherwise go to the previous song
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[prevIndex]);
      setCurrentTime(0);
    }
  };
  
  const seekTo = (time: number) => {
    if (time >= 0 && currentSong && time <= currentSong.duration) {
      setCurrentTime(time);
    }
  };
  
  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
  };
  
  const removeFromQueue = (songId: string) => {
    setQueue(queue.filter(song => song.id !== songId));
  };
  
  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        currentTime,
        songs,
        queue,
        setCurrentSong,
        togglePlayPause,
        nextSong,
        prevSong,
        setVolume,
        seekTo,
        setCurrentTime,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  
  return context;
};
