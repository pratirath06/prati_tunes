
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  audioSrc: string;
  duration: number;
}

export const songs: Song[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "The Echoes",
    album: "Moonlit Sessions",
    coverArt: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "", // We'll simulate audio playback
    duration: 212, // Duration in seconds
  },
  {
    id: "2",
    title: "Ocean Waves",
    artist: "Luna Rhodes",
    album: "Coastal Memories",
    coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 184,
  },
  {
    id: "3",
    title: "Urban Lights",
    artist: "Neon Pulse",
    album: "City Nights",
    coverArt: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 197,
  },
  {
    id: "4",
    title: "Velvet Sky",
    artist: "Aurora Falls",
    album: "Northern Lights",
    coverArt: "https://images.unsplash.com/photo-1602075432748-82d264e2b463?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 226,
  },
  {
    id: "5",
    title: "Sunset Drive",
    artist: "Coastal Groove",
    album: "Summer Sessions",
    coverArt: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=3472&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 203,
  },
  {
    id: "6",
    title: "Ethereal Whispers",
    artist: "Dreaming Soul",
    album: "Tranquil Moments",
    coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 245,
  },
  {
    id: "7",
    title: "Electronic Dreams",
    artist: "Byte Brigade",
    album: "Digital Universe",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 218,
  },
  {
    id: "8",
    title: "Lunar Reflection",
    artist: "Night Wanderers",
    album: "Stellar Journey",
    coverArt: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 237,
  },
  {
    id: "9",
    title: "Cosmic Voyage",
    artist: "Astral Pilots",
    album: "Beyond Stars",
    coverArt: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 264,
  },
  {
    id: "10",
    title: "Mountain Echo",
    artist: "Summit Seekers",
    album: "Alpine Serenity",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 219,
  },
  {
    id: "11",
    title: "Desert Winds",
    artist: "Dune Travelers",
    album: "Saharan Tales",
    coverArt: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 195,
  },
  {
    id: "12",
    title: "Forest Whispers",
    artist: "Woodland Spirits",
    album: "Ancient Trees",
    coverArt: "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3",
    audioSrc: "",
    duration: 248,
  }
];

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
