// random 20 characters string (alphanumeric lowercase)
const generateToken = () => {
	return Array.from(Array(36), () => Math.floor(Math.random() * 36).toString(36)).join("");
};

export default generateToken;
