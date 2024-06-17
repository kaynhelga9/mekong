import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin User",
		email: "admin@email.com",
		password: bcrypt.hashSync("123", 10),
		isAdmin: true,
	},
	{
		name: "John Smith",
		email: "john@email.com",
		password: bcrypt.hashSync("123", 10),
		isAdmin: false,
	},
	{
		name: "Jane Smith",
		email: "jane@email.com",
		password: bcrypt.hashSync("123", 10),
		isAdmin: false,
	},
];

export default users;
