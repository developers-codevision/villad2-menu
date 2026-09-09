import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MenuPills from "@/components/layout/MenuPills";
import HomePage from "@/pages/HomePage";
import ChatWidget from "@/components/chat/ChatWidget";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <MenuPills />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:id" element={<HomePage />} />
              </Routes>
            </div>
            <Footer />
            <ChatWidget />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
