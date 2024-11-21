import { Provider } from "react-redux";
import Kanbas from "./Kanbas";
import Labs from "./Labs";
import kanbasStore from "./Kanbas/store";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Provider store={kanbasStore}><Kanbas /></Provider>} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;