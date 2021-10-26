import { promises as fs } from "fs";
import { exec as execCallback } from "child_process";
const { access } = fs;

export const delay = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time));

export const exists = (path: string): Promise<boolean> =>
  access(path)
    .then((_) => true)
    .catch((_) => false);

export const exec = (cmd: string): Promise<string> =>
  new Promise((res, _rej) => execCallback(cmd, (_, stdout, stderr) => res(stdout + stderr)));
