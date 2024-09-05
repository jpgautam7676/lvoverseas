import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { Link, useParams } from 'react-router-dom';

function Universitydetails() {

  const Url = 'https://www.backend.lvoverseas.com';
  const [UniversityData, setUniversityData] = useState(null);
  const [overviewsData, setOverviewsData] = useState(null);
  const [photosData, setPhotosData] = useState(null);
  const { slug } = useParams();



  

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await fetch(`https://www.backend.lvoverseas.com/api/university/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch university data');
        }
        const data = await response.json();
        setUniversityData(data);
      } catch (error) {
        console.error('Error fetching university data:', error);
      }
    };

    fetchUniversityData();
  }, [slug]);

  useEffect(() => {
    const fetchOverviewsData = async () => {
      try {
        if (UniversityData && UniversityData.id) {

          const response = await fetch(`https://www.backend.lvoverseas.com/api/university-overviews/${UniversityData.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch overview data');
          }
          const data = await response.json();
          setOverviewsData(data);
        }
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchOverviewsData();
  }, [UniversityData]);


  useEffect(() => {
    const fetchPhotosData = async () => {
      try {
        if (UniversityData && UniversityData.id !== '') {

          const response = await fetch(`https://www.backend.lvoverseas.com/api/university-photos/${UniversityData.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch overview data');
          }
          const data = await response.json();
          setPhotosData(data);
        }
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchPhotosData();
  }, [UniversityData]);

  if (!UniversityData) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Menu />
      <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('../assets/img/breadcrumb.png')" }}>
        <div className="container">
          <h2>University Details</h2>
          <ul>
            <li><Link to="#">Home</Link></li>
            <li>University Details</li>
          </ul>
        </div>
      </section>
      
      <section className="singlepage-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="singlepage-content text-justify">
                <img className="details-singleimg" src="#" alt={UniversityData.name} />
                <div dangerouslySetInnerHTML={{ __html: UniversityData.name }} />
                <div className="text-center pt-3 pb-3">
                  <Link className="button-1" to="#">Apply Now <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
              {
                overviewsData && overviewsData.map((data) => {
                  return (
                    <>
                      <div className="singlepage-content text-justify">
                        <img className="details-singleimg" src={Url + "/" + data.image_path} alt={data.name} />
                        <div dangerouslySetInnerHTML={{ __html: data.title }} />
                        <div className="text-center pt-3 pb-3">
                          <Link className="button-1" to="#">Apply Now <i className="fa-solid fa-arrow-right"></i></Link>
                        </div>
                      </div>
                    </>
                  )
                })
              }
              {
                photosData && photosData.map((data) => {
                  return (
                    <>
                      <div className="singlepage-content text-justify">
                        <img className="details-singleimg" src={Url + "/" + data.image_path} alt={data.name} />
                        <div dangerouslySetInnerHTML={{ __html: data.title }} />
                        <div className="text-center pt-3 pb-3">
                          <Link className="button-1" to="#">Apply Now <i className="fa-solid fa-arrow-right"></i></Link>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
            <div className="col-lg-4 mb-30">
              <div className="sidebar-widgets">
                <div className="sidebar-single-widget category-widget mb-30">
                  <h5 className="pb-10">Services</h5>
                  <ul>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Pre-clinical Operations</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Clinical Operation</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Medical Writing</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Pharmacovigilance</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Quality Assurance</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Medical Affairs</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Biostatistics & Programming</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Regulatory Affairs</Link></li>
                    <li><Link to="#"><i className="fa-solid fa-caret-right"></i> Data Management</Link></li>
                  </ul>
                </div>
                <div className="sidebar-single-widget widget-appointment mb-30">
                  <h5 className="pb-20">Get in Touch</h5>
                  <div className="get-appointment-form">
                    <form action="#">
                      <div className="single-field">
                        <input type="text" placeholder="Your Name" name="yourname" />
                      </div>
                      <div className="single-field">
                        <input type="email" placeholder="Email" name="yourphone" />
                      </div>
                      <div className="single-field">
                        <input type="text" placeholder="Phone No." name="yourphone" />
                      </div>
                      <div className="single-field">
                        <select name="depname">
                          <option>Select Service</option>
                          <option value="">Pre-clinical Operations</option>
                          <option value="">Clinical Operation</option>
                          <option value="">Medical Writing</option>
                          <option value="">Pharmacovigilance</option>
                          <option value="">Quality Assurance</option>
                          <option value="">Medical Affairs</option>
                          <option value="">Biostatistics & Programming</option>
                          <option value="">Regulatory Affairs</option>
                          <option value="">Data Management</option>
                        </select>
                      </div>
                      <div className="single-field">
                        <textarea name="yourmessage" placeholder="Your Message"></textarea>
                      </div>
                      <div className="align-self-end">
                        <div className="single-field pb-0">
                          <button className="button-1">Send Now
                            <i className="fa-solid fa-arrow-right"></i>
                          </button>
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

      <section class="testimaonial-area-full section-title pt-40 pb-40 section-bg mb-4">
        <div class="container">
          <div class="row w-100">
            <h2 class="mt-2 mb-4 text-center">Our Testimonials</h2>
            <p className="text-center">Read below what our clients have to say and learn <br /> more about
              what makes us the premier provider of in-home senior care.</p>
            <div class="col-xl-4 col-md-6 ">
              <div class="single-testimonial shadow-style">
                <div class="testimonial-top">
                  <div class="testimonial-img">
                  </div>
                  <div class="testimonial-text">
                    <h5>Harpreet Kaur</h5>
                  </div>
                </div>
                <p>Great Mentors, They Guided Me At Every Step Of My Admission To Hong Bang University And Also Helped Me In My Visa And Immigration.
                  I Highly Recommend Tutelage Study To Everyone For MBBS Admission In Vietnam.</p>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 ">
              <div class="single-testimonial shadow-style">
                <div class="testimonial-top">
                  <div class="testimonial-img">
                  </div>
                  <div class="testimonial-text">
                    <h5>Amar Rajveer</h5>
                  </div>
                </div>
                <p>I Have Contacted So Many Consultants For My Admission In Abroad But Me And My Family Was Getting So Much Confused But When We Contacted Tutelage Study They Guided Us Very Nicely And Shown Every Thing And All Options And Said Truth So Now I Am Studying In Vin University Vietnam Its Completely In English And I Am Very Happy I Am Studying Here Because Of My Counsultants Ms. Aman And Ms. Tanu Tutelage Study Is Very Good I Recommend This To Everyone .</p>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 ">
              <div class="single-testimonial shadow-style">
                <div class="testimonial-top">
                  <div class="testimonial-img">
                  </div>
                  <div class="testimonial-text">
                    <h5>Sonali Rastogi</h5>
                  </div>
                </div>
                <p>Hi! My Name Is Sonali Rastogi, This Consultancy Service Helped Me In Taking Admission To Vietnam At Vin University. The Whole Process Was Hassle-Free And The Consultants Were Genuine And Caring.
                  They Not Only Helped Me In Taking Admission Moreover Continued To Take Care Of Me Even Today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-section-full bg-color py-5 pb-40">
        <div className="container">
          <div class="section-title text-center mb-4">
            <h2>Gallery</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="gallery-item-single">
                <img src="https://www.drjayabalan.net/uploads/gallery/1_1698306302.jpg"
                  alt="Dr Jaya Balan in Malaysia office" />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="gallery-item-single">
                <img src="https://www.drjayabalan.net/uploads/gallery/3_1698306316.jpg"
                  alt="Dr Jaya Balan in Malaysia office" />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="gallery-item-single">
                <img src="https://www.drjayabalan.net/uploads/gallery/2_1698306332.jpg"
                  alt="Dr Jaya Balan in Malaysia office" />

              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="gallery-item-single">
                <img src="https://www.drjayabalan.net/uploads/gallery/7_1698306402.jpg"
                  alt="Dr Jaya Balan in Malaysia Clinic Research" />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="gallery-item-single">
                <img src="https://www.drjayabalan.net/uploads/gallery/8_1698306418.jpg" alt="8" />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30">
              <div className="gallery-item-single">
                <img src="https://www.drjayabalan.net/uploads/gallery/9_1698306430.jpg" alt="1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
};

export default Universitydetails;