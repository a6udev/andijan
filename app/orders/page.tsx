"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  // results: any;
}

interface CartItem extends MenuItem {
  quantity: number;
  // results: any;
}

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("https://baxt.prolabagency.com/api/v1/products/");
        setMenuItems(response.data.results);
      } catch (error) {
        alert("Ошибка загрузки меню.");
      }
    };
    fetchMenuItems();
  }, []);

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

  const handlePrintOrder = async () => {
    if (cart.length === 0) {
      alert("Корзина пуста!");
      return;
    }
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Токен не найден. Пожалуйста, войдите в систему.");
        return;
      }
  
      const response = await axios.post(
        "https://baxt.prolabagency.com/api/v1/orders/",
        {
          products: cart.map((item) => ({
            product: item.id,
            quantity: item.quantity,
          })),
        },
        // {
        //   product: cart[0].id,
        //   quantity: cart[0].quantity
        // },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      alert("Заказ успешно отправлен!");
      setCart([]); 
      setSelectedItems([]); 
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      alert("Произошла ошибка при отправке заказа.");
    } finally {
      setLoading(false);
    }
  };
  

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-gray-200 p-6 flex-col lg:flex-row">
    {/* Menu Section */}
    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {menuItems?.map((item: any) => (
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
    <div className="w-full sm:w-1/3 bg-gray-400 p-4 rounded-lg mt-6 sm:mt-0 sm:ml-[10px]">
      <h2 className="font-bold text-xl mb-4">Корзина</h2>
      <div className="space-y-2">
        {cart?.map((item) => (
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
                className="bg-red-500 text-white py-[5px] px-[15px] rounded-lg"
              >
                -
              </button>
              <span className="w-[20px] flex justify-center items-center">{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="bg-green-500 text-white  py-[5px] px-[15px] rounded-lg"
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
      <button
        className="w-full bg-red-500 text-white py-2 rounded-lg mt-4"
        onClick={handlePrintOrder}
        disabled={loading}
      >
        {loading ? "Отправка..." : "Печать чека"}
      </button>
    </div>
  </div>
  
  );
}
// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface MenuItem {
//   id: number;
//   name: string;
//   price: number;
//   available: boolean; // Указывает, доступно ли блюдо
// }

// interface CartItem extends MenuItem {
//   quantity: number;
// }

// export default function OrderPage() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [selectedItems, setSelectedItems] = useState<number[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await axios.get("https://baxt.prolabagency.com/api/v1/products/");
//         const items = response.data.results.map((item: any) => ({
//           ...item,
//           available: true, // По умолчанию все блюда доступны
//         }));
//         setMenuItems(items);
//       } catch (error) {
//         alert("Ошибка загрузки меню.");
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   const toggleAvailability = (id: number) => {
//     setMenuItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, available: !item.available } : item
//       )
//     );
//   };

//   const addToCart = (item: MenuItem) => {
//     if (!item.available) {
//       alert(`${item.name} недоступно для заказа.`);
//       return;
//     }
//     const existingItem = cart.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       setCart(
//         cart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//     if (!selectedItems.includes(item.id)) {
//       setSelectedItems([...selectedItems, item.id]);
//     }
//   };

//   const removeFromCart = (item: MenuItem) => {
//     const existingItem = cart.find((cartItem) => cartItem.id === item.id);
//     if (existingItem && existingItem.quantity === 1) {
//       setCart(cart.filter((cartItem) => cartItem.id !== item.id));
//       setSelectedItems(selectedItems.filter((id) => id !== item.id));
//     } else if (existingItem) {
//       setCart(
//         cart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity - 1 }
//             : cartItem
//         )
//       );
//     }
//   };

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="flex min-h-screen bg-gray-200 p-6 flex-col lg:flex-row">
//       {/* Menu Section */}
//       <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {menuItems?.map((item) => (
//           <div
//             key={item.id}
//             className={`p-4 text-center rounded-lg ${
//               selectedItems.includes(item.id)
//                 ? "bg-red-400"
//                 : item.available
//                 ? "bg-gray-300 hover:bg-red-400 transition-all duration-300 relative"
//                 : "bg-gray-500 cursor-not-allowed"
//             }`}
//             onClick={() => addToCart(item)}
//           >
//             <h3 className="font-bold">{item.name}</h3>
//             <p>{item.price} сом</p>
//             {/* {!item.available && <p className="text-sm text-red-700 ">Недоступно</p>}
//             <button
//               className="mt-2  bg-blue-500 text-white py-2 rounded-lg absolute top-0"
//               onClick={() => toggleAvailability(item.id)}
//             >
//               {item.available ? "Отметить как закончившееся" : "Сделать доступным"}
//             </button> */}
//           </div>
//         ))}
//       </div>

//       {/* Cart Section */}
//       <div className="w-full sm:w-1/3 bg-gray-400 p-4 rounded-lg mt-6 sm:mt-0 sm:ml-[10px]">
//         <h2 className="font-bold text-xl mb-4">Корзина</h2>
//         <div className="space-y-2">
//           {cart?.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center bg-gray-200 p-2 rounded-lg"
//             >
//               <div>
//                 <h3 className="font-bold">{item.name}</h3>
//                 <p>{item.price} сом</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => removeFromCart(item)}
//                   className="bg-red-500 text-white py-[5px] px-[15px] rounded-lg"
//                 >
//                   -
//                 </button>
//                 <span className="w-[20px] flex justify-center items-center">{item.quantity}</span>
//                 <button
//                   onClick={() => addToCart(item)}
//                   className="bg-green-500 text-white py-[5px] px-[15px] rounded-lg"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4">
//           <p className="font-bold text-lg">Итого: {total} сом</p>
//         </div>
//         <button
//           className="w-full bg-red-500 text-white py-2 rounded-lg mt-4"
//           disabled={loading}
//         >
//           {loading ? "Отправка..." : "Оформить заказ"}
//         </button>
//       </div>
//     </div>
//   );
// }
