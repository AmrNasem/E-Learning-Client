import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainHeader from "./components/Header/MainHeader";
import MobileHeader from "./components/Header/MobileHeader";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import { useContext } from "react";
import HeaderContext from "./store/header-context";
import Course from "./pages/Course";

const DUMMY_DATA = [
  {
    id: "c1",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    sections: [
      {
        title: "Introduction to HTML",
        duration: "1hr 19min",
        lectures: [
          { title: "Introduction to HTML", type: "video", duration: "04:18" },
          { title: "Using HTML Tags", type: "video", duration: "08:04" },
        ],
      },
      {
        title: "Intermediate HTML",
        duration: "57min",
        lectures: [
          { title: "HTML Tables", type: "video", duration: "11:57" },
          {
            title: "Download the course syllabus",
            type: "video",
            duration: "02:17",
          },
        ],
      },
    ],
    price: 1400,
  },
  {
    id: "c2",
    title: "The complete guide to JavaScript",
    category: "Mobile Development",
    categoryId: "mobile",
    instructor: "Osama Elzero",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
      "Work as a freelance web developer.",
      "Master backend development with Node",
      "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
      "Build fully-fledged websites and web apps for your startup or business.",
      "Master frontend development with React",
      "Learn professional developer best practices.",
    ],
    sections: [
      {
        title: "Front-End Web Development",
        duration: "37min",
        lectures: [
          {
            title: "What you'll get in this course",
            type: "video",
            duration: "03:08",
          },
          {
            title: "Download the course syllabus",
            type: "article",
            duration: "00:12",
          },
          {
            title: "Download the course resources",
            type: "article",
            duration: "00:17",
          },
        ],
      },
      {
        title: "Introduction to HTML",
        duration: "1hr 19min",
        lectures: [
          { title: "Introduction to HTML", type: "video", duration: "04:18" },
          { title: "Using HTML Tags", type: "video", duration: "08:04" },
          {
            title: "The Anatomy of an HTML Tag",
            type: "video",
            duration: "10:53",
          },
        ],
      },
      {
        title: "Intermediate HTML",
        duration: "57min",
        lectures: [
          { title: "HTML Tables", type: "video", duration: "11:57" },
          {
            title: "Download the course syllabus",
            type: "video",
            duration: "02:17",
          },
          {
            title: "HTML Tables Code Challenge",
            type: "video",
            duration: "01:44",
          },
        ],
      },
    ],
    price: 0,
  },
  {
    id: "c3",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
  {
    id: "c4",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
  {
    id: "c5",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
  {
    id: "c6",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
  {
    id: "c7",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
  {
    id: "c8",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
  {
    id: "c9",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
  {
    id: "c10",
    title: "The complete guide to React",
    category: "Web Development",
    categoryId: "web",
    instructor: "Maximilian",
    gain: [
      "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
    ],
    price: 1400,
  },
];

function App() {
  const headerCtx = useContext(HeaderContext);
  const blurCategoriesHandler = () => {
    headerCtx.setVisibleCategories(false);
  };
  return (
    <div className="App" onClick={blurCategoriesHandler}>
      <MainHeader />
      <MobileHeader />
      <Routes>
        <Route path="/" element={<LandingPage dummyData={DUMMY_DATA} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/course/:courseId/*"
          element={<Course dummyData={DUMMY_DATA} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
