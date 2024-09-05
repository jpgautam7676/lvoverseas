import React, { Fragment, useEffect, useState } from "react";
import Menu from './Menu'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const res = await fetch(`https://www.backend.lvoverseas.com/api/testimonials`);
      const data = await res.json();
      setTestimonials(data);
    };

    getTestimonials();
  }, []);

  return (
    <Fragment>
      <section className="testimaonial-area-full bg-color section-title pt-40 pb-40">
        <div className="container">
          <div className="row w-100">
            <h2 className="mt-2 mb-4 text-center">Our Testimonials</h2>
            <p className="text-center">Read below what our clients have to say and learn <br /> more about
              what makes us the premier provider of in-home senior care.</p>
            {testimonials.map((testimonial, index) => (
              <div className="col-xl-4 col-md-6" key={index}>
                <div className="single-testimonial shadow-style">
                  <div className="testimonial-top">
                    <div className="testimonial-img">
                      {/* You can add image rendering here if you have */}
                    </div>
                    <div className="testimonial-text">
                      <h5>{testimonial.name}</h5>
                    </div>
                  </div>
                  <p>{testimonial.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Testimonials;
