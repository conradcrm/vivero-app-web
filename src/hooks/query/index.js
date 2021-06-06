import {useQuery} from 'react-query';

const url = "http://localhost:8000/api/";

export const getDataModuleId = async (module, id, setData) =>{
  const query = url+module+"/"+id;
  const response = await fetch(query);
  const data = await response.json();
  if(data.data){
    setData(data.data)
    return data;
  }
}

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

export function useItemId(id, module ,setData){
  return useQuery(`${module}${"/"}${id}`, ()=> getDataModuleId(module, id, setData));
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
