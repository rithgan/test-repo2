import * as React from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./ProductPicker.module.css";

const Products = ({ data }) => {
  const { setCount } = React.useContext(DataContext);
  const [variants,setVariants] = React.useState([])
  console.log(variants)
  const handleCheck = (e) => {
    let product = e.target.value;
    let obj = { product, variants: data.variants };
    if (e.target.checked) {
      console.log(obj)
      sessionStorage.setItem(product, obj);
      setCount(sessionStorage.length);
      data.variants.forEach((ele) => {
        let id = document.getElementById(ele.id);
        id.checked = true;
        console.log(ele.title);
      });
    }
    if (!e.target.checked) {
      sessionStorage.removeItem(product);
      setCount(sessionStorage.length);
      data.variants.forEach((ele) => {
        let id = document.getElementById(ele.id);
        id.checked = false;
      });
    }
  };

  // let variants = [];
  const handleChildCheck = (e) => {
    let value = e.target.value;
    value = value.split(",");
    if (value[0] === data.id.toString()) {
      let dataId = document.getElementById(data.id);
      let product = dataId.value;
      if (e.target.checked) {
        dataId.checked = true;
        // let data = value[1]
        // variants.push(data);
        // setVariants([...variants, value[1]])
        setVariants(variants.concat(value[1]))
        let obj = { product, variants };
        console.log(obj)
        sessionStorage.setItem(product, obj);
        setCount(sessionStorage.length);
        // console.log(variants);
      }
      if (!e.target.checked) {
        // console.log(variants);
        // variants = variants.filter((variant) => variant !== value[1]);
        // let variants2 = [...variants]
        setVariants(variants.filter((variant) => variant !== value[1]))
        let obj = { product, variants };
        if (variants.length > 0) {
          console.log(obj)
          sessionStorage.setItem(product, obj);
          console.log(new Object(sessionStorage.getItem(product)))
        } else {
          sessionStorage.removeItem(product);
          dataId.checked = false;
          setCount(sessionStorage.length);
        }
      }
    }
  };
  return (
    <>
      <p className={styles.item_heading} key={data.id}>
        <input
          type="checkbox"
          value={data.title}
          onChange={(event) => handleCheck(event)}
          id={data.id}
        />{" "}
        <img className={styles.img} src={data.image.src}></img>
        {data.title}
      </p>
      <ul>
        {data.variants.map((data, string) => (
          <li key={data.id}>
            <div className={styles.list_container}>
              <p>
                <input
                  type="checkbox"
                  value={[data.product_id, data.title]}
                  onChange={(event) => handleChildCheck(event)}
                  id={data.id}
                />{" "}
                {data.title}
              </p>
              <p>{data.inventory_quantity} available</p>
              <p>{data.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
