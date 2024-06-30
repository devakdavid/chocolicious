/**
 * containing reducer function for cart and filter
 * 
 * Reducers take in two things: previous state and an action. 
 * Then they reduce it (read it return) to one entity: the new updated instance of state. 
 * So reducers are basically pure JS functions which take in the previous state and an action and return the newly updated state.
 */
export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXCHANGE_RATES':
            return {
                ...state,
                exchangeRates: action.payload,
            };
        case 'SET_CURRENCY':
            return { ...state, currency: action.payload };

        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(c => c.id !== action.payload.id),
            };

        case 'CHANGE_CART_QTY':
            return {
                ...state,
                cart: state.cart.map(
                    (c) => c.id === action.payload.id ? { ...c, qty: action.payload.qty } : c
                ),
            };
        case 'UPDATE_PRICES':
            return { ...state };

        case 'EMPTY_CART':
            return {
                ...state,
                cart: []
            }

        default:
            return state;
    }
};

export const productFilterReducer = (state, action) => {
    switch(action.type) {
        case 'SORT_BY_PRICE':
            return { ...state, sort:action.payload }; //adding sort variable 

        case 'FILTER_BY_STOCK':
                return { ...state, byStock: !state.byStock };

        case 'FILTER_BY_DELIVERY':
            return { ...state, byFastDelivery: !state.byFastDelivery };   

        case 'FILTER_BY_RATING':
            return { ...state, byRating: action.payload };

        case 'FILTER_BY_SEARCH':
            return { ...state, searchQuery: action.payload }; 
            
        case 'CLEAR_FILTERS':
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: "",
             }; 

        default:
            return state;
    }
}