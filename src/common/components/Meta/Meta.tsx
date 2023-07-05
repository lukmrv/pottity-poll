import Head from "next/head";

type Props = {
  title: string;
};

const Meta = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Generated by create next app" />
      <script
        defer
        type="text/javascript"
        src="https://widget.d1.orlowisko.pl/dashboard/static/js/widget_embed_script.js"
      ></script>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Pottity Poll - Home Page",
};

export default Meta;
