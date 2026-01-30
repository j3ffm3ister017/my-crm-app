import React from 'react';
import { 
  Building2, Globe, User, MapPin, DollarSign, Linkedin, Twitter, 
  ChevronDown, ExternalLink, Plus, MoreHorizontal, Calendar, 
  FileText, Paperclip, Mail, Clock, CheckSquare, Target, BarChart3, Check
} from 'lucide-react';
import Badge from './Badge';

interface CompanyDetailProps {
  onOpenTask: () => void;
  taskStatus: 'urgent' | 'waiting';
  reminderTime: string | null;
  isTaskComplete: boolean;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ onOpenTask, taskStatus, reminderTime, isTaskComplete }) => {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 ml-64 flex flex-col">
       {/* Top Breadcrumb/Header */}
       <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm text-gray-600">
             <Building2 size={16} />
             <span>Merivale</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-100">
               <Plus size={14} />
               Create Record
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-100">
               <Plus size={14} />
               New Record
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
               <ChevronDown size={16} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
               <div className="flex items-center gap-1 text-xs border border-gray-300 rounded px-1.5 py-0.5">
                  <span className="font-mono">:</span>
                  <span className="font-mono">K</span>
               </div>
            </button>
          </div>
       </div>

       <div className="flex flex-1 overflow-hidden">
          {/* Left Column: Profile */}
          <div className="w-[340px] border-r border-gray-200 bg-white overflow-y-auto p-6">
             {/* Logo & Name */}
             <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center text-white mb-4 shadow-sm">
                   <span className="font-serif italic text-4xl">M</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Merivale</h1>
                <p className="text-sm text-gray-500">Created on 24/11/2025</p>
             </div>

             {/* Details List */}
             <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-400 w-24">
                      <Globe size={16} />
                      <span>URL</span>
                   </div>
                   <div className="flex-1 text-right">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">merivale.com</span>
                   </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-400 w-24">
                      <User size={16} />
                      <span>Account O...</span>
                   </div>
                   <div className="flex-1 text-right flex items-center justify-end gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-[10px]">JM</div>
                      <span className="text-gray-900">Jordan Mitchell</span>
                   </div>
                </div>

                <div className="flex items-start justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-400 w-24 pt-0.5">
                      <MapPin size={16} />
                      <span>Address</span>
                   </div>
                   <div className="flex-1 text-right">
                      <span className="text-gray-700 block max-w-[180px] ml-auto">320-330 George Street, Sydney...</span>
                   </div>
                </div>

                 <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-400 w-24">
                      <Target size={16} />
                      <span>ICP</span>
                   </div>
                   <div className="flex-1 text-right">
                      <span className="text-gray-900">✓ True</span>
                   </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-400 w-24">
                      <DollarSign size={16} />
                      <span>Revenue</span>
                   </div>
                   <div className="flex-1 text-right">
                      <span className="text-gray-900">$600 million</span>
                   </div>
                </div>

                 <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-400 w-24">
                      <Linkedin size={16} />
                      <span>Linkedin</span>
                   </div>
                   <div className="flex-1 text-right">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 truncate max-w-[150px] inline-block align-bottom">linkedin.com/company/...</span>
                   </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-gray-400 w-24">
                      <Twitter size={16} />
                      <span>Twitter</span>
                   </div>
                   <div className="flex-1 text-right">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">@merivale</span>
                   </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer hover:text-gray-600">
                   <ChevronDown size={14} />
                   <span>More (12)</span>
                </div>
             </div>

             <hr className="border-gray-100 mb-6" />

             {/* Opportunities */}
             <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Opportunities</h3>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                   <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-[10px]">M</div>
                   <span className="text-sm text-gray-700">Merivale QV29 station deal</span>
                </div>
             </div>

             <hr className="border-gray-100 mb-6" />

             {/* People */}
             <div className="mb-6">
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="text-sm font-semibold text-gray-900">People</h3>
                   <span className="text-xs text-gray-400">All (12)</span>
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                       <img src="https://picsum.photos/30/30?random=1" alt="Aria" className="w-6 h-6 rounded-full" />
                       <span className="text-sm text-gray-700">Aria Chen</span>
                    </div>
                     <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                       <img src="https://picsum.photos/30/30?random=2" alt="Justin" className="w-6 h-6 rounded-full" />
                       <span className="text-sm text-gray-700">Justin Hemmes</span>
                    </div>
                 </div>
             </div>
          </div>

          {/* Right Main Column: Activity Stream */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden">
             {/* Tabs */}
             <div className="border-b border-gray-200 px-6 flex items-center gap-6">
                <button className="py-4 border-b-2 border-gray-900 text-gray-900 font-medium text-sm flex items-center gap-2">
                   <Clock size={16} /> Activity
                </button>
                <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
                   <BarChart3 size={16} /> Timeline
                </button>
                <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
                   <CheckSquare size={16} /> Tasks
                </button>
                 <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
                   <FileText size={16} /> Notes
                </button>
                 <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
                   <Paperclip size={16} /> Files
                </button>
                 <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
                   <Mail size={16} /> Emails
                </button>
                 <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
                   <Calendar size={16} /> Calendar
                </button>
             </div>

             {/* Activity Content */}
             <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
                <div className="mb-6">
                   <h2 className="text-sm font-semibold text-gray-900 mb-1">Activity</h2>
                   
                   {!isTaskComplete && (
                   <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-600 mb-4">Urgent Tasks</h3>
                      
                      {/* Task Card 1 (Interaction Target) */}
                      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-6 max-w-2xl">
                         <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white text-xs font-serif italic">M</div>
                               <span className="font-medium text-gray-900">Merivale QV29 Station Deal</span>
                            </div>
                            <span className="text-xs text-gray-400">20m ago</span>
                         </div>
                         
                         {/* Dynamic Badges based on Status */}
                         <div className="flex items-center gap-2 mb-4">
                            <Badge type="tasks" text="Tasks" />
                            {taskStatus === 'urgent' && !reminderTime ? (
                              <>
                                <Badge type="urgent" text="Urgent" />
                                <Badge type="urgent" text="Due 5:00PM today" />
                              </>
                            ) : taskStatus === 'waiting' ? (
                              <Badge type="waiting" text="Waiting" />
                            ) : null}
                            {/* Reminder Badge Logic */}
                            {reminderTime && taskStatus === 'urgent' && (
                                <>
                                    <Badge type="urgent" text="Urgent" />
                                    <Badge type="urgent" text="Due 5:00PM today" />
                                    <Badge type="reminder" text={`Check at ${reminderTime}`} />
                                </>
                            )}
                         </div>

                         <div className="border border-gray-100 bg-gray-50 rounded-md p-3 flex items-start gap-3 mb-4">
                            <div className="mt-0.5 min-w-[16px]">
                                <div className="w-4 h-4 border-2 border-indigo-400 rounded bg-white"></div>
                            </div>
                            <p className="text-sm text-gray-800">
                               Email specifications for installation of QV29 charging station to Aria Chen
                            </p>
                         </div>
                         <div className="flex items-center gap-3">
                            <button 
                                onClick={onOpenTask}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                            >
                                <ExternalLink size={14} />
                                Go to task
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
                               <FileText size={14} />
                               View Deal
                            </button>
                         </div>
                      </div>
                   </div>
                   )}

                   <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-600 mb-4">Important</h3>
                      
                      {/* Task Card 2 */}
                      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-6 max-w-2xl">
                         <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white text-xs font-serif italic">M</div>
                               <span className="font-medium text-gray-900">Merivale QV29 Station Deal</span>
                            </div>
                            <span className="text-xs text-gray-400">20m ago</span>
                         </div>
                         <div className="flex items-center gap-2 mb-4">
                            <Badge type="tasks" text="Tasks" />
                            <Badge type="important" text="Important" />
                            <Badge type="due" text="Due 12/02/2026" />
                         </div>
                         <div className="border border-gray-100 bg-gray-50 rounded-md p-3 flex items-start gap-3 mb-4">
                            <div className="mt-0.5 min-w-[16px]">
                                <div className="w-4 h-4 border-2 border-indigo-400 rounded bg-white"></div>
                            </div>
                            <p className="text-sm text-gray-800">
                               Email final quote to Justin Hemmes (CEO of Merivale)
                            </p>
                         </div>
                         <div className="flex items-center gap-3">
                            <button 
                                onClick={onOpenTask}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
                            >
                               <ExternalLink size={14} />
                               Go to task
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
                               <FileText size={14} />
                               View Deal
                            </button>
                         </div>
                      </div>
                   </div>

                   {isTaskComplete && (
                     <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-600 mb-4">Completed</h3>
                        
                        {/* Task Card 1 (Completed State) */}
                        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-6 max-w-2xl opacity-75">
                           <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white text-xs font-serif italic">M</div>
                                 <span className="font-medium text-gray-900">Merivale QV29 Station Deal</span>
                              </div>
                              <span className="text-xs text-gray-400">20m ago</span>
                           </div>
                           
                           <div className="flex items-center gap-2 mb-4">
                              <Badge type="tasks" text="Tasks" />
                              <Badge type="urgent" text="Urgent" />
                              <Badge type="urgent" text="Due 5:00PM today" />
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                <Check size={12} className="mr-1" />
                                Completed
                              </span>
                           </div>

                           <div className="border border-gray-100 bg-gray-50 rounded-md p-3 flex items-start gap-3 mb-4">
                              <div className="mt-0.5 min-w-[16px]">
                                  <div className="w-4 h-4 border-2 border-green-400 rounded bg-green-50 flex items-center justify-center">
                                     <Check size={10} className="text-green-600" />
                                  </div>
                              </div>
                              <p className="text-sm text-gray-600 line-through">
                                 Email specifications for installation of QV29 charging station to Aria Chen
                              </p>
                           </div>
                           <div className="flex items-center gap-3">
                              <button 
                                  onClick={onOpenTask}
                                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                              >
                                  <ExternalLink size={14} />
                                  Go to task
                              </button>
                              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
                                 <FileText size={14} />
                                 View Deal
                              </button>
                           </div>
                        </div>
                     </div>
                   )}

                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default CompanyDetail;