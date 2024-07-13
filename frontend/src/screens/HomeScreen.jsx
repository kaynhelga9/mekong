import { Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams();

	const { data, isLoading, error } = useGetProductsQuery({
		pageNumber,
		keyword,
	});

	return (
		<>
			<Meta title={"Mekong | Home"}/>

			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to={"/"}>
					<Button>Back</Button>
				</Link>
			)}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Row>
						<Col md={10}>
							{!keyword && <h1>Latest Products</h1>}
						</Col>
						<Col>
							<Paginate
								pages={data.pages}
								page={data.page}
								keyword={keyword ? keyword : ""}
							/>
						</Col>
					</Row>

					<Row>
						{data.products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>

					<Row className="my-3">
						<Col md={10}></Col>
						<Col>
							<Paginate
								pages={data.pages}
								page={data.page}
								keyword={keyword ? keyword : ""}
							/>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default HomeScreen;
