import { config } from "@speedy/node-core";

export const getConfigFilePath = (file: string) => config.getConfigFilePath(file, "../../config");