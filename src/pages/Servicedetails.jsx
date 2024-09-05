import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { Link, useParams } from 'react-router-dom';

function Servicedetails() {
  const url = 'https://www.backend.lvoverseas.com/';

  const [serviceData, setServiceData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch(`https://www.backend.lvoverseas.com/api/service/${slug}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setServiceData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchServiceData();
  }, [slug]);

  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {

      const res = await fetch(
        `https://www.backend.lvoverseas.com/api/services`
      );
      const data = await res.json();
      setServices(data);

    };

    getServices();
  }, []);

  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {

      const res = await fetch(
        `https://www.backend.lvoverseas.com/api/testimonials`
      );
      const data = await res.json();
      setTestimonials(data);

    };

    getTestimonials();
  }, []);

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const getGallery = async () => {

      const res = await fetch(
        `https://www.backend.lvoverseas.com/api/gallery`
      );
      const data = await res.json();
      setGallery(data);

    };

    getGallery();
  }, []);

  if (!serviceData) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Menu />
      <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('../assets/img/breadcrumb.png')" }}>
        <div className="container">
          <h2>{serviceData.service_name}</h2>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li>{serviceData.service_name}</li>
          </ul>
        </div>
      </section>
      <section className="singlepage-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="singlepage-content text-justify">
                <img className="details-singleimg" src={`https://www.backend.lvoverseas.com/${serviceData.image_path}`} alt="{serviceData.service_name}" />
                <div dangerouslySetInnerHTML={{ __html: serviceData.description }} />
                <div className="text-center pt-3 pb-3">
                  <Link className="button-1" to="#">Apply Now <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-30">
              <div className="sidebar-widgets">
                <div className="sidebar-single-widget category-widget mb-30">
                  <h5 className="pb-10">Services</h5>
                  <ul>
                    {
                      services.map((row) => {
                        return (
                          <>
                            <li><Link to={"/service/" + row.service_slug}><i className="fa-solid fa-caret-right"></i> {row.service_name}</Link></li>
                          </>
                        )
                      })
                    }
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
            {
              testimonials.map((row) => {
                return (
                  <>
                    <div class="col-xl-4 col-md-6 ">
                      <div class="single-testimonial shadow-style">
                        <div class="testimonial-top">
                          <div class="testimonial-img">
                          </div>
                          <div class="testimonial-text">
                            <h5>{row.name}</h5>
                          </div>
                        </div>
                        <p>{row.review}</p>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </section>
      <div className="page-section-full bg-color py-5 pb-40">
        <div className="container">
          <div class="section-title text-center mb-4">
            <h2>Gallery</h2>
          </div>
          <div className="row">
            {
              gallery.map((row) => {
                return (
                  <>
                    <div className="col-lg-4 col-sm-6 mb-30">
                      <div className="gallery-item-single">
                        <img src={url + row.image_path}
                          alt={row.title} />
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
};

export default Servicedetails;