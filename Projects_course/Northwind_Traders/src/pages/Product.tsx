import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/fetch';
import { renderIndividualData } from '../utils/renderIndividualData';
import { IndividualData } from '../constants';
import { ProductType} from '../types/api';
import { FaTableList } from 'react-icons/fa6';

const Product: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<ProductType>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const goBackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true)
        const data = await fetchData<ProductType>(`/products/${location.pathname.split('/')[2]}`);
        // console.log("Product data:", data);
        setData(data);

        // const supplier = await fetchData<SupplierType>(`/suppliers/${data[0].supplierID}`);

        // setData(...data[0], supplierName: supplier.companyName)
        setError(null); 
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error("Error fetching suppliers:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');        
      }
    };

    void getProductData();
  }, [location]);

  if (!data && loading) {
    return <h4>Loadig Product Data</h4>;
  }

  if (error) {
    return <h4>An error has occurred: {error}</h4>;
  }

  return (
    <section className="about">
      <header className="about__header">
        <FaTableList size={24} />
        <h1 className="about__name">Product information</h1>
      </header>
      <div className="about__container">
        {data &&
          renderIndividualData<ProductType>({
            arr: IndividualData.product,
            data: data[0],
          })}
      </div>
      <footer className="about__footer">
        <button type="button" className="about__btn" onClick={goBackHandler}>
          Go back
        </button>
      </footer>
    </section>
  );
};

export default Product;
