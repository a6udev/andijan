// import AcmeLogo from "@/app/ui/acme-logo";
// import { ArrowRightIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

// export default function Page() {
//   return (
//     <main className="flex min-h-screen flex-col p-6">
//       <div className="flex flex-col justify-center items-center mt-[30px]">
//         <h1 className="text-[40px] font-[700]">Андижан Кафе</h1>
//         <p>Автомазация Кафе</p>
//       </div>

//     </main>
//   );
// }
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-3ы bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-md p-4">
        <div className="flex items-center space-x-4">
          <AcmeLogo />
          <h1 className="text-xl font-bold">Андижан Кафе</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/allOrders" className="text-gray-700 hover:text-blue-500">
               История заказов
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-[230px]">
        <h2 className="text-3xl font-bold mb-4">Автоматизация Кафе</h2>
        <p className="text-gray-600 text-center max-w-xl">
          Добро пожаловать в систему автоматизации кафе! Здесь вы сможете управлять заказами, обновлять меню,
          отслеживать продажи и многое другое.
        </p>
        <div className="mt-8 flex space-x-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center space-x-2 hover:bg-green-600 transition">
            <span>Заказы</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      {/* <section className="mt-12 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Функции</h3>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <span className="bg-blue-100 text-blue-500 rounded-full p-2">
              <ArrowRightIcon className="w-5 h-5" />
            </span>
            <span>Добавление и редактирование меню</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="bg-green-100 text-green-500 rounded-full p-2">
              <ArrowRightIcon className="w-5 h-5" />
            </span>
            <span>Обработка заказов в реальном времени</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="bg-yellow-100 text-yellow-500 rounded-full p-2">
              <ArrowRightIcon className="w-5 h-5" />
            </span>
            <span>Анализ продаж и доходов</span>
          </li>
        </ul>
      </section> */}

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 p-4 text-center text-gray-600">
        © 2025 Андижан Кафе. Все права защищены. 
      </footer>
    </main>
  );
}
