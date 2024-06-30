import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { CartState } from '../context/CartContext';
import Rating from './Rating';
import Form from 'react-bootstrap/Form';
import { AiFillDelete } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContextProvider';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const { theme } = useTheme();
    const {
        state: { cart },
        dispatch,
        productFilterState: { searchQuery }
    } = CartState();

    const [total, setTotal] = useState(); //for the subtotal
    const [items, setItems] = useState(cart.length);

    // when cart items will get changed this will get executed, calculating the subtotal
    useEffect(() => {
        setTotal(
            cart.reduce((acc, curr) => {
                console.log(`price: ${curr.price}, qty: ${curr.qty}`);
                return acc + Number(curr.price) * curr.qty;
            }, 0)
        );
        setItems(
            cart.reduce(
                (acc, curr) => acc + Number(curr.qty),
                0
            )
        );
    }, [cart]);

    const transformedProducts = () => {
        let products = cart;
        if (searchQuery) {
            products = products.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return products;

    }

    // Inside your component
    const navigate = useNavigate();

    const handleCheckout = () => {
        // When you want to navigate to the '/checkout' route
        navigate('/checkout', { state: { total: total } });
    }

    return (
        <div className='home flex-column'>
            <div className={`productContainer ms-0 ${theme === 'dark' && 'darkBody'}`}>
                <ListGroup>
                    {
                        transformedProducts().map(prod => (
                            <ListGroup.Item key={prod.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={prod.image} alt={prod.name} fluid rounded />
                                    </Col>
                                    <Col md={2}>
                                        <span>{prod.name}</span>
                                    </Col>
                                    <Col md={2}>£ {prod.price}</Col>
                                    <Col md={2}>
                                        <Rating rating={prod.ratings}></Rating>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Select
                                            value={prod.qty}
                                            onChange={e => dispatch({
                                                type: 'CHANGE_CART_QTY',
                                                payload: {
                                                    id: prod.id,
                                                    qty: e.target.value,
                                                },
                                            })}
                                        >
                                            {[...Array(prod.inStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: prod,
                                            })}
                                        >
                                            <AiFillDelete fontSize='20px' />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            {
                cart.length > 0 ?
                    <div className='checkoutCard'>
                        <Card>
                            <Card.Body>
                                <Card.Title> SUBTOTAL: £ {total}</Card.Title>
                                <Card.Text>
                                    Total items: {items}
                                </Card.Text>
                                <Button variant="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
                            </Card.Body>
                        </Card>
                    </div> :
                    <h4 style={{ textAlign: 'center' }}>Cart is Empty!</h4>
            }
        </div>
    )
}

export default Cart