import request from 'umi-request';

export async function fetchProducts(params) {
    return request('/api/products', {
        params,
    });
}

export async function findProduct(params) {
    return request('/api/products/*', {
        params,
    });
}

export async function addProduc(product) {
    return request.post('/api/products', {
        data: { ...product },
    });
}

export async function updateProduc(product) {
    return request.put('/api/products', {
        data: { ...product },
    });
}

export async function deleteProduc(params) {
    return request.delete('/api/products/*', {
        params
    });
}