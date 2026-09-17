import { FilterService } from "./FilterService/FilterService";
export { SchemaIntrospectionService, FieldSchemaEntry } from "./SchemaIntrospectionService/SchemaIntrospectionService";
export interface Field {
    id: string;
    subfields?: Field[];
    parent?: Field;
}
export declare function fieldHelper(requestedFieldsCsv: string): {
    filter: FilterService;
};
