export const getInventoryCount = (array) => {
  const inventory = array.reduce((total, pizza) => {
    total += pizza.inventory;
    return total;
  }, 0);
  return inventory;
};
