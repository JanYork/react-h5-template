import useAxios from 'axios-hooks';
import {Page, Result} from "@/types/http";

export interface MockResult {
    id: number;
}

export interface MockPage {
    id: number;
}

/**
 * fetch the data
 * 详细使用可以查看 useAxios 的文档
 */
export const useFetchXXX = () => {
    // set the url
    const url = `/xxx/xxx`;
    // fetch the data
    const [{data, loading, error}, refetch] = useAxios<Result<MockResult>>(url);
    // to do something
    return {data, loading, error, refetch};
}


/**
 * fetch the data with page
 * 详细使用可以查看 useAxios 的文档
 */
export const useFetchPageXXX = (page: number, size: number) => {
    // set the url
    const url = `/xxx/xxx?page=${page}&size=${size}`;
    // fetch the data
    const [{data, loading, error}, refetch] = useAxios<Page<MockResult>>(url);
    // to do something
    return {data, loading, error, refetch};
}