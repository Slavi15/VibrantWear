"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import { BsArrowRight } from "react-icons/bs";
import { FiArrowDown } from "react-icons/fi";

const FeaturedProducts = dynamic(() => import("@/components/elements/FeaturedProducts.tsx"));

import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.mainText}>
          <div className={styles.h5}>Summer Collection</div>
          <div className={styles.h1}>New Summer <br /> Collection 2024</div>
          <div className={styles.p}>There&apos;s nothing like trend</div>

          <Link href="/store" prefetch={true}>
            <div className={styles.button}>Shop now <BsArrowRight className={styles.arrowIcon} /></div>
          </Link>
        </div>

        <div className={styles.downArrow}>
          <Link href="#trending" prefetch={true} className={styles.down}>
            <i><FiArrowDown className={styles.downArrowIcon} /></i>
          </Link>
        </div>
      </main>

      <section className={styles.trendingProducts} id="trending">
        <div className={styles.centerText}>
          <h2>#Trending <span>Products</span></h2>
        </div>

        <FeaturedProducts />
      </section>
    </div>
  );
};

export default Home;