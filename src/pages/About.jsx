import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import { Link } from 'react-router-dom';
import Footer from "./Footer"
import { Helmet } from "react-helmet";





function About() {

	const [seoData,setSeoData] = useState({});

	useEffect(() => {
		fetch('https://www.backend.lvoverseas.com/api/seo/home')
		  .then(response => response.json())
		  .then(data => setSeoData(data))
		  .catch(error => console.error('Error fetching SEO data:', error));
	  }, []);

	return (
		<Fragment>
		<Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keyword} />
       </Helmet>
			<Menu />
			<section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('../assets/img/breadcrumb.png')" }}>
				<div className="container">
					<h2>About Us</h2>
					<ul>
						<li><Link to="#">Home</Link></li>
						<li>About Us</li>
					</ul>
				</div>
			</section>
			<section className="about-area pt-110 pb-110">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-xl-5 col-lg-6">
							<div className="helpline-image">
								<img className="homeabout-main" src="assets/img/about2.png" alt="Image" />
								<div className="homeabout-shape2">
									<img className="heartbeat" src="assets/img/shap/shap5.png" alt="Image" /> </div>
								<div className="homeabout-shape4">
									<img src="assets/img/shap/helpline-shape2.png" alt="Image" /> </div>
								<div className="homeabout-shape5">
									<img className="shap-bounce" src="assets/img/shap/helpline-shap.png" alt="Image" />
								</div>
							</div>
						</div>
						<div className="col-xl-7 col-lg-6">
							<div className="about-content">
								<div className="section-title">
									
									<p className="text-justify">
										A well organised international self-regulating management service Centre, Innayat, establishes in the year 2020. With the headquarters in Haryana, it sprouts rapidly in Malaysia, Bangalore, & Gurgaon. Around the world, it lends its service to the clients who claim the services in Medical Devices industries, Pharmaceuticals, Nutraceuticals, Herbs, & in Cosmetics excessively. With at most prompt time and quality, it heals the requirements of pharmaceutical companies to transform their ideas and concepts into a successful product with efficient drug development. Our innovative approaches to the clients’ needs make us unique among the CROs.</p>
									<p>A team of highly qualified & focused professionals accomplishes clinical trials. Our core activities include Clinical Operations, Data Management, Pharmacovigilance, Biostatistics and SAS Programming, Regulatory Affairs, Medical, and Allied Services. The experience and the flexibility to respond to the specific tasks with a specific time frame are our main attractions to the clients in the world. If you are interested in a clinical trial organization with expertise, experience, and a professional, do contact:</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="why-choose-area pt-40 pb-40 section-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 mb-30">
							<div className="section-title text-center">
								<h2 className="mb-1">Real People Real Solutions</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 mb-30">
							<div className="info-box-2">
								<div className="icon">
									<img src="assets/img/icon/mission-gray.png" alt="Image" />
									<img className="hover-img" src="assets/img/icon/mission-color.png" alt="Image" />
								</div>
								<div className="content">
									<h4>Our Mission</h4>
									<p>Contributing to a safer and healthier world by providing our clients with innovative and high quality laboratory, research and advisory services and also creating more opportunities.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 mb-30">
							<div className="info-box-2">
								<div className="icon">
									<img src="assets/img/icon/vision-gray.png" alt="Vision" />
									<img className="hover-img" src="assets/img/icon/vision-color.png" alt="Vision" />
								</div>
								<div className="content">
									<h4>Our Vision</h4>
									<p>Become a global leader to serve science.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 mb-30">
							<div className="info-box-2">
								<div className="icon"><img src="assets/img/icon/values-gray.png" alt="Values" />
									<img className="hover-img" src="assets/img/icon/values-color.png" alt="Values" />
								</div>
								<div className="content">
									<h4>Our Values</h4>
									<p>Quality, Customer focus, Virtuous, Team Spirit</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			
			<Footer />
		</Fragment>
	);
};
export default About;