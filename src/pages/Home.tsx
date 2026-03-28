import type { Product } from '../types';

interface Props {
  products: Product[];
}

export const Home = ({ products }: Props) => {
  // คำนวณค่าจากข้อมูลที่ได้รับมา
  const totalItems = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard สรุปข้อมูล</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80">รายการสินค้าทั้งหมด</p>
          <p className="text-4xl font-bold">{totalItems} ชนิด</p>
        </div>
        <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80">มูลค่ารวมของสต๊อก</p>
          <p className="text-4xl font-bold">{totalValue.toLocaleString()} ฿</p>
        </div>
        <div className="bg-rose-500 text-white p-6 rounded-2xl shadow-lg">
          <p className="opacity-80">สินค้าที่ของหมด</p>
          <p className="text-4xl font-bold">{outOfStock} รายการ</p>
        </div>
      </div>
    </div>
  );
};