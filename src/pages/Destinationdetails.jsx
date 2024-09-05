import React, { useEffect, useState } from 'react';
import Menu from "./Menu";
import { Link, useParams } from 'react-router-dom';
import Footer from "./Footer";

const Destinationdetails = () => {
  const Url = 'https://www.backend.lvoverseas.com';
  const { slug } = useParams();
  const [destinationData, setDestinationsData] = useState(null);
  const [destinationContent, setDestinationContent] = useState(null);
  const [destinationGallery, setDestinationGallery] = useState(null);
  const [destinationFaq, setDestinationFaq] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const response = await fetch(`${Url}/api/destination/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Destination Data");
        }
        const data = await response.json();
        setDestinationsData(data);
      } catch (error) {
        console.error('Error fetching Destination Data:', error);
      }
    };
    

    fetchDestinationData();
  }, [slug]);

  useEffect(() => {
    const fetchDestinationContent = async () => {
      try {
        if (destinationData && destinationData.id) {
          const response = await fetch(`${Url}/api/destination-content/${destinationData.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch destination content');
          }
          const data = await response.json();
          setDestinationContent(data);
        }
      } catch (error) {
        console.error('Error fetching destination content:', error);
      }
    };

    if (destinationData) {
      fetchDestinationContent();
    }
  }, [destinationData]);

  useEffect(() => {
    const fetchDestinationGallery = async () => {
      try {
        if (destinationData && destinationData.id) {
          const response = await fetch(`${Url}/api/destination-gallery/${destinationData.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch destination gallery');
          }
          const data = await response.json();
          setDestinationGallery(data);
        }
      } catch (error) {
        console.error('Error fetching destination gallery:', error);
      }
    };

    if (destinationData) {
      fetchDestinationGallery();
    }
  }, [destinationData]);

  useEffect(() => {
    const fetchDestinationFaq = async () => {
      try {
        if (destinationData && destinationData.id) {
          const response = await fetch(`${Url}/api/destination-faqs/${destinationData.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch destination Faq');
          }
          const data = await response.json();
          setDestinationFaq(data);
        }
      } catch (error) {
        console.error('Error fetching destination Faq:', error);
      }
    };
    if (destinationData) {
      fetchDestinationFaq();
    }
  }, [destinationData]);
  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetch(`${Url}/api/services`);
        if (!res.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    getServices();
  }, []);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const res = await fetch(`${Url}/api/testimonials`);
        if (!res.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    getTestimonials();
  }, []);

  if (!destinationData || !destinationContent || !destinationGallery) {
    return <div>Loading...</div>;
}


  return (
    <>
      <Menu />
      <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('../assets/img/breadcrumb.png')" }}>
        <div className="container">
          <h2>Destination Slug</h2>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li>{destinationData.page_name}</li>
          </ul>
        </div>
      </section>
      <section className="singlepage-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="singlepage-content text-justify">
                <img className="details-singleimg" src={`${Url}/${destinationData.image_path}`} alt="Medical Writing Services" />
                <h2 className='mt-30' dangerouslySetInnerHTML={{ __html: destinationData?.page_name }} />
                <p dangerouslySetInnerHTML={{ __html: destinationData?.top_description }} />
                <div className="singlepage-box mt-15">
                  <div className="row">
                    {destinationContent.map((C) => (
                      <React.Fragment key={C.id}>
                        <h4>{C.title}</h4>
                        <div className="col-md-12 text-justify mt-2">
                          <p dangerouslySetInnerHTML={{__html:C.tab_content}} />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
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
                    {services.map((row) => (
                      <li key={row.service_slug}>
                        <Link to={`/service/${row.service_slug}`}>
                          <i className="fa-solid fa-caret-right"></i> {row.service_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='gallery-sec'>
          <div className='container'>
            <h2 className='text-center'>Our Gallery</h2>
            <div className="row">
              {destinationGallery.map((Gallery, index) => (
                <div key={index} className='col-md-4'>
                  <h4>{Gallery.title}</h4>
                  <div className=" text-justify mt-2">
                    <img className="details-singleimg" src={`${Url}/${Gallery.image_path}`} alt="Medical Writing Services" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="team-section-area bg-color  pb-10" id="Common">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-3 mb-2 text-center">
              <div className="section-title">
                <h2>FAQ for MBBS Study in Georgia</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" bg-color faq-area pb-40">
        <div className="container">
          <div className="row justify-content-center">
            {
              destinationFaq && destinationFaq.map((F, index) => (
                <div key={index} className="col-lg-10">
                  <div className="accordion faq-custom" id={`faqAccordion${index}`}>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>{F.question}</button>
                      </h2>
                      <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent={`#faqAccordion${index}`}>
                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: F.answer }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section className="testimaonial-area-full section-title pt-40 pb-40">
        <div className="container">
          <div className="row w-100">
            <h2 className="mt-2 mb-4 text-center">Our Testimonials</h2>
            <p className="text-center">Read below what our clients have to say and learn <br /> more about
              what makes us the premier provider of in-home senior care.</p>
            {
              testimonials.map((row) => {
                return (
                  <>
                    <div className="col-xl-4 col-md-6 ">
                      <div className="single-testimonial shadow-style">
                        <div className="testimonial-top">
                          <div className="testimonial-img">
                          </div>
                          <div className="testimonial-text">
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
      <Footer />
    </>
  );
};
export default Destinationdetails;