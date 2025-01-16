import { useEffect, useState } from 'react';
import { ProductCard } from '../../../components';
import { getFeaturedList } from '../../../services';
import { toast } from 'react-toastify';

export const FeaturedProducts = () => {
    const [ products, setProducts ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try{
                const data = await getFeaturedList();
                setProducts(data);
                setIsLoading(false);
            } catch(error) {
                toast.error(error.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    closeOnClick: true,
                });
            }
        }
        fetchProducts();
        setIsLoading(true);
    }, []);

    return (
        <section className="my-20">
            <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>
                { isLoading ? (
                    <div className="m-3 w-80 bg-gray-200 rounded-lg border border-gray-300 shadow-md animate-pulse dark:bg-gray-500 dark:border-gray-400">
                        <div className="w-full h-64 bg-gray-300 rounded-t-lg"></div>
                        <div className="p-5">
                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center lg:flex-row">
                        { products.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                    )
                } 
        </section>
    )
}