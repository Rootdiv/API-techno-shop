import { loadOrders, saveOrders } from './dataService.js';

const getOrderData = req =>
  new Promise(resolve => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(JSON.parse(data));
    });
  });

export const createOrder = async (req, res) => {
  const data = await getOrderData(req);
  const id = Math.random().toString().substring(2, 8) + Date.now().toString().substring(9);
  const newItem = { ...data, id };
  const ordersData = await loadOrders();
  const isSaved = await saveOrders([...ordersData, newItem]);
  if (!isSaved) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Произошла ошибка сервера' }));
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ id: newItem.id }));
};
