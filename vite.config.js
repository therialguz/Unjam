import { resolve, basename, extname, dirname, isAbsolute } from "path";
import { defineConfig } from "vite";
import { readdirSync, statSync } from "fs";
import dts from "vite-plugin-dts";

const srcDir = resolve(__dirname, "src");

// Generate an entry point for each TypeScript file in `src`, including files in subdirectories
const entries = readdirSync(srcDir).reduce((entryPoints, fileOrDir) => {
  const fullPath = resolve(srcDir, fileOrDir);
  const isDirectory = statSync(fullPath).isDirectory();

  if (isDirectory) {
    // For directories, add the `index.ts` file inside each as an entry
    entryPoints[fileOrDir] = resolve(fullPath, "index.ts");
  } else if (extname(fileOrDir) === ".ts" && !fileOrDir.endsWith(".d.ts")) {
    // For standalone TypeScript files in `src` (like `config.ts`), add them directly
    entryPoints[basename(fileOrDir, ".ts")] = fullPath;
  }

  return entryPoints;
}, {});

const getFileName = (chunk, extension) => {
  // Files directly in `src` should go to the root of `dist` (e.g., config.mjs)
  // Files in subdirectories should go to their own folders (e.g., moduleA/index.mjs)
  // Check if targetPath is within srcDir
  const targetPath = chunk.facadeModuleId;

  // Resolve both paths to their absolute forms to ensure consistency
  const absoluteFilePath = resolve(targetPath);
  const absoluteParentFolderPath = resolve(srcDir);

  // Get the directory containing the file
  const fileDirectory = dirname(absoluteFilePath);

  // Compare the file's directory with the parent folder path
  const isInSrcDir = fileDirectory === absoluteParentFolderPath;

  console.log(
    targetPath,
    absoluteFilePath,
    absoluteParentFolderPath,
    fileDirectory,
    isInSrcDir
  );

  return isInSrcDir
    ? `${chunk.name}.${extension}`
    : `${chunk.name}/index.${extension}`;
};

export default defineConfig({
  build: {
    lib: {
      entry: entries,
    },
    rollupOptions: {
      input: entries,
      output: [
        {
          // ESM format
          format: "es",
          entryFileNames: (chunk) => getFileName(chunk, "mjs"),
          dir: "dist",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
        {
          // CJS format
          format: "cjs",
          entryFileNames: (chunk) => getFileName(chunk, "cjs"),
          dir: "dist",
          preserveModules: true,
          preserveModulesRoot: "src",
        },
      ],
    },
  },
  test: {
    globals: true,
  },
  plugins: [dts({ exclude: "**/*.test.ts" })],
});
