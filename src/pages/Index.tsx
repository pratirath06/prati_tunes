
import { MusicPlayer } from "@/components/MusicPlayer";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import { ThemeProvider } from "@/hooks/useTheme";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
        <MusicPlayerProvider>
          <MusicPlayer />
        </MusicPlayerProvider>
      </div>
    </ThemeProvider>
  );
};

export default Index;
