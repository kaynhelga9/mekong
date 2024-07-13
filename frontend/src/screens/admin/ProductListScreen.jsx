import { Link } from "react-router-dom";
import { Row, Col, Table, Button, Image } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
	useGetProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
} from "../../slices/productsApiSlice";

const ProductListScreen = () => {
	const { data: products, isLoading, error, refetch } = useGetProductsQuery();

	const [createProduct, { isLoading: loadingCreate }] =
		useCreateProductMutation();

	const [deleteProduct] = useDeleteProductMutation();

	const deleteHandler = async (id) => {
		if (window.confirm("Delete product?")) {
			try {
				await deleteProduct(id);
				toast.success("Product Deleted");
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const createProductHandler = async () => {
		if (window.confirm("Create a new product?")) {
			try {
				await createProduct();
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button onClick={createProductHandler}>
						<FaEdit /> Add Product
					</Button>
				</Col>
			</Row>

			{loadingCreate && <Loader />}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant={"danger"}>{error}</Message>
			) : (
				<>
					<Table hover responsive borderless>
						<thead>
							<tr>
								<th>ID</th>
								<th>THUMBNAIL</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th>EDIT</th>
								<th>DEL</th>
							</tr>
						</thead>
						<tbody>
							{products.map((p, index) => (
								<tr key={p._id}>
									<td>{index}</td>
									<td>
										<Row>
											<Col md="5">
												<Image
													src={p.image}
													thumbnail
													fluid
												></Image>
											</Col>
											<Col></Col>
										</Row>
									</td>
									<td>{p.name}</td>
									<td>{p.price}</td>
									<td>{p.category}</td>
									<td>{p.brand}</td>
									<td>
										<Link
											to={`/admin/product/${p._id}/edit`}
										>
											<FaEdit size={"25"} />
										</Link>
									</td>
									<td>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(p._id)}
										>
											<FaTrash />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	);
};

export default ProductListScreen;
