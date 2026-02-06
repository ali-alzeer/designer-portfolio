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
      admin: {
        login: {
          formTitle: "Designer Login",
          back: "BACK TO MAIN PAGE",
          loginButton: "Login",
          showPassword: "Show",
          hidePassword: "Hide",
        },
        dashboard: {
          dashboard: "Dashboard",
          works: "Works",
          tools: "Tools",
          contact: "Contact",
          profile: "Profile",
          logout: "Logout",
          managingwork: "Managing Works",
          managingtool: "Managing Tools",
          managingcontact: "Managing Contact",
          managingprofile: "Managing Profile",
          add: "Add",
          title: "Title",
          actions: "Actions",
          titleAr: "Title (Arabic)",
          titleEn: "Title (English)",
          url: "Url",
          descriptionAr: "Description (Arabic)",
          descriptionEn: "Description (English)",
          type: "Type",
          image: "Image",
          video: "Video",
          cancel: "Cancel",
          save: "Save Changes",
          icon: "Icon",
          delete: "Delete",
          edit: "Edit",
          confirmDelete: "Are you sure about the deletion?",
          confirmLogout: "Are you sure about logging out?",
          mainImage: "Profile Picture",
          newMainImageUrl: "New Profile Picture Url",
          password: "Password",
          newPassword: "New Password",
          oldPassword: "Old Password",
          details: "Details",
          view: "Details",
          close: "Close",
          editProfile: "Edit Profile",
        },
      },
      error: {
        pageNotFound: "PAGE NOT FOUND",
        backToMain: "BACK TO MAIN PAGE",
        serverError: "SOMETHING WENT WRONG",
      },
      tap: {
        close: "Tap to close",
        inspect: "Tap to inspect",
      },
      footer: {
        copyright1: "© 2026 Mohammad Alkhaled",
        copyright2: "All rights reserved",
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
      admin: {
        login: {
          formTitle: "دخول المصمم",
          back: "رجوع إلى الصفحة الرئيسية",
          loginButton: "تسجيل الدخول",
          showPassword: "إظهار",
          hidePassword: "إخفاء",
        },
        dashboard: {
          dashboard: "لوحة التحكم",
          works: "الأعمال",
          tools: "الأدوات",
          contact: "التواصل",
          profile: "الملف الشخصي",
          logout: "تسجيل الخروج",
          managingwork: "إدارة الأعمال",
          managingtool: "إدارة الأدوات",
          managingcontact: "إدارة التواصل",
          managingprofile: "إدارة الملف الشخصي",
          add: "إضافة",
          title: "العنوان",
          actions: "الخيارات",
          titleAr: "العنوان (عربي)",
          titleEn: "العنوان (إنكليزي)",
          url: "الرابط",
          descriptionAr: "الوصف (عربي)",
          descriptionEn: "الوصف (إنكليزي)",
          type: "النوع",
          image: "صورة",
          video: "فيديو",
          cancel: "إلغاء",
          save: "حفظ التغييرات",
          icon: "الأيقونة",
          delete: "حذف",
          edit: "تعديل",
          confirmDelete: "هل أنت متأكد من الحذف؟",
          confirmLogout: "هل أنت متأكد من الخروج؟",
          mainImage: "الصورة الرئيسية",
          newMainImageUrl: "رابط الصورة الجديدة",
          password: "كلمة السر",
          newPassword: "كلمة السر الجديدة",
          oldPassword: "كلمة السر القديمة",
          details: "تفاصيل",
          view: "تفاصيل",
          close: "إغلاق",
          editProfile: "تعديل الملف الشخصي",
        },
      },
      error: {
        pageNotFound: "الصفحة غير موجودة",
        backToMain: "رجوع إلى الصفحة الرئيسية",
        serverError: "حدث خطأ غير متوقع",
      },
      tap: {
        close: "اضغط للإلغاء",
        inspect: "اضغط للتقريب",
      },
      footer: {
        copyright1: "© 2026 محمد الخالد",
        copyright2: "جميع الحقوق محفوظة",
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
