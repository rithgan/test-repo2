import { ImCross } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./ProductPicker.module.css";
import {
  useState,
  useEffect,
} from "react";

interface IProductPickerProps {
  setModal: Function;
  data: any[];
  setSearch: Function;
  setData?: Function;
  handleSearch:Function
  search:string
}

const ProductPicker: React.FunctionComponent<IProductPickerProps> = ({
  setModal,
  data,
  handleSearch,
  search,
  setSearch
}) => {
  const [count,setCount] = useState(0)
//   const [itemsearch,setItemSearch] = useState(search)

  useEffect(()=>{
    handleSearch(search,1)
  },[search])

  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h2 className={styles.heading}>Select Products</h2>
        <i className={styles.icon} onClick={() => setModal(false)}>
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
            onChange={(e)=>setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.item_container}>
        {data!==null?data.map(
          (data) => (
            <>
              <p className={styles.item_heading} key={data.id}>
                <input type="checkbox"/>{" "}
                <img className={styles.img} src={data.image.src}></img>
                {data.title}
              </p>
              <ul>
                {data.variants.map((data:any) => (
                  <li key={data.id}>
                    <div className={styles.list_container}>
                      <p>
                        <input type="checkbox" /> {data.title}
                      </p>
                      <p>{data.inventory_quantity} available</p>
                      <p>{data.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )
        ):<p>Can't find any item</p>}
      </div>
      <div className={styles.footer_container}>
        <p className={styles.product_num}>{count} product selected</p>
        <div className={styles.btn_group}>
          <button className={`${styles.btn} ${styles.btn_cancel}`} onClick={() => setModal(false)}>
            Cancel
          </button>
          <button className={`${styles.btn} ${styles.btn_apply}`}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;
