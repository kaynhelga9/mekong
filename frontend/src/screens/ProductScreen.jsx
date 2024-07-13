import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import {
	useGetProductDetailsQuery,
	useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ProductScreen = () => {
	const { id: productId } = useParams();
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const {
		data: product,
		isLoading,
		error,
		refetch,
	} = useGetProductDetailsQuery(productId);

	const [createReview, { isLoading: loadingReview }] =
		useCreateReviewMutation();

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate("/cart");
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await createReview({
				productId,
				rating,
				comment,
			}).unwrap();
			refetch();
			toast.success("Review submitted");
			setRating(0);
			setComment("");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Link to={"/"}>
				<Button>Back</Button>
			</Link>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<>
						<Meta
							title={product.name}
							description={product.description}
						/>

						<Row className="my-3">
							<Col md={5}>
								<Image
									src={product.image}
									alt={product.name}
									fluid
									thumbnail
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
									<ListGroup.Item>
										{product.description}
									</ListGroup.Item>
								</ListGroup>
							</Col>

							<Col md={3}>
								<Card className="card-stock">
									<ListGroup variant="flush">
										<ListGroup.Item>
											<strong>
												{product.stock > 0
													? `In Stock: ${product.stock}`
													: "Out Of Stock"}
											</strong>
										</ListGroup.Item>

										{product.stock > 0 && (
											<ListGroup.Item>
												<Row>
													<Col id="form-qty">Qty</Col>
													<Col>
														<Form.Control
															className="form-control"
															as="select"
															value={qty}
															onChange={(e) =>
																setQty(
																	Number(
																		e.target
																			.value
																	)
																)
															}
														>
															{[
																...Array(
																	product.stock
																).keys(),
															].map((x) => {
																return (
																	<option
																		key={
																			x +
																			1
																		}
																		value={
																			x +
																			1
																		}
																	>
																		{x + 1}
																	</option>
																);
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
					<>
						<Row className="review">
							<Col md={6}>
								<h2>Reviews</h2>

								{product.reviews.length === 0 && (
									<Message>No Reviews</Message>
								)}

								{loadingReview && <Loader />}

								{userInfo ? (
									<Form onSubmit={submitHandler}>
										<Form.Group
											controlId="rating"
											className="my-2"
										>
											<Form.Label>Rating</Form.Label>
											<Form.Control
												as={"select"}
												value={rating}
												onChange={(e) =>
													setRating(
														Number(e.target.value)
													)
												}
											>
												{" "}
												<option value={""}>
													Select rating
												</option>
												<option value={"1"}>
													1 - Very Bad
												</option>
												<option value={"2"}>
													2 - Bad
												</option>
												<option value={"3"}>
													3 - OK
												</option>
												<option value={"4"}>
													4 - Good
												</option>
												<option value={"5"}>
													5 - Very Good
												</option>
											</Form.Control>
										</Form.Group>
										<Form.Group
											controlId="comment"
											className="my-2"
										>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as={"textarea"}
												rows={3}
												value={comment}
												onChange={(e) =>
													setComment(e.target.value)
												}
											></Form.Control>
										</Form.Group>
										<Button
											disabled={loadingReview}
											type="submit"
										>
											Leave Review
										</Button>
									</Form>
								) : (
									<Message>
										Please <Link to={"/login"}>login</Link>{" "}
										to leave a review
									</Message>
								)}

								<ListGroup variant="flush">
									{product.reviews.map((review) => (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											{`\t${review.createdAt.substring(
												0,
												10
											)}`}
											<Rating value={review.rating} />
											{review.comment}
										</ListGroup.Item>
									))}
								</ListGroup>
							</Col>
						</Row>
					</>
				</>
			)}
		</>
	);
};

export default ProductScreen;
