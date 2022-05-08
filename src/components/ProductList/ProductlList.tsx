import { useState, useEffect } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import styles from "./ProductList.module.css";
import axios from "axios";
import ProductPicker from "../ProductPicker/ProductPicker";
import Draggable from "react-draggable";

interface IProductListProps {}

const url = "https://stageapibc.monkcommerce.app/admin/shop/product";

const ProductList: React.FunctionComponent<IProductListProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [discountValue, setDiscountValue] = useState("0");

  const handleSearch = async (searchString: string, pageNumber: number) => {
    const data = await axios.get(
      url + `?search=${searchString}&page=${pageNumber}`
    );
    console.log(data.data)
    setProduct(data.data);
    setOpen(true);
  };

  console.log(search);

  return (
    <div className={styles.list}>
      <label className={styles.label} htmlFor="select-product">
        {/* <span className={styles.label_name}>Product</span> */}
        <div>
          <i className={styles.icon}>
            <MdOutlineDragIndicator className={styles.drag} />
          </i>{" "}
          <span>1. </span>
          <input
            type="text"
            placeholder="Select product"
            name="select-product"
            id="select-product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />
          <div className={styles.input_icons}>
            <i
              className={styles.icon}
              onClick={() => handleSearch(search, page)}
            >
              <HiPencil className={styles.pencil} />
            </i>
          </div>
        </div>
      </label>
      <label className={styles.label} htmlFor="add-discount">
        {/* <span className={styles.label_name}>Discount</span> */}

        {discount ? (
          <>
            <input
              type="text"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className={styles.input_discount}
            />
            <select name="discounts" id="discount-select" className={styles.input_option}>
              <option value="%">% off</option>
              <option value="flat">Flat off</option>
            </select>
          </>
        ) : (
          <input
            name="add-discount"
            id="add-discount"
            type="button"
            value="Add Discount"
            onClick={() => setDiscount(true)}
          />
        )}
      </label>
      {open ? <ProductPicker setModal={setOpen} data={product} handleSearch={handleSearch} search={search} setSearch={setSearch}/> : null}
    </div>
  );
};

export default ProductList;
