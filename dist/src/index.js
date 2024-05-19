"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let ETH_BALANCE = 200;
let USDT_BALANCE = 600000; //impermanent loss
app.post("/buy-asset", (req, res) => {
    const quantity = req.body.quantity;
    const updatedETHQuantity = ETH_BALANCE - quantity;
    const updatedUSDTBalance = ETH_BALANCE * USDT_BALANCE / updatedETHQuantity;
    const paidAmount = updatedUSDTBalance - USDT_BALANCE;
    ETH_BALANCE = updatedETHQuantity;
    USDT_BALANCE = updatedUSDTBalance;
    res.json({
        message: `You paid ${paidAmount} USDT for ${quantity} ETH`
    });
});
app.post("/sell-asset", (req, res) => {
    const quantity = req.body.quantity;
    const updatedETHQuantity = ETH_BALANCE + quantity;
    const updatedUSDTBalance = ETH_BALANCE * USDT_BALANCE / updatedETHQuantity;
    const gottenUSDT = USDT_BALANCE - updatedUSDTBalance;
    ETH_BALANCE = updatedETHQuantity;
    USDT_BALANCE = updatedUSDTBalance;
    res.json({
        message: `You got ${gottenUSDT} USDT for ${quantity} ETH`
    });
});
app.listen(3000);
