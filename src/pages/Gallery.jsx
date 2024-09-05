
import React, { useEffect, useState } from "react";

const Gallery = () => {

    const [photo, setPhoto] = useState([]);

    const url = 'https://www.backend.lvoverseas.com/';

    useEffect(() => {
        const getComments = async () => {

            const responsive = await fetch(
                `https://www.backend.lvoverseas.com/api/gallery`
            );
            const data = await responsive.json();
            setPhoto(data);

        };

        getComments();
    }, []);
   


    return (
        <>
            <div className="page-section-full bg-color py-5 pb-40">
                <div className="container">
                    <div class="section-title text-center mb-4">
                        <h2>Gallery</h2>
                    </div>
                    <div className="row">

                        {
                            photo.map((i) => {
                                return (
                                    <>
                                        <div className="col-lg-4 col-md-6 mb-30 mt-5">
                                            <div className="blog-single-item">
                                                <div className="thumbnail" >
                                                    <img src={url + i.image_path} alt={i.title} />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )



};

export default Gallery;