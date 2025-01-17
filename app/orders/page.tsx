"use client";

import React, { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const menuItems: MenuItem[] = [
    { id: 1, name: "ЛАГМАН УЙГУР", price: 200 },
    { id: 2, name: "Бризол", price: 200 },
    { id: 3, name: "Бистроен", price: 200 },
    { id: 4, name: "Лагман домашний", price: 190 },
    { id: 5, name: "Манты", price: 220 },
    { id: 6, name: "Самса", price: 50 },
    { id: 7, name: "Шорпо", price: 150 },
    { id: 8, name: "Мастава", price: 130 },
    { id: 9, name: "Плов", price: 180 },
    { id: 10, name: "Куурдак", price: 250 },
    { id: 11, name: "Салат Оливье", price: 120 },
    { id: 12, name: "Чебурек", price: 100 },
    { id: 13, name: "Фрикадельки", price: 170 },
    { id: 14, name: "Борщ", price: 160 },
    { id: 15, name: "Сырники", price: 140 },
    { id: 16, name: "Компот", price: 50 },
    { id: 17, name: "Чай зелёный", price: 40 },
    { id: 18, name: "Чай чёрный", price: 40 }
  ];

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    if (!selectedItems.includes(item.id)) {
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  const removeFromCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem && existingItem.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
      setSelectedItems(selectedItems.filter((id) => id !== item.id));
    } else if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-gray-200 p-6">
      {/* Menu Section */}
      <div className="flex-1 grid grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => addToCart(item)}
            className={`p-4 text-center rounded-lg ${
              selectedItems.includes(item.id)
                ? "bg-red-400"
                : "bg-gray-300 hover:bg-red-400 transition-all duration-300"
            }`}
          >
            <h3 className="font-bold">{item.name}</h3>
            <p>{item.price} сом</p>
          </button>
        ))}
      </div>

      {/* Cart Section */}
      <div className="w-1/3 bg-gray-400 p-4 rounded-lg ml-[10px]">
        <h2 className="font-bold text-xl mb-4">Корзина</h2>
        <div className="space-y-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-200 p-2 rounded-lg"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.price} сом</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 text-white px-2 py-1 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="font-bold text-lg">Итого: {total} сом</p>
        </div>
        <button className="w-full bg-red-500 text-white py-2 rounded-lg mt-4">
        Печать чека
        </button>
      </div>
    </div>
  );
}
