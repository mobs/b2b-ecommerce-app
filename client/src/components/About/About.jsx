import React from 'react'
import { FaDesktop, FaMixer, FaTruckFast, FaBoxesPacking, FaBarsStaggered, FaSeedling } from "react-icons/fa6";


const About = () => {
  const data = [
    {
      icon: <FaDesktop />,
      desc: "Top quality prints using the latest technology"
    },
    {
      icon: <FaMixer />,
      desc: "Mix and match colors, sizes, and designs"
    },
    {
      icon: <FaTruckFast />,
      desc: "Fast Shipping"
    },
    {
      icon: <FaBoxesPacking />,
      desc: "Made-to-measure packaging"
    },
    {
      icon: <FaBarsStaggered />,
      desc: "Reorder quickly and easily"
    },
    {
      icon: <FaSeedling />,
      desc: "Environmentally friendly production processes"
    }
  ]

  const successData = [
    "Global Market Intelligence", " Clear Product-Market Strategy", "Competitive Material Sourcing Skills per Technical Requirement", "Fully Compliance to Technical Delivery Conditions", 
    "Timely Delivery, meeting project schedule", "Growth Internally Generation", "Entrepreneurial Zeal" 
  ]

  return (
    <div className='flex flex-col text-tertiary justify-center items-center'>
      <div className="flex flex-col text-center gap-6 w-[60%]">
        <span className="font-bold"> OUR STRENGTH </span>
        <span className="font-bold md:text-5xl text-2xl">
          100+ Employees Round the Clock Production and , Delivery Facilities !
        </span>
        <hr />
        <span className="md:text-2xl text-xl text-primary font-extrabold">
          If you are looking for affordable and quality digital printers in New Delhi or Seattle then we would love to hear from you.
        </span>
      </div>

      <div className='grid grid-cols-3 gap-6 w-[75vw] mt-8'>
        {data.map((d, idx) => (
          <div className='flex gap-4 text-3xl text-primary'>
            {d.icon}
            <span className='text-tertiary'>
               {d.desc}
            </span>
          </div>
        ))}
      </div>

      <hr />

      <div className='m-8 w-[60vw] flex flex-col gap-8 text-2xl text-tertiary'>
        <span className='text-center text-primary text-4xl underline font-extrabold'>
          From CEO's DESK
        </span>
        <span>
        We, at, Digital Printing Shop are dedicated to provide one of the world’s best services to our customers.
        </span>
        <span>
        We aim to be leaders in the printing industry and will achieve our goals by involving our co-workers, contractors and customers in our movement of excellence.
        </span>
        <span>
        We never compromise on quality or integrity and we are committed to teamwork and innovation. Our systems and equipments are constantly and continuously updated to enhance performance.
        </span>
        <span>
        We possess well-trained professionals, including Printing specialists, designers & Production experts.
        </span>
        <span>
          With Regards, 
          <p className='text-primary font-bold'>CEO</p>
          <p className='text-primary font-bold'>Digital Printing Shop</p>
        </span>

        <span className='text-center text-primary text-4xl underline font-extrabold'>
          Our Vision
        </span>
        <span>
        With experts from cutting edge printing technology and over long experience, We holds the position of being the first printing press centrally located in Delhi & Seattle and a prominent printing solutions provider across INDIA & US.
        </span>

        <span className='text-center text-primary text-4xl underline font-extrabold'>
          Our Mission
        </span>
        <span>
        Upholding our reputation as a one-stop destination for all thing related to Printing Solution with top-quality products and services that ensure smooth functioning of our customer’s business.
        </span>

        <span className='text-center text-primary text-4xl underline font-extrabold'>
          Our Values
        </span>
        <span>
        To accelerate growth opportunities for professionals by offering digital print solutions with uncompromised quality and productivity. We care about our customers’ business as if it’s our own, we drive innovation as an end-to-end team effort, we are passionate about creating technology for the best print solution.
        </span>
        <span>
        We believe close collaboration with everyone involved from our suppliers to our customers makes us adaptive, efficient and customer-focused throughout the entire organization. Together, we transform the world of print.
        </span>
        
        <span className='text-center text-primary text-4xl underline font-extrabold'>
          Quallity Policy
        </span>
        <span>
        Digital Printing Shop aims to ensure that our products / services meet the needs of our customers at all times in accordance with customer, statutory and regulatory requirements, as well as our policies and procedures.
        </span>
        <span>
        The scope of our Quality Management System covers all activities stated within our Scope Document and we are committed to this.
        </span>

        <span className='text-center text-primary text-4xl underline font-extrabold'>
          Environmental Policy
        </span>
        <span>
        Digital Printing Shop has aim with the primary purpose of print production, litho & digital (for commercial and non commercial customers) and the supply of office products for both commercial and retail. The scheme has achieved a 20% reduction from beginning. To eliminate and/or minimise any harmful effects on the environment, caused by the activities of Digital Printing Shop.
        </span>

        

      </div>
    </div>
  )
}

export default About