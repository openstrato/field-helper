import { FilterService } from "./FilterService/FilterService";

export function fieldHelper()
{
    const filterService = new FilterService();

    const helper = {
        filter: filterService,
    }

    return helper;
}


