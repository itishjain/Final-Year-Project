import "../components/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ErrorPage from "./ErrorPage";
import Success from "./Success";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Success" element={<Success />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// Install nodejs First

// 1) npx create-react-app appName

// 2) npm start => localhost3000
