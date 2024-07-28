import React, { FC, useEffect, useRef, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { CurrentTime } from '../components/CurrentTime';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineDisplaySettings } from 'react-icons/md';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { IoMdCart } from 'react-icons/io';
import { BsFillFileEarmarkPostFill } from 'react-icons/bs';
import { GiIdCard } from 'react-icons/gi';
import { MdPeople } from 'react-icons/md';
import { IoSearchSharp } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoLinkOutline } from 'react-icons/io5';

const Layout: FC = () => {
  const [isOpenLinks, setOpenLinks] = useState(false);
  const [isOpenAside, setOpenASide] = useState(false);

  const asideRef = useRef<HTMLDivElement>(null);

  const linksBtnHandler = () => {
    setOpenLinks(prev => !prev);
  };

  const asideBtnHandler = () => {
    setOpenASide(prev => !prev);
  };

  useEffect(() => {
    const clickOutside = (event: Event) => {
      if (
        event.target === asideRef.current &&
        asideRef.current &&
        asideRef.current.className === 'aside aside--active'
      ) {
        setOpenASide(false);
      }
    };

    window.addEventListener('click', clickOutside);

    return () => window.removeEventListener('click', clickOutside);
  }, []);

  return (
    <div className="container">
      <aside
        ref={asideRef}
        className={`aside ${isOpenAside ? 'aside--active' : ''}`}
      >
        <section className="aside__container">
          <header className="aside__header">
            <h1 className="aside__titel">
              <span className="aside__bold">Northwind</span> Traders
            </h1>
          </header>
          <nav className="aside__nav">
            <h2 className="aside__subtitle">General</h2>
            <ul className="aside__ul">
              <li className="aside__li">
                <NavLink
                  to="/"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <IoMdHome size={24} />
                  Home
                </NavLink>
              </li>
              <li className="aside__li">
                <NavLink
                  to="/dashboard"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <MdOutlineDisplaySettings size={24} />
                  Dashboard
                </NavLink>
              </li>
            </ul>
            <h2 className="aside__subtitle">Backoffice</h2>
            <ul className="aside__ul">
              <li className="aside__li">
                <NavLink
                  to="/suppliers"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <BsFillFileEarmarkPostFill size={24} />
                  Suppliers
                </NavLink>
              </li>
              <li className="aside__li">
                <NavLink
                  to="/products"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <MdProductionQuantityLimits size={24} />
                  Products
                </NavLink>
              </li>
              <li className="aside__li">
                <NavLink
                  to="/orders"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <IoMdCart size={24} />
                  Orders
                </NavLink>
              </li>
              <li className="aside__li">
                <NavLink
                  to="/employees"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <GiIdCard size={24} />
                  Employees
                </NavLink>
              </li>
              <li className="aside__li">
                <NavLink
                  to="/customers"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <MdPeople size={24} />
                  Customers
                </NavLink>
              </li>
              <li className="aside__li">
                <NavLink
                  to="/search"
                  onClick={asideBtnHandler}
                  className={({ isActive }) =>
                    isActive ? 'aside__link aside__li--active' : 'aside__link'
                  }
                >
                  <IoSearchSharp size={24} />
                  Search
                </NavLink>
              </li>
            </ul>
          </nav>
        </section>
      </aside>
      <header className="header">
        <CurrentTime />
        <button
          className="headerr__menu"
          aria-label="Open navigation"
          onClick={asideBtnHandler}
        >
          <IoMdMenu size={24} />
        </button>
        <button
          className={`header__button ${
            isOpenLinks ? 'header__button--active' : ''
          }`}
          onClick={linksBtnHandler}
        >
          <IoMdMenu size={24} />
          <span className="styles__sqlLink">SQLite Links</span>
          <MdKeyboardArrowDown size={24} />
        </button>
        <div
          className={`header__links ${
            isOpenLinks ? 'header__links--active' : ''
          }`}
        >
          <a
            href="https://blog.cloudflare.com/introducing-d1"
            target="_blank"
            rel="noreferrer noopener"
            className="header__link"
          >
            <IoLinkOutline size={24} />
            Reintroducing D1
          </a>
          <a
            href="https://www.sqlite.org/lang.html"
            target="_blank"
            rel="noreferrer noopener"
            className="header__link"
          >
            <IoLinkOutline size={24} />
            SQLite SQL Flavour
          </a>
          <a
            href="https://developers.cloudflare.com/workers/learning/using-durable-objects/"
            target="_blank"
            rel="noreferrer noopener"
            className="header__link"
          >
            <IoLinkOutline size={24} />
            Durable Objects
          </a>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
