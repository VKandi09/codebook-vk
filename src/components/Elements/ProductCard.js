import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context';
import { Rating } from './Rating';

export const ProductCard = ({product}) => {

    const [inCart, setInCart] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { cartList, addToCart, removeFromCart } = useCart();
    const { id, name, overview, price, image_local, rating, best_seller } = product;

    useEffect(() => {
        const productInCart = cartList.find(item => item.id === product.id);

        if(productInCart){
            setInCart(true);
        } else {
            setInCart(false);
        }
        setIsLoading(false);
    }, [cartList, product.id]);

    if (isLoading) {
        return (
            <div className="m-3 w-80 bg-gray-200 rounded-lg border border-gray-300 shadow-md animate-pulse dark:bg-gray-500 dark:border-gray-400">
                <div className="w-full h-64 bg-gray-300 rounded-t-lg"></div>
                <div className="p-5">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/products/${id}`} className="relative" >
                { best_seller && <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">Best Seller</span>}
                <img className="rounded-t-lg w-full h-64" src={image_local} alt={name} />
            </Link>
            <div className="p-5">
                <Link to={`products/${id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>

                <div className="flex items-center my-2">
                    <Rating rating={rating}/>
                </div>

                <p className="flex justify-between items-center">
                    <span className="text-2xl dark:text-gray-200">
                        <span>$</span><span>{price}</span>
                    </span>
                    { !inCart && <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "" : "cursor-not-allowed"}`} disabled={ product.in_stock ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>}
                    { inCart && <button onClick={() => removeFromCart(product)} className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`} disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button>}
                </p>
            </div>
        </div>
    )
}