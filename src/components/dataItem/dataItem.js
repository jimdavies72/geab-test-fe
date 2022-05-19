import "./dataItem.css";

export const DataItem = ({ product }) => {
  return (
    <div className="item-container">
      <p>{product.id}</p>
      <p>{product.name}</p>
      <p id="price">{`${product.price.value} ${product.price.currency}`}</p>
      <p>{product.type}</p>
      <p>{product.department}</p>
      <p>{product.weight}</p>
    </div>
  );
};
