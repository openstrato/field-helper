import { Field } from "..";

export class FilterService
{
    constructor(
        private requestedFields: Field[]
    ){}

    filterFields(results: any, filterFields?: Field[]): any[]
    {
        if (this.requestedFields.length === 0) {
            return results;
        }

        const filteredResults: any[] = [];
        const requestedFields = filterFields ?? this.requestedFields;

        for (const result of results) {
            const filteredResult: any = {};

            for (const requestedField of requestedFields) {

                if (requestedField.subfields && requestedField.subfields.length > 0) {
                    filteredResult[requestedField.id] = this.filterFields(result[requestedField.id], requestedField.subfields);
                } else {
                    filteredResult[requestedField.id] = result[requestedField.id];
                }
            }

            filteredResults.push(filteredResult);
        }
        
        return filteredResults;
    }
}
