import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Loading from "@/components/Loading";

// --- TYPES ---
type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const resources = {
  en: {
    translation: {
      nav: { work: "Work", about: "About", contact: "Contact" },
      hero: {
        title: "MOHAMMAD",
        span: "ALKHALED",
        sub: "GRAPHIC DESIGNER // VIDEO EDITOR // 3D ARTIST",
      },
      about: {
        title: "About Me",
        bio: "A professional graphic designer with a strong foundation in design principles and proven experience in video editing, animation, and 3D modeling. I am eager to apply my creative skills to deliver modern and engaging visual content. I am proficient in key design tools and excited to work on diverse projects.",
      },
      work: {
        title: "Portfolio",
      },
    },
  },
  ar: {
    translation: {
      nav: { work: "المعرض", about: "حول", contact: "التواصل" },
      hero: {
        title: "مــحــمــد",
        span: "الـخـالــد",
        sub: "مصمم رسوميات // محرر فيديو // فنان ثلاثي الأبعاد",
      },
      about: {
        title: "حول",
        bio: "مصمم جرافيك محترف، لدي أساس قوي في مبادئ التصميم وخبرة مثبتة في المونتاج والتحريك بالإضافة للنمذجة ثلاثية الأبعاد. أتطلع لتطبيق مهاراتي الإبداعية في تقديم محتوى بصري عصري وجذاب. متمكن من أدوات التصميم الرئيسية ومتحمس للعمل في مشاريع متنوعة",
      },
      work: {
        title: "معرض الأعمال",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
  interpolation: { escapeValue: false },
});

// --- LANGUAGE CONTEXT ---
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n: i18nInstance } = useTranslation();
  const [language, setLanguage] = useState<Language>("ar");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleLanguage = () => {
    i18nInstance.changeLanguage(language === "ar" ? "en" : "ar");
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "portfolio-language",
    ) as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18nInstance.changeLanguage(savedLanguage);
    }
    setMounted(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.dir = language === "ar" ? "rtl" : "ltr";
      localStorage.setItem("portfolio-language", language);
    }
  }, [language, mounted]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {loading ? <Loading /> : children}
    </LanguageContext.Provider>
  );
};

// --- CUSTOM HOOKS (For easy access) ---
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
