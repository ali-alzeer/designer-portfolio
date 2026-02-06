/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/contexts/ThemeContext";
import { constColors, styles } from "@/styles/styles";
import { DynamicFormProps } from "@/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function DynamicForm({
  fields,
  initialData,
  onSubmit,
  onCancel,
  title,
  formLoading,
  formErrors,
  isReadOnly = false,
  formColor = constColors.accent,
  gridColumns = "3",
}: DynamicFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<any>(() => {
    const initialState = { ...initialData };
    fields.forEach((field) => {
      if (initialState[field.name] === undefined) {
        initialState[field.name] = field.type === "custom" ? [] : "";
      }
    });
    return initialState;
  });

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [onCancel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isReadOnly) return; // Guard for read-only
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const setFieldValue = (name: any, value: any) => {
    if (isReadOnly) return; // Guard for read-only
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    onSubmit(formData);
  };

  return (
    <div style={{ ...styles.overlay, flexDirection: "column", zIndex: 1000 }}>
      {formErrors ? (
        <div
          style={{
            ...styles.loginBox,
            backgroundColor: isDark ? "#050505" : "#f9f9f9",
            borderColor: formColor,
            borderWidth: "2px",
            marginBottom: "10px",
            padding: "15px 25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {formErrors.map((e) => (
            <p key={e}>{e.trim()}</p>
          ))}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        style={{
          ...styles.loginBox,
          backgroundColor: isDark ? "#111" : "#eee",
          borderColor: formColor,
          borderWidth: "2px",
          width: "90%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {formLoading ? (
          t("loading.loading")
        ) : (
          <>
            <h3 style={{ fontSize: "25px", marginBottom: "20px" }}>{title}</h3>

            <div
              style={{
                margin: "0",
                padding: "0",
                display: "grid",
                gap: "20px",
                background: "none",
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
              }}
            >
              {fields.map((field) => (
                <div
                  key={field.name as string}
                  style={{
                    ...(field.styles
                      ? { ...styles.fieldGroup, ...field.styles }
                      : styles.fieldGroup),
                    opacity: isReadOnly && field.type === "custom" ? 0.9 : 1,
                  }}
                >
                  <label style={styles.label}>{field.label}</label>

                  {/* 1. Custom Render Strategy (Updated to pass isReadOnly) */}
                  {field.renderCustom ? (
                    <div
                      style={{ pointerEvents: isReadOnly ? "none" : "auto" }}
                    >
                      {field.renderCustom(
                        (formData as any)[field.name],
                        (val) => setFieldValue(field.name as any, val),
                        isReadOnly,
                      )}
                    </div>
                  ) : field.type === "textarea" ? (
                    /* 2. Textarea Strategy */
                    <textarea
                      name={field.name as string}
                      value={(formData as any)[field.name] || ""}
                      onChange={handleChange}
                      readOnly={isReadOnly}
                      style={{
                        ...styles.input,
                        backgroundColor: isReadOnly
                          ? isDark
                            ? "#222"
                            : "#ddd"
                          : "inherit",
                        cursor: isReadOnly ? "default" : "text",
                        borderColor: isDark ? "#ddd" : "#222",
                      }}
                      required={field.required}
                    />
                  ) : (
                    /* 3. Default Input Strategy */
                    <input
                      type={field.type}
                      name={field.name as string}
                      value={(formData as any)[field.name] || ""}
                      onChange={handleChange}
                      readOnly={isReadOnly}
                      style={{
                        ...styles.input,
                        backgroundColor: isReadOnly
                          ? isDark
                            ? "#222"
                            : "#ddd"
                          : "inherit",
                        cursor: isReadOnly ? "default" : "text",
                        borderColor: isDark ? "#ddd" : "#222",
                      }}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                onClick={onCancel}
                style={{ ...styles.cancelBtn, borderColor: formColor }}
              >
                {isReadOnly
                  ? t("admin.dashboard.close") || "Close"
                  : t("admin.dashboard.cancel")}
              </button>

              {!isReadOnly && (
                <button
                  type="submit"
                  style={{
                    ...styles.submitBtn,
                    backgroundColor: formColor,
                    borderColor: formColor,
                  }}
                >
                  {t("admin.dashboard.save")}
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
