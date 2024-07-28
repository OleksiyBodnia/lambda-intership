import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/fetch';
import { renderIndividualData } from '../utils/renderIndividualData';
import { IndividualData } from '../constants';
import { CustomerType } from '../types/api';
import { FaTableList } from 'react-icons/fa6';

const Customer: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBackHandler = () => {
    navigate(-1);
  };
  const [data, setData] = useState<CustomerType>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSupplierData = async () => {
      try {
        setLoading(true);
        const data = await fetchData<CustomerType>(
          `/customers/${location.pathname.split('/')[2]}`
        );

        setData(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching suppliers:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      }
    };

    void getSupplierData();
  }, [location]);

  if (!data && loading) {
    return <h4>Loadig Customer Data</h4>;
  }

  if (error) {
    return <h4>An error has occurred: {error}</h4>;
  }

  return (
    <section className="about">
      <header className="about__header">
        <FaTableList size={24} />
        <h1 className="about__name">Customer information</h1>
      </header>
      <div className="about__container">
        {data &&
          renderIndividualData<CustomerType>({
            arr: IndividualData.customer,
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

export default Customer;
