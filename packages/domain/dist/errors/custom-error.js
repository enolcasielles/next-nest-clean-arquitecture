export class CustomError extends Error {
    constructor(message) {
        super(message);
        this.errors = [];
        this.payload = {};
        this.code = -1;
        this.name = this.constructor.name;
    }
    setPayload(payload) {
        this.payload = payload;
    }
    setCode(code) {
        this.code = code;
    }
    addError(error) {
        this.errors.push(error);
    }
}
//# sourceMappingURL=custom-error.js.map