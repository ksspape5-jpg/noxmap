import { extendTailwindMerge } from "tailwind-merge";

// Fusionne des classes Tailwind : en cas de conflit (ex. `px-5` puis `px-2`), la dernière l'emporte.
export const cn = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ["brand", "brand-lg"],
    },
  },
});
