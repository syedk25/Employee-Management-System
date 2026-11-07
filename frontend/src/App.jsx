import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ListEmployeeComponent from "./components/ListEmployeeComponent.jsx";
import Employee from "./components/Employee.jsx";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<Employee />} />
            <Route path="/edit-employee/:id" element={<Employee />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
