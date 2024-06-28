/**
 * context for managing the cart state
 * with two reducers - in 42, 54
 * One for manupulating cart ("products" and "cart")
 * Another for manupulating "filters"
 * 
 * "products" in 31, will be rendered from fakerJs
 * "cart" will be initially [] - empty
 * "filters" will be initially false, 0 and empty
 * 
 * Exposing the reducer states, and dispatch methods in the cart context 
 */

import React, { createContext, useContext, useReducer } from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer, productFilterReducer } from './Reducers';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';
import image7 from '../images/image7.jpg';
import image8 from '../images/image8.jpg';

const Cart = createContext(); //name of the context

/**
 * since we know, faker generates random data every time the page gets rendered
 * to make the data static
 * using seed faker generates only one type of data
 * its not going to change everytime the data is called
 */
faker.seed(99); 

const CartContext = ({ children }) => {

  /**
   * getting fake data from fakerjs api
   * ...Array(20) will create an arry with 20 undefined elements
   * thus creating this object with fake data 20 times and storing in products array
   */
    const products = [
        {
            id: '1',
            name: 'Choco Nutz',
            price: 18.99,
            image: image1, // Use the imported image
            inStock: 5,
            fastDelivery: true,
            ratings: 4,
        },
        {
            id: '2',
            name: 'Raspberry Chocoz',
            price: 29.80,
            image: image2, // Use the imported image
            inStock: 3,
            fastDelivery: false,
            ratings: 5,
        },
        {
            id: '3',
            name: 'Choco Sprinkles',
            price: 19.99,
            image: image3, // Use the imported image
            inStock: 2,
            fastDelivery: false,
            ratings: 5,
        },
        {
            id: '4',
            name: 'Choco Delights',
            price: 29.00,
            image: image4, // Use the imported image
            inStock: 1,
            fastDelivery: false,
            ratings: 3,
        },
        {
            id: '5',
            name: 'Choco Treat',
            price: 19.99,
            image: image5, // Use the imported image
            inStock: 5,
            fastDelivery: true,
            ratings: 4,
        },
        {
            id: '6',
            name: 'ChocoMarsh',
            price: 9.22,
            image: image6, // Use the imported image
            inStock: 6,
            fastDelivery: false,
            ratings: 5,
        },
        {
            id: '7',
            name: 'Milk Choco',
            price: 29.90,
            image: image7, // Use the imported image
            inStock: 2,
            fastDelivery: false,
            ratings: 2,
        },
        {
            id: '8',
            name: 'Simple Choco',
            price: 29.99,
            image: image8, // Use the imported image
            inStock: 8,
            fastDelivery: false,
            ratings: 1,
        },
    ];

  
  /**
   * useReducer Hook for cart
   * State: data or properties that need to be tracked in an application, in this case containing cart and products
   * dispatch : used to update the state
   */
  const [state, dispatch] = //useReducer Hook returns the current state and a dispatch method
    useReducer( //useReducer Hook accepts two arguments
      cartReducer, //reducer function -> contains your custom state logic
      {//initial state...can be a simple value but generally will contain an object
        products: products,
        cart:[],
      }
  );

  /**
   * Reducer for product filters
   */
  const [productFilterState, productFilterDispatch] = useReducer(productFilterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });


  return (
    /**
     * children are all the jsx or components wrapped inside the context
     * which we can see at the starting point of our app - index.js
     * so, all children will have access to the state and dispatch function
     * */ 
    <Cart.Provider value={{ state, dispatch, productFilterState, productFilterDispatch }}>
        {children} 
    </Cart.Provider>
  )
}

export default CartContext;

export const CartState = () => {
  return useContext(Cart);
};
