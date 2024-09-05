import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import { Link, useNavigate } from 'react-router-dom';

function Reset() {
    const [id, setId] = useState(''); 
    const [rememberToken, setRememberToken] = useState(''); 
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const uid = url.searchParams.get('uid');
        const token = url.searchParams.get('token');
        
        if (uid) setId(uid);
        if (token) setRememberToken(token);
    }, []);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmNewPassword) {
            setErrors({ confirmNewPassword: 'Passwords do not match' });
            return;
        }

        try {
            const payload = { id, remember_token: rememberToken, new_password: newPassword, confirm_new_password: confirmNewPassword };
            
            const response = await fetch('https://www.backend.lvoverseas.com/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.status === "failed") {
                setMessage(data.message);
                setErrors(data.errors || {});
            } else if (data.status === "success") {
                setMessage(data.message);
                setErrors({});
                navigate('/signin', { state: { successMessage: 'Password changed successfully. Successfully logged in.' } });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
            setErrors({});
        }
    };

    return (
        <Fragment>
            <Menu />
            <section className="singin-form pt-110 pb-110">
                <div className="container">
                    <div className="row align-items-center justify-content-center d-flex flex-column">
                        <div className="col-lg-6 form-bg">
                            <h3 className="mt-0 mb-3">Reset <span>Password</span></h3>
                            {message && <div className="mt-3 text-success">{message}</div>}
                            <form onSubmit={handleResetPassword}>
                                <div className="mb-3">
                                    <input
                                        type="hidden"
                                        className="form-control mb-2"
                                        placeholder="ID"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                   
                                    <input
                                        type="hidden"
                                        className="form-control mb-2"
                                        placeholder="Remember Token"
                                        value={rememberToken}
                                        onChange={(e) => setRememberToken(e.target.value)}
                                    />
                                   
                                    <input
                                        type="password"
                                        className="form-control mb-2"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    {errors.confirmNewPassword && <div className="text-danger">{errors.confirmNewPassword}</div>}
                                </div>
                                <button type="submit" className="btn btn-danger w-100">Reset Password</button>
                                <div className="float-right text-danger">
                                    <Link to="/signin" className="text-danger">Sign In</Link>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Reset;
