import Stream from "node:stream";
import { env } from "./src/core/config/env";

const response = await fetch(`${env.OLLAMA_BASE_URL}/api/chat`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
    },
    body:JSON.stringify({
        model:env.OLLAMA_MODEL,
        message: [{
            role: "user",
            content:"say hello in one short sentence."
        }],
        Stream: false
    })
})

const result = await response.json()
console.log(JSON.stringify(result, null, 2));
