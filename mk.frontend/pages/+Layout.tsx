import "./Layout.css";
import "./tailwind.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BackgroundCanvas from "@/components/BackgroundShapes";
import { useState } from "react";
import Loading from "@/components/Loading";

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
            <div className="page-reveal">{children}</div>
          )}
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

// // Layout.tsx
// export default function Layout({ children }) {
//   const [showLoader, setShowLoader] = useState(true);

//   return (
//     <ThemeProvider>
//       <LanguageProvider>
//         {showLoader ? (
//           <Loading onFinished={() => setShowLoader(false)} />
//         ) : (
//           <div className="page-reveal">{children}</div>
//         )}
//       </LanguageProvider>

//       <style>{`
//
//       `}</style>
//     </ThemeProvider>
//   );
// }
