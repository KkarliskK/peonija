import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Routes/Main";
import Orders from "./Routes/Orders";
import Charts from "./Routes/Charts";


export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Main />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/orders" element={<Orders />} />
      </Routes> 
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);