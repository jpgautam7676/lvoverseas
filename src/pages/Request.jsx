import React, { Fragment } from "react";





function Request (){
    return(
        <Fragment>
          <section className="get-appointment-area" id="request">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 mb-35">
							<div className="section-title text-center">
								<h2>We Do Whatever It Takes To Bring You Peace Of Mind</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="get-appointment-form">
								<form action="#">
									<div className="row">
										<div className="col-lg-4 col-sm-6">
											<div className="single-field">
												<label for="yourname">Full Name</label>
												<input type="text" placeholder="Full Name" name="Full Name" />
											</div>
										</div>
										<div className="col-lg-4 col-sm-6">
											<div className="single-field">
												<label for="yourname">Email ID</label>
												<input type="text" placeholder="Email ID" name="email-id" />
											</div>
										</div>
										<div className="col-lg-4 col-sm-6">
											<div className="single-field">
												<label for="yourname">Phone Number</label>
												<input type="text" placeholder="Phone-number" name="phone-number" />
											</div>
										</div>
										<div className="col-lg-4 col-sm-6">
											<div className="single-field">
												<label for="docname">Select Doctor</label>
												<select name="docname" id="docname">
													<option>Select Doctor</option>
													<option value="Department 1">MBBS</option>
													<option value="Donald L. Juarez">MD</option>
												</select>
											</div>
										</div>
										<div className="col-lg-4 col-sm-6">
											<div className="single-field">
												<label for="docname">Select State</label>
												<select name="docname" id="docname">
													<option>Select State</option>
													<option value="">Andhra Pradesh</option>
													<option value="">Arunachal Pradesh</option>
													<option value="">Assam</option>
													<option value="">Bihar</option>
													<option value="">Chhattisgarh</option>
													<option value="">Goa</option>
													<option value="">Gujarat</option>
													<option value="">Haryana</option>
													<option value="">Himachal Pradesh</option>
													<option value="">Jharkhand</option>
													<option value="">Karnataka</option>
													<option value="">Kerala</option>
													<option value="">Madhya Pradesh</option>
													<option value="">Maharashtra</option>
													<option value="">Meghalaya</option>
													<option value="">Mizoram</option>
													<option value="">Nagaland</option>
													<option value="">Manipur</option>
													<option value="">Odisha</option>
													<option value="">Punjab</option>
													<option value="">Rajasthan</option>
													<option value="">Sikkim</option>
													<option value="">Tamil Nadu</option>
													<option value="">Telangana</option>
													<option value="">Tripura</option>
													<option value="">Uttar Pradesh</option>
													<option value="">Uttarakhand</option>
													<option value="">West Bengal</option>
												</select>
											</div>
										</div>
										
										<div className="col-lg-3  col-md-6 align-self-end">
											<div className="single-field">
												<button className="button-1">Submit Now<i
													className="fa-solid fa-arrow-right"></i></button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>

					</div>
				</div>
			</section>
           
        </Fragment>
    )
}

export default Request ;