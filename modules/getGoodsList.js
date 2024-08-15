import { loadData } from './dataService.js';
import { pagination } from './pagination.js';

export const getGoodsList = async (params = {}) => {
  const page = +params.page || 1;
  const paginationCount = params.count || 12;

  const goods = await loadData();

  let data = goods;

  if (params.search || params.q) {
    const queryString = params.search || params.q;
    const search = queryString.trim().toLowerCase();
    data = goods.filter(
      item =>
        item.title.toLowerCase().includes(search) ||
        item.description.some(item => item.toLowerCase().includes(search)),
    );
  }

  if (params.list) {
    const list = params.list.trim().toLowerCase();
    return goods.filter(item => list.includes(item.id));
  }

  if (params.category) {
    const category = params.category.trim().toLowerCase();
    const regExp = new RegExp(`^${category}$`);
    data = data.filter(item => regExp.test(item.category.toLowerCase()));
  }

  if (params.color) {
    data = data.filter(item => params.color?.includes(item.color));
  }

  if (params.minprice) {
    data = data.filter(item => params.minprice <= item.price);
  }

  if (params.maxprice) {
    data = data.filter(item => params.maxprice >= item.price);
  }

  if (params.mindisplay) {
    data = data.filter(item => params.mindisplay <= item.display);
  }

  if (params.maxdisplay) {
    data = data.filter(item => params.maxdisplay >= item.display);
  }

  return pagination(data, page, paginationCount);
};
