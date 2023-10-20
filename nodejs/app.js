import http from 'http';
import { dbConnection } from './db.js';
import productModel from './model/productModel.js';

dbConnection();

const server = http.createServer(async (req, res) => {
    if (req.url === '/product' && req.method === 'GET') {
        const data = await productModel.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } else if (req.url === '/product' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const newItem = JSON.parse(body);
            const item = new productModel(newItem);
            item.save();
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item));
        });
    } else if (req.url.startsWith('/product/') && req.method === 'PUT') {
        const itemId = req.url.split('/')[2];

        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            const updatedItem = JSON.parse(body);
            const data = await productModel.findByIdAndUpdate(itemId, updatedItem, { new: true });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        });
    } else if (req.url.startsWith('/product/') && req.method === 'DELETE') {
        const itemId = req.url.split('/')[2];
        await productModel.findByIdAndRemove(itemId);
        res.writeHead(204);
        res.end(JSON.stringify({ success: 'Product Deleted' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(4000, (port) => {
    console.log(`Server Started`);
});
