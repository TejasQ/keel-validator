import { keel } from "./types";

type Error = Awaited<ReturnType<keel['validate']>>['errors'][-1];

export const sanitizeValidationErrors = (errors: Error[]) => {
    if (!errors.length) return "No errors :)";

    return errors.reduce((acc, error) => {
        const {
            pos,
            endPos,
            message,
            hint,
        } = error;
        const shouldShowEndLine = pos.line !== endPos.line;
        acc += `- Line ${pos.line}${shouldShowEndLine ? `-${endPos.line}` : ''}: ${message}. ${hint}\n`;
        return acc;
    }, "Failed with these errors:\n\n");
}