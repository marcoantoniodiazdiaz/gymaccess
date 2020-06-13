"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
router_1.app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        status: 'El servidor esta en linea'
    });
});
exports.default = router_1.app;
