
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 transition-colors duration-300"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-player-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-player-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
