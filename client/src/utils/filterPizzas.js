export const filter = (input, category, array) => {
  const regex = new RegExp(input, "i");
  let filteredPizzas = array;
  if (category === "all") {
    filteredPizzas = array;
  }
  if (category === "veg" || category === "nonveg") {
    filteredPizzas = array.filter((item) => item.category === category);
  }
  if (input) {
    filteredPizzas = filteredPizzas.filter((item) => regex.test(item.name));
  }
  return filteredPizzas;
};
