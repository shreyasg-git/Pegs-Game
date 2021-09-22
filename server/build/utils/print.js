"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRed = void 0;
var chalk_1 = __importDefault(require("chalk"));
var printRed = function (data) {
    console.log(chalk_1.default.red(data));
};
exports.printRed = printRed;
