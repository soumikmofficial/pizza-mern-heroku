import axios from "axios";
import { useQuery } from "react-query";

const fetchAllPizzas = async () => {
  const res = await axios.get("/api/v1/pizzas");
  return res.data;
};

export const usePizzasHook = (refetchInterval = false) => {
  return useQuery("fetchAllPizzas", fetchAllPizzas, {
    refetchInterval,
  });
};
