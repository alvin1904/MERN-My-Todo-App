import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const showError = (err) => {
    // console.log(err);
    let errorMsg = "";
    if (err.message == "Network Error") {
      errorMsg =
        "There is some problem with server. Please wait till we sort it out";
    }
    // INCASE NEEDED FOR CUSTOM  ERROR
    else if (err.message == "custom") {
      errorMsg = err.show;
    }
    setError(errorMsg);
    const timeout = setTimeout(() => {
      setError("");
      hideLoading();
    }, 3000);
    return () => clearTimeout(timeout);
  };
  const hideError = () => {
    setError("");
  };
  const showLoading = () => {
    setLoading(true);
  };
  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        error,
        showError,
        hideError,
        loading,
        showLoading,
        hideLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useErrorContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
