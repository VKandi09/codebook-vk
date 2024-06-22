import { useTitle } from '../../hooks/useTitle';
import { OrderSuccess } from './components/OrderSuccess';
import { OrderFail } from './components/OrderFail';
import { useLocation } from 'react-router-dom';

export const OrderPage = () => {
  const { state } = useLocation();
  useTitle("Order Summary");

    return (
      <main>
        { state.status ? <OrderSuccess data={state.data}/> : <OrderFail /> }
      </main>
    )
  }