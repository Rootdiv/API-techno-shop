import { loadData } from './dataService.js';

export const getCategory = async () => {
  const goods = await loadData();
  const category = {};
  for (let i = 0; i < goods.length; i++) {
    category[goods[i].category] = goods[i].categoryRus;
  }
  return category;
};
