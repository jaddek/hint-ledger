import process from "node:process";

export function getProcessEnv(key: string, defaultValue: undefined | number | string = undefined): string | null | number {
    const value: undefined | null | number | string = process.env[key] || defaultValue

    if (value === undefined) {
        throw new Error(`Invalid env. Key ${key} should be defined in .env.`)
    }

    return value;
}


