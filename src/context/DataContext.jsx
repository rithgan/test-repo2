import React, { createContext, useState, useMemo } from "react";

export const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(0);
  const value = useMemo(
    () => ({
      product,
      setProduct,
      open,
      setOpen,
      count,
      setCount,
    }),
    [product, open, count]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
