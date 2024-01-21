import { useCallback, useState } from "react";
import List from "../components/List";
function useCallbackEx() {
  const [number, setNumber] = useState(1);
  const [Theme, setTheme] = useState(false);

  const getItems = useCallback(
    (incrementor) => {
      return [
        number + incrementor,
        number + incrementor + 1,
        number + incrementor + 2,
      ];
    },
    [number]
  );

  const themeStyles = {
    backgroundColor: Theme ? "#000" : "transparent",
    color: Theme ? "#fff" : "#000",
  };

  return (
    <div className="container" style={themeStyles}>
      <input
        onChange={(e) => setNumber(parseInt(e.target.value))}
        type="number"
        value={number}
      />
      <button onClick={() => setTheme((prevTheme) => !prevTheme)}>
        Toggle Theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}

export default useCallbackEx;
