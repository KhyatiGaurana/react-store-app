import styles from "styles/Home.module.scss";
import Card from "components/Card";
import Title from "components/Title";
import useMakeRequest from "hooks/useMakeRequest";
import { useState, useEffect } from "react";

const Home = () => {
  
  let data = useMakeRequest("https://fakestoreapi.com/products/");
  
  const [result,setResult] = useState(" ");

  useEffect(()=>{
    if(data)
    setResult(data);

    
  },[data])
  const handleAddToCart = (productId) => {

    console.log(`Product with ID ${productId} added to cart`);
    alert("Hello");

    setResult(result.filter(product => product.id !== productId));
    alert(`${productId}`);
  };

  if (!result.data) {
    if (result.error) {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Title txt={result.error} size={25} transform="uppercase" />
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Title txt="Loading..." size={25} transform="uppercase" />
        </div>
      );
    }
  } else {
    return (
      <section className={styles.home}>
        <div className={styles.container}>
          <div className={styles.row}>
            {result.data && (
              <div className={styles.title}>
                <Title txt="all products" color="#171717" size={22} transform="uppercase" />
              </div>
            )}
          </div>
          <div className={styles.row}>
            {result.data ? (
              result.data.map((product, key) => <Card product={product} key={key} onAddToCart={() => handleAddToCart(product.id)}/>)
            ) : (
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Title txt={result.error} size={25} transform="uppercase" />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
};

export default Home;
