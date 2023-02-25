import { defineConfig } from 'vite';
import glslify from 'rollup-plugin-glslify';

export default defineConfig({
  base: "/glsl/change_color/",
  plugins: [glslify()]
});