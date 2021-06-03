import {useQuery} from 'react-query';

const url = "http://localhost:8000/api/";

async function getDataModule(module){
  const query = url+module;
  const response = await fetch(query);
  const data = await response.json();
  return data;
}

export default function useCategories(){
  return useQuery('CATEGORIES', ()=> getDataModule('categories'),{
    staleTime:Infinity,
    notifyOnChangePropsExclusions:['isStale'],
  });
}

export const getCategories = async () => {
  const query = url+"categories";
  const response = await fetch(query);
  const data = await response.json();
  return data;
};

export const getPlants = async () => {
  const query = url+"plants";
  const response = await fetch(query);
  const data = await response.json();
  return data;
};

export const getProvider = async () => {
  const query = url+"providers";
  const response = await fetch(query);
  const data = await response.json();
  return data;
};

export const getShopping = async () => {
  const query = url+"shopping";
  const response = await fetch(query);
  const data = await response.json();
  return data;
};