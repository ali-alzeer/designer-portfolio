/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DynamicForm } from "@/components/DynamicForm";
import { constColors, styles } from "@/styles/styles";
import { navigate } from "vike/client/router";
import { useTheme } from "@/contexts/ThemeContext";
import { Tool } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { adminApi } from "@/lib/api";
import {
  ENDPOINT_AUTH_MAINIMAGE,
  ENDPOINT_AUTH_SIGNIN,
  ENDPOINT_AUTH_SIGNOUT,
  ENDPOINT_AUTH_UPDATEIMAGE,
  ENDPOINT_AUTH_UPDATEPASSWORD,
  ENDPOINT_TOOLS,
} from "@/constants/constants";

const Page = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [schema, setSchema] = useState<any>(null);
  const [activeTabId, setActiveTabId] = useState<string>("work");
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState(false);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[] | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[] | null>(null);

  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<"MAINIMAGE" | "PASSWORD">(
    "MAINIMAGE",
  );

  const isDark = theme === "dark";

  // Dynamic Colors based on Context
  const colors = {
    bg: isDark ? "#050505" : "#f9f9f9",
    text: isDark ? "#ffffff" : "#111111",
    subtext: isDark ? "#888888" : "#666666",
    border: isDark ? "#444444" : "#999999",
  };

  // 1. Fetch the Schema from your hosting service
  useEffect(() => {
    fetch("/schemas/dashboard-schema.json")
      .then((res) => res.json())
      .then((json) => {
        setSchema(json);
        setActiveTabId(json.sections[0].id);
      });
    fetchTabData();
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchTools();
      fetchTabData();
    }
  }, [token]);

  const fetchTools = async () => {
    try {
      const result = await adminApi.get(ENDPOINT_TOOLS);
      setAllTools(result.data.data || []);
    } catch (e) {
      console.error("Could not load tools for selector");
    }
  };

  // 2. Identify the active section config
  const activeSection = useMemo(() => {
    return schema?.sections.find((s: any) => s.id === activeTabId);
  }, [schema, activeTabId]);

  // 3. Fetch data for the active section
  const fetchTabData = async () => {
    if (!activeSection || !token) return;

    if (activeTabId.toUpperCase() === "PROFILE") {
      setLoading(true);
      try {
        const result = await adminApi.get(ENDPOINT_AUTH_MAINIMAGE);
        if (result.data.success) {
          setMainImageUrl(result.data.data);
          setDashboardError(false);
        } else {
          setMainImageUrl(null);
          setDashboardError(true);
        }
      } catch (err) {
        setDashboardError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const result = await adminApi.get(`/${activeSection.endpoint}`);
        setData(result.data.data || []);
        setDashboardError(false);
      } catch (err) {
        setDashboardError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTabData();
    fetchTools();
  }, [activeSection]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const result = await adminApi.post(ENDPOINT_AUTH_SIGNIN, {
        password: password,
      });
      if (result.data.success) {
        localStorage.setItem("access_token", result.data.data.token);
        setErrors(null);
        setToken(result.data.data.token);
      } else {
        setErrors(result.data.errors);
      }
    } catch (error: any) {
      setErrors(
        error.response.data.errors || [error.response.data.message] || [
            t("error.serverError"),
          ],
      );
    }
  };

  // 4. Custom Component Mapper
  // This maps the "customKey" in JSON to actual JSX logic
  const getCustomRenderer = (key: string) => {
    const mappers: Record<string, any> = {
      workTypeRadio: (value: any, onChange: any) => (
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          {["image", "video"].map((opt) => (
            <label
              key={opt}
              style={{
                cursor: "pointer",
                padding: "10px",
                backgroundColor: constColors.accent,
                borderRadius: "5px",
              }}
            >
              <input
                type="radio"
                checked={value === opt}
                onChange={() => onChange(opt)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ),
      toolMultiSelect: (value: any[] = [], onChange: any) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            gridColumn: "1/4",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {allTools.map((tool) => (
            <label
              key={tool.id}
              style={{
                cursor: "pointer",
                padding: "10px",
                borderColor: constColors.accent,
                borderWidth: "1px",
                background: "none",
                borderRadius: "5px",
              }}
            >
              <input
                type="checkbox"
                checked={value?.includes(tool.id)}
                onChange={() =>
                  onChange(
                    value?.includes(tool.id)
                      ? value.filter((v) => v !== tool.id)
                      : [...value, tool.id],
                  )
                }
              />{" "}
              <img width="50" height="50" src={tool.publicToolImageUrl} />
              <p
                style={{
                  textOverflow: "ellipsis",
                  maxWidth: "50px",
                  width: "50px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontSize: "12px",
                }}
              >
                {tool.title}
              </p>
            </label>
          ))}
        </div>
      ),
    };
    return mappers[key];
  };

  // 5. Prepare fields for DynamicForm
  const dynamicFields = useMemo(() => {
    if (!activeSection) return [];

    if (activeTabId.toUpperCase() === "PROFILE") {
      if (editTarget.toUpperCase() === "PASSWORD") {
        return [
          {
            label: t("admin.dashboard.oldPassword"),
            name: "oldPassword",
            type: "text",
            required: true,
          },
          {
            label: t("admin.dashboard.newPassword"),
            name: "newPassword",
            type: "text",
            required: true,
          },
        ];
      } else if (editTarget.toUpperCase() === "MAINIMAGE") {
        return [
          {
            label: t("admin.dashboard.newMainImageUrl"),
            name: "mainImageUrl",
            type: "text",
            required: true,
          },
        ];
      } else {
        return [];
      }
    } else {
      return activeSection.fields.map((f: any) => ({
        ...f,
        label: t(f.label),
        renderCustom: f.customKey ? getCustomRenderer(f.customKey) : undefined,
        styles: f.gridFull ? { gridColumn: "1/4" } : undefined,
      }));
    }
  }, [activeSection, t, allTools, editTarget]);

  const handleEditProfile = async (formData: any) => {
    if (!activeSection || activeTabId.toUpperCase() !== "PROFILE") return;
    try {
      setFormErrors(() => null);
      setFormLoading(() => true);
      const result =
        editTarget.toUpperCase() === "PASSWORD"
          ? await adminApi.put(ENDPOINT_AUTH_UPDATEPASSWORD, formData)
          : await adminApi.put(ENDPOINT_AUTH_UPDATEIMAGE, formData);
      if (result.data.success) {
        setFormLoading(() => false);
        setFormErrors(() => null);
        setIsModalOpen(() => false);
        fetchTabData();
      } else {
        setFormErrors(() => result.data.errors ?? [result.data.message]);
        setFormLoading(() => false);
      }
    } catch (error: any) {
      setFormErrors(
        () => error.response.data.errors ?? [t("error.serverError")],
      );
      setFormLoading(() => false);
    }
  };
  const handleAdd = async (formData: any) => {
    if (!activeSection) return;
    try {
      if (
        activeSection.endpoint.toUpperCase() === "WORKS" &&
        (formData.type == false || typeof formData.type !== typeof "")
      ) {
        formData.type = "image";
      }
      setFormErrors(() => null);
      setFormLoading(() => true);
      const result = await adminApi.post(`${activeSection.endpoint}`, formData);
      if (result.data.success) {
        setFormLoading(() => false);
        setFormErrors(() => null);
        setIsModalOpen(() => false);
        fetchTabData();
      } else {
        setFormErrors(() => result.data.errors ?? [result.data.message]);
        setFormLoading(() => false);
      }
    } catch (error) {
      setFormErrors(() => [t("error.serverError")]);
      setFormLoading(() => false);
    }
  };
  const handleDelete = async (id: string) => {
    if (!activeSection) return;
    if (!window.confirm(t("admin.dashboard.confirmDelete"))) return;

    try {
      const result = await adminApi.delete(`${activeSection.endpoint}/${id}`);
      if (result.data.success) {
        fetchTabData();
      }
    } catch (error) {
      setDashboardError(true);
    }
  };
  const handleLogout = async () => {
    if (!window.confirm(t("admin.dashboard.confirmLogout"))) return;

    try {
      const result = await adminApi.post(ENDPOINT_AUTH_SIGNOUT);
    } catch (error) {
      /* empty */
    } finally {
      localStorage.removeItem("access_token");
      navigate("/");
    }
  };

  if (!schema) return <p>{t("loading.loading")}</p>;

  // Login View
  if (!token) {
    return (
      <>
        <div style={styles.errorPageContainer}>
          <h1 style={styles.errorPageCode}>404</h1>
          <p>{t("error.pageNotFound")}</p>
          <button
            onClick={() => navigate("/")}
            style={{ ...styles.button, backgroundColor: constColors.accent }}
          >
            {t("error.backToMain")}
          </button>
        </div>
        <div style={styles.loginContainer}>
          {errors ? (
            <div
              style={{
                ...styles.loginBox,
                backgroundColor: colors.bg,
                borderColor: "#ec0000",
                borderWidth: "2px",
                marginBottom: "10px",
                padding: "15px 25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {errors.map((e) => (
                <p key={e}>{e.trim()}</p>
              ))}
            </div>
          ) : null}

          <form
            onSubmit={handleLogin}
            style={{
              ...styles.loginBox,
              backgroundColor: colors.bg,
              borderColor: constColors.accent,
              borderWidth: "2px",
            }}
          >
            <h2 style={{ ...styles.formTitle, fontSize: "30px" }}>
              {t("admin.login.formTitle")}
            </h2>
            <input
              type={isPasswordHidden ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button
              style={{
                fontFamily: "tajawal",
                fontSize: "15px",
                fontWeight: "lighter",
                marginBottom: "20px",
                backgroundColor: "rgb(130,130,130)",
                width: "100%",
                cursor: "pointer",
              }}
              type="button"
              onClick={() => {
                setIsPasswordHidden((prev) => !prev);
              }}
            >
              {isPasswordHidden
                ? t("admin.login.showPassword")
                : t("admin.login.hidePassword")}
            </button>
            <button
              type="submit"
              style={{
                ...styles.button,
                backgroundColor: constColors.accent,
                margin: "0",
                width: "100%",
                fontSize: "20px",
              }}
            >
              {t("admin.login.loginButton")}
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <div style={styles.dashboardLayout}>
      <nav
        style={{
          ...styles.sidebar,
          backgroundColor: isDark ? "#111" : "rgb(250,250,250)",
          borderBottom: "1px solid rgb(68,68,68)",
          flex: 1,
        }}
      >
        {schema.sections.map((s: any) => (
          <button
            key={s.id}
            onClick={() => setActiveTabId(s.id)}
            style={activeTabId === s.id ? styles.activeNav : styles.navBtn}
          >
            {t(s.labelKey)}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        <header style={styles.header}>
          <h1>{t(activeSection?.labelKey)}</h1>
          {activeTabId.toUpperCase() !== "PROFILE" ? (
            <button onClick={() => setIsModalOpen(true)} style={styles.addBtn}>
              + {t("admin.dashboard.add")}
            </button>
          ) : (
            <button
              onClick={() => handleLogout()}
              style={{ ...styles.addBtn, backgroundColor: "#cc2222" }}
            >
              {t("admin.dashboard.logout")}
            </button>
          )}
        </header>

        {loading ? (
          t("loading.loading")
        ) : dashboardError ? (
          t("error.serverError")
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {activeTabId.toUpperCase() === "PROFILE" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h2>{t("admin.dashboard.mainImage")}</h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 15px",
                      borderRadius: "8px",
                      gap: "15px",
                      boxSizing: "border-box",
                      backgroundColor: isDark ? "#1f002e" : "#ffffff",
                      border: `1px solid ${isDark ? "#333" : "#ddd"}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        minWidth: 0,
                      }}
                    >
                      <img
                        width="60"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "6px",
                          flexShrink: 0,
                        }}
                        src={mainImageUrl ?? ""}
                        alt="Profile Image"
                      />
                    </div>

                    {/* RIGHT SECTION: Buttons */}
                    <div style={{ flexShrink: 0 }}>
                      <button
                        onClick={() => {
                          setEditTarget(() => "MAINIMAGE");
                          setIsModalOpen(() => true);
                        }}
                        style={{
                          ...styles.addBtn,
                          backgroundColor: constColors.accent,
                          margin: 0,
                          padding: "8px 16px",
                        }}
                      >
                        {t("admin.dashboard.edit")}
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h2>{t("admin.dashboard.password")}</h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 15px",
                      borderRadius: "8px",
                      gap: "15px",
                      boxSizing: "border-box",
                      backgroundColor: isDark ? "#1f002e" : "#ffffff",
                      border: `1px solid ${isDark ? "#333" : "#ddd"}`,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          top: "10px",
                          position: "absolute",
                          fontSize: "40px",
                        }}
                      >
                        ****
                      </span>
                    </div>

                    {/* RIGHT SECTION: Buttons */}
                    <div style={{ flexShrink: 0 }}>
                      <button
                        onClick={() => {
                          setEditTarget(() => "PASSWORD");
                          setIsModalOpen(() => true);
                        }}
                        style={{
                          ...styles.addBtn,
                          backgroundColor: constColors.accent,
                          margin: 0,
                          padding: "8px 16px",
                        }}
                      >
                        {t("admin.dashboard.edit")}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              data.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    gap: "15px",
                    boxSizing: "border-box",
                    backgroundColor: isDark
                      ? index % 2 === 0
                        ? "#1f002e"
                        : "#1a1a1a"
                      : index % 2 === 0
                        ? "#fbf5ff"
                        : "#ffffff",
                    border: `1px solid ${isDark ? "#333" : "#ddd"}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      minWidth: 0,
                    }}
                  >
                    <img
                      width="45"
                      height="45"
                      style={{
                        objectFit: "cover",
                        borderRadius: "6px",
                        flexShrink: 0,
                      }}
                      src={
                        item.publicWorkMediaUrl ||
                        item.publicToolImageUrl ||
                        item.icon
                      }
                      alt=""
                    />

                    {/* Text Wrapper */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "500",
                        color: isDark ? "#eee" : "#333",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "100%",
                      }}
                    >
                      {language === "en"
                        ? item.titleEn || item.title
                        : item.titleAr || item.title}
                    </p>
                  </div>

                  {/* RIGHT SECTION: Buttons */}
                  <div style={{ flexShrink: 0 }}>
                    {activeTabId.toUpperCase() === "WORK" ? (
                      <button
                        onClick={() => navigate(`/work/${item.id}`)}
                        style={{
                          ...styles.addBtn,
                          backgroundColor: "#2222cc",
                          margin: "0 10px",
                          padding: "8px 16px",
                        }}
                      >
                        {t("admin.dashboard.details")}
                      </button>
                    ) : null}

                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        ...styles.addBtn,
                        backgroundColor: "#cc2222",
                        margin: 0,
                        padding: "8px 16px",
                      }}
                    >
                      {t("admin.dashboard.delete")}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {isModalOpen ? (
        activeTabId.toUpperCase() === "PROFILE" ? (
          <DynamicForm
            formErrors={formErrors}
            formLoading={formLoading}
            title={t("admin.dashboard.edit")}
            fields={dynamicFields}
            onSubmit={handleEditProfile}
            onCancel={() => {
              setIsModalOpen(false);
              setFormErrors(null);
              setFormLoading(false);
            }}
          />
        ) : (
          <DynamicForm
            formErrors={formErrors}
            formLoading={formLoading}
            title={t("admin.dashboard.add")}
            fields={dynamicFields}
            onSubmit={handleAdd}
            onCancel={() => {
              setIsModalOpen(false);
              setFormErrors(null);
              setFormLoading(false);
            }}
          />
        )
      ) : null}
    </div>
  );
};

export default Page;
