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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanSchema = exports.Loan = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const books_schema_1 = require("../../books/schemas/books.schema");
const member_schema_1 = require("../../members/schemas/member.schema");
let Loan = class Loan extends mongoose_2.Document {
};
exports.Loan = Loan;
__decorate([
    (0, mongoose_1.Prop)({ type: books_schema_1.Book, required: true }),
    __metadata("design:type", books_schema_1.Book)
], Loan.prototype, "book", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: member_schema_1.Member, required: true }),
    __metadata("design:type", member_schema_1.Member)
], Loan.prototype, "member", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Loan.prototype, "loanDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Loan.prototype, "returnDate", void 0);
exports.Loan = Loan = __decorate([
    (0, mongoose_1.Schema)()
], Loan);
exports.LoanSchema = mongoose_1.SchemaFactory.createForClass(Loan);
//# sourceMappingURL=loans.schema.js.map