// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Define the structure of product data
// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// // Define the structure of an order item
// interface Order {
//   total: any;
//   created_at: any;
//   products: any;
//   user: any;
//   id: number;
//   product: Product;
//   quantity: number;
// }

// const API_BASE_URL = "https://baxt.prolabagency.com/api/v1"; 

// const OrderProducts: React.FC = () => {
//   const [orderProducts, setOrderProducts] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchOrderProducts = async (): Promise<void> => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found");

//       const response = await axios.get<{ results: Order[] }>(
//         `${API_BASE_URL}/orders/`,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );

//       setOrderProducts(response.data.results);
//     } catch (err: any) {
//       setError(err.response?.data?.detail || "Failed to fetch order products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderProducts();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   console.log(orderProducts);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">
//         История заказов
//       </h1>
//       <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="p-3 border">#</th>
//               <th className="p-3 border">Официант или Кассир</th>
//               <th className="p-3 border">Блюда</th>
//               <th className="p-3 border">Сумма</th>
//               {/* <th className="p-3 border">Оплата</th> */}
//               <th className="p-3 border">Время заказа</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderProducts.map((order) => (
//               <tr key={order.id} className="hover:bg-gray-100">
//                 <td className="p-3 border">{order.id}</td>
//                 <td className="p-3 border">{order.user.first_name}</td>
//                 <td className="p-3 border">
//                   {order.products.map((item: any, idx: number) => (
//                     <div key={idx}>
//                       {item.product.name} x{item.quantity} (
//                       {item.product.price * item.quantity} сом)
//                     </div>
//                   ))}
//                 </td>
//                 <td className="p-3 border">
//                   {order.products.reduce(
//                     (total: number, item: any) =>
//                       total + item.product.price * item.quantity,
//                     0 // Начальное значение суммы
//                   )}{" "}
//                   сом
//                 </td>

//                 {/* <td className="p-3 border">{order.paymentType}</td> */}
//                 <td className="p-3 border">
//                   {new Date(order.created_at).toLocaleString("ru-RU", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderProducts;
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the structure of product data
interface Product {
  id: number;
  name: string;
  price: number;
}

// Define the structure of an order item
interface Order {
  total: any;
  created_at: string;
  products: any;
  user: any;
  id: number;
  product: Product;
  quantity: number;
}

const API_BASE_URL = "https://baxt.prolabagency.com/api/v1"; 

const OrderProducts: React.FC = () => {
  const [orderProducts, setOrderProducts] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderProducts = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get<{ results: Order[] }>(
        `${API_BASE_URL}/orders/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setOrderProducts(response.data.results);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch order products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Группируем заказы по дате
  const dailyTotals = orderProducts.reduce((acc: any, order) => {
    const date = new Date(order.created_at).toLocaleDateString("ru-RU");
    const total = order.products.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );

    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += total;

    return acc;
  }, {});

  // Преобразуем объект в массив для отображения
  const dailyTotalsArray = Object.keys(dailyTotals).map(date => ({
    date,
    total: dailyTotals[date],
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        История заказов
      </h1>
      
    

      <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Официант или Кассир</th>
              <th className="p-3 border">Блюда</th>
              <th className="p-3 border">Сумма</th>
              <th className="p-3 border">Время заказа</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="p-3 border">{order.id}</td>
                <td className="p-3 border">{order.user.first_name}</td>
                <td className="p-3 border">
                  {order.products.map((item: any, idx: number) => (
                    <div key={idx}>
                      {item.product.name} x{item.quantity} (
                      {item.product.price * item.quantity} сом)
                    </div>
                  ))}
                </td>
                <td className="p-3 border">
                  {order.products.reduce(
                    (total: number, item: any) =>
                      total + item.product.price * item.quantity,
                    0 // Начальное значение суммы
                  )}{" "}
                  сом
                </td>
                <td className="p-3 border">
                  {new Date(order.created_at).toLocaleString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


        {/* Сумма по дням */}
        <div className="mt-6">
        <h2 className="text-xl font-semibold">Общая сумма по дням</h2>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Дата</th>
              <th className="p-3 border">Общая сумма</th>
            </tr>
          </thead>
          <tbody>
            {dailyTotalsArray.map((day, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-3 border">{day.date}</td>
                <td className="p-3 border">{day.total} сом</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderProducts;
