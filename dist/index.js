"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config('myDataBase', true, false, '/'));
const app = new koa_1.default();
app.use((0, koa_bodyparser_1.default)());
const router = new koa_router_1.default();
router.get('/partners', (ctx, next) => {
    const { name } = ctx.params;
    try {
        //Will be typed as Partner in your IDE
        const result = db.getObject(`/`);
        // ctx.router available
        ctx.body = Object.keys(result);
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = 'Partner already exists';
    }
});
router.get('/partner/:name', (ctx, next) => {
    const { name } = ctx.params;
    const partnerExists = db.exists(`/${name}`);
    try {
        if (!partnerExists)
            throw new Error('Partner doesnt exist');
        //Will be typed as Partner in your IDE
        const result = db.getObject(`/${name}`);
        // ctx.router available
        ctx.body = result;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = 'Partner doesnt exist';
    }
});
router.post('/partner/:name', (ctx, next) => {
    const body = ctx.request.body;
    const { name } = ctx.params;
    const partnerExists = db.exists(`/${name}`);
    try {
        if (partnerExists)
            throw new Error('Partner already exists');
        db.push(`/${name}`, body);
        //Will be typed as Partner in your IDE
        const result = db.getObject(`/${name}`);
        // ctx.router available
        ctx.body = result;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = 'Partner already exists';
    }
});
router.put('/partner/:name', (ctx, next) => {
    const body = ctx.request.body;
    const { name } = ctx.params;
    const partnerExists = db.exists(`/${name}`);
    try {
        if (!partnerExists)
            throw new Error('Partner doesnt exist');
        db.push(`/${name}`, body, false);
        //Will be typed as Partner in your IDE
        const result = db.getObject(`/${name}`);
        // ctx.router available
        ctx.body = result;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = 'Partner doesnt exists';
    }
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
