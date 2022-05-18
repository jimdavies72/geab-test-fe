import "./dataList.css";
import { useState, useEffect } from "react";
import { fetchRequest } from "../../utils/index";
import { DataItem } from "../dataItem/dataItem";

export const DataList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let endpoint = "products/price";
    let payload = { sortOrder: 1 };
    let httpVerb = "PUT";
    const data = await fetchRequest(endpoint, payload, httpVerb);

    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <section>
        {products.map((product, index) => (
          <DataItem key={index} product={product} />
        ))}
      </section>
    </>
  );
};
