import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
	const { id: productId } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);

	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId);

	const addToCartHandler = () => {
		dispatch(addToCart({...product, qty}));
		navigate("/cart");
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Link className="btn btn-light my-3">Back</Link>

					<Row>
						<Col md={5}>
							<Image
								src={product.image}
								alt={product.name}
								fluid
							/>
						</Col>

						<Col md={4}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<h1 className="price">${product.price}</h1>
							</ListGroup>
						</Col>

						<Col md={3}>
							<Card className="card-stock">
								<ListGroup variant="flush">
									<ListGroup.Item>
										<strong>
											{product.stock > 0
												? "In Stock"
												: "Out Of Stock"}
										</strong>
									</ListGroup.Item>

									{product.stock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col id="form-qty">Qty</Col>
												<Col>
													<Form.Control
														className="form-control" as="select" value={qty}
														onChange={(e) => setQty(Number(e.target.value))}>
													{[...Array(product.stock).keys()].map((x) => {
														return <option key={x + 1} value={x + 1}>{x+1}</option>
													})}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											className="btn-block"
											type="button"
											disabled={product.stock === 0}
											onClick={addToCartHandler}
										>
											Add To Card
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
