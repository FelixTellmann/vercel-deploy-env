import { promises as fs } from "fs";

const [, , filePath] = process.argv;
const shebang = "#!/usr/bin/env node\n";
const contents = await fs.readFile(filePath, "utf-8");

await fs.writeFile(filePath, shebang + contents);

