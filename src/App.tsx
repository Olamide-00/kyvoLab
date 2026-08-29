import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import { ToastProvider } from "./components/Toast";

export default function App() {
  return (
    <ToastProvider>
      <div className="site-grain" />
      <Navbar />
      <main className="site-main">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </ToastProvider>
  );
}
