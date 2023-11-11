import type { keel } from "./types";

export const getKeel = async () => {
    await import("./lib/wasm_exec_node.js");
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    if (globalThis.keel) {
        return globalThis.keel;
    }
    const go = new Go()
    const wasmBuffer = await readFile(join(__dirname, "lib", "main.wasm"));
    const module = await WebAssembly.instantiate(wasmBuffer, { gojs: go.importObject.go });
    const instance = module.instance;
    go.run(instance); // Populate the global namespace with `keel`
    return globalThis.keel as unknown as keel;
}