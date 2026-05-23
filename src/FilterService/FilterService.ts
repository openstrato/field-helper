import { Field } from "..";

export class FilterService
{
    constructor(
        private requestedFields: Field[]
    ){}

    filterFields(results: any, filterFields?: Field[]): any
    {
        if (this.requestedFields.length === 0) {
            return results;
        }

        const requestedFields = filterFields ?? this.requestedFields;

        if (!Array.isArray(results)) {
            return this.filterSingleResult(results, requestedFields);
        }

        return results.map(result => this.filterSingleResult(result, requestedFields));
    }

    private filterSingleResult(result: any, requestedFields: Field[]): any
    {
        if (result === null || result === undefined) {
            return result;
        }

        const filteredResult: any = {};

        for (const requestedField of requestedFields) {
            if (requestedField.subfields && requestedField.subfields.length > 0) {
                filteredResult[requestedField.id] = this.filterFields(result[requestedField.id], requestedField.subfields);
            } else {
                filteredResult[requestedField.id] = result[requestedField.id];
            }
        }

        return filteredResult;
    }
}
