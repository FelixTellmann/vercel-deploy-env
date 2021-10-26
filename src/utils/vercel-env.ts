import { exec, limit } from "../helpers/helpers";
import { printStdout } from "../helpers/print";
import { getEnvMap } from "./get-env";
import type { DeploymentEnv, EnvMap } from "../types/shared";

const removeEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  const throttled = limit(async (varName) =>
    exec(`vercel env rm ${varName} ${deploymentEnv} -y`).then(printStdout)
  );

  for (const varName in envMap) {
    await (async () => {
      console.log(await throttled(varName));
    })();
  }
};

const addEnv = async (deploymentEnv: DeploymentEnv, envMap: EnvMap) => {
  const throttled = limit(async (varName: string) =>
    exec(`printf %s "${envMap[varName]}" | vercel env add ${varName} ${deploymentEnv}`).then(
      printStdout
    )
  );

  for (const varName in envMap) {
    await (async () => {
      console.log(await throttled(varName));
    })();
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
