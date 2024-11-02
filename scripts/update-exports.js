import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Set up __dirname and __filename for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjusted paths to src directory and package.json
const srcDir = path.resolve(__dirname, "../src"); // src directory in the parent folder
const packageJsonPath = path.resolve(__dirname, "../package.json"); // package.json in the parent folder

// Read and parse package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

// Function to update exports field in package.json
function updateExports() {
  const exports = {
    ".": {
      require: "./dist/index.cjs",
      import: "./dist/index.mjs",
    },
  };

  // Read all folders in src directory
  fs.readdirSync(srcDir).forEach((folder) => {
    const folderPath = path.join(srcDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      // Add each module to exports
      exports[`./${folder}`] = {
        require: `./dist/${folder}/index.cjs`,
        import: `./dist/${folder}/index.mjs`,
      };
    }
  });

  // Update package.json exports
  packageJson.exports = exports;

  // Write updated package.json back to file
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n"
  );
  console.log("package.json exports field updated successfully.");
}

// Run the update function
updateExports();
