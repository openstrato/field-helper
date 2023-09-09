"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldHelper = void 0;
const FilterService_1 = require("./FilterService/FilterService");
const getRequestedFields = (requestedFieldsCsv) => {
    if (!requestedFieldsCsv || requestedFieldsCsv.length === 0) {
        return [];
    }
    const fields = [];
    let currentFieldString = '';
    let currentParentField = undefined;
    for (let i = 0; i <= requestedFieldsCsv.length; i++) {
        const char = requestedFieldsCsv[i];
        if ([',', '(', ')'].includes(char) || i === requestedFieldsCsv.length) {
            const currentField = {
                id: currentFieldString,
                subfields: [],
                parent: currentParentField
            };
            if (currentFieldString.length > 0) {
                if (currentParentField) {
                    currentParentField.subfields.push(currentField);
                }
                else {
                    fields.push(currentField);
                }
            }
            if (char === '(') {
                currentParentField = currentField;
            }
            else if (char === ')') {
                currentParentField = currentParentField.parent;
            }
            currentFieldString = '';
        }
        else {
            currentFieldString += char;
        }
    }
    return fields;
};
function fieldHelper(requestedFieldsCsv) {
    const requestedFields = getRequestedFields(requestedFieldsCsv);
    const filterService = new FilterService_1.FilterService(requestedFields);
    const helper = {
        filter: filterService,
    };
    return helper;
}
exports.fieldHelper = fieldHelper;
