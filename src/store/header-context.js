import React, { useState } from "react";

const HeaderContext = React.createContext({
  visibleCategories: false,
  setVisibleCategories: () => {},
});

export const HeaderContextProvider = (props) => {
  const [visibleCategories, setVisibleCategories] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        visibleCategories,
        setVisibleCategories,
      }}
    >
      {props.children}
    </HeaderContext.Provider>
  );
};

export default HeaderContext;
