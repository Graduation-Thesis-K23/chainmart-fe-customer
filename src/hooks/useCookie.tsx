const useCookie = (key: string, initialValue: string) => {
  const storedValue = () => {
    if (typeof document === "undefined") {
      return initialValue;
    }
    try {
      const cookies = document.cookie.split(";");
      const item = cookies.find((item) => item.split("=")[0] === key);

      return item ? item.split("=")[1] : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  return storedValue();
};

export default useCookie;
