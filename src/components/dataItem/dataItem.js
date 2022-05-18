import "./dataItem.css";

export const DataItem = ({ product }) => {
  return (
    <>
      <span>
        <p>{product.name}</p>
        <p>{product.price.value}</p>
      </span>
    </>
  );
};
