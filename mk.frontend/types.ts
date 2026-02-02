export type Movie = {
  id: string;
  title: string;
  release_date: string;
};

export type MovieDetails = Movie & {
  director: string;
  producer: string;
};

export type Work = {
  id: number;
  title: string;
  description: string;
  type: string;
  publicWorkMediaUrl: string;
  toolsIds: number[];
  createdOn: Date;
  updatedOn: Date;
};
