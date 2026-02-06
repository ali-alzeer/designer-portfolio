/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T | null;
  errors: string[] | null;
  statusCode: number;
}

interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Work extends BaseEntity {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: string;
  publicWorkMediaUrl: string;
  tools: Tool[];
}

export interface Tool extends BaseEntity {
  title: string;
  publicToolImageUrl: string;
}

export interface ContactInfo extends BaseEntity {
  titleAr: string;
  titleEn: string;
  url: string;
  icon: string;
}

export interface AuthResponse extends BaseEntity {
  token: string;
  mainImageUrl: string;
  lastLoginIn: Date;
}

export interface WorkDto {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: string;
  publicWorkMediaUrl: string;
  toolsIds: string[];
}

export interface UpdateProfileDto {
  mainImageUrl?: string;
  newPassword?: string;
}

export interface ToolDto {
  title: string;
  publicToolImageUrl: string;
}

export interface ContactInfoDto {
  titleAr: string;
  titleEn: string;
  url: string;
  icon: string;
}

export interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  styles?: React.CSSProperties;
  renderCustom?: (
    value: any,
    onChange: (val: any) => void,
    isReadOnly: boolean,
  ) => React.ReactNode;
}
export interface DynamicFormProps {
  fields: Field[];
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  title: string;
  formLoading: boolean;
  formErrors: string[] | null;
  isReadOnly: boolean;
  formColor: string;
  gridColumns: string;
}

export interface PageError {
  statusCode: string;
  errorMessage: string;
}
