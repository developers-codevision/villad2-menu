import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomePage from "@/pages/HomePage";
import { useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header
            onToggleMenu={() => setSidebarOpen((prev) => !prev)}
            isMenuOpen={sidebarOpen}
          />
          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    sidebarOpen={sidebarOpen}
                    onCloseSidebar={() => setSidebarOpen(false)}
                  />
                }
              />
              <Route
                path="/:id"
                element={
                  <HomePage
                    sidebarOpen={sidebarOpen}
                    onCloseSidebar={() => setSidebarOpen(false)}
                  />
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
