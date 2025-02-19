import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';

export default function Categories() {
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState(null); 
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); 

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const handleCategoryClick = async (categoryId) => {
    setLoadingCategory(true);  
    setSelectedCategoryId(categoryId); 
    setCategoryDetails(null);  
    setErrorMessage(null); 

    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`);
      if (response.data && response.data.data) {
        setCategoryDetails(response.data.data); 
      } else {
        setErrorMessage('No details found for this category'); 
      }
    } catch (error) {
      setErrorMessage('Failed to fetch category details'); 
      console.error('Error fetching category details:', error);
    } finally {
      setLoadingCategory(false);  
    }
  };

  return (
    <div className="row">
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <button className="btn w-full" onClick={() => refetch()}>
        Refresh
      </button>
      
      {(isLoading || isFetching || loadingCategory) && <Loader />}
      
      {data?.data?.data?.map((Category, i) => (
        <div
          key={i}
          className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
          onClick={() => handleCategoryClick(Category._id)} 
        >
          <div className="inner product p-2 border border-transparent rounded-md">
            <img
              src={Category.image}
              className="w-full h-[350px]"
              alt={Category.name}
            />
            <h4>{Category.name}</h4>
          </div>
        </div>
      ))}

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {categoryDetails && (
        <div className="category-details mt-5">
          <h3>{categoryDetails.name}</h3>
          <p>{categoryDetails.description}</p>
        </div>
      )}
    </div>
  );
}


