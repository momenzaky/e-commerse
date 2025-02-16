import { Helmet } from 'react-helmet';
import style from './Categories.module.css';
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['categories'],  
    queryFn: getCategories,
  });
  // console.log("isLoading =>", isLoading);
  // console.log("isFetching =>", isFetching);
  return (
    <div className='row'>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <button className='btn w-full' onClick={() => refetch()}>
        Refresh
      </button>
      {(isLoading || isFetching) && <Loader />}
      {data?.data?.data?.map((Category, i) => (
        <div className='w-1/4' key={i}>
          <img src={Category.image} alt={Category.name} />
          <h4>{Category.name}</h4>
        </div>
      ))}
    </div>
  );
}
