interface Page<T> {
    total: number;
    size: number;
    current: number;
    pages: number;
    records: T[];
}

export interface Result<T> {
    success: boolean;
    code: number;
    message: string;
    data: T;
}