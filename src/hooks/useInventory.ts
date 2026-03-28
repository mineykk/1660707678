// src/hooks/useInventory.ts
import { useState } from 'react';
import type { Product } from '../types'; // ตรวจสอบว่าสร้างไฟล์ src/types.ts แล้ว

export const useInventory = () => {
  // สร้าง State สำหรับเก็บรายการสินค้าเป็น Array
  const [products, setProducts] = useState<Product[]>([]);

  // 1. ฟังก์ชันเพิ่มสินค้า (รับชื่อ, ราคา, จำนวน)
  const addProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: Date.now(), // ใช้ timestamp เป็น ID ชั่วคราว
      name: name,
      price: price,
      quantity: quantity,
    };
    setProducts([...products, newProduct]);
  };

  // 2. ฟังก์ชันอัปเดตจำนวนสินค้า (สำหรับปุ่ม + และ -)
  const updateQuantity = (id: number, amount: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === id) {
          // คำนวณจำนวนใหม่ โดยห้ามต่ำกว่า 0
          const newQuantity = Math.max(0, product.quantity + amount);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  // 3. ฟังก์ชันลบสินค้าออกจากระบบ
  const deleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  // ส่งค่าตัวแปรและฟังก์ชันที่จำเป็นกลับไปให้ Component ใช้งาน
  return {
    products,
    addProduct,
    updateQuantity,
    deleteProduct,
  };
};