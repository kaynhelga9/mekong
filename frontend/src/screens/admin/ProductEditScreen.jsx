import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
	useUpdateProductMutation,
	useGetProductDetailsQuery,
	useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
	const { id: productId } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [stock, setStock] = useState(0);
	const [description, setDescription] = useState("");

	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId);

	const [updateProduct, { isLoading: loadingUpdate }] =
		useUpdateProductMutation();

	const [uploadProductImage] =
		useUploadProductImageMutation();

	useEffect(() => {
		if (product) {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setBrand(product.brand);
			setCategory(product.category);
			setStock(product.stock);
			setDescription(product.description);
		}
	}, [product]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const updatedProduct = {
			productId,
			name,
			price,
			image,
			brand,
			category,
			stock,
			description,
		};

		const result = await updateProduct(updatedProduct);

		if (result.error) {
			toast.error(result.error);
		} else {
			toast.success("Product Updated");
			navigate("/admin/productlist");
		}
	};

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Link to={"/admin/productlist"}>
				<Button>Back</Button>
			</Link>

			<FormContainer>
				<h2>Edit Product</h2>

				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant={"danger"}>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="image" className="my-2">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								value={image}
								onChange={(e) => setImage}
							></Form.Control>
							<Form.Control
								type="file"
								onChange={uploadFileHandler}
							></Form.Control>
							<Image src={image} fluid thumbnail></Image>
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="name"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="stock">
							<Form.Label>Stock</Form.Label>
							<Form.Control
								type="number"
								value={stock}
								onChange={(e) => setStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" className="my-2">
							Update
						</Button>

						{loadingUpdate && <Loader />}
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
