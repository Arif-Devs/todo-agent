import { todoTools } from "../registry/todo-tools.js"

type ToolFunction = (input: unknown) => Promise<unknown>;

export const dispatchTool = async (toolName: string, arguments_: unknown) => {
    const tool = todoTools[toolName as keyof typeof todoTools] as ToolFunction
    if(!tool) {
        throw new Error(`unknown tool: ${toolName}`)
    }
    
    return tool(arguments_)
}