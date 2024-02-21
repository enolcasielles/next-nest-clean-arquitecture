export declare class CustomError extends Error {
    errors: string[];
    payload: any;
    code: number;
    constructor(message: string);
    setPayload(payload: any): void;
    setCode(code: number): void;
    addError(error: string): void;
}
//# sourceMappingURL=custom-error.d.ts.map