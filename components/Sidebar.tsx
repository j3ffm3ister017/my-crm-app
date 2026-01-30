import React from 'react';
import { 
  Search, Settings, Inbox, Building2, Users, 
  Target, CheckSquare, FileText, BarChart3, 
  Workflow, Database, CreditCard, BookOpen 
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const menuItems = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 9 },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'people', label: 'People', icon: Users },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'sales_dashboard', label: 'Sales Dashboard', icon: BarChart3, highlight: true },
  ];

  return (
    <div className="w-64 h-screen bg-[#f3f4f6] border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10 overflow-y-auto">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-gray-800 text-lg">
          <div className="w-6 h-6 bg-black rounded text-white flex items-center justify-center text-xs">V</div>
          VenueTech
        </div>
        <span className="text-gray-400 text-xs">v1.0</span>
      </div>

      {/* Search & Settings */}
      <div className="px-3 mb-4 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
          <Search size={16} />
          <span className="text-sm">Search</span>
          <span className="ml-auto text-xs bg-gray-200 px-1.5 rounded text-gray-500">/</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
          <Settings size={16} />
          <span className="text-sm">Settings</span>
        </div>
      </div>

      {/* Workspace Label */}
      <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Workspace
      </div>

      {/* Main Menu */}
      <div className="px-3 space-y-0.5 mb-6">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors
              ${item.id === 'sales_dashboard' ? 'text-yellow-700' : ''}
              ${activeItem === item.id 
                ? 'bg-gray-200 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
          >
            <item.icon size={18} className={item.id === 'sales_dashboard' ? 'text-yellow-500 fill-yellow-500' : ''} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

       {/* Workflows */}
       <div className="px-3 space-y-0.5">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-200/50 rounded-md text-gray-700 text-sm font-medium">
             <div className="flex items-center gap-2">
                <Workflow size={18} className="text-orange-500" />
                Workflows
             </div>
          </div>
          <div className="ml-4 border-l border-gray-300 pl-4 space-y-1 mt-1">
             <div className="py-1.5 text-sm text-gray-500 hover:text-gray-800 cursor-pointer">All Workflows</div>
             <div className="py-1.5 text-sm text-gray-500 hover:text-gray-800 cursor-pointer">Runs</div>
             <div className="py-1.5 text-sm font-medium text-gray-900 bg-gray-200 rounded px-2 -ml-2 cursor-pointer">Versions</div>
          </div>
       </div>

       <div className="mt-auto px-3 py-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer text-sm">
             <BookOpen size={18} className="text-red-500" />
             Documentation
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer text-sm">
             <CreditCard size={18} className="text-indigo-500" />
             Stripe
          </div>
       </div>
    </div>
  );
};

export default Sidebar;
