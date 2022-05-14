import { useState, useEffect, useContext, createContext } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import styles from "./ProductList.module.css";
import axios from "axios";
import ProductPicker from "../ProductPicker/ProductPicker";
import { DataContext } from "../../context/DataContext";
import { Draggable } from "react-beautiful-dnd";

const url = "https://stageapibc.monkcommerce.app/admin/shop/product";

const ProductList = (props) => {
  // const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const {product, setProduct} = useContext(DataContext);
  const {product,setProduct,open,setOpen} = useContext(DataContext)
  const [discount, setDiscount] = useState(false);
  const [discountValue, setDiscountValue] = useState("0");

  const handleSearch = async (searchString, pageNumber) => {
    try {
      // const data = await axios.get(
      //   url + `?search=${searchString}&page=${pageNumber}`
      // );
      // setProduct(data.data); 
      const data = [
        {
          id: 77,
          title: "Fog Linen Chambray Towel - Beige Stripe",
          variants: [
            {
              id: 1,
              product_id: 77,
              title: "XS / Silver",
              price: "49",
            },
            {
              id: 2,
              product_id: 77,
              title: "S / Silver",
              price: "49",
            },
            {
              id: 3,
              product_id: 77,
              title: "M / Silver",
              price: "49",
            },
          ],
          image: {
            id: 266,
            product_id: 77,
            src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
          },
        },
        {
          id: 80,
          title: "Orbit Terrarium - Large",
          variants: [
            {
              id: 64,
              product_id: 80,
              title: "Default Title",
              price: "109",
            },
          ],
          image: {
            id: 272,
            product_id: 80,
            src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
          },
        },
      ]
console.log(data)
      setProduct(data);
      setOpen(true);
    } catch (error) {
      
      console.error(error);
    }
  };

  console.log(product);

  console.log(search);

  return (
    <Draggable
      index={props.index}
      draggableId={props.id.toString()}
      key={props.id}
    >
      {(provided) => (
        <li
          className={styles.list}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                <select
                  name="discounts"
                  id="discount-select"
                  className={styles.input_option}
                >
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

          {open ? (
            <ProductPicker
            setModal={setOpen}
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
            />
            ) : null}
        </li>
      )}
    </Draggable>
  );
};

export default ProductList;
