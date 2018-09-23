"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var config_1 = require("./config");
var Server = /** @class */ (function () {
    function Server() {
        this.serverApp = express_1.default();
        this.appRouter = new router_1.default(this.serverApp);
    }
    Server.prototype.config = function (serverApp) {
        serverApp.use(body_parser_1.default.json({ limit: "50mb" }));
        serverApp.use(body_parser_1.default.urlencoded({
            extended: true,
            limit: "50mb",
            parameterLimit: 100000000
        }));
        serverApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Credentials", "true");
            // Intercept OPTIONS Method
            if (req.method == "OPTIONS") {
                res.header("Access-Control-Allow-Method", "GET,POST,PATCH,DELETE,PUT");
                res.send(200);
            }
            else {
                next();
            }
        });
    };
    Server.prototype.routes = function (serverApp, routerlink) {
        serverApp.use(function (req, res, next) {
            if (!serverApp.get("mongoConnection")) {
                var conString = config_1.Config.MONGO_CON_URL;
            }
            else {
            }
        });
    };
    return Server;
}());
exports.default = new Server();
