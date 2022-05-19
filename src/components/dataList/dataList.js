import "./dataList.css";
import { useState, useEffect } from "react";
import { fetchRequest } from "../../utils/index";
import { DataItem } from "../dataItem/dataItem";

export const DataList = () => {
  const [products, setProducts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [listType, setListType] = useState("price");
  const [listOrder, setListOrder] = useState(1);
  const [listTitle, setListTitle] = useState("Price List - Ascending");

  const getProducts = async () => {
    let endpoint;

    if (listType === "price") {
      // price list
      endpoint = "products/price";
    } else if (listType === "group") {
      // group
      endpoint = "products/group";
    } else {
      //do nothing as unknown state
      return;
    }

    const payload = { sortOrder: listOrder };
    const httpVerb = "PUT";
    const data = await fetchRequest(endpoint, payload, httpVerb);

    if (listType === "group") {
      setGroups(data.groups);
      //console.log(groups);
    } else {
      setProducts(data.products);
    }
  };

  const handleTitle = () => {
    let sortOrder = "Ascending";
    if (listOrder === -1) {
      sortOrder = "Descending";
    }

    let type = "Price List";
    if (listType === "group") {
      type = "Grouped by Type";
    }

    setListTitle(`${type} - ${sortOrder}`);
  };

  useEffect(() => {
    getProducts();
    handleTitle();
  }, [listOrder, listType]);

  const handleAscDecClick = (val) => {
    setListOrder(val);
  };

  const handleTypeClick = (val) => {
    setListType(val);
  };

  return (
    <div className="list-container">
      <h1>{listTitle}</h1>
      <header>
        <h3>Id</h3>
        <h3>Name</h3>
        <div className="price-group">
          <h3>Price</h3>
          <div className="price-btns">
            <button onClick={() => handleAscDecClick(-1)}>Dec</button>
            <button onClick={() => handleAscDecClick(1)}>Asc</button>
          </div>
        </div>
        <div className="type-group">
          <h3>Type</h3>
          <button onClick={() => handleTypeClick("price")}>Price</button>
          <button onClick={() => handleTypeClick("group")}>Group</button>
        </div>
        <h3>Dept</h3>
        <h3>Weight</h3>
      </header>
      <section>
        {listType === "price"
          ? products.map((product, index) => (
              <DataItem key={index} product={product} />
            ))
          : groups.map((group, index) => (
              <div key={index}>
                <h3>{group._id}</h3>
                <ul>
                  {group.products.map((product, ind) => (
                    <DataItem key={ind} product={product} />
                  ))}
                </ul>
              </div>
            ))}
      </section>
    </div>
  );
};
