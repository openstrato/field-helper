"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldHelper = void 0;
const FilterService_1 = require("./FilterService/FilterService");
function fieldHelper() {
    const filterService = new FilterService_1.FilterService();
    const helper = {
        filter: filterService,
    };
    return helper;
}
exports.fieldHelper = fieldHelper;
