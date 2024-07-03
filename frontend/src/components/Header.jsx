import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			dispatch(clearCartItems());
			navigate("/login");
		} catch (err) {
			console.log(err);
		}
	};

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
									<Badge pill>
										{cartItems.reduce(
											(acc, item) => acc + item.qty,
											0
										)}
									</Badge>
								)}
							</Nav.Link>

							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id="username"
									align="end"
								>
									<NavDropdown.Item as={Link} to="/profile">
										Profile
									</NavDropdown.Item>

									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Link as={Link} to="/login">
									<FaUser /> Sign In
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
