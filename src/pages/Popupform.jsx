import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Popupform = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [c_code, setCode] = useState('');
    const [mobile, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm] = useState('');
    const [response, setResponse] = useState('');
    const [userID, setUserID] = useState(null);
    const location = useLocation();
    const { id } = location.state || {};
    const navigate = useNavigate();
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const signUpResponse = await fetch('https://www.backend.lvoverseas.com/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, c_code, mobile, password, confirm_password }),
            });

            const data = await signUpResponse.json();

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
        const storedUserID = localStorage.getItem('userID');
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, []);
    
    return (
        <div className="popup-container">
            {userID ? null : (
                <button className="open-btn popup_btn" onClick={togglePopup}>View details</button>
            )}

            {isOpen && (
                <div className="popup">
                    <button className="close-btn" target="_blank" onClick={togglePopup}>Close</button>
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
                            <div class="col-3 pr-0">
                                <select name="c_code" id="c_code" class="form-control bg-white" onChange={(e) => setCode(e.target.value)}>
                                    <option value="0" selected>Select</option>
                                    <option value="+91">
                                        +91
                                    </option>
                                  
                                </select>
                                {response.error && response.error.c_code && response.error.c_code[0] && (
                                    <span className="text-danger">{response.error.c_code[0]}</span>
                                )}
                            </div>
                            <div class="col-9 pl-1">
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
                            <Link to={"/Signin"} className="text-danger"> Sing In </Link>
                        </label>
                    </form>

                </div>
            )}
        </div>
    );
};

export default Popupform;
