import path from "path";
import { fileURLToPath } from "url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

export const uploadsDir = path.resolve(configDir, "..", "uploads");
