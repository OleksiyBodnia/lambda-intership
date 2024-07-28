import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../utils/fetch';
import { CustomerType, ProductType } from '../types/api';
import { IoSearchSharp } from 'react-icons/io5';

const Search: FC = () => {
  const [table, setTable] = useState('products');
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<CustomerType[] | ProductType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTable(value);

    if (searchText) {
      void request();
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void request();
  };

  const request = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `/${table}?search=${searchText}&page=1&pageSize=50`;
      const response = await fetchData(url);
      setData(response.data);
    } catch (err) {
      setError('An error has occurred');
    } finally {
      setLoading(false);
    }
  };

  const isProducts = (
    data: CustomerType[] | ProductType[]
  ): data is ProductType[] => {
    return table === 'products';
  };

  const convertPrice = (price: string | undefined): string => {
    return price ? price.replace('$', '') : '';
  };

  return (
    <section className="search">
      <h2 className="search__title">Search Database</h2>
      <form className="search__form" onSubmit={formHandler}>
        <div className="search__wrapper">
          <button type="submit" className="search__icon">
            <IoSearchSharp size={24} />
          </button>
          <input
            type="search"
            name="search"
            id="searchInput"
            className="search__input"
            placeholder="Enter keyword..."
            value={searchText}
            onChange={handleInput}
          />
        </div>
        <fieldset className="search__fieldset">
          <legend className="search__legend">Tables</legend>

          <div className="search__radioContainer">
            <div className="search__radioDiv">
              <input
                type="radio"
                id="products"
                name="table"
                value="products"
                className="search__radio"
                defaultChecked
                onChange={handleRadio}
              />
              <label htmlFor="products" className="search__label">
                Products
              </label>
            </div>

            <div className="search__radioDiv">
              <input
                type="radio"
                id="customers"
                name="table"
                value="customers"
                className="search__radio"
                onChange={handleRadio}
              />
              <label htmlFor="customers" className="search__label">
                Customers
              </label>
            </div>
          </div>
        </fieldset>
        <h3 className='search_resultsTitle'>Search results</h3>
        {loading && <h4>Searching Data</h4>}
        {error && <h4>An error has occurred: {error}</h4>}
        <output name="result" htmlFor="searchInput">
          {data ? (
            <>
              {isProducts(data)
                ? data.map((item, index) => (
                    <article key={item.productId} className="search__article">
                      <Link
                        className="search__link"
                        to={`/products/${item.productId}`}
                      >
                        {item.name}
                      </Link>
                      <p className="search__text">
                        #{index + 1}, Quantity Per Unit: {item.quantityPerUnit},
                        Price: {convertPrice(item.price)}, Stock: {item.stock}
                      </p>
                    </article>
                  ))
                : data.map((item, index) => (
                    <article key={item.customerId} className="search__article">
                      <Link
                        className="search__link"
                        to={`/customers/${item.customerId}`}
                      >
                        {item.company}
                      </Link>
                      <p className="search__text">
                        #{index + 1}, Contact: {item.contact}, Title:{' '}
                        {item.title}, Phone: {item.Phone}
                      </p>
                    </article>
                  ))}
            </>
          ) : (
            <p className='search__noResults'>No results</p>
          )}
        </output>
      </form>
    </section>
  );
};

export default Search;
