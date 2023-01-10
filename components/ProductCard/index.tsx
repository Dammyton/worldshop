import ListingCard from "components/ListingCard";
import React from "react";
import styles from "components/ProductCard/ProductCard.module.css";
import { Product } from "types/index";

interface IProps {
  products: Product[];
  updateProductCount: () => void;
}

const ProductCard = ({ products, updateProductCount }: IProps) => {
  return (
    <div className={styles.productCard} id="productCard">
      {products?.map((item: Product, i: number) => (
        <ListingCard
          key={i}
          item={item}
          updateProductCount={updateProductCount}
        />
      ))}
    </div>
  );
};

export default ProductCard;
