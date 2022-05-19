import "./dataList.css";
import { useState, useEffect } from "react";
import { fetchRequest } from "../../utils/index";
import { DataItem } from "../dataItem/dataItem";

export const DataList = () => {
  const [products, setProducts] = useState([]);
  const [buttonValue, setButtonValue] = useState([1]);

  const getProducts = async () => {
    let endpoint;

    if (buttonValue < 2) {
      // price list
      endpoint = "products/price";
    } else if (buttonValue === 2) {
      // group
      endpoint = "products/group";
    } else {
      //do nothing as unknown state
      return;
    }

    const payload = { sortOrder: buttonValue };
    const httpVerb = "PUT";
    const data = await fetchRequest(endpoint, payload, httpVerb);

    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, [buttonValue]);

  const handleButtonClick = (val) => {
    setButtonValue(val);
  };

  return (
    <div className="list-container">
      <h1>Products</h1>
      <header>
        <h3>Id</h3>
        <h3>Name</h3>
        <div className="price-group">
          <h3>Price</h3>
          <div className="price-btns">
            <button onClick={() => handleButtonClick(-1)}>Dec</button>
            <button onClick={() => handleButtonClick(1)}>Asc</button>
          </div>
        </div>
        <div className="type-group">
          <h3>Type</h3>
          <button onClick={() => handleButtonClick(2)}>Group</button>
        </div>
        <h3>Dept</h3>
        <h3>Weight</h3>
      </header>
      <section>
        {products.map((product, index) => (
          <DataItem key={index} product={product} />
        ))}
      </section>
    </div>
  );
};
