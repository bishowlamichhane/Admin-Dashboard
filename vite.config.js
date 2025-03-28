import path from "path"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins:[react()],
  css:{
    postcss:{
      plugins: [ tailwindcss(),autoprefixer()],

    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    
  },
})
