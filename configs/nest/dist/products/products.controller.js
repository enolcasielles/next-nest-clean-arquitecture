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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("@marketplace/domain");
const roles_decorator_1 = require("@/auth/roles.decorator");
const basic_response_1 = require("@/core/responses/basic.response");
const product_response_1 = require("./responses/product.response");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(userId, createProductRequest) {
        const product = await this.productsService.create(userId, createProductRequest);
        return product_response_1.ProductResponse.fromProductEntity(product);
    }
    async getProducts(userId, getProductsRequest) {
        const response = await this.productsService.getProducts(userId, getProductsRequest);
        return {
            ...response,
            items: response.items.map((i) => product_response_1.ProductResponse.fromProductEntity(i)),
        };
    }
    async deleteProduct(userId, productId) {
        await this.productsService.deleteProduct(userId, productId);
        return basic_response_1.BasicResponse.success();
    }
    async updateProduct(userId, productId, updateProductRequest) {
        const product = await this.productsService.updateProduct(userId, productId, updateProductRequest);
        return product_response_1.ProductResponse.fromProductEntity(product);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)([domain_1.Role.User]),
    __param(0, (0, common_1.Headers)('user-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)([domain_1.Role.User, domain_1.Role.Admin]),
    __param(0, (0, common_1.Headers)('user-id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Delete)(':productId'),
    (0, roles_decorator_1.Roles)([domain_1.Role.User, domain_1.Role.Admin]),
    __param(0, (0, common_1.Headers)('user-id')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Put)(':productId'),
    (0, roles_decorator_1.Roles)([domain_1.Role.User, domain_1.Role.Admin]),
    __param(0, (0, common_1.Headers)('user-id')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map