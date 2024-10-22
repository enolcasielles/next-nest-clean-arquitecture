"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponse = void 0;
class ProductResponse {
    static fromProductEntity(product) {
        return {
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
        };
    }
}
exports.ProductResponse = ProductResponse;
//# sourceMappingURL=product.response.js.map