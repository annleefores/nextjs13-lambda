import path from "path";
import fs from "fs";
import { spawn } from "child_process";

export const filePath = () => {
  const appPath = path.join(process.cwd(), ".");
  const srcOrApp = fs.existsSync(path.join(appPath, "src")) ? "src/app" : "app";
  const srcPath = path.join(appPath, srcOrApp);
  return {
    srcPath: srcPath,
    publicPath: path.join(appPath, "public"),
    appPath: appPath,
    standaloneOutputPath: path.join(appPath, ".next", "standalone"),
    staticOutputPath: path.join(appPath, ".next", "static"),
  };
};

export const term = (command: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { shell: true });

    child.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`${data}`);
    });

    child.on("close", (code) => {
      console.log(`Command run complete, ${code}`);
      resolve(code!);
    });

    child.on("error", (error) => {
      console.error(`Error: ${error}`);
      reject(error);
    });
  });
};
