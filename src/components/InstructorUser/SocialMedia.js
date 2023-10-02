import classes from "./SocialMedia.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const SocialMedia = (props) => {
  const { socialMedia, className } = props;

  return (
    <div className={`${classes["social-media"]} ${className}`}>
      {Object.keys(socialMedia).map((contact, index) => {
        let icon;
        if (contact === "website")
          icon = <FontAwesomeIcon className="text-black" icon={faPaperclip} />;
        else if (contact === "twitter")
          icon = <FontAwesomeIcon className="text-black" icon={faTwitter} />;
        else if (contact === "facebook")
          icon = <FontAwesomeIcon className="text-black" icon={faFacebook} />;
        else if (contact === "youtube")
          icon = <FontAwesomeIcon className="text-black" icon={faYoutube} />;
        return (
          <a
            key={index}
            rel="noreferrer"
            target="_blank"
            href={socialMedia[contact]}
          >
            {icon}
            <span>{contact}</span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialMedia;
