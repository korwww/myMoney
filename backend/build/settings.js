"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_PRIVATE_KEY = exports.SALT_ROUNDS = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_DATABASE = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.PORT = parseInt(process.env.PORT || '3031');
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = parseInt(process.env.DB_PORT || '3306');
exports.DB_DATABASE = process.env.DB_DATABASE;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;
exports.TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY;
