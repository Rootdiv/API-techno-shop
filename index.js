import { createServer } from 'http';
import { getCategory } from './modules/getCategory.js';
import { getGoodsList } from './modules/getGoodsList.js';
import { imageRequest } from './modules/imageRequest.js';
import { getProduct } from './modules/getProduct.js';
import { loadOrders } from './modules/dataService.js';
import { createOrder } from './modules/orderController.js';

const PORT = process.env.PORT || 3024;

const URI_PREFIX = '/api/goods';

createServer(async (req, res) => {
  if (req.url.substring(1, 4) === 'img') {
    imageRequest(req, res);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  if (req.url === '/api/category') {
    const body = await (async () => {
      if (req.method === 'GET') {
        return getCategory();
      }
    })();
    res.statusCode = 200;
    res.end(JSON.stringify(body));
    return;
  }

  if (req.url === '/api/order') {
    if (req.method === 'POST') {
      createOrder(req, res);
      return;
    } else if (req.method === 'GET') {
      const body = await loadOrders();
      res.statusCode = 200;
      res.end(JSON.stringify(body));
      return;
    }
  }

  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  // убираем из запроса префикс URI, разбиваем его на путь и параметры
  const [uri, query] = req.url.substring(URI_PREFIX.length).split('?');
  const queryParams = {};
  // параметры могут отсутствовать вообще или иметь вид a=b&b=c
  // во втором случае наполняем объект queryParams { a: 'b', b: 'c' }
  if (query) {
    for (const piece of query.split('&')) {
      const [key, value] = piece.split('=');
      queryParams[key] = value ? decodeURIComponent(value) : '';
    }
  }

  if (req.method === 'GET') {
    if (uri === '' || uri === '/') {
      const goods = await getGoodsList(queryParams);
      res.statusCode = 200;
      res.end(JSON.stringify(goods));
    } else {
      const itemId = uri.substring(1);
      const product = await getProduct(itemId);
      if (product.message) {
        res.statusCode = 404;
      } else {
        res.statusCode = 200;
      }
      res.end(JSON.stringify(product));
    }
  }
}).listen(PORT, 'localhost', () => {
  if (process.env.PROD !== 'true') {
    console.log(
      `Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`,
    );
    console.log('Нажмите CTRL+C, чтобы остановить сервер');
    console.log('Доступные методы:');
    console.log(`GET /api/category - получить список категорий`);
    console.log(`GET ${URI_PREFIX} - получить список товаров`);
    console.log(`GET ${URI_PREFIX}/{id} - получить товар по его ID`);
    console.log(`GET ${URI_PREFIX}?{search=""} - найти товар по названию`);
    console.log(
      `GET ${URI_PREFIX}?{category=""&maxprice=""} - фильтрация
      Параметры:
      category
      color
      minprice
      maxprice
      mindisplay
      maxdisplay`,
    );
    console.log(`GET ${URI_PREFIX}?{list="{id},{id}"} - получить товары по id`);
    console.log('POST /api/order - отправка заказа на сервер');
  }
});
