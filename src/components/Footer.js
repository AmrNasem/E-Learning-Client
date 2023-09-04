import { Link } from "react-router-dom";
import "./Footer.module.css";

const Footer = (props) => {
  return (
    <footer className={props.className}>
      <div className="col1">
        <Link to="/">Learning Business</Link>
        <Link to="/">Teach on Learning</Link>
        <Link to="/">Get the app</Link>
        <Link to="/">About us</Link>
        <Link to="/">Contact us</Link>
      </div>
      <div className="col2">
        <Link to="/">Careers</Link>
        <Link to="/">Blog</Link>
        <Link to="/">Help and Support</Link>
        <Link to="/">Affiliate</Link>
        <Link to="/">Investors</Link>
      </div>
      <div className="col3">
        <Link to="/">Terms</Link>
        <Link to="/">Privacy Policy</Link>
        <Link to="/">Cookie Settings</Link>
        <Link to="/">Sitemap</Link>
        <Link to="/">Accessiblity Statements</Link>
      </div>
    </footer>
  );
};

export default Footer;
