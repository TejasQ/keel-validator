import "@types/golang-wasm-exec"

declare global {
    var keel: keel | undefined;
}

export interface keel {
    format(schema: string): Promise<string>
    validate(req: ValidateRequest): Promise<ValidationResult>
    completions(
        req: GetCompletionsRequest
    ): Promise<CompletionResult>
    getDefinition(
        req: GetDefinitionRequest
    ): Promise<DefinitionResult>
}

interface DefinitionResult {
    schema?: Position;
    function?: { name: string };
}

interface SchemaDefinition {
    schema: SchemaDefinition;
}

interface GetCompletionsRequest {
    position: Position;
    schemaFiles: SchemaFile[];
    config?: string;
}

interface GetDefinitionRequest {
    position: Position;
    schemaFiles: SchemaFile[];
}

interface ValidateRequest {
    schemaFiles: SchemaFile[];
    config?: string;
}

interface SchemaFile {
    filename: string;
    contents: string;
}

interface Position {
    filename: string;
    line: number;
    column: number;
}

interface CompletionItem {
    description: string;
    label: string;
    insertText: string;
    kind: string;
}

interface CompletionResult {
    completions: CompletionItem[];
}

interface ValidationError {
    code: string;
    pos: Position;
    endPos: Position;
    hint: string;
    message: string;
}

interface ValidationResult {
    errors: ValidationError[];
}
