import { delay, exec } from "../helpers/helpers";
import { printStdout } from "../helpers/print";
import { getEnvMap } from "./get-env";
import type { DeploymentEnv, EnvMap } from "../types/shared";

const removeEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  for (const varName in envMap) {
    const startTime = Date.now();
    exec(`vercel env rm ${varName} ${deploymentEnv} -y`).then(printStdout);
    await delay(1200);
    // console.log(`${Date.now() - startTime}ms`);
  }
};

const addEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  for (const varName in envMap) {
    const startTime = Date.now();
    exec(`printf %s "${envMap[varName]}" | vercel env add ${varName} ${deploymentEnv}`).then(
      printStdout
    );
    await delay(1200);
    // console.log(`${Date.now() - startTime}ms`);
  }
};

export const deployEnv = async (
  deploymentEnv: DeploymentEnv,
  varNameArr?: string[]
): Promise<void> => {
  const envMap = await getEnvMap(deploymentEnv, varNameArr);

  await removeEnv(deploymentEnv, envMap);
  await addEnv(deploymentEnv, envMap);
};
