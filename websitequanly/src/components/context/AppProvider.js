import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [showMenuChuongTrinh, setShowMenuChuongTrinh] = useState(false);
  const [showMenuCuocThi, setShowMenuCuocThi] = useState(false);
  const [showMenuDoanDoiThiSinh, setShowMenuDoanDoiThiSinh] = useState(false);

  const [isSidebarOff, setIsSidebarOff] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showMenuChuongTrinh,
        setShowMenuChuongTrinh,
        showMenuCuocThi,
        setShowMenuCuocThi,
        showMenuDoanDoiThiSinh,
        setShowMenuDoanDoiThiSinh,
        isSidebarOff,
        setIsSidebarOff
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
