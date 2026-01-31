import logoUrl from "../assets/logo.ico";
export function Head() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dwrnygn0d/image/upload/v1731421077/mainimagemk-min_mrhpp8.png"
      />
    </>
  );
}
