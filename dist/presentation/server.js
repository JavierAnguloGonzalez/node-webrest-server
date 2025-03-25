"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        const { port, routes, public_Path = 'public' } = options;
        this.port = port;
        this.publicPath = public_Path;
        this.routes = routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            //*middlewares
            this.app.use(express_1.default.json()); //raw json
            this.app.use(express_1.default.urlencoded({ extended: true })); // x-www-form-urlencoded
            //* public folder
            this.app.use(express_1.default.static(this.publicPath));
            //*Routes
            this.app.use(this.routes);
            // this.app.get('/api/todos', (req, res)=>{
            //     res.json([
            //         {id: 1, text: 'compra milechessssss', createdAt: new Date()},
            //         {id: 2, text: 'compra platanos', createdAt: null},
            //         {id: 3, text: 'compra vaselina', createdAt: new Date()},
            //     ]);
            // })
            //* SPA
            this.app.get('*', (req, res) => {
                const indexPath = path_1.default.join(__dirname + '../../../public/index.html');
                res.sendFile(indexPath);
            });
            this.app.listen(this.port, () => {
                console.log('Server is running on port 3000');
            });
        });
    }
}
exports.Server = Server;
