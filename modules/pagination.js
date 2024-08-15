export const pagination = (goods, page, count) => {
  const end = count * page;
  const start = page === 1 ? 0 : end - count;

  const pages = Math.ceil(goods.length / count);

  return {
    goods: goods.slice(start, end),
    page,
    pages,
  };
};
