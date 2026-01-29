import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((count) => count + 1);
    console.log(count);
  };

  return (
    <button
      type="button"
      className={
        "inline-block border border-black rounded bg-gray-200 px-2 py-1 text-xs font-medium uppercase leading-normal"
      }
      onClick={increment}
    >
      Counter {count}
    </button>
  );
}
