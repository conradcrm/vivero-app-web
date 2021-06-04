import {useQuery} from 'react-query';

const url = "http://localhost:8000/api/";

async function getDataModule(module){
  const query = url+module;
  const response = await fetch(query);
  const data = await response.json();
  return data;
}

export function usePlants(){
  return useQuery('PLANTS', ()=> getDataModule('plants'),{
    staleTime:Infinity,
    notifyOnChangePropsExclusions:['isStale'],
  });
}

export function useCategories(){
  return useQuery('CATEGORIES', ()=> getDataModule('categories'),{
    staleTime:Infinity,
    notifyOnChangePropsExclusions:['isStale'],
  });
}

export function useProviders(){
  return useQuery('PROVIDERS', ()=> getDataModule('providers'),{
    staleTime:Infinity,
    notifyOnChangePropsExclusions:['isStale'],
  });
}

export function useShopping(){
  return useQuery('SHOPPING', ()=> getDataModule('shopping'),{
    staleTime:Infinity,
    notifyOnChangePropsExclusions:['isStale'],
  });
}
