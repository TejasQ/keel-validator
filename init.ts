import type { keel } from "./types";

export const getKeel = async () => {
    await import("./lib/wasm_exec_node.js");
    if (globalThis.keel) {
        return globalThis.keel;
    }
    const go = new Go()
    const { wasm } = require("./lib/wasm.js");
    const module = await WebAssembly.instantiate(wasm, go.importObject);
    const instance = module.instance;
    go.run(instance); // Populate the global namespace with `keel`
    return globalThis.keel as unknown as keel;
}