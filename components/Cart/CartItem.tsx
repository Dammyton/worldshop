import QuantityBox from "components/QuantityBox";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import { CustomerCart } from "../../types";
import { capitalizeFirstLetter, truncateMultilineText } from "../../utils/fx";
import styles from "./Cart.module.css";

interface IProps {
  customerCart: CustomerCart[];
  setCustomerCart: React.Dispatch<React.SetStateAction<CustomerCart[]>>;
}

const CartItem = ({ customerCart, setCustomerCart }: IProps) => {
  const handleQuantityChange = (value: number, productId: number) => {
    let cartList = JSON.parse(localStorage.getItem("cartList")!);
    const newCartList = [...cartList];

    let productExist = newCartList.find(
      (item) => item.id === productId && item
    );

    let newCartList_ = newCartList.filter(
      (item) => item.id !== productExist?.id && item
    );

    if (value === productExist?.quantity) return null;
    let payload = [
      ...newCartList_,
      {
        id: productExist?.id,
        quantity: value,
        relationtoproduct: productExist?.relationtoproduct,
      },
    ];

    localStorage.setItem("cartList", JSON.stringify(payload));
    cartList = JSON.parse(localStorage.getItem("cartList")!);

    setCustomerCart(cartList);

    toast.success(
      `${truncateMultilineText(
        productExist?.relationtoproduct?.productName,
        30
      )} has been updated in your cart successfully`
    );
  };

  const removeItem = (productId: number) => {
    let cartList = JSON.parse(localStorage.getItem("cartList")!);
    const newCartList = [...cartList];

    let productExist = newCartList.find(
      (item) => item.id === productId && item
    );
    let newCartList_ = newCartList.filter(
      (item) => item.id !== productId && item
    );

    localStorage.setItem("cartList", JSON.stringify(newCartList_));
    cartList = JSON.parse(localStorage.getItem("cartList")!);

    setCustomerCart(cartList);

    toast.success(
      `${truncateMultilineText(
        productExist?.relationtoproduct?.productName,
        30
      )} has been removed from your cart successfully`
    );
  };
  return (
    <div className={`${styles.Cart} `} id="cartItem">
      <div className={`${styles.cardheader}`}>
        <div className="w-60">Item</div>
        <div className="w-25 hide-sm">Quantity</div>
        <div className="w-15">&nbsp;</div>
      </div>
      <div className={styles.paddingsm}>
        {customerCart?.map((item: CustomerCart) => (
          <div className={styles.wrapper} key={item?.id}>
            <div className="w-60">
              <div className={styles.productBox}>
                <Image
                  src={item?.relationtoproduct?.img}
                  height={50}
                  width={120}
                  priority
                  alt="productImage"
                  style={{ objectFit: "contain" }}
                />
                <div>
                  <div>
                    {capitalizeFirstLetter(item?.relationtoproduct.productName)}
                  </div>

                  <h3>
                    {" "}
                    {item?.relationtoproduct?.recipientCurrencyCode}{" "}
                    {item?.relationtoproduct.senderFee}
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-25">
              <QuantityBox
                key={item.id}
                onValueChange={handleQuantityChange}
                value={item?.quantity}
                productId={item.id}
              />
            </div>
            <div
              onClick={() => removeItem(item?.id)}
              className={styles.removeItem}
              data-testid="removeItem"
            >
              {" "}
              Remove item{" "}
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default CartItem;
