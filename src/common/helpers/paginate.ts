export const paginate = (page, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);

  const currentPage = page > totalPages ? totalPages : page;
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return { currentPage, previousPage, nextPage, totalPages };
};