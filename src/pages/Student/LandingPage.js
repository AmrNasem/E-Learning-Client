import { Link } from "react-router-dom";
import CourseList from "../../components/courses/CourseList";
import classes from "./LandingPage.module.css";
import { memo, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";

const images = [
  {
    src: require("../../assets/landing-page.jpg"),
    alt: "A person standing and giving a presentation",
  },
  {
    src: require("../../assets/landing-page-2.jpg"),
    alt: "A person standing and giving a presentation",
  },
  {
    src: require("../../assets/landing-page-3.jpg"),
    alt: "A person typing on a laptop",
  },
  {
    src: require("../../assets/landing-page-4.jpg"),
    alt: "A nice desk with a laptop and smartphone",
  },
  {
    src: require("../../assets/landing-page-5.jpg"),
    alt: "Two guys sitting in front of a laptop",
  },
];

const quotes = [
  "Empower yourself to achieve greatness.",
  "Discover new possibilities and embrace your potential.",
  "Transform your life with our proven methods.",
  "Unlock your inner strength and live your best life.",
  "Embark on a journey of self-discovery and personal growth.",
];

const quoteReducer = (state, action) => {
  if (action.type === "resetQuote")
    return {
      ...state,
      text: "",
    };
  if (action.type === "setQuote") {
    return {
      ...state,
      text: `${state.text}${action.text}`,
    };
  }
  if (action.type === "incrementIndex") {
    if (state.index < quotes.length - 1) {
      return {
        ...state,
        index: state.index + 1,
      };
    } else
      return {
        ...state,
        index: 0,
      };
  }
  return { text: "", index: 0 };
};

const LandingPage = () => {
  const [landingImage, setLandingImage] = useState(images[0]);
  const [quote, dispatchQuote] = useReducer(quoteReducer, {
    text: "",
    index: 0,
  });
  const authedUser = useSelector((state) => state.auth.user);
  const [payload, setPayload] = useState(null);
  const { sendRequest: getHome, error } = useHttp();

  const applyData = (payload) => {
    console.log(payload);
    setPayload(payload);
  };

  useEffect(() => {
    getHome({ endPoint: "courses/home" }, applyData);
  }, [getHome]);

  const typingAnimation = (currentQuote) => {
    let i = 0;
    let timeout;
    const interval = setInterval(() => {
      if (i < currentQuote.length) {
        dispatchQuote({
          type: "setQuote",
          text: currentQuote[i++],
        });
      } else {
        clearInterval(interval);
        clearTimeout(timeout); // Like garbage collection
        timeout = setTimeout(() => {
          dispatchQuote({ type: "resetQuote" });
          dispatchQuote({ type: "incrementIndex" });
        }, 2000);
      }
    }, 90);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * images.length);
      setLandingImage(images[random]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentQuote = quotes[quote.index].split("");
    typingAnimation(currentQuote);
  }, [quote.index]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className={classes["landing-page"]}>
      <div className={classes["landing-image"]}>
        <img src={landingImage.src} alt={landingImage.alt} />
        <div className={classes.content}>
          <h1
            className={
              quotes[quote.index].length === quote.text.length
                ? classes["fade-out"]
                : ""
            }
          >
            {quote.text}
          </h1>
          {!authedUser && <Link to="/signup">Get started!</Link>}
        </div>
      </div>
      <div className={classes["landing-courses"]}>
        <CourseList
          class="Best Seller"
          error={error}
          courses={payload && payload.bestsellers}
        />
        <CourseList
          class="Recommends"
          error={error}
          courses={payload && payload.recommendations}
        />
      </div>
    </main>
  );
};

export default memo(LandingPage);
