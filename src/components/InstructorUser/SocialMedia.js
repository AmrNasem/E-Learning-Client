import classes from "./SocialMedia.module.css";
import TwitterIcon from "../Icons/TwitterIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import LinkIcon from "../Icons/LinkIcon";

const SocialMedia = (props) => {
  const { socialMedia, className } = props;

  return (
    <div className={`${classes["social-media"]} ${className}`}>
      {Object.keys(socialMedia).map((contact, index) => {
        let icon;
        if (contact === "website") icon = <LinkIcon width={18} height={18} />;
        else if (contact === "twitter")
          icon = <TwitterIcon width={18} height={18} />;
        else if (contact === "facebook")
          icon = <FacebookIcon width={18} height={18} />;
        else if (contact === "youtube")
          icon = <YoutubeIcon width={18} height={18} />;
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
