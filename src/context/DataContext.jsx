import React, { createContext, useState ,useMemo} from "react";


export const DataContext = createContext([])

export const DataProvider= ({children}) => {
    const [product,setProduct] = useState([])
    const [open,setOpen] = useState(false)
    const value = useMemo(()=>({
        product,setProduct,
        open,setOpen
    }),[product,open])

  return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>)
};  

