export class ResponseUtil {
    static success(data: any = {}, message: string = 'Permintaan berhasil diproses'): object {
        return {
            code: 200,
            status: true,
            message,
            data,
        };
    }

    static successEmptyResponse(message: string = 'Permintaan berhasil diproses'): object {
        return {
            code: 200,
            status: true,
            message,
            data: {}
        };
    }

    static error(message: string = 'Terjadi kesalahan', code: number = 400): object {
        return {
            code,
            status: false,
            message,
            data: null,
        };
    }

    static notFound(message: string = 'Data tidak ditemukan'): object {
        return {
            code: 404,
            status: false,
            message,
            data: null,
        };
    }

    static unauthorized(message: string = 'Akses tidak diizinkan'): object {
        return {
            code: 401,
            status: false,
            message,
            data: null,
        };
    }
    
    static pagination(data: any, page: number, limit: number, totalItems: number, message: string = 'Data berhasil diambil'): object {
        const totalPages = Math.ceil(totalItems / limit);
        return {
            code: 200,
            status: true,
            message,
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                perPage: limit,
            }
        };
    }
}