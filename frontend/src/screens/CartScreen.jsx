import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { setCart, removeFromCart } from "../slices/cartSlice" 
import Meta from "../components/Meta";

const CartScreen = () => {
	const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

	const returnHandler = () => {
		navigate("/");
	}

    const addToCartHandler = async (product, qty) => {
        dispatch(setCart({...product, qty}));
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    }

	return (
		<Row>
			<Meta title={"Mekong | Cart"}/>

			<Col md={8}>
				<h1>Your Cart</h1>
				{cartItems.length === 0 ? (
					<Col>
						<Message>
							No items in cart
						</Message>
						<Button 
							type="button"
							onClick={returnHandler}
							>
							Back
						</Button>
					</Col>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item._id}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item._id}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>
										<Form.Control
											id="cart-control"
											className="form-control"
											as="select"
											value={item.qty}
											onChange={(e) =>
												addToCartHandler(
													item,
													Number(e.target.value)
												)
											}
										>
											{[...Array(item.stock).keys()].map(
												(x) => {
													return (
														<option
															key={x + 1}
															value={x + 1}
														>
															{x + 1}
														</option>
													);
												}
											)}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="danger"
											onClick={() =>
												removeFromCartHandler(item._id)
											}
										>
											<FaTrash />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush" id="checkout-group">
						<ListGroup.Item>
							<h2>
								Subtotal (
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								)
							</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Col>
								$
								{cartItems
									.reduce(
										(acc, item) =>
											acc + item.price * item.qty,
										0
									)
									.toFixed(2)}
							</Col>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}

export default CartScreen;
