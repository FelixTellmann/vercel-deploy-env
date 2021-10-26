import { delay, exec } from "../helpers/helpers";
import { printStdout } from "../helpers/print";
import { getEnvMap } from "./get-env";
import type { DeploymentEnv, EnvMap } from "../types/shared";

const removeEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  for (const varName in envMap) {
    exec(`vercel env rm ${varName} ${deploymentEnv} -y`).then(printStdout);
    await delay(500);
  }
};

const addEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  for (const varName in envMap) {
    exec(`printf %s "${envMap[varName]}" | vercel env add ${varName} ${deploymentEnv}`).then(
      printStdout
    );
    await delay(500);
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
