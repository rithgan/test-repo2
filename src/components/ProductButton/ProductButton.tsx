import * as React from 'react';
import styles from './ProductButton.module.css'

interface IProductButtonProps {
  addList:Function
}

const ProductButton: React.FunctionComponent<IProductButtonProps> = ({addList}) => {
  return (
        <button className={styles.add_btn} onClick={()=>addList()}>Add Product</button>
  );
};

export default ProductButton;
