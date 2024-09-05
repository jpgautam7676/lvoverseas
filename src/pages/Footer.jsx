import React, { Fragment} from "react";
import { Link } from 'react-router-dom';



const year = new Date().getFullYear();


function Footer() {



	return (
		<Fragment>
			<div className="whats-float">
				<Link to="https://api.whatsapp.com/send?phone=919870406867&text=Hello" target="blank" className="open-button">
					<span>Need any help<br /><small>Chat with us</small></span>
					<img src="assets/img/services/wa.png" width="30" alt="whatsapp" /></Link>
			</div>
			<footer className="footer">
				<div className="footer-top pt-70 pb-50" style={{ backgroundImage: "url('../assets/img/footer-bg.png')" }}>
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="footer-widegts-single">
									<h3 className="title">Contact Info</h3>
									<ul className="contact-info">
										<li><i className="fa-solid fa-location-dot"></i>B-16 Ground Floor, Mayfield Garden, Sector 50,<br /> Gurugram, Haryana, India 122002</li>
										<li><i className="fa-solid fa-phone"></i><Link to="tel:+91-9818560331"><strong>+91-9818560331</strong></Link></li>
										<li><i className="fa-solid fa-envelope"></i><Link to="mailto:Info@Mbbsinvietnam.Com">Info@Mbbsinvietnam.Com</Link></li>
										<li><i className="fa fa-clock"></i>Mon-Sat: 10:00 AM to 7:00 PM</li>
									</ul>
									<div className="footer-social mt-30">
										<span><Link to="https://www.facebook.com" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></Link></span>
										<span><Link to="https://www.instagram.com" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></Link></span>
										<span><Link to="https://www.linkedin.com" aria-label="Linkedin"><i className="fa-brands fa-linkedin-in"></i></Link></span>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="footer-widegts-single">
									<h3 className="title">Quick Links</h3>
									<ul>
										<li><Link to="#">Home</Link></li>
										<li><Link to="#">About us</Link></li>
										<li><Link to="#">Services</Link></li>
										<li><Link to="#">Contact us</Link></li>
										<li><Link to="#">News & Blog</Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="footer-widegts-single">
									<h3 className="title">Services</h3>
									<ul>
										<li><Link to="#">Pre-clinical Operations</Link></li>
										<li><Link to="#">Clinical Operation</Link></li>
										<li><Link to="#">Medical Writing</Link></li>
										<li><Link to="#">Pharmacovigilance</Link></li>
										<li><Link to="#">Quality Assurance</Link></li>
									</ul>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				<div className="footer-bottom pt-25 pb-25">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 text-center">
								<div className="copyright-text">
									<p>Copyright by InnayatCRO. All rights reserved in {year}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<div className="scroll-area"><i className="fa-solid fa-arrow-up-long"></i></div>
		</Fragment>
		
	);
	
};

export default Footer;