import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";

const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress?.address || "");
	const [city, setCity] = useState(shippingAddress?.city || "");
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || ""
	);
	const [country, setCountry] = useState(shippingAddress?.country || "");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate("/payment");
	};

	return (
		<FormContainer>
			<Meta title={"Mekong | Shipping"} />

			<CheckoutSteps step1 step2 />

			<h1>Shipping</h1>
			<Form>
				<Form.Group controlId="address" className="my-2">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="city" className="my-2">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="postalCode" className="my-2">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="country" className="my-2">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>

				<Button type="submit" className="my-2" onClick={submitHandler}>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
