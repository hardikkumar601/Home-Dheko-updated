import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4 lg:px-16">
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-8">
        <div className="footer_left  lg:max-w-xs lg:mx-4">
          <a href="/"><img src="/ifgb/home.png" alt="logo" className="h-20 w-20 mx-auto lg:mx-auto" /></a>
        </div>

        <div className="footer_center text-center lg:text-left mt-4 lg:mt-0">
          <h3 className=" text-xl mb-4">Useful Links</h3>
          <ul className="text-sm">
            <li><a href="#" className="hover:text-pink-500">About Us</a></li>
            <li><a href="#" className="hover:text-pink-500">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-pink-500">Return and Refund Policy</a></li>
          </ul>
        </div>

        <div className="footer_right text-center lg:text-right mt-4 lg:mt-0">
          <h3 className="  text-xl mb-4 mx-auto lg:flex lg:flex-start">Contact</h3>
          <div className="footer_right_info mb-4 flex items-center justify-center lg:justify-start">
            <img src="/ifgb/phone-call.png" alt="phone-icon" className='h-6 w-6 mr-2'/>
            <p className="text-sm">+1 234 567 890</p>
          </div>
          <div className="footer_right_info flex items-center justify-center lg:justify-start">
            <img src="/ifgb/gmail.png" alt="email-icon" className='h-6 w-6 mr-2' />
            <p className="text-sm">dreamnest@support.com</p>
          </div>
          <img src="/ifgb/payment.png" alt="payment" className="mx-auto lg:mx-0 mt-4" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
