export class ToolError extends Error {
    constructor(
        public readonly code: string,
        message: string,
        public readonly status?: number
    ){
        super (message)
        this.name = "ToolError"
    }
}