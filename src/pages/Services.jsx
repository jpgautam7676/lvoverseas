import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import { Link } from 'react-router-dom';
import Footer from "./Footer";
function Services() {

  const [item, setItems] = useState([]);

  const url = 'https://www.backend.lvoverseas.com/';

  useEffect(() => {
    const getComments = async () => {

      const res = await fetch(
        `https://www.backend.lvoverseas.com/api/services`
      );
      const data = await res.json();
      setItems(data);

    };

    getComments();
  }, []);
  
  return (
    <Fragment>
      <Menu />

      <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('assets/img/breadcrumb.png')" }}>
        <div className="container">
          <h2>Services</h2>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/services" >Services</Link></li>
          </ul>
        </div>
      </section>
      <section class="blog-area homep2 pt-110 pb-80">
        <div class="container">
          <div class="row">
            {
              item.map((i) => {
                return (
                  <>
                    <div class="col-lg-4 col-md-6 mb-30">
                      <div class="blog-single-item">
                        <div class="thumbnail">
                          <img src={url + i.image_path} alt={i.service_name} /></div>
                        <div class="content">
                          <h3 class="mb-2">{i.service_name}</h3>
                          <Link class="blog-btn" to={"/service/" + i.service_slug}>Explore Now <i class="fa-solid fa-arrow-right"></i></Link></div>
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
  )
};

export default Services;