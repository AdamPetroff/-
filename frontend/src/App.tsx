import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Demo from "./components/PropertiesList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Modal />
      <div className="flex min-h-[100vh] flex-col">
        <Navbar />
        <div className="flex-1">
          <Demo></Demo>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
