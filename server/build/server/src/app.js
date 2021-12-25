"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
app.get("/hello", function (req, res) {
    res.status(200).json({ msg: "haalo" });
});
exports.default = app;
