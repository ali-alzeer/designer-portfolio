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
}: DynamicFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<any>(() => {
    const initialState = { ...initialData };
    fields.forEach((field) => {
      if (initialState[field.name] === undefined) {
        // Use empty array for custom tools/checkboxes, empty string for others
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
  }, []);

  // Standard handler for native inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Explicit handler for custom components
  const setFieldValue = (name: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{ ...styles.overlay, flexDirection: "column" }}>
      {formErrors ? (
        <div
          style={{
            ...styles.loginBox,
            backgroundColor: theme === "dark" ? "#050505" : "#f9f9f9",
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
          borderColor: constColors.accent,
          borderWidth: "2px",
          width: "90%",
          maxWidth: "800px",
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
              }}
            >
              {fields.map((field) => (
                <div
                  key={field.name as string}
                  style={
                    field.styles
                      ? { ...styles.fieldGroup, ...field.styles }
                      : styles.fieldGroup
                  }
                >
                  <label style={styles.label}>{field.label}</label>

                  {/* 1. Custom Render Strategy */}
                  {field.renderCustom ? (
                    field.renderCustom((formData as any)[field.name], (val) =>
                      setFieldValue(field.name as any, val),
                    )
                  ) : /* 2. Textarea Strategy */
                  field.type === "textarea" ? (
                    <textarea
                      name={field.name as string}
                      value={(formData as any)[field.name] || ""}
                      onChange={handleChange}
                      style={styles.input}
                      required={field.required}
                    />
                  ) : (
                    /* 3. Default Input Strategy (Text, URL, Password) */
                    <input
                      type={field.type}
                      name={field.name as string}
                      value={(formData as any)[field.name] || ""}
                      onChange={handleChange}
                      style={styles.input}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            <div style={styles.actions}>
              <button type="button" onClick={onCancel} style={styles.cancelBtn}>
                {t("admin.dashboard.cancel")}
              </button>
              <button type="submit" style={styles.submitBtn}>
                {t("admin.dashboard.save")}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
