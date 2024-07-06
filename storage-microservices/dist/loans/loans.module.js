"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const loans_schema_1 = require("./schemas/loans.schema");
const loans_service_1 = require("./loans.service");
const loans_controller_1 = require("./loans.controller");
const books_module_1 = require("../books/books.module");
const members_module_1 = require("../members/members.module");
let LoansModule = class LoansModule {
};
exports.LoansModule = LoansModule;
exports.LoansModule = LoansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: loans_schema_1.Loan.name, schema: loans_schema_1.LoanSchema }]),
            books_module_1.BooksModule,
            members_module_1.MembersModule,
        ],
        providers: [loans_service_1.LoansService],
        controllers: [loans_controller_1.LoansController],
    })
], LoansModule);
//# sourceMappingURL=loans.module.js.map