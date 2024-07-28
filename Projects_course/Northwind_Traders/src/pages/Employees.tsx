import React, { FC, useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { fetchData } from '../utils/fetch';
import { renderTable } from '../utils/renderTable';
import { TableData } from '../constants';
import { EmployeeType, EmployeesResponse } from '../types/api';
import { PiArrowArcRightBold } from 'react-icons/pi';

const Employees: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(location.search?.split('=')[1]) || 1
  );

  const [data, setData] = useState<EmployeesResponse>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        setLoading(true);
        const data = await fetchData<EmployeesResponse>(
          `/employees?page=${currentPage}&pageSize=20`
        );
        // console.log('employees data:', data);
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

    void getSuppliers();
  }, [currentPage]);

  if (!data && loading) {
    return <h4>Loadig Employees Data</h4>;
  }

  if (error) {
    return <h4>An error has occurred: {error}</h4>;
  }

  return (
    <section className="info">
      <header className="info__header">
        <h2 className="info__title">Employees</h2>
        <PiArrowArcRightBold size={24} />
      </header>
      <div className="info__main">
        <div className="info__wrapper">
          {data &&
            renderTable<EmployeeType>({
              arr: TableData.employes,
              data: data.data,
            })}
        </div>
        {data && (
          <Pagination
            currentPage={currentPage}
            maxPages={data.pageCount}
            loading={loading}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
};

export default Employees;