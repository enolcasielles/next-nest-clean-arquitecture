"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const application_1 = require("@marketplace/application");
const di_1 = require("@/core/di/di");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController],
        providers: [
            products_service_1.ProductsService,
            {
                provide: application_1.CreateProductUseCase,
                useFactory: () => new application_1.CreateProductUseCase({
                    productsRepository: di_1.DI.productsRepository,
                }),
            },
            {
                provide: application_1.GetProductsUseCase,
                useFactory: () => new application_1.GetProductsUseCase({
                    productsRepository: di_1.DI.productsRepository,
                    usersRepository: di_1.DI.usersRepository,
                }),
            },
            {
                provide: application_1.DeleteProductUseCase,
                useFactory: () => new application_1.DeleteProductUseCase({
                    productsRepository: di_1.DI.productsRepository,
                    usersRepository: di_1.DI.usersRepository,
                }),
            },
            {
                provide: application_1.UpdateProductUseCase,
                useFactory: () => new application_1.UpdateProductUseCase({
                    productsRepository: di_1.DI.productsRepository,
                    usersRepository: di_1.DI.usersRepository,
                }),
            },
        ],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map