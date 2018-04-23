import { config } from "@speedy/node-core";
import { join } from "path";

export const getConfigFilePath = (file: string) => config.getConfigFilePath(file, join(__dirname, "../../config"));