import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { useInventory } from './hooks/useInventory';

function App() {
  const inventory = useInventory(); // สร้าง State กลางที่นี่

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <span className="text-xl font-black text-blue-600">STOCK MASTER</span>
            <div className="space-x-6 font-medium text-gray-600">
              <Link to="/" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/products" className="hover:text-blue-600">จัดการสินค้า</Link>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            {/* ส่งข้อมูล products ไปให้หน้า Home */}
            <Route path="/" element={<Home products={inventory.products} />} />
            {/* ส่งฟังก์ชันจัดการทั้งหมดไปให้หน้า Products */}
            <Route path="/products" element={<Products {...inventory} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;