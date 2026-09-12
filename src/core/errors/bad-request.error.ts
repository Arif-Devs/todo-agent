import { AppError } from "./app-error.js";

export class BadRequest extends AppError {
    constructor(message: string){
        super(message, 400)
    }
}