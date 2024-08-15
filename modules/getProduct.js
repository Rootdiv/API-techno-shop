import { loadData } from './dataService.js';

export const getProduct = async itemId => {
  const goods = await loadData();
  const item = goods.find(({ id }) => id === itemId);
  if (!item) {
    return { message: 'Товар не найден' };
  }
  return item;
};
