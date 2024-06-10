import dotenv from "dotenv";

export default function init() {
    dotenv.config({path: [".env", ".env.local"], override: true})
}
