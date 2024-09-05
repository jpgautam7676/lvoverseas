import React, { Fragment } from "react"
import { Link } from "react-router-dom";
import Menu from './Menu'


const Table = () => {
   
    return (

        <Fragment>
            <div className="mt-4 mb-4 col-lg-12 table-responsive">
                <table>
                    <tr>
                        <th>University Name</th>
                        <th>Duration</th>
                        <th>Location</th>
                        <th>Tuition Fees/year</th>
                        <th>Hostel Fees/year</th>
                        <th>Apply Now </th>
                    </tr>
                    <tr>
                        <td>Ain Shams University</td>
                        <td>5 Year</td>
                        <td>Cairo</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td><Link to="/Kenya_to_india" className="button-1 ">Apply Now
                            <i class="fa-solid fa-arrow-right"></i></Link></td>
                    </tr>
                    <tr>
                        <td>Ain Shams University</td>
                        <td>5 Year</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td><Link to="/Kenya_to_india" className="button-1 ">Apply Now
                            <i class="fa-solid fa-arrow-right"></i></Link></td>
                    </tr>
                    <tr>
                        <td>Ain Shams University</td>
                        <td>5 Year</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td><Link to="/Kenya_to_india" className="button-1 ">Apply Now
                            <i class="fa-solid fa-arrow-right"></i></Link></td>
                    </tr>
                    <tr>
                        <td>Ain Shams University</td>
                        <td>5 Year</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td><Link to="/Kenya_to_india" className="button-1 ">Apply Now
                            <i class="fa-solid fa-arrow-right"></i></Link></td>

                    </tr>
                    <tr>
                        <td>Ain Shams University</td>
                        <td>5 Year</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td><Link to="/Kenya_to_india" className="button-1 ">Apply Now
                            <i class="fa-solid fa-arrow-right"></i></Link></td>
                    </tr>
                    <tr>
                        <td>Ain Shams University</td>
                        <td>5 Year</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td>7000 USD</td>
                        <td><Link to="/Kenya_to_india" className="button-1 ">Apply Now
                            <i class="fa-solid fa-arrow-right"></i></Link></td>
                    </tr>
                </table>
            </div>
        </Fragment>


    )

};

export default Table;