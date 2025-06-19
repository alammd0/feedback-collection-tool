import { Route, Routes } from "react-router-dom";
import { NavbarComponets } from "./component/Navbar";
import { FeedbackFrom } from "./page/FeedbackFrom";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white overflow-x-hidden">
      <NavbarComponets />

      <main>
        <Routes>
          <Route path="/" element={<FeedbackFrom />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
