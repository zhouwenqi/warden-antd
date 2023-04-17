import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";

declare namespace WardenData{
    interface ITableParams {
        pagination:TablePaginationConfig;
        sortField?: string;
        sortOrder?: string;
        filters?: Record<string, FilterValue>;
    }
}
