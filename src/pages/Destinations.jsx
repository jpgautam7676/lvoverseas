import React, { useState, useEffect } from 'react';
import Menu from "./Menu";
import Footer from "./Footer";
import { Link } from 'react-router-dom';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const url = 'https://www.backend.lvoverseas.com/api/';
    const imgurl = 'https://www.backend.lvoverseas.com/';

    useEffect(() => {
        const getDestinations = async () => {
            try {
                const response = await fetch(url + `destinations`);
                if (!response.ok) {
                    throw new Error('Failed to fetch destinations');
                }
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        getDestinations();
    }, []);

    return (
        <>
            <Menu />
            <section className="breadcumb-area pt-70 pb-70" style={{ backgroundImage: "url('../assets/img/breadcrumb.png')" }}>
                <div className="container">
                    <h2>Destinations</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>Destinations</li>
                    </ul>
                </div>
            </section>
            <section className='mt-5 mb-5'>
                <div className='container '>
                    <div className='row gy-4'>
                        {destinations && destinations.map((D, index) => (
                            <div key={index} className='col-lg-3 col-md-4'>
                                <div className="card">
                                    <img src={imgurl + D.thumbnail} className="card-img-top" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{D.page_name}</h5>
                                        <Link to={"/destinations/" + D.slug} className="btn btn-primary">View More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Destinations;
