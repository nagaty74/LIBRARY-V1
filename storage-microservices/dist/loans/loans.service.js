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
exports.LoansService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const loans_schema_1 = require("./schemas/loans.schema");
const books_schema_1 = require("../books/schemas/books.schema");
const member_schema_1 = require("../members/schemas/member.schema");
let LoansService = class LoansService {
    constructor(loanModel, bookModel, memberModel) {
        this.loanModel = loanModel;
        this.bookModel = bookModel;
        this.memberModel = memberModel;
    }
    async create(loanData) {
        const book = await this.bookModel.findById(loanData.book).exec();
        const member = await this.memberModel.findById(loanData.member).exec();
        const createdLoan = new this.loanModel({
            ...loanData,
            book,
            member
        });
        return createdLoan.save();
    }
    async findAll() {
        return this.loanModel.find().populate('book').populate('member').exec();
    }
    async findOne(id) {
        return this.loanModel.findById(id).populate('book').populate('member').exec();
    }
    async update(id, updatedLoanData) {
        const book = await this.bookModel.findById(updatedLoanData.book).exec();
        const member = await this.memberModel.findById(updatedLoanData.member).exec();
        return this.loanModel.findByIdAndUpdate(id, {
            ...updatedLoanData,
            book,
            member
        }, { new: true }).exec();
    }
    async delete(id) {
        return this.loanModel.findOneAndDelete({ _id: id }).exec();
    }
};
exports.LoansService = LoansService;
exports.LoansService = LoansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(loans_schema_1.Loan.name)),
    __param(1, (0, mongoose_1.InjectModel)(books_schema_1.Book.name)),
    __param(2, (0, mongoose_1.InjectModel)(member_schema_1.Member.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LoansService);
//# sourceMappingURL=loans.service.js.map