import { useContext, useState,useEffect } from "react";
import Products from "./Products";
import { DataContext } from "../../context/DataContext";
import styles from './ProductPicker.module.css'
import {ImCross} from 'react-icons/im'
import {AiOutlineSearch} from 'react-icons/ai'

const ProductPicker = ({search,handleSearch,setSearch}) => {
  const [count,setCount] = useState(0)
  const {product, setProduct,open,setOpen} = useContext(DataContext);
  let data = product || [];
  const [isChecked, setIsChecked] = useState(
    new Array(data.length).fill(false)
  );
  const handleCheck = (position) => {
    const updateChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updateChecked);
  };

  useEffect(() => {
    handleSearch(search, 1);
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h2 className={styles.heading}>Select Products</h2>
        <i className={styles.icon} onClick={() => setOpen(false)}>
          <ImCross />
        </i>
      </div>
      <div className={styles.search_container}>
        <form>
          <i className={styles.search_icon}>
            <AiOutlineSearch />
          </i>
          <input
            className={styles.input}
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.item_container}>
        {data.length !== 0 ? (
          data.map((data, index) => <Products data={data} key={index} />)
        ) : (
          <p>Can't find any item</p>
        )}
      </div>
      <div className={styles.footer_container}>
        <p className={styles.product_num}>{count} product selected</p>
        <div className={styles.btn_group}>
          <button
            className={`${styles.btn} ${styles.btn_cancel}`}
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button className={`${styles.btn} ${styles.btn_apply}`}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;
