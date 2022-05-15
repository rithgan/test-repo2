import "./App.css";
import { useState } from "react";
import ProductButton from "./components/ProductButton/ProductButton";
import ProductList from "./components/ProductList/ProductlList";
import ProductPicker from "./components/ProductPicker/ProductPicker";
import { DataProvider } from "./context/DataContext";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

function App() {
  const [list, setList] = useState([
    <ProductList key={(0)} index={(0)} id={(0)} />,
  ]);

  const addList = () => {
    return setList(
      list.concat(
        <ProductList
          key={(list.length)}
          index={(list.length)}
          id={(list.length)}
        />
      )
    );
  };

  return (
    <DataProvider>
      <div className="app">
        <h3 className="heading">Add Products</h3>
        <DragDropContext>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {list}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <ProductButton addList={addList} />
      </div>
    </DataProvider>
    // <ProductPicker/>
  );
}

export default App;
