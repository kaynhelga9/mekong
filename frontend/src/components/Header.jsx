import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);

	return (
		<header>
			<Navbar
				id="navbar"
				bg="dark"
				variant="dark"
				expand="md"
				collapseOnSelect
			>
				<Container>
					<Navbar.Brand as={Link} to="/">
						Mekong
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={Link} to="/cart">
								<FaShoppingCart /> Cart
								{cartItems.length > 0 && (
									<Badge pil bg="danger">
										{cartItems.reduce(
											(acc, item) => acc + item.qty,
											0
										)}
									</Badge>
								)}
							</Nav.Link>
							<Nav.Link as={Link} to="/login">
								<FaUser /> Sign In
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
