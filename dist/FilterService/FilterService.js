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
        const requestedFields = filterFields !== null && filterFields !== void 0 ? filterFields : this.requestedFields;
        if (!Array.isArray(results)) {
            return this.filterSingleResult(results, requestedFields);
        }
        return results.map(result => this.filterSingleResult(result, requestedFields));
    }
    filterSingleResult(result, requestedFields) {
        if (result === null || result === undefined) {
            return result;
        }
        const filteredResult = {};
        for (const requestedField of requestedFields) {
            if (requestedField.subfields && requestedField.subfields.length > 0) {
                filteredResult[requestedField.id] = this.filterFields(result[requestedField.id], requestedField.subfields);
            }
            else {
                filteredResult[requestedField.id] = result[requestedField.id];
            }
        }
        return filteredResult;
    }
}
exports.FilterService = FilterService;
