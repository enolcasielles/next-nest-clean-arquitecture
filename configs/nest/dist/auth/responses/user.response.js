"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
class UserResponse {
    static fromUserEntity(user) {
        return {
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
}
exports.UserResponse = UserResponse;
//# sourceMappingURL=user.response.js.map