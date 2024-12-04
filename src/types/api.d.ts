export type ApiResponse<T> = {
    status: 'success' | 'fail' | 'error',
    data: T,
    [key: string]: string | undefined | number,
};
