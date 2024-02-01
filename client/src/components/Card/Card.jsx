import React from "react";


const Card = ({ data, length }) => {
    return(
        <div
            className="flex flex-col gap-1 rounded-xl transition-transform transform-gpu hover:translate-x-0 hover:translate-y-6 duration-500 shadow-[0_2px_15px_-3px_rgba(23,125,232,0.2),0_10px_20px_-2px_rgba(23,125,232,0.2)]"
          >
            <img src={data?.image} className="rounded h-48" />
            <p className="m-4 font-bold text-xl text-primary">{data?.name || data?.title} { length && <>({length})</>} </p>
            <p className="text-tertiary m-4 font-light">{data?.description || data?.content }</p>
          </div>
    );
};

export default Card;
