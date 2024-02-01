import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import PaginationControls from "../Pagination/PaginationControl";
import Card from "../Card/Card";


// hompage par 4 4 3no k dikhana hoga
const Product = () => {
  const [displayProducts, setDisplayProducts] = useState({});
  const {category } = useParams()

  const { products } = useSelector(state => state.product)

  useEffect(() => {
    let prods = Object.groupBy(products, ({category}) => category);
    if(category !== undefined) {
      prods = prods[category];
    }
    setDisplayProducts(prods)
  }, [category, products])
  
  return  (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 m-8 md:ml-32 md:mr-32">
      {
        displayProducts && !category && Object.keys(displayProducts).map((product, idx) => (
          <Link to={`/products/${product}`} key={idx}> 
            <Card data={displayProducts[product][0]} length={displayProducts[product].length} />
          </Link>
        ))
      }
      {
        category && displayProducts && Object.keys(displayProducts).map((product) => (
          <Link to={`/Checkout/${displayProducts[product]._id}`} key={product}>
            <Card data={displayProducts[product]} />
          </Link>
        ))
      }
    </div>
  );
};

export default Product;
