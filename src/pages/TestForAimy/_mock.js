import { v4 as uuid } from 'uuid';

let products = [
    { id: uuid(), name: "aProduct1", price: 1, type: "Hardware", description: "dfasdsdfsdf" },
    { id: uuid(), name: "bProduct2", price: 2, type: "Software", description: "dfasdsdfsdf" },
    { id: uuid(), name: "cProduct3", price: 3, type: "Hardware", description: "dfasdsdfsdf" },
    { id: uuid(), name: "dProduct4", price: 4, type: "Software", description: "dfasdsdfsdf" },
    { id: uuid(), name: "eProduct5", price: 5, type: "Hardware", description: "dfasdsdfsdf" },
    { id: uuid(), name: "fProduct6", price: 6, type: "Software", description: "dfasdsdfsdf" },
    { id: uuid(), name: "Product7", price: 7, type: "Hardware", description: "dfasdsdfsdf" },
    { id: uuid(), name: "Product8", price: 8, type: "Software", description: "dfasdsdfsdf" },
    { id: uuid(), name: "Product9", price: 9, type: "Hardware", description: "dfasdsdfsdf" },
    { id: uuid(), name: "Product10", price: 10, type: "Software", description: "dfasdsdfsdf" },
    { id: uuid(), name: "Product11", price: 11, type: "Hardware", description: "dfasdsdfsdf" },
];

function get(req, res) {
    const {
        current = 1,
        pageSize = 10,
        search = '',
        orderBy,
        orderDir
    } = req.query;

    const filteredProducts = products.filter(item => item.name.includes(search));

    if (filteredProducts.length && orderBy) {
        if (orderDir && orderDir === 'descend') {
            if (orderBy === 'name') {
                filteredProducts.sort((a, b) => {
                    const aU = a[orderBy].toUpperCase();
                    const bU = b[orderBy].toUpperCase();
                    return aU === bU ? 0 : (aU > bU ? -1 : 1);
                });
            } else if (orderBy === 'price') {
                filteredProducts.sort((a, b) => b[orderBy] - a[orderBy]);
            }
        }
        else {
            if (orderBy === 'name') {
                filteredProducts.sort((a, b) => {
                    const aU = a[orderBy].toUpperCase();
                    const bU = b[orderBy].toUpperCase();
                    return aU === bU ? 0 : (aU > bU ? 1 : -1);
                });
            } else if (orderBy === 'price') {
                filteredProducts.sort((a, b) => a[orderBy] - b[orderBy]);
            }
        }
    }

    return res.json({
        products: filteredProducts.slice((current - 1) * pageSize, current * pageSize),
        total: filteredProducts.length
    });
}


function find(req, res) {
    const { id } = req.query;
    const result = products.filter(item => item.id == id);
    return res.json(result.length ? result[0] : {});
}

function add(req, res) {
    const { body } = req;

    products = products.concat({ ...body, id: uuid() });

    res.send({
        isSucess: true
    });
}

function update(req, res) {
    const { body } = req;

    products.forEach((item, i) => {
        if (item.id === body.id) {
            products[i] = { ...item, ...body };
        }
    });

    res.send({
        isSucess: true
    });
}

function remove(req, res) {
    const { id } = req.query;

    products = products.filter(item => item.id != id);

    res.send({
        isSucess: true
    });
}

export default {
    'GET /api/products': get,
    'GET /api/products/*': find,
    'POST /api/products': add,
    'PUT /api/products': update,
    'DELETE /api/products/*': remove,
};
