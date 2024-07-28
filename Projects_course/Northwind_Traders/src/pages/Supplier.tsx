import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchData } from '../utils/fetch';
import { renderIndividualData } from '../utils/renderIndividualData';
import { IndividualData } from '../constants';
import { SupplierType } from '../types/api';
import { FaTableList } from 'react-icons/fa6';

const Supplier: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<SupplierType>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const goBackHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getSupplierData = async () => {
      try {
        setLoading(true);
        const data = await fetchData<SupplierType>(`/suppliers/${location.pathname.split('/')[2]}`);
        setData(data);
        setError(null);
        setLoading(false);
        // console.log("Suppliers data:", data);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching supplier:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    void getSupplierData();
  }, [location]);

  if (!data && loading) {
    return <h4>Loadig Supplier Data</h4>;
  }

  if (error) {
    return <h4>An error has occurred: {error}</h4>;
  }

  return (
    <section className="about">
      <header className="about__header">
        <FaTableList size={24} />
        <h1 className="about__name">Supplier information</h1>
      </header>
      <div className="about__container">
        {data &&
          renderIndividualData<SupplierType>({
            arr: IndividualData.supplier,
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

export default Supplier;
