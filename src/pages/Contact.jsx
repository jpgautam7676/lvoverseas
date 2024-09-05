import React, { Fragment, useState } from "react";
import Menu from "./Menu";
import { Link } from 'react-router-dom';
import Footer from "./Footer";

function Contact() {

	const [data,setData] = useState({
		name:"",
		phone:"",
		email:"",
		depname:"",
		message:"",
	});

    const InputEvent = (event) =>{
		const {name , value} = event.target;

		setData((preVal)=>{
			return{
				...preVal,
				[name] : value,
			}
		})


	}

	const formSubmit = (e) => {
          
		e.preventDefault();
		alert(` ${data.name}  ${data.email} ${data.phone} ${data.depname} ${data.message}`);
		         
	}

	return (
		<Fragment>
			<Menu />
			<section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('assets/img/breadcrumb.png')" }}>
				<div className="container">
					<h2>Contact Us</h2>
					<ul>
						<li><Link to="/" >Home</Link></li>
						<li><Link to="/Service" >Services</Link></li>
						<li>Contact Us</li>
					</ul>
				</div>
			</section>
			<section className="otherspage-area text-bg-light pt-60 mt-4">
				<div className="container">
					<div className="contact-toparea pb-75">
						<div className="row">
							<div className="col-lg-12 mb-4">
								<div className="row">
								<div className="col-lg-4 ">
								<div className="info-box7 contact-form">
									<div className="info7-img">
									<i class="fa-solid fa-location-dot"></i>
									</div>
									<span>Gurgaon Office</span>
									<h3>Mayfield Garden, B-16 Ground, Sector 50, Gurugram, Haryana 122002</h3>
								</div>
								</div>
								<div className="col-lg-4">
								<div className="info-box7 contact-form">
									<div className="info7-img">
									<i class="fa-solid fa-phone"></i></div>
									<span>Helpline No.</span>
									<h3><a href="tel:+919870406867">+91-9870406867</a></h3>
								</div>
								</div>
								<div className="col-lg-4">
								<div className="info-box7 contact-form">
									<div className="info7-img">
									<i class="fa-solid fa-envelope"></i></div>
									<span>Email</span>
									<h3><a href="mailto:info@innayatcro.com">info@innayatcro.com</a></h3>
								</div>
								</div>

								</div>
							</div>
							<div className="col-lg-12">
								<div className="contact-form contact-page">
									<div className="section-title mb-10">
										<h2>Have Questions?  Get in Touch!</h2>
									</div>
									<div className="get-appointment-form">
										<form  action=""  onSubmit={formSubmit}>
											<div className="row">
												<div className="col-sm-6">
													<div className="single-field">
														<label>Your Name</label>
														<input type="text" placeholder="Write your name"
														 name="name" value={data.fullname} onChange={InputEvent}  />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="single-field">
														<label>Email</label>
														<input type="email" placeholder="Email ID"
														 name="email"
														 value={data.email} onChange={InputEvent}
														 />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="single-field">
														<label>Phone Number</label>
														<input type="text" 
													     placeholder="Phone Number"
														 value={data.phone} onChange={InputEvent}
														 name="phone" />
													</div>
												</div>
												<div className="col-sm-6">
													<div className="single-field">
														<label>Select Service</label>
														<select name="depname"
														    onChange={InputEvent}
															className="select-list">
															<option>Select</option>
															<option value={data.depname}>Pre-clinical Operations</option>
															<option value={data.depname}>Clinical Operation</option>
															<option value={data.depname}>Medical Writing</option>
															<option value={data.depname}>Pharmacovigilance</option>
															<option value={data.depname}>Quality Assurance</option>
															<option value={data.depname}>Medical Affairs</option>
															<option value={data.depname}>Biostatistics & Programming</option>
															<option value={data.depname}>Regulatory Affairs</option>
															<option value={data.depname}>Data Management</option>
														</select>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="single-field">
														<label for="phone">Your Message</label>
														<textarea name="message" value={data.message} onChange={InputEvent} 
														 placeholder="Write Your Message Here">
														 </textarea>
													</div>
												</div>
												<div className="col-sm-12 mb-0">
													<p><span>*</span> Visit our agency or simply send us an email anytime you want. If you have any questions, please feel free to contact us.</p>
												</div>
												<div className="col-md-5 col-sm-8">
													<div className="single-field pt-20 pb-0">
														<button className="button-1">Submit Now <i
														className="fa-solid fa-arrow-right"></i>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="contact-page-map-section">
				<div className="contact_map wow fadeInUp" data-wow-delay=".3s">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d895853.776830466!2d76.71196420371388!3d28.706728162325604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2279ac7be797%3A0xaccdeb80709c86ea!2sInnayat%20CRO!5e0!3m2!1sen!2sin!4v1697627186191!5m2!1sen!2sin"></iframe>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default Contact;