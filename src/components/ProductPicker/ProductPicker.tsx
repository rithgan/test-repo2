import { ImCross } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./ProductPicker.module.css";
import { useState, useEffect } from "react";

interface IProductPickerProps {
  setModal: Function;
  data: any[];
  setSearch: Function;
  setData?: Function;
  handleSearch: Function;
  search: string;
}

const ProductPicker: React.FunctionComponent<IProductPickerProps> = ({
  setModal,
  data,
  handleSearch,
  search,
  setSearch,
}) => {
  const [count, setCount] = useState(0);
  const [isChecked, setIsChecked] = useState(
    new Array(data.length).fill(false)
  );
  const [childChecked, setChildChecked] = useState(
    data.map((data) =>
      data.variants
        .map((variants: string | any[]) => variants.length)
        .fill(false)
    )
  );

  const handleCheck = (position: number) => {
    const updateChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updateChecked);
  };

  const handleChildCheck = (position: number, variant_position: any) => {
    console.log(position, variant_position);
    const updateChildChecked = childChecked.map((item, index) =>
      index === position
        ? item.map((item: any, index: any) => index === variant_position ? !item : item)
        : item
    );

    setChildChecked(updateChildChecked);
  };

  useEffect(() => {
    handleSearch(search, 1);
  }, [search]);

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
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.item_container}>
        {data !== null ? (
          data.map((data, index) => (
            <>
              <p className={styles.item_heading} key={data.id}>
                <input
                  type="checkbox"
                  value={data.title}
                  checked={isChecked[index]}
                  onChange={() => handleCheck(index)}
                />{" "}
                <img className={styles.img} src={data.image.src}></img>
                {data.title}
              </p>
              <ul>
                {data.variants.map((data: any, i: string | number) => (
                  <li key={data.id}>
                    <div className={styles.list_container}>
                      <p>
                        <input
                          type="checkbox"
                          value={data.title}
                          checked={childChecked[index][i]}
                          onChange={() => handleChildCheck(index, i)}
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
          ))
        ) : (
          <p>Can't find any item</p>
        )}
      </div>
      <div className={styles.footer_container}>
        <p className={styles.product_num}>{count} product selected</p>
        <div className={styles.btn_group}>
          <button
            className={`${styles.btn} ${styles.btn_cancel}`}
            onClick={() => setModal(false)}
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
