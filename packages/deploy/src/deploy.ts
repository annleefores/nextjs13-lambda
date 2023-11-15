import { filePath, term } from "./utils";

export const tfDeploy = async () => {
  const { tfPath } = filePath();
  console.log("Running deploy command.....");
  await term(`terraform -chdir=${tfPath}/ apply --auto-approve`);
  console.log("\nDeploy complete!");
  console.log(
    "\nWait for CloudFront Deployment/Invalidation to complete....\n"
  );
};

export const tfDelete = async () => {
  const { tfPath } = filePath();
  console.log("Running deployment delete command.....");
  await term(`terraform -chdir=${tfPath}/ destroy --auto-approve`);
  console.log("Delete complete!");
};
