export interface Work {
  id: number;
  title: string;
  description: string;
  type: string;
  publicWorkMediaUrl: string;
  toolsIds?: number[];
  createdOn: Date;
  updatedOn: Date;
}
