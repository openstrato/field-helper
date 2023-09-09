import { FilterService } from "./FilterService/FilterService";

export interface Field {
    id: string;
    subfields?: Field[];
    parent?: Field;
}

const getRequestedFields = (requestedFieldsCsv: string): Field[] => {
    if (!requestedFieldsCsv || requestedFieldsCsv.length === 0) {
        return [];
    }

    const fields = [];

    let currentFieldString = '';
    let currentParentField: Field | undefined = undefined;

    for (let i = 0; i <= requestedFieldsCsv.length; i++) {
        const char: string = requestedFieldsCsv[i];

        if ([',', '(', ')'].includes(char) || i === requestedFieldsCsv.length) {
            const currentField: Field = {
                id: currentFieldString,
                subfields: [],
                parent: currentParentField
            };

            if (currentFieldString.length > 0) {
                if (currentParentField) {
                    currentParentField.subfields.push(currentField);
                } else {
                    fields.push(currentField);
                }
            }

            if (char === '(') {
                currentParentField = currentField;
            } else if (char === ')') {
                currentParentField = currentParentField.parent;
            }

            currentFieldString = '';
        } else {
            currentFieldString += char;
        }
    }

    return fields;
}

export function fieldHelper(requestedFieldsCsv: string) {
    const requestedFields: Field[] = getRequestedFields(requestedFieldsCsv)

    const filterService = new FilterService(requestedFields);

    const helper = {
        filter: filterService,
    }

    return helper;
}
