import crypto from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const passwordArg = process.argv[2];
const rl = passwordArg
  ? null
  : createInterface({
      input,
      output,
    });

const password = passwordArg ?? (await rl.question("Admin password: "));
rl?.close();

if (!password || password.length < 12) {
  console.error("Use a password with at least 12 characters.");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("base64url");
const n = 16384;
const r = 8;
const p = 1;
const hash = crypto
  .scryptSync(password, salt, 64, { N: n, p, r })
  .toString("base64url");

console.log(`scrypt$${n}$${r}$${p}$${salt}$${hash}`);
