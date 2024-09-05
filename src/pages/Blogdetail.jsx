import React, { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { Link, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

function BlogDetail() {

  const [blogData, setBlogData] = useState(null);
  const { slug } = useParams();
  const [seoData,setSeoData] = useState({});

  useEffect(()=>{
    fetch(`https://www.backend.lvoverseas.com/api/seo/blog-details`)
    .then(response => response.json())
    .then(data => setSeoData(data))
    .catch(error => console.error('Error fetching SEO data:', error));
  },[])


  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://www.backend.lvoverseas.com/api/blog/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBlogData();
  }, [slug]);

  const [latestblogs, setLBlogs] = useState([]);

  useEffect(() => {
    const getLatestBlogs = async () => {

      const res = await fetch(
        `https://www.backend.lvoverseas.com/api/latest-blog`
      );
      const data = await res.json();
      setLBlogs(data);

    };

    getLatestBlogs();
  }, []);

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

  if (!blogData) {
    return <div>Loading...</div>;
  }

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
          <h2>Blog Details</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Services</Link></li>
            <li>Blog Details</li>
          </ul>
        </div>
      </section>
      <section className="blog-details-section pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-30">
              <div className="blog-details-full">
                <div className="thumbnail">
                  <img src={`https://www.backend.lvoverseas.com/${blogData.thumbnail_path}`} alt="Blog Details Image" />
                </div>
                <div className="b-auth-section mt-30 mb-20">
                  <div className="row">
                    <div className="col-md-6 order-md-first order-last">
                      <div className="left-a">
                        <span className="img"><img src="assets/img/auth-img.png" alt="auth" /></span>
                        <span>by <a href="#">{blogData.get_user.name}</a></span>
                        <span>{new Date(blogData.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="col-md-6 align-self-center text-right">
                      <div className="blog-share">
                        <span><a href="#"><i className="fa-solid fa-link"></i></a></span>
                        <span><a href="#"><i className="fa-brands fa-linkedin"></i></a></span>
                        <span><a href="#"><i className="fa-brands fa-twitter"></i></a></span>
                        <span><a href="#"><i className="fa-brands fa-facebook-f"></i></a></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h2>{blogData.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: blogData.description }}></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-30">
              <div className="sidebar-widgets">
                <div className="sidebar-single-widget socialicon-widget mb-30">
                  <h5 className="pb-20">Trending Blogs</h5>
                  <div className="sidebar-blog-widgets">
                    {
                      latestblogs.map((row) => {
                        return (
                          <>
                            <div className="single-item">
                              <div className="thumb"><a href="#">
                                <img src={row.thumbnail_path} alt={row.title} /></a></div>
                              <div className="content">
                                <span>by <a href="#">{row.get_user.name}</a></span>
                                <h4><Link to={"/blog/" + row.slug}>{row.title}</Link>
                                </h4>
                              </div>
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
                
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}

export default BlogDetail;
