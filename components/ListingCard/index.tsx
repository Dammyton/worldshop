import React from "react";
import styles from "components/ListingCard/ListingCard.module.css";
import Image from "next/image";
import { capitalizeFirstLetter, truncateMultilineText } from "../../utils/fx";
import { Product } from "types/index";
import { toast } from "react-toastify";

interface IProps {
  item: Product;
  updateProductCount: () => void;
}

const ListingCard = ({ item, updateProductCount }: IProps) => {
  const handleAddtoCart = () => {
    let cartList = JSON.parse(localStorage.getItem("cartList")!) || [];
    if (cartList?.length < 1) {
      let payload = [
        {
          id: item?.productId,
          quantity: 1,
          relationtoproduct: item,
        },
      ];
      localStorage.setItem("cartList", JSON.stringify(payload));
      updateProductCount();
      toast.success(
        `${truncateMultilineText(
          item?.productName,
          30
        )} has been added to your cart successfully`
      );
    } else {
      const newCartList = [...cartList];
      let productExist = newCartList.find(
        (value) => value.id === item?.productId && value
      );

      if (productExist) {
        let newCartList_ = newCartList.filter(
          (item) => item.id !== productExist?.id && item
        );

        let payload = [
          ...newCartList_,
          {
            id: productExist?.id,
            quantity: productExist?.quantity + 1,
            relationtoproduct: productExist?.relationtoproduct,
          },
        ];
        localStorage.setItem("cartList", JSON.stringify(payload));
        updateProductCount();

        toast.success(
          `${truncateMultilineText(
            productExist?.relationtoproduct?.productName,
            30
          )} has been updated in your cart successfully`
        );
      } else {
        let payload = [
          ...newCartList,
          {
            id: item?.productId,
            quantity: 1,
            relationtoproduct: item,
          },
        ];

        localStorage.setItem("cartList", JSON.stringify(payload));
        updateProductCount();

        toast.success(
          `${truncateMultilineText(
            item?.productName,
            30
          )} has been added to your cart successfully`
        );
      }
    }
  };

  return (
    <div className={styles.card} id="card">
      <Image
        src={item?.img}
        height={150}
        width={230}
        priority
        alt="productImage"
        style={{ objectFit: "contain" }}
      />
      <h3 className={styles.title}>
        {truncateMultilineText(capitalizeFirstLetter(item?.productName), 27)}
      </h3>
      <p className={styles.price}>
        {item?.recipientCurrencyCode} {item?.senderFee}
      </p>
      <p className={styles.percentage}>{item?.senderFeePercentage}% Off</p>
      <button id="add-to-cart-btn" className={styles.addToCart} onClick={() => handleAddtoCart()}>
        Add to cart
      </button>
    </div>
  );
};

export default ListingCard;
