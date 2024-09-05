import React, { Fragment, useState, useEffect } from "react";
import Menu from "./Menu";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from "./Footer";

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            navigate('/alluniversities');
        }
    }, [navigate]);

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await fetch('https://www.backend.lvoverseas.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await loginResponse.json();
            if (loginResponse.ok && data.student_id) {
                localStorage.setItem("userID", data.student_id);
                navigate('/alluniversities', { state: { id: data.student_id } });
            } else {
                setResponse('Invalid credentials');
            }
        } catch (error) {
            setResponse('Error signing in. Please try again later.');
        }
    };

    return (
        <Fragment>
            <Menu />
            <section className="signin-form pt-110 pb-110">
                <div className="container">
                    <div className="row align-items-center justify-content-center d-flex flex-column">
                        <div className="col-lg-6 form-bg">
                            {successMessage && <div className="alert text-center alert-success">{successMessage}</div>}
                            {response && (
                                <div className="mb-2 form-control bg-light text-danger">
                                    {response}
                                </div>
                            )}
                            <h3>Sign <span> In</span></h3>
                            <form onSubmit={handleSignin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                    <Link to={"/Forgot"} className="float-right text-danger">Forgot Password?</Link>
                                </div>
                                <button type="submit" className="btn btn-danger w-100">Sign In</button>
                                <div className="mt-2">
                                    <span>Don't have an account? </span>
                                    <Link className="text-danger" to={"/Signup"}>Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Signin;
