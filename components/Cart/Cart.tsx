import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CustomerCart } from "types/index";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const [customerCart, setCustomerCart] = useState<CustomerCart[]>([]);

  useEffect(() => {
    let cartList = JSON.parse(localStorage.getItem("cartList")!) || [];
    setCustomerCart(cartList);
  }, []);

  return (
    <>
      <div className={styles.flexbetween}>
        <h2>My Shopping Cart</h2>{" "}
        {customerCart?.length > 0 && (
          <Link href="/" className={styles.link}>
            Continue shopping
          </Link>
        )}
      </div>
      {customerCart?.length < 1 ? (
        <div className={styles.emptyCart}>
          <div>
            <Image
              src="/emptycart.svg"
              height={150}
              width={150}
              priority
              alt="productImage"
              style={{ objectFit: "contain" }}
            />
            <h4> Cart is empty </h4>
            <Link href="/" className={styles.link}>
              Continue shopping
            </Link>
          </div>
        </div>
      ) : (
        <CartItem
          customerCart={customerCart}
          setCustomerCart={setCustomerCart}
        />
      )}
    </>
  );
};

export default Cart;
