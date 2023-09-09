import { Field } from "..";
export declare class FilterService {
    private requestedFields;
    constructor(requestedFields: Field[]);
    filterFields(results: any, filterFields?: Field[]): any[];
}
