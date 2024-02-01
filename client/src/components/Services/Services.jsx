import { digital1, banner2 } from "../../constants/Images";
import { products } from "../../constants/NavabrData";
import { features } from "../../constants/homeData";
import Card from "../Card/Card";

const Services = () => {
  return (
    <div className="flex flex-col text-tertiary justify-center items-center">
      <div className="flex flex-col text-center gap-6 w-[60%]">
        <span className="font-bold"> WE ARE PROFESSIONALS </span>
        <span className="font-bold md:text-5xl text-2xl">
          We’re something other than duplicates… What’s more, we do it right!
        </span>
        <hr />
        <span className="md:text-4xl text-xl text-primary font-extrabold">
          {"Have a look at what services we provide".toUpperCase()}
        </span>
      </div>

      <div className="relative w-full h-screen">
        <img
          src={digital1}
          alt="Your Image Alt Text"
          className="w-full opacity-30 h-[80vh]"
        />

        <div className="flex gap-8 absolute w-full top-1/4 md:left-[68%] left-1/2 m-auto transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          {products.map((product) => (
            <span className="">
              <span className="hover:text-primary text-tertiary lg:text-4xl md:text-2xl text-md">
                {" "}
                {product.title}{" "}
              </span>
            </span>
          ))}
        </div>
        <div className="absolute md:w-auto w-full font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:text-4xl md:text-2xl text-lg text-center">
          Our success is from your satisfaction, so we take personal interest to
          ensure our clients are completely satisfied with the goods delivered
          and services that represent their brand What’s more, we do it right!
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-Sofia absolute font-extrabold md:text-9xl text-5xl opacity-10">
          {" "}
          Features{" "}
        </p>
        <div className="font-Sofia text-center md:mb-12 mb-4 md:text-lg text-xs font-bold text-primary">
          Features
        </div>
        <div className="text-center font-extrabold md:text-5xl text-xl">
          Our Best Features
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 m-8 md:ml-32 md:mr-32 lg:h-[50vh]">
        {features.map((feat) => (
          <Card data={feat} key={feat.title} />
        ))}
      </div>
    </div>
  );
};

export default Services;
