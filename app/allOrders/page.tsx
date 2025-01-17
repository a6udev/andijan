"use client";
import React from "react";

interface Order {
    id: number;
    waiterName: string;
    items: { name: string; quantity: number; price: number }[];
    total: number;
    paymentType: "Cash" | "Card";
    orderTime: string;
  }

interface Order {
  id: number;
  waiterName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  paymentType: "Cash" | "Card";
  orderTime: string;
}

const OrderHistoryPage: React.FC = () => {

    const orders: Order[] = [
        {
          id: 1,
          waiterName: "Аман",
          items: [
            { name: "ЛАГМАН УЙГУР", quantity: 2, price: 200 },
            { name: "Манты", quantity: 1, price: 220 },
          ],
          total: 620,
          paymentType: "Cash",
          orderTime: "15.01.2025 12:45",
        },
        {
          id: 2,
          waiterName: "Бакыт",
          items: [
            { name: "Самса", quantity: 5, price: 50 },
            { name: "Чай чёрный", quantity: 3, price: 40 },
          ],
          total: 350,
          paymentType: "Card",
          orderTime: "15.01.2025 13:20",
        },
        {
          id: 3,
          waiterName: "Жанара",
          items: [
            { name: "Шашлык", quantity: 3, price: 250 },
            { name: "Салат Оливье", quantity: 1, price: 180 },
          ],
          total: 930,
          paymentType: "Cash",
          orderTime: "15.01.2025 14:05",
        },
        {
          id: 4,
          waiterName: "Азамат",
          items: [
            { name: "Борщ", quantity: 1, price: 150 },
            { name: "Компот", quantity: 2, price: 50 },
          ],
          total: 250,
          paymentType: "Card",
          orderTime: "15.01.2025 14:30",
        },
        {
          id: 5,
          waiterName: "Айгуль",
          items: [
            { name: "Плов", quantity: 3, price: 300 },
            { name: "Лимонад", quantity: 3, price: 80 },
          ],
          total: 1140,
          paymentType: "Cash",
          orderTime: "15.01.2025 15:00",
        },
        {
          id: 6,
          waiterName: "Данияр",
          items: [
            { name: "Чебурек", quantity: 4, price: 150 },
            { name: "Морс", quantity: 2, price: 60 },
          ],
          total: 720,
          paymentType: "Card",
          orderTime: "15.01.2025 15:15",
        },
        {
          id: 7,
          waiterName: "Айнура",
          items: [
            { name: "Суп с лапшой", quantity: 2, price: 180 },
            { name: "Салат Цезарь", quantity: 1, price: 250 },
          ],
          total: 610,
          paymentType: "Cash",
          orderTime: "15.01.2025 15:40",
        },
        {
          id: 8,
          waiterName: "Марат",
          items: [
            { name: "Бифштекс", quantity: 2, price: 400 },
            { name: "Гарнир", quantity: 1, price: 150 },
          ],
          total: 950,
          paymentType: "Card",
          orderTime: "15.01.2025 16:00",
        },
        {
          id: 9,
          waiterName: "Эльмира",
          items: [
            { name: "Блинчики", quantity: 5, price: 100 },
            { name: "Сок яблочный", quantity: 3, price: 60 },
          ],
          total: 710,
          paymentType: "Cash",
          orderTime: "15.01.2025 16:25",
        },
        {
          id: 10,
          waiterName: "Рустам",
          items: [
            { name: "Котлеты", quantity: 2, price: 200 },
            { name: "Пюре картофельное", quantity: 2, price: 100 },
          ],
          total: 600,
          paymentType: "Card",
          orderTime: "15.01.2025 16:50",
        },
        {
          id: 11,
          waiterName: "Асел",
          items: [
            { name: "Салат Винегрет", quantity: 1, price: 150 },
            { name: "Чай зелёный", quantity: 2, price: 40 },
          ],
          total: 230,
          paymentType: "Cash",
          orderTime: "15.01.2025 17:05",
        },
        {
          id: 12,
          waiterName: "Нурбек",
          items: [
            { name: "Харчо", quantity: 1, price: 200 },
            { name: "Компот", quantity: 1, price: 50 },
          ],
          total: 250,
          paymentType: "Card",
          orderTime: "15.01.2025 17:30",
        },
        {
          id: 13,
          waiterName: "Жанара",
          items: [
            { name: "Шашлык", quantity: 4, price: 250 },
            { name: "Салат Оливье", quantity: 2, price: 180 },
          ],
          total: 1360,
          paymentType: "Cash",
          orderTime: "15.01.2025 17:50",
        },
        {
          id: 14,
          waiterName: "Айнура",
          items: [
            { name: "Плов", quantity: 2, price: 300 },
            { name: "Лимонад", quantity: 2, price: 80 },
          ],
          total: 760,
          paymentType: "Card",
          orderTime: "15.01.2025 18:00",
        },
        {
          id: 15,
          waiterName: "Аман",
          items: [
            { name: "Манты", quantity: 3, price: 220 },
            { name: "Чай", quantity: 1, price: 40 },
          ],
          total: 700,
          paymentType: "Cash",
          orderTime: "15.01.2025 18:20",
        },
        {
          id: 16,
          waiterName: "Марат",
          items: [
            { name: "Бифштекс", quantity: 3, price: 400 },
            { name: "Гарнир", quantity: 2, price: 150 },
          ],
          total: 1450,
          paymentType: "Card",
          orderTime: "15.01.2025 18:40",
        },
        {
          id: 17,
          waiterName: "Азамат",
          items: [
            { name: "Суп с лапшой", quantity: 1, price: 180 },
            { name: "Салат Цезарь", quantity: 1, price: 250 },
          ],
          total: 430,
          paymentType: "Cash",
          orderTime: "15.01.2025 19:00",
        },
        {
          id: 18,
          waiterName: "Айгуль",
          items: [
            { name: "Самса", quantity: 4, price: 50 },
            { name: "Чай чёрный", quantity: 2, price: 40 },
          ],
          total: 280,
          paymentType: "Cash",
          orderTime: "15.01.2025 19:20",
        },
        {
          id: 19,
          waiterName: "Бакыт",
          items: [
            { name: "Шашлык", quantity: 3, price: 250 },
            { name: "Компот", quantity: 3, price: 50 },
          ],
          total: 900,
          paymentType: "Card",
          orderTime: "15.01.2025 19:40",
        },
        {
          id: 20,
          waiterName: "Эльмира",
          items: [
            { name: "Плов", quantity: 5, price: 300 },
            { name: "Салат Винегрет", quantity: 3, price: 150 },
          ],
          total: 1950,
          paymentType: "Cash",
          orderTime: "15.01.2025 20:00",
        },
      ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">История заказов (последние 24 часа)</h1>
      <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Официант</th>
              <th className="p-3 border">Блюда</th>
              <th className="p-3 border">Сумма</th>
              {/* <th className="p-3 border">Оплата</th> */}
              <th className="p-3 border">Время заказа</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.waiterName}</td>
                <td className="p-3 border">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.name} x{item.quantity} ({item.price * item.quantity} сом)
                    </div>
                  ))}
                </td>
                <td className="p-3 border">{order.total} сом</td>
                {/* <td className="p-3 border">{order.paymentType}</td> */}
                <td className="p-3 border">{order.orderTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
