// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useTheme } from "@/contexts/ThemeContext";
// import { constColors, styles } from "@/styles/styles";
// import { DynamicFormProps } from "@/types";
// import React, { useState } from "react";

// export function DynamicForm<T>({
//   fields,
//   initialData,
//   onSubmit,
//   onCancel,
//   title,
// }: DynamicFormProps<T>) {
//   const [formData, setFormData] = useState<T>((initialData || {}) as T);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div style={styles.overlay}>
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           ...styles.loginBox,
//           backgroundColor: isDark ? "#111" : "#eee",
//           borderColor: constColors.accent,
//           borderWidth: "2px",
//         }}
//       >
//         <h3 style={{ fontSize: "25px", marginBottom: "20px" }}>{title}</h3>
//         <div
//           style={{
//             ...styles.loginBox,
//             margin: "0",
//             padding: "0",
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "20px",
//             background: "none",
//           }}
//         >
//           {fields.map((field) => (
//             <div key={field.name} style={styles.fieldGroup}>
//               <label style={styles.label}>{field.label}</label>
//               {field.type === "textarea" ? (
//                 <textarea
//                   name={field.name}
//                   value={(formData as any)[field.name] || ""}
//                   onChange={handleChange}
//                   style={styles.input}
//                   required={field.required}
//                 />
//               ) : field.type === "workType" ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: "20px",
//                   }}
//                 >
//                   <div>
//                     <label>Image</label>
//                     <input
//                       type="radio"
//                       name={field.name}
//                       value={(formData as any)[field.name] || ""}
//                       onChange={handleChange}
//                       style={styles.input}
//                     />
//                   </div>
//                   <div>
//                     <label>Video</label>
//                     <input
//                       type="radio"
//                       name={field.name}
//                       value={(formData as any)[field.name] || ""}
//                       onChange={handleChange}
//                       style={styles.input}
//                     />
//                   </div>
//                 </div>
//               ) : field.type === "workTools" ? (
//                 <div>
//                   <div>1</div>
//                   <div>2</div>
//                   <div>3</div>
//                   <div>4</div>
//                 </div>
//               ) : (
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={(formData as any)[field.name] || ""}
//                   onChange={handleChange}
//                   style={styles.input}
//                   required={field.required}
//                   placeholder={field.placeholder}
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         <div style={styles.actions}>
//           <button type="button" onClick={onCancel} style={styles.cancelBtn}>
//             Cancel
//           </button>
//           <button type="submit" style={styles.submitBtn}>
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
