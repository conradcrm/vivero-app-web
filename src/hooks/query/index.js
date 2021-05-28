const globalQuery = "http://localhost:8000/api/";

export const getCategories = async () => {
  const query = globalQuery+"categories";
  const response = await fetch(query);
  const data = await response.json();
  return data;
};

export const getPlants = async () => {
  const query = globalQuery+"plants";
  const response = await fetch(query);
  const data = await response.json();
  return data;
};

export const getProvider = async () => {
  const query = globalQuery+"providers";
  const response = await fetch(query);
  const data = await response.json();
  return data;
};