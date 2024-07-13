import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
	const navigate = useNavigate();
	const { keyword: urlKeyword } = useParams();
	const [keyword, setKeyword] = useState(urlKeyword || "");

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			setKeyword("");
			navigate(`/search/${keyword}`);
		} else {
			navigate("/");
		}
	};

	return (
		<Form onSubmit={submitHandler} className="d-flex">
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				value={keyword}
			></Form.Control>
			<Button variant="dark" size="sm" type="submit">
				<FaSearch />
			</Button>
		</Form>
	);
};

export default SearchBox;
