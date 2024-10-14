export const getBatchCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};
