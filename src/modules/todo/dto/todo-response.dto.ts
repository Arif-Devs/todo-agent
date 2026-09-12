export interface TodoResponseDto{
    id: string
    title: string
    description: string |null
    completed: boolean
    createdAt: Date
    updatedAt: Date
}