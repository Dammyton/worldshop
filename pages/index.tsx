import Head from "next/head";
import styles from "components/Home/Home.module.css";
import Header from "components/Header";
import ProductCard from "components/ProductCard";
import { CustomerCart, Product } from "types/index";
import { APIKEY, PRODUCTS } from "utils/constants";
import { useEffect, useState } from "react";

interface IProps {
  products: Product[];
}

const Home = (props: IProps) => {
  const { products } = props;

  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  const updateProductCount = () => {
    let cartList = JSON.parse(localStorage.getItem("cartList")!) || [];
    let sum = 0;

    cartList?.forEach((item: CustomerCart) => {
      sum += item?.quantity;
    });
    setTotalCartQuantity(sum);
  };

  useEffect(() => {
    updateProductCount();
  }, []);

  return (
    <>
      <Head>
        <title>Alice of WorldShop</title>
        <meta name="description" content="marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header totalCartQuantity={totalCartQuantity} />
        <ProductCard
          products={products}
          updateProductCount={updateProductCount}
        />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  let res = await fetch(`${PRODUCTS}`, {
    headers: {
      accept: "application/json",
      "X-API-KEY": `${APIKEY}`,
    },
  });
  let products = (await res.json()) || [];
  products = products?.data?.giftCardsRLD?.content.slice(0, 20);

  return {
    props: { products },
  };
}
export default Home;
