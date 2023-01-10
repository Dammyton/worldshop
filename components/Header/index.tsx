import React from "react";
import styles from "components/Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  totalCartQuantity: number;
}

const Header = ({ totalCartQuantity }: IProps) => {
  return (
    <div className={styles.header}>
      <h1>Alice of WorldShop</h1>
      <div className={styles.cartContainer}>
        <Link href={"/cart"}>
          <Image
            src="/shopping-cart.svg"
            height={30.59}
            width={30.59}
            priority
            alt="productImage"
          />
          <div id="cartCounter" className={styles.cartCounter}>{totalCartQuantity}</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
