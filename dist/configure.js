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
exports.configure = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
function configure(configuration, options) {
    const envFilePath = require.main
        ? (0, path_1.join)((0, path_1.dirname)(require.main.filename), '../.env')
        : options === null || options === void 0 ? void 0 : options.envFilePath;
    if (envFilePath) {
        dotenv.config({ path: envFilePath, override: true });
    }
    const processEnv = process.env;
    const config = {};
    for (const key in configuration) {
        const entry = configuration[`${key}`];
        if ('default' in entry) {
            config[`${key}`] = entry.default;
        }
        if (entry.env) {
            const envResolved = entry.env(processEnv);
            if (typeof envResolved === 'undefined' ||
                (typeof envResolved === 'number' && isNaN(envResolved))) {
                if (!('default' in entry)) {
                    throw new Error(`Config variable '${key}' cannot be '${typeof envResolved}'`);
                }
                // Will leave the config set to the default value
                continue;
            }
            config[`${key}`] = envResolved;
        }
    }
    return config;
}
exports.configure = configure;
//# sourceMappingURL=configure.js.map