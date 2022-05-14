import * as React from 'react';
import styles from './ProductButton.module.css'


const ProductButton = ({addList}) => {
  return (
        <button className={styles.add_btn} onClick={()=>addList()}>Add Product</button>
  );
};

export default ProductButton;
