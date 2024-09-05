import React from "react";
import Otp from './Otp';
import Menu from './Menu'

function OTPVerificationPage() {
    const handleSubmitOTP = async (otp) => {
      try {
        const response = await fetch('https://www.backend.lvoverseas.com/api/submit-email-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp }),
        });
        const data = await response.json();
        console.log(data); 
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    };
 
    return (
      <div>
        <h2>OTP Verification</h2>
        <Otp onSubmit={handleSubmitOTP} />
      </div>
    );
  }


export default OTPVerificationPage;