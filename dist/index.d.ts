import { FilterService } from "./FilterService/FilterService";
export interface Field {
    id: string;
    subfields?: Field[];
    parent?: Field;
}
export declare function fieldHelper(requestedFieldsCsv: string): {
    filter: FilterService;
};
