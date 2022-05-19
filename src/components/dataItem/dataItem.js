import "./dataItem.css";

export const DataItem = ({ product }) => {
  return (
    <div className="item-container">
      <p>{product.id}</p>
      <p>{product.name}</p>
      <div id="price">
        <p>{product.price.value}</p>
        <p>{product.price.currency}</p>
      </div>
      <p>{product.type}</p>
      <p>{product.department}</p>
      <p>{product.weight}</p>
    </div>
  );
};
