import { useEffect, useState } from 'react';
import { ProductCard } from '../../../components';
import { getFeaturedList } from '../../../services';
import { toast } from 'react-toastify';

export const FeaturedProducts = () => {
    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            try{
                const data = await getFeaturedList();
                setProducts(data);
            } catch(error) {
                toast.error(error.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    closeOnClick: true,
                });
            } finally {
                setTimeout(() => {
                  setIsLoading(false);
                }, 2000);
            }
        }
        fetchProducts();
    }, []);

    const SkeletonCard = () => (
        <div className="w-[300px] h-[350px] bg-gray-200 dark:bg-slate-700 rounded-xl p-4 animate-pulse">
          <div className="h-40 bg-gray-300 dark:bg-slate-600 rounded mb-4" />
          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded mb-2 w-3/4" />
          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/2" />
        </div>
    );

    return (
      <section className="my-20">
        <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">
          Featured eBooks
        </h1>
        <div className="flex flex-wrap justify-center lg:flex-row gap-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>
    );
}