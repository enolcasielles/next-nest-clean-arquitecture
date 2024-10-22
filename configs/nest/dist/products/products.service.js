"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const application_1 = require("@marketplace/application");
let ProductsService = class ProductsService {
    constructor(createProductUseCase, getProductsUseCase, deleteProductUseCase, updateProductUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.getProductsUseCase = getProductsUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
        this.updateProductUseCase = updateProductUseCase;
    }
    async create(userId, createProductDto) {
        const response = await this.createProductUseCase.execute({
            userId: userId,
            product: createProductDto,
        });
        return response;
    }
    async getProducts(userId, query) {
        const response = await this.getProductsUseCase.execute({
            userId,
            query,
        });
        return response;
    }
    async deleteProduct(userId, productId) {
        await this.deleteProductUseCase.execute({
            userId,
            productId,
        });
    }
    async updateProduct(userId, productId, updateProductDto) {
        const response = await this.updateProductUseCase.execute({
            userId,
            productId,
            product: updateProductDto,
        });
        return response;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof application_1.CreateProductUseCase !== "undefined" && application_1.CreateProductUseCase) === "function" ? _a : Object, typeof (_b = typeof application_1.GetProductsUseCase !== "undefined" && application_1.GetProductsUseCase) === "function" ? _b : Object, typeof (_c = typeof application_1.DeleteProductUseCase !== "undefined" && application_1.DeleteProductUseCase) === "function" ? _c : Object, typeof (_d = typeof application_1.UpdateProductUseCase !== "undefined" && application_1.UpdateProductUseCase) === "function" ? _d : Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map