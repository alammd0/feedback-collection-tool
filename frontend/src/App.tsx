import { Route, Routes } from "react-router-dom";
import { NavbarComponets } from "./component/Navbar";
import { FeedbackFrom } from "./page/FeedbackFrom";
import { LoginPage } from "./page/login";
import { ForgetPasswordPage } from "./page/ForgePassword";
import FeedbackTabs from "./page/TabwiseFeedback";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white overflow-x-hidden">
      <NavbarComponets />

      <main>
        <Routes>
          <Route path="/" element={<FeedbackFrom />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/forget-password" element={<ForgetPasswordPage />}></Route>
          <Route path="/admin-page" element = {<FeedbackTabs/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
