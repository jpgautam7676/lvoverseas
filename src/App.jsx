import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from "./pages/Index.jsx";
import About from "./pages/About";
import Medical from "./pages/Medical";
import Blog from "./pages/Blog";
import Blogdetail from "./pages/Blogdetail.jsx";
import Servicedetails from "./pages/Servicedetails";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Request from "./pages/Request";
import Location from "./pages/Location";
import Table from "./pages/Table";
import Kenya_to_india from "./pages/Kenya_to_india";
import Whychoose from "./pages/Whychoose";
import Alluniversities from "./pages/Alluniversities";
import University from "./University";
import Universitydetails from "./pages/Universitydetails";
import Destinations from "./pages/Destinations";
import Destinationdetails from "./pages/Destinationdetails.jsx";
import Student_profile from "./pages/Student_profile";
import Popupform from "./pages/Popupform";
import Signin from "./pages/Signin";
import Forgot from "./pages/Forgot";
import Singup from "./pages/Singup";
import Applied from './pages/Applied';
import Otp from "./pages/Otp";
import Reset from "./pages/Reset";
import Logout from "./pages/Logout";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";
import Applicationdetails from "./pages/Applicationdetails.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/student/applied" element={<Applied />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blogdetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:slug" element={<Servicedetails />} />
          <Route path="/alluniversities" element={<Alluniversities />} />
          <Route path="/university" element={<University />} />
          <Route path="/university/:slug" element={<Universitydetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<Request />} />
          <Route path="/location" element={<Location />} />
          <Route path="/whychoose" element={<Whychoose />} />
          <Route path="/table" element={<Table />} />
          <Route path="/kenya_to_india" element={<Kenya_to_india />} />
          <Route path="/:countryName/:universitySlug" element={<Kenya_to_india />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<Destinationdetails />} />
          <Route path="/student" element={<Student_profile />} />
          <Route path="/popupform" element={<Popupform />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/password/reset" element={<Reset />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/otpverificationpage" element={<OTPVerificationPage />} />
          <Route path="/student/applied/application-details/:id/:token" element={<Applicationdetails/>} />
          <Route element={<ProtectedRoutes />}>
            {/* Place protected routes here */}
          </Route>
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
