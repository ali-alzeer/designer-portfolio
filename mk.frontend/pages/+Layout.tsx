import "./Layout.css";
import "./tailwind.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BackgroundCanvas from "@/components/BackgroundShapes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <BackgroundCanvas theme="dark" />
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </>
  );
}
