import { Bell, Grip, LogOut, Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-20 w-full bg-white border-b flex items-center px-6">

      <div className="flex w-full items-center justify-between">

        {/* Left */}
        <button
          onClick={toggleSidebar}
          className="ml-20 text-gray-700 hover:text-black"
        >
          <Menu />
        </button>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Bell size={20} />
          <Grip size={20} />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
              CD
            </div>
            <div>
              <p className="text-sm font-medium">Cindy Duran</p>
              <p className="text-xs text-gray-500">Vice President</p>
            </div>
          </div>

          <LogOut size={20} className="cursor-pointer" />
        </div>

      </div>
    </header>
  );
};

export default Header;
