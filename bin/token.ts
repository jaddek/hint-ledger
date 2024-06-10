import dotenv from "dotenv";
import {generateAccessTokenForCareerCollector} from "../src/security/auth";

dotenv.config({path: [".env", ".env.local"], override: true})

let token: string = generateAccessTokenForCareerCollector();

process.stdout.write(`Token:` + "\n" + `${token}` + "\n");
