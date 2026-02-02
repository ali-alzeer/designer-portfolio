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
      pagination: {
        previous: "Previous",
        next: "Next",
      },
      loading: {
        loading: "LOADING",
        ready: "READY",
      },
      details: {
        back: "BACK",
        details: "Details",
        date: "Date",
        tools: "Tools",
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
      pagination: {
        previous: "السابقة",
        next: "التالية",
      },
      loading: {
        loading: "تحميل",
        ready: "جاهز",
      },
      details: {
        back: "رجوع",
        details: "التفاصيل",
        date: "التاريخ",
        tools: "الأدوات",
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

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";
    i18nInstance.changeLanguage(newLang);
    setLanguage(newLang);
  };

  useEffect(() => {
    // 1. Check LocalStorage
    const savedLanguage = localStorage.getItem(
      "portfolio-language",
    ) as Language;

    // 2. Check Browser Language if no LocalStorage
    const browserLang = navigator.language.startsWith("ar") ? "ar" : "en";

    // Final determination
    const initialLang = savedLanguage || browserLang;

    setLanguage(initialLang);
    i18nInstance.changeLanguage(initialLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
      localStorage.setItem("portfolio-language", language);
    }
  }, [language, mounted]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
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
