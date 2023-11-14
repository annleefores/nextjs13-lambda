import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const filePath = () => {
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

const term = (command: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { shell: true });

    child.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`${data}`);
    });

    child.on("close", (code) => {
      console.log(`Nextjs build complete, code ${code}`);
      resolve(code!);
    });

    child.on("error", (error) => {
      console.error(`Error: ${error}`);
      reject(error);
    });
  });
};

const nextjsBuild = async () => {
  console.log("Running Next Build......");
  await term("npm run build");
};

const nextPackage = () => {
  console.log("Copying static files.....");
  const { srcPath, publicPath, standaloneOutputPath } = filePath();

  const destPublic = path.join(standaloneOutputPath, "public");

  // Copy public files to standalone
  if (fs.existsSync(publicPath)) {
    if (!fs.existsSync(destPublic)) {
      fs.mkdirSync(destPublic, { recursive: true });
    }
    fs.cpSync(publicPath, destPublic, { recursive: true });

    // Copy favicon
    const faviconPath = path.join(srcPath, "favicon.ico");

    if (fs.existsSync(faviconPath)) {
      fs.copyFileSync(faviconPath, path.join(destPublic, "favicon.ico"));
    }
  }
};

const CreateRunScript = () => {
  const { standaloneOutputPath } = filePath();

  // run bash script code
  const script = `#!/bin/bash
[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache
exec node server.js`;

  fs.writeFile(`${standaloneOutputPath}/run.sh`, script, (err) => {
    if (err) throw err;
    console.log("Run script created successfully!");
  });
};

export const build = async () => {
  await nextjsBuild();
  nextPackage();
  CreateRunScript();
};
