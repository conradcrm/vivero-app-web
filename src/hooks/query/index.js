import axios from 'axios';
import { useQuery } from 'react-query';
import { initAxiosInterceptors } from '../../helpers/helper-auth';

const url = "https://vivero-app.herokuapp.com/api/";
// const url = "http://127.0.0.1:8000/api/";
async function getDataModule(module) {
  initAxiosInterceptors();
  const query = url + module;
  const res = await axios.get(query);
  return res.data;
}

export const getDataModuleId = async (module, id, setData) => {
  initAxiosInterceptors();
  const query = url + module + "/" + id;
  const { data: item } = await axios.get(query);
  setData(item.data);
  return item.data;
}


export function useItemId(id, module, setData) {
  return useQuery(`${module}${"/"}${id}`, () => getDataModuleId(module, id, setData));
}

export function useGetData(module) {
  return useQuery(module, () => getDataModule(module), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale']
  });
}

export function usePlants() {
  return useQuery('PLANTS', () => getDataModule('plants'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}

export function usePlantsPage(page) {
  const page_size = 40
  return useQuery(`PLANTS-PAGE/${page}`, async () => {
    const res = await axios.get(`${url}plants-paginate/${page_size}?page=${page}`);
    return res.data;
  }, {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}

export function useCategories() {
  return useQuery('CATEGORIES', () => getDataModule('categories'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}

export function useProviders() {
  return useQuery('PROVIDERS', () => getDataModule('providers'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}


export function useShopping() {
  return useQuery('SHOPPING', () => getDataModule('shopping'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}

export function useShoppingPage(page) {
  const page_size = 10
  return useQuery(`SHOPPING-PAGE/${page}`, async () => {
    const res = await axios.get(`${url}shopping-paginate/${page_size}?page=${page}`);
    return res.data;
  }, {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}

export function useStatistics() {
  return useQuery('STATISTICS', () => getDataModule('statistics'), {
    staleTime: Infinity,
    notifyOnChangePropsExclusions: ['isStale'],
  });
}