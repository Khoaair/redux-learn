import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  removeItem,
  toggleAmount,
  calculateTotal,
} from '../features/cart/CartSlice';
import { ChevronDown } from '../icons';
import { ChevronUp } from '../icons';

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal(id));
  }, [amount]);
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* remove button */}
        <button
          className='remove-btn'
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          className='amount-btn'
          onClick={() => {
            dispatch(toggleAmount({ type: 'inc', id: id }));
          }}
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className='amount'>{amount}</p>
        {/* decrease button */}
        <button
          className='amount-btn'
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(toggleAmount({ type: 'dec', id: id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
export default CartItem;
