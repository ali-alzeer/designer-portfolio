import { useData } from "vike-react/useData";
import type { Data } from "./+data.client.js";
import { useEffect } from "react";

export default function Page() {
  // const { movie } = useData<Data>();
  const { movie } = useData<Data>() || { movie: [] };
  useEffect(() => {
    console.log("koko");
  }, []);
  return (
    <>
      <h1>{movie.title}</h1>
      Release Date: {movie.release_date}
      <br />
      Director: {movie.director}
      <br />
      Producer: {movie.producer}
    </>
  );
}
