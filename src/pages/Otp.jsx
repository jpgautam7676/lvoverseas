import React, { Fragment, useState } from "react";
import Menu from "./Menu";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from "./Footer";

function Otp() {
	const [otp, setOTP] = useState('');
	const [response, setResponse] = useState('');
	const navigate = useNavigate();

	const location = useLocation();
	const { id } = location.state || {};



	const handleSubmitOTP = async (e) => {
		e.preventDefault();

		try {
			const otpResponse = await fetch('https://www.backend.lvoverseas.com/api/submit-email-otp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ otp, id }),
			});

			const data = await otpResponse.json();

			if (data.status === 'success') {
				localStorage.setItem("userID", data.id);
				navigate('/kenya_to_india', { state: { id: data.id } });
			} else {
				setResponse(data);
			}

			

		} catch (error) {
			console.log(error)
		}
	}

	


	return (
		<Fragment>
			<Menu />
			<section className="singin-form pt-110 pb-110">
				<div className="container">
					<div className="row align-items-center justify-content-center d-flex flex-column">
						<div className="col-lg-6 form-bg">
							<h3 className="mt-0 mb-3">Enter The<span> Otp Here</span></h3>
							<form onSubmit={handleSubmitOTP}>
								<span className="text-danger"> {response.message ?? ''}</span>
								<div className="mb-3 ">
									<label>Enter your email we'll send you a link to reset your password.</label>
									<input
										type="text"
										className="form-control"
										value={otp}
										onChange={(e) => setOTP(e.target.value)}
										placeholder="OTP"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
									/>
								</div>
								
								<button type="submit" className="btn btn-danger w-100">Verify OTP</button>
								<label className="float-right text-danger">
									<Link to="/Signin" className="text-danger">Sing In</Link>
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

export default Otp;
