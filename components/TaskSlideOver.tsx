import React, { useState, useEffect } from 'react';
import { X, CheckSquare, Clock, CheckCircle2, Send, Plus, Paperclip, FileText, Check, ChevronDown, Mail } from 'lucide-react';

interface TaskSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkWaiting: () => void;
  onSetReminder: (time: string) => void;
  onTaskComplete: () => void;
}

const SimpleConfetti = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
             <div className="relative w-full h-full">
                {[...Array(30)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute animate-confetti-fall"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-20px`,
                            backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)],
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                            animationDuration: `${Math.random() * 2 + 1.5}s`,
                            animationDelay: `${Math.random() * 1}s`,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    ></div>
                ))}
             </div>
             <style>
                {`
                @keyframes confetti-fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
                }
                .animate-confetti-fall {
                    animation-name: confetti-fall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                `}
             </style>
        </div>
    );
}

const TaskSlideOver: React.FC<TaskSlideOverProps> = ({ isOpen, onClose, onMarkWaiting, onSetReminder, onTaskComplete }) => {
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'details' | 'success-waiting' | 'snooze-input' | 'snooze-success' | 'reply-email' | 'email-sent' | 'task-complete'>('details');
  const [snoozeTime, setSnoozeTime] = useState('');
  const [error, setError] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isEmailAttached, setIsEmailAttached] = useState(false);
  const [emailReplyText, setEmailReplyText] = useState('');

  // Reset view mode when reopened
  useEffect(() => {
    if (isOpen) {
      setViewMode('details');
      setSnoozeTime('');
      setError('');
      setIsEmailAttached(false);
      setShowAttachMenu(false);
      setEmailReplyText('');
    }
  }, [isOpen]);

  const handleMarkWaitingClick = () => {
    setViewMode('success-waiting');
  };

  const handleSnoozeClick = () => {
    setSnoozeTime('');
    setError('');
    setViewMode('snooze-input');
  };

  const handleSetReminderClick = () => {
    onSetReminder(snoozeTime);
    setViewMode('snooze-success');
  };

  const handleReplyClick = () => {
    setViewMode('reply-email');
  }

  const handleSendEmail = () => {
    if (emailReplyText.trim().length > 0) {
        setViewMode('email-sent');
    }
  }

  const handleMarkAsComplete = () => {
    setViewMode('task-complete');
  }

  const handleCloseTab = () => {
    if (viewMode === 'success-waiting') {
        onMarkWaiting();
    } else if (viewMode === 'task-complete') {
        onTaskComplete();
        return; // onTaskComplete handles closing logic
    }
    // For snooze success, the parent App.tsx already has the reminder set. We just close.
    onClose();
  };

  const handleSnoozeTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // "Numerical input only" logic - restrict to digits, colon, space, A, P, M
    if (!/^[\d:\sAPMapm]*$/.test(val)) return;

    setSnoozeTime(val);

    // Validation logic for error state
    // Check for obvious invalid times like 2:60 or 13:00 (if we assume 12h clock based on AM/PM requirement)
    const timeParts = val.match(/^(\d{1,2}):(\d{2,})\s*([APMapm]{0,2})$/);
    if (timeParts) {
        const [_, hours, minutes] = timeParts;
        const h = parseInt(hours, 10);
        const m = parseInt(minutes, 10);
        
        if (h > 12 || h === 0 || m > 59) {
             setError("please enter the time correctly e.g. 2:30PM");
             return;
        }
    }
    
    // Also check for hour validity if just hour is typed
    const hourOnlyMatch = val.match(/^(\d{1,2}):?$/);
    if (hourOnlyMatch) {
       const h = parseInt(hourOnlyMatch[1], 10);
       if (h > 12 || h === 0) {
          setError("please enter the time correctly e.g. 2:30PM");
          return;
       }
    }

    // Clear error if it passes basic checks (incompleteness is handled by button disable)
    setError('');
  };

  const isValidTimeFormat = (time: string) => {
      // Strict regex for enabling the button
      return /^(1[0-2]|0?[1-9]):[0-5][0-9]\s*[AaPp][Mm]$/.test(time);
  }

  // Common Header
  const renderHeader = () => (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0">
        <div className="flex items-center gap-3 text-gray-700">
        <button className="p-1 hover:bg-gray-100 rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1 rounded">
                <CheckSquare size={14} className="text-gray-500" />
            </div>
            <span className="font-medium text-sm">Task</span>
        </div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors">
            <X size={18} />
        </button>
    </div>
  );

  return (
    <>
      {/* Slide Over Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[600px] bg-white border-l border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {renderHeader()}

        {/* Content Area */}
        {viewMode === 'details' && (
          <div className="flex flex-col flex-1 h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-bold text-gray-900 leading-snug mb-8">
                Email specifications for installation of QV29 charging station to Aria Chen
              </h2>

              {/* Fields */}
              <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Linked Deal</h3>
                    <div 
                        onClick={() => setIsDealModalOpen(true)}
                        className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-200 w-fit shadow-sm hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
                    >
                        <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-[10px] font-serif italic">M</div>
                        <span className="text-sm font-medium text-gray-900">Merivale QV29 station deal</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Key Contact</h3>
                    <div className="flex items-center gap-3">
                        <img src="https://picsum.photos/30/30?random=1" className="w-8 h-8 rounded-full border border-gray-100" alt="Aria" />
                        <span className="text-sm font-medium text-gray-900">Aria Chen</span>
                    </div>
                  </div>

                  {/* Email Content Preview */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Email Context</h3>
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                          <p className="text-sm font-bold text-gray-900 mb-1.5">Re: Final questions on the 180-unit rollout</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span className="font-medium text-gray-900">Aria Chen</span>
                                <span className="text-gray-400">&lt;aria.chen@merivale.com&gt;</span>
                            </div>
                            <span className="text-xs text-gray-400">Today, 2:30 PM</span>
                          </div>
                        </div>
                        <div className="p-5 text-sm text-gray-700 leading-relaxed space-y-4">
                          <p>Hi Jordan,</p>
                          <p>Thanks for the revised proposal. We're very close to signing off on this.</p>
                          <p>The team has just a couple of final questions regarding the phased installation timeline and the on-site training for staff at our CBD locations.</p>
                          <p>Could you clarify those points for us?</p>
                          <p>Best,<br/>Aria</p>
                        </div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm shrink-0">
              <button 
                  onClick={handleReplyClick}
                  className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 mb-4 shadow-sm transition-all hover:shadow"
              >
                  <Send size={16} />
                  Reply to Email
              </button>
              <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleSnoozeClick}
                    className="bg-white border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <Clock size={16} className="text-gray-400" />
                    Snooze
                  </button>
                  <button 
                    onClick={handleMarkWaitingClick}
                    className="bg-white border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <CheckCircle2 size={16} className="text-gray-400" />
                    Mark waiting
                  </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'reply-email' && (
            /* Email Reply Screen */
            <div className="flex flex-col flex-1 h-full">
                <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Replying to: Re: Final questions on the 180-unit rollout</h2>
                    
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                        <div className="p-3 border-b border-gray-100 flex items-center gap-2">
                             <span className="text-gray-400 text-sm">To:</span>
                             <div className="bg-gray-100 text-gray-700 text-sm px-2 py-0.5 rounded flex items-center gap-1">
                                Aria Chen <X size={12} className="cursor-pointer" />
                             </div>
                        </div>
                        <div className="flex-1 p-4">
                            <textarea 
                                className="w-full h-full resize-none focus:outline-none text-sm text-gray-800"
                                placeholder="Write your reply..."
                                value={emailReplyText}
                                onChange={(e) => setEmailReplyText(e.target.value)}
                            />
                        </div>
                        {isEmailAttached && (
                             <div className="px-4 pb-2">
                                <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm text-gray-600">
                                    <FileText size={14} />
                                    QV29specs.PDF
                                    <button onClick={() => setIsEmailAttached(false)} className="hover:text-red-500"><X size={14} /></button>
                                </div>
                             </div>
                        )}
                        <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-b-lg">
                            <div className="relative">
                                <button 
                                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                                    className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                                {showAttachMenu && (
                                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                                        <button 
                                            onClick={() => {
                                                setIsEmailAttached(true);
                                                setShowAttachMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <Paperclip size={16} /> Attach File
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-white">
                    <button 
                        onClick={handleSendEmail}
                        disabled={emailReplyText.trim().length === 0}
                        className={`w-full text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${
                            emailReplyText.trim().length === 0 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-[#1e293b] hover:bg-[#0f172a]'
                        }`}
                    >
                        Send <div className="text-[10px] opacity-70">⌘ ↵</div>
                    </button>
                </div>
            </div>
        )}

        {viewMode === 'email-sent' && (
            /* Email Sent Screen */
            <div className="flex flex-col flex-1 h-full">
                <div className="flex-1 p-8">
                     <h2 className="text-lg font-bold text-gray-900 mb-2">Replying to: Re: Final questions on the 180-unit rollout</h2>
                     <hr className="border-gray-100 mb-12 mt-4" />
                     
                     <div className="flex flex-col items-center justify-center h-64">
                        <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                            {/* Paper plane illustration */}
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-yellow-400 rotate-[-10deg] drop-shadow-sm">
                                <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" className="fill-yellow-100"/>
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" className="fill-yellow-300" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Email Sent</h3>
                     </div>

                     <div className="mt-8">
                        <button 
                            onClick={handleMarkAsComplete}
                            className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
                        >
                            <CheckSquare size={16} />
                            Mark as Complete
                        </button>
                     </div>
                </div>
            </div>
        )}

        {viewMode === 'task-complete' && (
            /* Task Complete Screen with Confetti */
            <div className="flex flex-col flex-1 h-full relative">
                <SimpleConfetti />
                
                <div className="flex-1 flex flex-col items-center justify-center p-8 z-20">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                        <Check size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Task Completed</h2>
                </div>
                
                <div className="p-6 border-t border-gray-200 bg-white z-20">
                    <button 
                        onClick={handleCloseTab}
                        className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                        <X size={16} />
                        Close Tab
                    </button>
                </div>
            </div>
        )}

        {viewMode === 'success-waiting' && (
          /* Waiting Success Screen */
          <div className="flex flex-col flex-1 h-full">
             <div className="flex-1 flex flex-col items-center justify-center p-8">
                 <div className="mb-6 relative">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="none" className="drop-shadow-sm">
                       <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" fill="#fbcfe8" />
                       <path d="M4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                       <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                       <line x1="20" y1="8" x2="20" y2="16" stroke="#1e293b" strokeWidth="1.5"/>
                       <circle cx="20" cy="8" r="1.5" fill="#f472b6" stroke="#1e293b" strokeWidth="1.5"/>
                       <path d="M12 11.5c-1.5-2-3.5-1-3.5 1 0 1.5 2 3 3.5 4.5 1.5-1.5 3.5-3 3.5-4.5 0-2-2-3-3.5-1z" fill="#ec4899" stroke="#be185d" strokeWidth="1"/>
                       <line x1="8" y1="16" x2="16" y2="16" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                 </div>
                 <h2 className="text-lg font-medium text-gray-900 mb-2">Task marked as waiting</h2>
             </div>
             
             <div className="p-6 border-t border-gray-200 bg-white">
               <button 
                  onClick={handleCloseTab}
                  className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
               >
                  <X size={16} />
                  Close Tab
               </button>
             </div>
          </div>
        )}

        {viewMode === 'snooze-input' && (
           /* Snooze Input Screen */
           <div className="flex flex-col flex-1 h-full">
              <div className="flex-1 p-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Snooze</h2>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Remind me at:</label>
                      <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock size={16} className="text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            value={snoozeTime}
                            onChange={handleSnoozeTimeChange}
                            placeholder="Tomorrow at 9:00 AM"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${
                                error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                            }`}
                          />
                      </div>
                      {error && (
                         <p className="mt-2 text-xs text-red-600 animate-in slide-in-from-top-1">{error}</p>
                      )}
                  </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-white">
                 <button 
                   onClick={handleSetReminderClick}
                   disabled={snoozeTime.trim().length === 0 || !!error || !isValidTimeFormat(snoozeTime)}
                   className={`w-full text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${
                        snoozeTime.trim().length === 0 || !!error || !isValidTimeFormat(snoozeTime)
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#1e293b] hover:bg-[#0f172a]'
                   }`}
                 >
                   <Clock size={16} />
                   Set Reminder
                 </button>
              </div>
           </div>
        )}

        {viewMode === 'snooze-success' && (
          /* Snooze Success Screen */
          <div className="flex flex-col flex-1 h-full">
             <div className="flex-1 flex flex-col items-center justify-center p-8">
                 <div className="mb-6 relative">
                     {/* Green Version of Mailbox/Calendar illustration */}
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="none" className="drop-shadow-sm">
                       {/* Box */}
                       <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" fill="#d1fae5" />
                       <path d="M4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                       <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                       {/* Checkmark Symbol inside */}
                       <path d="M9 12l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       {/* Slot */}
                       <line x1="8" y1="16" x2="16" y2="16" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                 </div>
                 <h2 className="text-lg font-medium text-gray-900 mb-1">Reminder Set</h2>
                 <p className="text-sm text-gray-500">You will be notified by {snoozeTime}</p>
             </div>
             
             <div className="p-6 border-t border-gray-200 bg-white">
               <button 
                  onClick={handleCloseTab}
                  className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
               >
                  <X size={16} />
                  Close Tab
               </button>
             </div>
          </div>
        )}

      </div>

      {/* Deal Details Modal */}
      {isDealModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsDealModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between sticky top-0 bg-white z-10">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
                    <span className="font-serif italic text-xl">M</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Merivale QV29 Station Deal</h2>
               </div>
               <button 
                  onClick={() => setIsDealModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors border border-transparent hover:border-gray-200"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
               
               {/* Section: The Need */}
               <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">The Need</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Merivale is deploying charging stations across 80+ venues to extend dwell time and capture guests who'd otherwise leave when their battery dies.
                  </p>
               </section>

               {/* Section: Why QV29 Fits */}
               <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Why QV29 Fits</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                     <li>Custom finishes (brass, black, marble) match each venue's aesthetic - from Ivy's art deco to Coogee Pavilion's coastal vibe</li>
                     <li>Universal compatibility - Qi wireless + USB-C/Lightning works with every device</li>
                     <li>Simple install - Standard power outlets only, critical for heritage venues</li>
                     <li>Portfolio support - QV29 manages maintenance across all locations</li>
                  </ul>
               </section>

               {/* Section: The Payoff */}
               <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">The Payoff</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Expected 20-25 minute dwell time increase = additional rounds ordered. Transforms "my phone's dying, let's go" into "let's stay for another."
                  </p>
               </section>

               {/* Section: Key Contacts */}
               <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Key Contacts</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                     
                     {/* Contact 1 */}
                     <div className="flex items-start gap-4">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" 
                          alt="Justin Hemmes" 
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                           <div className="font-semibold text-gray-900">Justin Hemmes - Merivale CEO</div>
                           <div className="text-sm text-gray-500">justin.hemmes@merivale.com</div>
                        </div>
                     </div>

                     {/* Contact 2 */}
                     <div className="flex items-start gap-4">
                         <img 
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80" 
                          alt="Aria Chen" 
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                           <div className="font-semibold text-gray-900">Aria Chen - Head of customer experience</div>
                           <div className="text-sm text-gray-500">aria.chen@merivale.com</div>
                        </div>
                     </div>

                  </div>
               </section>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskSlideOver;