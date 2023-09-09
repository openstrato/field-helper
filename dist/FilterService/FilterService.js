"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterService = void 0;
class FilterService {
    constructor(requestedFields) {
        this.requestedFields = requestedFields;
    }
    filterFields(results, filterFields) {
        if (this.requestedFields.length === 0) {
            return results;
        }
        const filteredResults = [];
        const requestedFields = filterFields !== null && filterFields !== void 0 ? filterFields : this.requestedFields;
        for (const result of results) {
            const filteredResult = {};
            for (const requestedField of requestedFields) {
                if (requestedField.subfields && requestedField.subfields.length > 0) {
                    filteredResult[requestedField.id] = this.filterFields(result[requestedField.id], requestedField.subfields);
                }
                else {
                    filteredResult[requestedField.id] = result[requestedField.id];
                }
            }
            filteredResults.push(filteredResult);
        }
        return filteredResults;
    }
}
exports.FilterService = FilterService;
