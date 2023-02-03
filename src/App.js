import ComponentC from "./components/ComponentC";
import { createContext } from "react";

export const countContext = createContext()
export const nameContext = createContext()

function App() {

  return (
    <div>
      <countContext.Provider value={88}>
        <nameContext.Provider value={'Darmawan'}>
          <ComponentC />
        </nameContext.Provider>
      </countContext.Provider>
    </div>
  );
}

export default App;
