import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { PayPalButton} from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrdersDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET , ORDER_DETAILS_RESET} from '../constants/orderConstants'

const OrderScreen = ({match, history}) => {

    const orderId = match.params.id 

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success: successPay } = orderPay

    //usurio
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        if(order){
            order.itemsPrice = addDecimals(
                order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            )
        }
    }

    const decimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // useEffect(()=>{
    //     if(!userInfo){
    //         history.push('/login')
    //     }
    // }, [userInfo, history, dispatch])


    useEffect(()=>{
        console.log(window.paypal)
        const addPaymentScript = async () =>{
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=BRL`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

   
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!order || successPay ||  order._id !== orderId){
                dispatch({type: ORDER_PAY_RESET})
               // dispatch({type: ORDER_DETAILS_RESET})
                dispatch(getOrdersDetails(orderId))
            }
            else if(!order.isPaid){
                if(!window.paypal){
                    addPaymentScript()
                }
                else{
                    setSdkReady(true)
                }
            }
        }
        

    }, [dispatch, order, orderId, successPay, userInfo, history])

    const successPaymentHandler = (paymentResult) => {
        console.log(" func successPaymentHandler")
        console.log(paymentResult)
        console.log(" ========================")
        dispatch(payOrder(orderId, paymentResult))

    }

    return loading || !order ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Order {orderId._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> {' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? 
                            (<Message variant='success'>Delivered on {order.deliveredAt}</Message>):
                            (<Message variant='danger'>Not Delivered</Message>)
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? 
                            (<Message variant='success'>Paid on {order.paidAt}</Message>):
                            (<Message variant='danger'>Not Paid</Message>)
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {order.orderItems.length === 0 ? <Message>Pedidos estão vazio</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${decimals(item.qty * item.price)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Sumary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col> $ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col> ${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col> ${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col> ${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? <Loader/>: (
                                        <PayPalButton
                                            currency="BRL"
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
