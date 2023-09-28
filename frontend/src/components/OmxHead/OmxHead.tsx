import { Helmet } from "react-helmet";
import FaviconImg from "../../assets/img/favicon.svg";

interface OmxHeadProps {
  title?: string;
}

export const OmxHead: React.FC<OmxHeadProps> = function ({ title }) {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href={FaviconImg} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>CDP{title ? `: ${title}` : ""}</title>
    </Helmet>
  );
};
