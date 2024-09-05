import React, { Fragment, useState } from "react";
import Menu from "./Menu";
import { Link } from 'react-router-dom';
import Footer from "./Footer";

function Forgot() {
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://www.backend.lvoverseas.com/api/forget-password', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
    
            if(response.ok){
                setMessage(data.message);
            }else{
                setMessage(data.error)
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while trying to reset the password')
        }
    };

   

    return (
        <Fragment>
            <Menu />

            <section className="singin-form pt-110 pb-110">
                <div className="container">
                    <div className="row align-items-center justify-content-center d-flex flex-column">
                    
                        <div className="col-lg-6 form-bg">
                        <label className="mb-2 text-danger">{message}</label>
                       
                            <h3 className="mt-0 mb-3">Forgot <span>Password</span></h3>
                            <form onSubmit={handleForgetPassword}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger w-100">Reset Password</button>
                                <div className="float-right text-danger">
                                    <Link to="/Signin" className="text-danger">Sign In</Link>
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

export default Forgot;
