"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
require("reflect-metadata");
const users_route_1 = require("./routes/users.route");
const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN ?? 'http://localhost:5173';
const app = (0, express_1.default)();
exports.app = app;
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: [CORS_ALLOWED_ORIGIN, 'http://localhost:5173'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/users', users_route_1.usersRouter);
app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});
