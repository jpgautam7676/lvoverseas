
import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Footer from "./Footer"
import Whychoose from "./Whychoose";
import Menu from "./Menu";
import Testimonials from "./Testimonials";
import University from "../University";
import { Helmet } from 'react-helmet';

function Index() {

	const [item, setItems] = useState([]);
	const url = 'https://www.backend.lvoverseas.com/';
    const [seoData, setSeoData] = useState({});

	useEffect(() => {
		fetch('https://www.backend.lvoverseas.com/api/seo/home')
		  .then(response => response.json())
		  .then(data => setSeoData(data))
		  .catch(error => console.error('Error fetching SEO data:', error));
	  }, []);


     
	useEffect(()=>{
		const getComments = async()=>{

			try{
				const res = await fetch(`https://www.backend.lvoverseas.com/api/blog`);
				const data = await  res.json();
				const firstThreeBlogs = data.slice(0,3);
				setItems(firstThreeBlogs);
			}catch(error){
				console.error('Error fetching data', error);
			}
		};
		getComments();

	},[]);

	
	return (
		
		<Fragment>
		<Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keyword} />
       
      </Helmet>
			<Menu />
			<section className="hero-slider-area mt--2">
				<div className="hero-slider-full ">
					<div className="hero-slider-item  d-flex align-items-center">
					<img src="assets/img/slider/slide4.jpg" alt="" />
						<div className="overlay"></div>
						<div className="shap-img">
							<img className="shap1 heartbeat" src="assets/img/shap/shap5.png" alt="shap" />
							<img className="shap3 rotateme" src="assets/img/shap/light.png" alt="shap" />
							<img className="shap4 heartbeat" src="assets/img/shap/shap2.png" alt="shap" />
						</div>
					</div>
				</div>
			</section>
			<section className="about-area pt-110 pb-110">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-xl-5 col-lg-6">
							<div className="helpline-image">
								<img className="homeabout-main" src="assets/img/about2.png" alt="About Image" />
								<div className="homeabout-shape1">
									<h2>1.5K+</h2>
									<p>Visitors</p>
								</div>
								<div className="homeabout-shape2">
									<img className="heartbeat" src="assets/img/shap/shap5.png" alt="Shape" /> </div>
								<div className="homeabout-shape3">
									<img src="assets/img/shap/shap3.png" alt="Shape" /> </div>
								<div className="homeabout-shape4">
									<img src="assets/img/shap/helpline-shape2.png" alt="Shape" /> </div>
								<div className="homeabout-shape5">
									<img className="shap-bounce" src="assets/img/shap/helpline-shap.png" alt="Shape" />
								</div>
							</div>
						</div>
						<div className="col-xl-7 col-lg-6">
							<div className="about-content">
								<div className="section-title">
									<h3>Our Profile</h3>
									<h2>About Innayat CRO</h2>
									<p className="text-justify">A well organised international self-regulating management service Centre, Innayat, establishes in the year 2020. With the headquarters in Haryana, it sprouts rapidly in Malaysia, Bangalore, & Gurgaon. Around the world, it lends its service to the clients who claim the services in Medical Devices industries, Pharmaceuticals, Nutraceuticals, Herbs, & in Cosmetics excessively. With at most prompt time and quality, it heals the requirements of pharmaceutical companies to transform their ideas and concepts into a successful product with efficient drug development. Our innovative approaches to the clients’ needs make us unique among the CROs.</p>
									<div className="button-area-about-footer mt-15">
										<Link className="button-1 mr-10" to="/About">About More
										<i className="fa-solid fa-arrow-right"></i></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="team-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<div className="section-title mb-30">
								<h3>Our Services</h3>
								<h2>Where can We Help You?</h2>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="what-we-best-area section-bg">
				<div className="what-we-best-img">
					<img src="assets/img/services/clinical-research.jpg" alt="Clinical Research Services" /></div>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 offset-lg-6">
							<div className="what-we-best-content">
								<div className="section-title">
									<h5>Clinical Trials Management</h5>
									<h2 className="pb-10">Clinical Research Services</h2>
									<p className="text-justify">
										Our Clinical Operations team is experienced in managing clinical trials of varied sizes and complexity
										in different therapeutic areas like Infectious Diseases, Oncology, Cardiology, Gastroenterology,
										Nephrology, Diabetes, Obstetrics & Gynaecology, Urology, Pain Management, Dermatology, Ophthalmology,
										Neurology, Psychiatry, and Parenteral nutrition. Our team has executed many NDA, ANDA, and Biosimilar
										products clinical development programs including vaccines. The team comprises people with the right
										attitude, flexibility, reliability, and commitment to excellence.
									</p>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</section>

			<University />

			<section className="homepage-project pt-40 pb-40">
				<div className="container">
					<div className="row align-items-end">
						<div className="col-xl-4">
							<div className="section-title">
								<h2 className="pb-0">Knowledge Center</h2>
							</div>
						</div>
						<div className="col-xl-8">
							<div className="glenic-tabs">
								<ul className="nav nav-pills mb-2" id="project-content1" role="tablist">
									<li className="nav-item" role="presentation">
										<button className="nav-link active" id="glenic-home-tab" data-bs-toggle="pill" data-bs-target="#glenic-home" type="button" role="tab" aria-controls="glenic-home" aria-selected="false">Why Choose Us</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className="nav-link" id="glenic-neurologists-tab" data-bs-toggle="pill" data-bs-target="#glenic-neurologists" type="button" role="tab" aria-controls="glenic-neurologists" aria-selected="false">Scale new heights with EXPERT guidance!</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className="nav-link" id="glenic-orthopedic-tab" data-bs-toggle="pill" data-bs-target="#glenic-orthopedic" type="button" role="tab" aria-controls="glenic-orthopedic" aria-selected="false">How to start your care?</button>
									</li>

								</ul>
							</div>
						</div>
					</div>
					<div className="row pt-50">
						<div className="col-md-12 ">
							<div className="tab-content" id="project-content">
								<div className="tab-pane choose-text fade active show" id="glenic-home" role="tabpanel" aria-labelledby="glenic-home-tab">
									<p> MBBSinVietnam.Com made of dedicated and professional experts that have the desired knowledge that you might be searching.
										Our first-hand testimonies are a talk of town and we always assure the safety and benefit of our client.
										Once you join us, we promise to deliver happy services throughout the course.</p>
								</div>
								<div className="tab-pane fade " id="glenic-neurologists" role="tabpanel" aria-labelledby="glenic-neurologists-tab">
									<div className="row">
										<div className="row row-style">
											<div className="col-lg-6">
												<img src="assets/img/services/5.png" alt="Data Management" />
											</div>
											<div className="col-lg-6 d-flex justify-content-center text-left flex-column">
												<h3>Admission Guidance</h3>
												<p>Globalized MBBS Admission in Vietnam guidance from the top educational experts.
													It’s not just about filling up forms,
													but the first step towards your dream career.</p>
											</div>
										</div>
										<div className="row row-style ">
											<div className="col-lg-6 d-flex justify-content-center text-left flex-column ">
												<h3>CAREER GUIDANCE</h3>
												<p>At Tutelage Study, we equip you with all the experience,
													information and skills to narrow down your career options and grab the best from them.</p>
											</div>
											<div className="col-lg-6 d-flex justify-content-end">
												<img src="assets/img/services/6.png" alt="Data Management" />
											</div>
										</div>
										<div className="row row-style ">
											<div className="col-lg-6 d-flex justify-content-start ">
												<img src="assets/img/services/7.png" alt="Data Management" />
											</div>
											<div className="col-lg-6 d-flex justify-content-center text-left flex-column">
												<h3>DOCUMENT SUPPORT</h3>
												<p>Having a tough time dealing with the documentation process?
													No more worries. Our hassle-free document support makes everything simple.</p>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade text-center" id="glenic-orthopedic" role="tabpanel" aria-labelledby="glenic-orthopedic-tab">
									<div className="row">
										<div className="col-lg-4">
											<div className="content info-box7 text-center">
												<div class="info7-img add-icon mb-4">
													<i class="fa fa-phone"></i>
												</div>
												Call and speak to one of our friendly team who will discuss the setup process and outline our packages.
											</div>
										</div>
										<div className="col-lg-4">
											<div className="content info-box7 text-center">
												<div class="info7-img add-icon mb-4 text-center">
													<i class="fa fa-plane"></i></div>
												Request a home visit where we will provide you with a free, no obligation assessment.

											</div>
										</div>
										<div className="col-lg-4">
											<div className="content info-box7 text-center">
												<div class="info7-img add-icon mb-4 text-center" ><i class="fa fa-user-md"></i></div>
												Once agreed, we will setup your care package and introduce you to your Care Worker.


											</div>
										</div>

									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</section>
			<Whychoose />
			<Testimonials />
			<section className="blog-area homep2 pt-40 pb-40 section-bg">
				<div className="container">
					<div className="row m-2">
						<div className="col-lg-12 section-title text-center">
							<div class="section-title"><h3>Our Blogs</h3><h2 class="mb-0">Latest News &amp; Blogs</h2></div>
						</div>
						{
							item.map((i) => {
								return (
									<>
										<div className="col-lg-4 col-md-6 mb-30 mt-5">
											<div className="blog-single-item">
												<div className="thumbnail" >
													<img src={url + i.thumbnail_path} alt="blog" />
												</div>
												<div className="content">
													<div className="auth"><span>{i.id}</span></div>
													<h3><Link to={"/blog/" + i.slug} >{i.title}</Link></h3>
													<Link to={"/blog/" + i.slug} className="button-1">Explore Now <i className="fa-solid fa-arrow-right"></i></Link></div>
											</div>
										</div>
									</>
								)
							})
						}
					</div>
				</div>
			</section>
			<Footer />
		</Fragment>
	);
};
export default Index;