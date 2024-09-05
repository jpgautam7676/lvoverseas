import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import { Link } from 'react-router-dom';
import Footer from "./Footer"
import { Helmet } from "react-helmet";

function Blog() {
  const url = 'https://www.backend.lvoverseas.com/';
  const [item, setItems] = useState([]);
  const [seoData,setSeoData] = useState({});

      useEffect(()=>{
        fetch(`https://www.backend.lvoverseas.com/api/seo/blog`)
        .then(response => response.json())
        .then(data => setSeoData(data))
        .catch(error => console.error('Error fetching SEO data:', error));
      },[])

          

  useEffect(() => {
    const getComments = async () => {

      const res = await fetch(
        `https://www.backend.lvoverseas.com/api/blog`
      );
      const data = await res.json();
      setItems(data);

    };

    getComments();
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
          <h2>Blog</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>Blog</li>
          </ul>
        </div>
      </section>
      <section className="blog-area homep2 ">
        <div className="container">
          <div className="row m-2">
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
                          <Link to={"/blog/" + i.slug} className="button-1" >Explore Now <i className="fa-solid fa-arrow-right"></i></Link></div>
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
export default Blog;