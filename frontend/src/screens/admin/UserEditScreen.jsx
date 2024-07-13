import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
	const { id: userId } = useParams();

	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const {
		data: user,
		isLoading,
		error,
		refetch,
	} = useGetUserDetailsQuery(userId);

	const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await updateUser({ userId, name, email, isAdmin });
			toast.success("User updated");
			refetch();
			navigate("/admin/userlist");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Link to={"/admin/userlist"}>
				<Button>Back</Button>
			</Link>

			<FormContainer>
				<h2>Edit User</h2>

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
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="isAdmin">
							<Form.Label>Admin</Form.Label>
							<Form.Check
								type="checkbox"
								label="Toggle Admin"
								checked={isAdmin}
								disabled={user.isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
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

export default UserEditScreen;
