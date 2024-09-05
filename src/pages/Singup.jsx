import React, { Fragment, useState,useEffect } from "react";
import Menu from "./Menu";
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./Footer"
const isLoggedIn = localStorage.getItem('userID');
function Singup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [c_code, setCode] = useState('');
    const [mobile, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm] = useState('');
    const [response, setResponse] = useState('');
    

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (name && email && c_code && mobile && password && confirm_password) {
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("c_code", c_code);
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("password", password);
            localStorage.setItem("confirm_password", confirm_password);
            
        } 
       
        try {
            const signUpResponse = await fetch('https://www.backend.lvoverseas.com/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, c_code, mobile, password, confirm_password }),
            });

            const data = await signUpResponse.json();
            console.log(data);

            if (data.error) {
                setResponse(data)
            }
            else if (data.id) {
                navigate('/otp', { state: { id: data.id } });
            }

        } catch (error) {
            setResponse({ message: 'Error signing in. Please try again later.' });
        }
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userID');
        if (isLoggedIn) {
            navigate('/alluniversities');
        }
    }, []);
   


     
    return (
        <Fragment>
            <Menu />
            <section className="singin-form pt-110 pb-110">
                <div className="container">
                    <div className="row align-items-center justify-content-center d-flex flex-column">
                        <div className="col-lg-6 form-bg">
                            <h3>Sign <span>Up</span></h3>
                            <form onSubmit={handleSignup}>
                                <div className="mb-3 ">
                                    <input name="name" type="text" class="form-control " placeholder="Your Name" onChange={(e) => setName(e.target.value)} required="" />
                                    {response.error && response.error.name && response.error.name[0] && (
                                        <span className="text-danger">{response.error.name[0]}</span>
                                    )}
                                </div>
                                <div className="mb-3 ">
                                    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-describedby="emailHelp" />
                                    {response.error && response.error.email && response.error.email[0] && (
                                        <span className="text-danger">{response.error.email[0]}</span>
                                    )}
                                   
                                </div>
                                <div class="row">
                                    <div class="col-2 pr-0">
                                        <select name="c_code" id="c_code" class=" select-height" onChange={(e) => setCode(e.target.value)} required="">
                                            <option value="0" selected>Select</option>
                                            <option value="+91">
                                                +91 
                                            </option>
                                            
                                        </select>
                                        {response.error && response.error.c_code && response.error.c_code[0] && (
                                            <span className="text-danger">{response.error.c_code[0]}</span>
                                        )}
                                    </div>
                                    <div class="col-10 pl-1">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <input name="mobile" type="phone" class="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required="" />
                                                {response.error && response.error.mobile && response.error.mobile[0] && (
                                                    <span className="text-danger">{response.error.mobile[0]}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 ">
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control" />
                                    {response.error && response.error.password && response.error.password[0] && (
                                        <span className="text-danger">{response.error.password[0]}</span>
                                    )}
                                </div>
                                <div className="mb-3 ">
                                    <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} className="form-control" />
                                    {response.error && response.error.confirm_password && response.error.confirm_password[0] && (
                                        <span className="text-danger">{response.error.confirm_password[0]}</span>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-danger w-100">Sign Up</button>
                                <label className="mt-2 mb-2">Don't have an account? </label>
                                <label className="float-right  mt-2 mb-2 ">
                                    <Link to={"/signin"} className="text-danger"> Sing In </Link>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
};
export default Singup;