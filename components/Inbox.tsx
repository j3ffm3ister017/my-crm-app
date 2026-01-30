import React from 'react';
import { Filter, ArrowUpDown, MoreHorizontal, Plus } from 'lucide-react';
import Badge from './Badge';
import { ViewState } from '../types';

interface InboxProps {
  onNavigate: (view: ViewState) => void;
}

const Inbox: React.FC<InboxProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-8 ml-64">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
           <h1 className="text-xl font-semibold text-gray-900">Inbox</h1>
           <span className="text-gray-400">/</span>
           <div className="flex items-center gap-1 text-gray-600 font-medium">
             <span>My Inbox</span>
             <span className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-xs">9</span>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
             <Filter size={16} />
             Filter
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
             <ArrowUpDown size={16} />
             Sort
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
             <MoreHorizontal size={16} />
             Options
           </button>
           <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 flex items-center gap-2">
              <Plus size={16} />
              New Record
           </button>
           <div className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded bg-white text-xs text-gray-500">
             <span className="font-mono">⌘</span>
             <span className="font-mono">K</span>
           </div>
        </div>
      </div>

      {/* Urgent & Important Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-600 mb-4">Urgent & Important</h2>
        <div 
          onClick={() => onNavigate(ViewState.COMPANY_DETAIL)}
          className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer max-w-2xl group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white">
                <span className="font-serif italic text-lg">M</span>
              </div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Merivale</span>
            </div>
            <span className="text-xs text-gray-400">20m ago</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge type="tasks" text="Tasks" />
            <Badge type="urgent" text="Urgent" />
            <Badge type="urgent" text="Due 5:00PM today" />
          </div>

          <div className="border border-gray-100 bg-gray-50/50 rounded-md p-3 flex items-start gap-3">
            <div className="mt-0.5 min-w-[16px]">
              <div className="w-4 h-4 border-2 border-indigo-400 rounded bg-white"></div>
            </div>
            <p className="text-sm text-gray-800">
              Email specifications for installation of QV29 charging station to Aria Chen
            </p>
          </div>
        </div>
      </div>

      {/* Due Soon Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-600 mb-4">Due Soon</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm max-w-2xl">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-900 rounded flex items-center justify-center text-white">
                <span className="font-bold text-xs">A</span>
              </div>
              <span className="font-medium text-gray-900">Accor</span>
            </div>
            <span className="text-xs text-gray-400">14/01/2026</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge type="due" text="Due 01/02/2026" />
          </div>

          <div className="space-y-2">
            <div className="border border-gray-100 bg-gray-50/50 rounded-md p-3 flex items-start gap-3">
              <div className="mt-0.5 min-w-[16px]">
                <div className="w-4 h-4 border-2 border-indigo-400 rounded bg-white"></div>
              </div>
              <p className="text-sm text-gray-800">
                Provide product specifications to Mark Wilson (CX director)
              </p>
            </div>
             <div className="border border-gray-100 bg-gray-50/50 rounded-md p-3 flex items-start gap-3">
              <div className="mt-0.5 min-w-[16px]">
                <div className="w-4 h-4 border-2 border-indigo-400 rounded bg-white"></div>
              </div>
              <p className="text-sm text-gray-800">
                Send contract to Tom Kade (CEO of Accor Australia)
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* Upcoming Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-600 mb-4">Upcoming</h2>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
             {/* Card 1 */}
             <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-700 rounded flex items-center justify-center text-white font-bold text-xs">
                        QIC
                    </div>
                    <span className="font-medium text-gray-900">QIC</span>
                    </div>
                    <span className="text-xs text-gray-400">14/01/2026</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <Badge type="due" text="Due 10/02/2026" />
                </div>
                <div className="border border-gray-100 bg-gray-50/50 rounded-md p-3 flex items-start gap-3">
                    <div className="mt-0.5 min-w-[16px]">
                        <div className="w-4 h-4 border-2 border-indigo-400 rounded bg-white"></div>
                    </div>
                    <p className="text-sm text-gray-800">
                        Provide pricing to QIC stakeholders
                    </p>
                </div>
             </div>

             {/* Card 2 */}
             <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold">
                       W
                    </div>
                    <span className="font-medium text-gray-900">Westfield Group</span>
                    </div>
                    <span className="text-xs text-gray-400">14/01/2026</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <Badge type="due" text="Due 25/02/2026" />
                </div>
                <div className="border border-gray-100 bg-gray-50/50 rounded-md p-3 flex items-start gap-3">
                    <div className="mt-0.5 min-w-[16px]">
                        <div className="w-4 h-4 border-2 border-indigo-400 rounded bg-white"></div>
                    </div>
                    <p className="text-sm text-gray-800">
                        Send XV50 charging station brochure to Michelle Tyrrell (Head of customer)
                    </p>
                </div>
             </div>
        </div>
      </div>

    </div>
  );
};

export default Inbox;