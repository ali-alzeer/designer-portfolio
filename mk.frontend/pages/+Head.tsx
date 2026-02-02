import logoUrl from "../assets/logo.ico";
export function Head() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&q=80&w=800"
      />
    </>
  );
}
