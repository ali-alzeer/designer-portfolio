export interface WorkUpdateDTO {
  id: number;
  title: string;
  description: string;
  type: string;
  publicWorkMediaUrl: string;
  toolsIds?: number[];
}
