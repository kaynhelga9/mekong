import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
	useGetUsersQuery,
	useDeleteUserMutation,
} from "../../slices/usersApiSlice";

const UserListScreen = () => {
	const { data: users, isLoading, error, refetch } = useGetUsersQuery();

	const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

	const deleteHandler = async (id) => {
		if (window.confirm("Delete user?")) {
			try {
				await deleteUser(id);
				refetch();
				toast.success("User deleted");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<>
			<h1>Users</h1>

			{loadingDelete && <Loader />}

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant={"danger"}>{error}</Message>
			) : (
				<Table hover responsive borderless>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th>DATE CREATED</th>
							<th>EDIT</th>
							<th>DEL</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id.slice(-5)}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>
										{user.email}
									</a>
								</td>
								<td>
									{user.isAdmin ? (
										<FaCheck style={{ color: "green" }} />
									) : (
										<FaTimes style={{ color: "red" }} />
									)}
								</td>
								<td>{user.createdAt.substring(0, 10)}</td>
								<td>
									<Link to={`/admin/user/${user._id}/edit`}>
										<FaEdit size={"25"} />
									</Link>
								</td>
								<td>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(user._id)}
									>
										<FaTrash />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
