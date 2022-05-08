import "./App.css";
import {useState} from 'react'
import ProductButton from "./components/ProductButton/ProductButton";
import ProductList from "./components/ProductList/ProductlList";
import ProductPicker from "./components/ProductPicker/ProductPicker";

function App() {
  const [list,setList] = useState([<ProductList key={0}/>])

  const addList = ()=>{
    return setList(list.concat(<ProductList key={list.length}/>))
  }

  return (
    <div className="app">
      <h3 className="heading">Add Products</h3>
      {list}
      <ProductButton addList={addList} />
  </div>
      // <ProductPicker/>
);
}

export default App;
