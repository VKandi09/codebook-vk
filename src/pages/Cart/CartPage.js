import { useTitle } from '../../hooks/useTitle';
import { EmptyCart } from './components/EmptyCart';
import { CartList } from './components/CartList';
import { useCart } from '../../context';

export const CartPage = () => {
    const { cartList } = useCart();
    useTitle(`Cart (${cartList.length})`);
    return (
        <main>
            { cartList.length ? <CartList /> : <EmptyCart/> }
        </main>
    )
}