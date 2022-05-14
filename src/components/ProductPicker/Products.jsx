import * as React from 'react';
import styles from './ProductPicker.module.css'



const Products = ({data}) => {
  return <>
              <p className={styles.item_heading} key={data.id}>
                <input
                  type="checkbox"
                  value={data.title}
                //   checked={isChecked[index]}
                //   onChange={() => handleCheck(index)}
                />{" "}
                <img className={styles.img} src={data.image.src}></img>
                {data.title}
              </p>
              <ul>
                {data.variants.map((data , string ) => (
                  <li key={data.id}>
                    <div className={styles.list_container}>
                      <p>
                        <input
                          type="checkbox"
                          value={data.title}
                        />{" "}
                        {data.title}
                      </p>
                      <p>{data.inventory_quantity} available</p>
                      <p>{data.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>;
};

export default Products;
