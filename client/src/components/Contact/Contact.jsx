import React from 'react'
import { FaLocationDot, FaPhoneVolume, FaClock } from "react-icons/fa6";
import Form from "../ContactForm/Form"


const Contact = () => {
  const data = [
    {
      title: 'Address',
      icon: <FaLocationDot />,
      desc1 : 'India, New Delhi',
      desc2: 'Seattle, U.S.A'
    },
    {
      title: 'Contact',
      icon: <FaPhoneVolume />,
      desc1: 'Phone: +91 (987654321)',
      desc2: 'Email: mobashira3@gail.com'
    },
    {
      title: 'Hours of operation',
      icon: <FaClock />,
      desc1: 'Mon-Fri: 9:00 - 20:00',
      desc2: 'Sat-Sun: 10:00 - 02:00'
    }
  ]

  return (
    <div className='flex flex-col text-tertiary justify-center items-center'>
      <div className="flex flex-col text-center gap-6 w-[60%]">
        <span className="font-bold md:text-5xl text-2xl">
          Keep In Touch With Us
        </span>
        <hr />
        <span className="md:text-2xl text-xl text-primary font-extrabold">
        We’re talking about clean beauty gift sets, of course – and we’ve got a bouquet of beauties for yourself or someone you love.
        </span>
      </div>

      <hr />

      <div className='flex md:flex-row flex-col w-[60%] gap-8 justify-between mt-12'>
        {data.map((item) => (
          <div className='flex flex-col gap-4 text-tertiary text-xl' key={item.title}>
            <span className='text-4xl '> {item.icon} </span>
            <span className='font-bold underline text-primary'> {item.title} </span>
            <span> {item.desc1} </span>
            <span> {item.desc2} </span>
          </div>
        ))}
      </div>

      <div className='mt-12'> 
        <p className='text-5xl font-extrabold text-center mb-4'> New Delhi </p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224161.78000138627!2d77.20902121825512!3d28.61393907408969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1705411145556!5m2!1sen!2sin" 
          className='w-screen h-96' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
      </div>

      <div> 
        <p className='text-5xl font-extrabold text-center mt-16 mb-4'> Seattle </p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172139.0908878342!2d-122.34206439999998!3d47.61304199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA%2C%20USA!5e0!3m2!1sen!2sin!4v1705411256348!5m2!1sen!2sin"
          className="w-screen h-96" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">

        </iframe>
      </div>

      <Form />
    </div>
  )
}

export default Contact