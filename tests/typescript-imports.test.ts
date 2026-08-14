import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

test("TypeScript permite las extensiones requeridas por las pruebas nativas de Node", () => {
  const tsconfig = JSON.parse(
    readFileSync(path.join(process.cwd(), "tsconfig.json"), "utf8"),
  ) as { compilerOptions?: { allowImportingTsExtensions?: boolean } };

  assert.equal(tsconfig.compilerOptions?.allowImportingTsExtensions, true);
});
