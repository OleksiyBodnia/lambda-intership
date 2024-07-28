import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/fetch';
import { renderIndividualData } from '../utils/renderIndividualData';
import { renderTable } from '../utils/renderTable';
import { IndividualData, TableData } from '../constants';
import { OneOrderType, OrderProductsType } from '../types/api';
import { FaTableList } from 'react-icons/fa6';

const Order: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OneOrderType>();

  const goBackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getOrderData = async () => {
      try {
        setLoading(true);
        const data = await fetchData<OneOrderType>(
          `/orders/${location.pathname.split('/')[2]}`
        );
        // console.log('order data', data);
        setData(data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error fetching suppliers:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      }
    };

    void getOrderData();
  }, [location]);

  if (!data && loading) {
    return <h4>Loadig Order Data</h4>;
  }

  if (error) {
    return <h4>An error has occurred: {error}</h4>;
  }

  return (
    <section className="about">
      <header className="about__header">
        <FaTableList size={24} />
        <h1 className="about__name">Order information</h1>
      </header>
      <div className="about__container">
        {data &&
          renderIndividualData<OneOrderType>({
            arr: IndividualData.order,
            data: data,
          })}
      </div>
      <div className="about__table">
        <h2 className="about__subname">Products in Order</h2>
        <div className="about__wrapper">
          {data &&
            renderTable<OrderProductsType>({
              arr: TableData.order,
              data: data.products,
            })}
        </div>
      </div>
      <footer className="about__footer">
        <button type="button" className="about__btn" onClick={goBackHandler}>
          Go back
        </button>
      </footer>
    </section>
  );
};

export default Order;
