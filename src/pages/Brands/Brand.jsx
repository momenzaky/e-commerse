import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Loader from '../../components/Loader/Loader';

export default function Brand() {
  const [brands, setBrands] = useState([]); 
  const [selectedBrand, setSelectedBrand] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  async function getBrands() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      console.log(res.data); 
      setBrands(res.data.data); 
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <>
      <h1 className="text-5xl my-10 mx-auto text-center font-semibold text-green-600">
        All Brands
      </h1>
      <div className="row">
        <Helmet>
          <title>Categories</title>
        </Helmet>

        {brands.length > 0 ? (
          brands.map((brand) => (
            <div
              className="inner product p-2 border border-transparent rounded-md cursor-pointer"
              key={brand._id}
              onClick={() => handleBrandClick(brand)} 
            >
              <img
                src={brand.image}
                className="w-full"
                alt={brand.name}
              />
              <h4 className="text-center">{brand.name}</h4>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>

      {isModalOpen && selectedBrand && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-btn">X</button>
            <img src={selectedBrand.image} alt={selectedBrand.name} className="modal-image" />
            <h2 className='text-green-700'>{selectedBrand.name}</h2>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          max-width: 500px;
        }
        .modal-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          margin-bottom: 15px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: red;
          color: white;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
