import { keel } from "./types";

type Error = Awaited<ReturnType<keel['validate']>>['errors'][-1];

export const sanitizeValidationErrors = (errors: Error[]) => {
    if (!errors.length) return "No errors :)";

    return errors.reduce((acc, error) => {
        const {
            pos,
            endPos,
            message,
        } = error;
        acc += `- ${message} on line ${pos.line}:${pos.column} until ${endPos.line}:${endPos.column}\n`;
        return acc;
    }, "Failed with these errors:\n\n");
}