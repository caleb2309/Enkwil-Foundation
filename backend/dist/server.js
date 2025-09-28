"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./config/db"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const tutorRoutes_1 = __importDefault(require("./routes/tutorRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/tutor', tutorRoutes_1.default);
app.use('/api/v1/admin', adminRoutes_1.default);
(0, db_1.default)();
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on Port: ${PORT}...`);
});
