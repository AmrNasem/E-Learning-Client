# 🎓 E-Learning Platform

A role-based e-learning platform built to simulate real-world learning systems, focusing on **structured user flows**, **state management**, and **scalable frontend architecture**.

---

## 🚀 Live Demo

🔗 [https://standalone--e-learning-client.netlify.app](https://standalone--e-learning-client.netlify.app)

## 💻 Source Code

🔗 [https://github.com/AmrNasem/E-Learning-Client](https://github.com/AmrNasem/E-Learning-Client)

---

## 📖 About The Project

This project is a frontend-focused implementation of a Learning Management System (LMS), designed to practice building **real-world application flows** using React.

It simulates two primary roles:

- **Instructor** → manages and creates courses
- **Student** → browses, purchases, and consumes content

The goal was to explore how to structure a scalable UI while handling multiple user experiences within the same application.

---

## ✨ Features

- 👨‍🏫 Instructor dashboard to:
  - Create new courses
  - Update existing ones
  - Manage owned content
- 🎓 Student experience to:
  - Browse available courses
  - Add courses to cart
  - Purchase and access content
- 📚 Course details page:
  - Structured sections and lectures
  - Course overview and content layout
- 🛒 Shopping cart & purchase flow
- 👤 User profile page

---

## 🧠 Key Concepts & Learnings

- Building **role-based UI systems** (Instructor vs Student)
- Managing **global state** with Redux Toolkit
- Structuring **complex UI flows** across multiple pages
- Designing **nested data structures** (courses → sections → lectures)
- Creating reusable and scalable React components

---

## 🧱 Tech Stack

### Frontend

- React
- Redux Toolkit
- Bootstrap

### Data Handling

- REST API

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash id="k2x0pt"
git clone https://github.com/AmrNasem/E-Learning-Client.git
```

### 2. Install dependencies

```bash id="w3g7o0"
npm install
```

### 3. Run the development server

```bash id="4n5y9c"
npm start
```

---

## 🧩 Technical Decisions

### 🔹 Role-Based UI Separation

Used conditional rendering and routing logic to handle different user experiences within a single codebase.

### 🔹 Redux Toolkit for State Management

Centralized handling of course data, cart state, and user interactions across multiple pages.

### 🔹 Component Reusability

Built shared components and layout patterns to reduce duplication and maintain consistency.

---

## ⚔️ Challenges & Solutions

### 1. Managing Multiple User Flows

**Challenge:** Handling instructor and student experiences in one app
**Solution:** Separated logic using role-based conditions and reusable components

### 2. Structuring Course Content

**Challenge:** Representing courses with sections and lectures
**Solution:** Designed nested data models to organize content clearly

### 3. Keeping UI Consistent Across Pages

**Challenge:** Maintaining layout consistency
**Solution:** Used shared layout components and consistent styling patterns

---

## 🔮 Future Improvements

- 📊 Progress tracking and course completion
- 📝 Interactive quizzes and assignments
- 🌐 Better API integration (real data instead of mock/practice APIs)

---

## 👤 Authors

**Amr Nasem**

- GitHub: [https://github.com/AmrNasem](https://github.com/AmrNasem)

**Mohammed Heggy**

- GitHub: [https://github.com/Mohammed0Heggy](https://github.com/Mohammed0Heggy)

---

## ⭐ Final Note

This project highlights my ability to build structured frontend applications with multiple user roles, focusing on **clean architecture**, **state management**, and **realistic user flows**.