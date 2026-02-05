import "./Layout.css";
import "./tailwind.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BackgroundCanvas from "@/components/BackgroundShapes";
import { useState } from "react";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <ThemeProvider>
        <BackgroundCanvas theme="dark" />
        <LanguageProvider>
          {isLoading ? (
            <Loading onFinished={() => setIsLoading(false)} />
          ) : (
            <div className="page-reveal">
              <Header />
              {children}
            </div>
          )}
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
