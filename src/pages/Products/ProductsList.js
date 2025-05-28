import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ProductCard } from "../../components";
import { FilterBar } from "./components/FilterBar";
import { useTitle } from "../../hooks/useTitle";

import { useFilter } from "../../context";
import { getProductList } from "../../services";
import { toast } from 'react-toastify';

export const ProductsList = () => {
    const { products, initialProductList } = useFilter();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const search = useLocation().search;
    const searchTerm = new URLSearchParams(search).get('q');
    useTitle('Explore eBooks Collection');

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            try {
                const data = await getProductList(searchTerm);
                initialProductList(data);
            } catch(error) {
                toast.error(error.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    closeOnClick: true,
                });
                // setIsLoading(false);
            } finally {
                setTimeout(() => {
                  setIsLoading(false);
                }, 2000);
            }        
        }
        fetchProducts();
    }, [searchTerm]); //eslint-disable-line

    const SkeletonCard = () => (
        <div className="w-[350px] h-[350px] bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse p-4 m-2">
            <div className="h-40 bg-gray-300 dark:bg-slate-600 rounded mb-4" />
            <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded mb-2 w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/2" />
        </div>
    );

    return (
      <main>
        <section className="my-5">
          <div className="my-5 flex justify-between">
            <span className="text-2xl font-semibold dark:text-slate-100 mb-5">
              All eBooks ({products.length})
            </span>
            <span>
              <button
                onClick={() => setShow(!show)}
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
            </span>
          </div>

          <div className="flex flex-wrap justify-center lg:flex-row">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </section>
        {show && <FilterBar setShow={setShow} />}
      </main>
    );
}