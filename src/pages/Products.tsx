import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  products: Product[];
  addProduct: (name: string, price: number, quantity: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  deleteProduct: (id: number) => void;
}

export const Products = ({ products, addProduct, updateQuantity, deleteProduct }: Props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addProduct(name, price, qty);
      setName(''); setPrice(0); setQty(0);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">จัดการสต๊อกสินค้า</h1>

      {/* ฟอร์มเพิ่มสินค้า */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border flex gap-4 flex-wrap items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700">ชื่อสินค้า</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required
            className="mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700">ราคา</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))}
            className="mt-1 w-full border rounded-lg p-2" />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700">จำนวน</label>
          <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))}
            className="mt-1 w-full border rounded-lg p-2" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">เพิ่มสินค้า</button>
      </form>

      {/* ค้นหาสินค้า */}
      <input type="text" placeholder="ค้นหาชื่อสินค้า..." value={search} onChange={e => setSearch(e.target.value)}
        className="w-full border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-blue-400" />

      {/* รายการสินค้า */}
      <div className="grid gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className={`p-4 border rounded-xl flex justify-between items-center shadow-sm 
            ${product.quantity === 0 ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
            <div>
              <h3 className="font-bold text-gray-800">
                {product.name} {product.quantity === 0 && <span className="text-red-500 text-sm font-normal">(สินค้าหมด)</span>}
              </h3>
              <p className="text-sm text-gray-500">ราคา: {product.price} | คงเหลือ: {product.quantity}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => updateQuantity(product.id, 1)} className="bg-gray-100 px-3 py-1 rounded-lg">+</button>
              <button onClick={() => updateQuantity(product.id, -1)} className="bg-gray-100 px-3 py-1 rounded-lg">-</button>
              <button onClick={() => deleteProduct(product.id)} className="text-red-500 px-2">ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};