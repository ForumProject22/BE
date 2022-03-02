"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
(0, db_1.default)();
//middleware
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, morgan_1.default)("common");
//Routes
app.get('/', (req, res) => {
    res.status(200).json({ api: 'UP' });
});
app.use("/fd", routes_1.default);
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
