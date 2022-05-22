import Head from "next/head";

type Props = {
	title: string;
};

const Meta = ({ title }: Props) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content="Generated by create next app" />
		</Head>
	);
};

Meta.defaultProps = {
	title: "Pottity Poll - Home Page",
};

export default Meta;
