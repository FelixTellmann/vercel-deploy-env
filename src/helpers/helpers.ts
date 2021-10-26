import { promises as fs } from "fs";
import { exec as execCallback } from "child_process";
const { access } = fs;
import pThrottle from "p-throttle";

export const exists = (path: string): Promise<boolean> =>
  access(path)
    .then((_) => true)
    .catch((_) => false);

export const exec = (cmd: string): Promise<string> =>
  new Promise((res, _rej) => execCallback(cmd, (_, stdout, stderr) => res(stdout + stderr)));

export const limit = pThrottle({ limit: 2, interval: 1010 });
