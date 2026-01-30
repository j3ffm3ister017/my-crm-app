import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Inbox from './components/Inbox';
import CompanyDetail from './components/CompanyDetail';
import TaskSlideOver from './components/TaskSlideOver';
import { ViewState } from './types';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.INBOX);
  
  // Drawer State
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  
  // Data State
  const [taskStatus, setTaskStatus] = useState<'urgent' | 'waiting'>('urgent');
  const [reminderTime, setReminderTime] = useState<string | null>(null);
  const [isTaskComplete, setIsTaskComplete] = useState(false);

  // Active Item logic for sidebar
  const activeSidebarItem = currentView === ViewState.INBOX ? 'inbox' : 'companies';

  const handleMarkWaiting = () => {
    setTaskStatus('waiting');
    setReminderTime(null); // Clear reminder if marked waiting
  };

  const handleSetReminder = (time: string) => {
    setReminderTime(time);
  };

  const handleTaskComplete = () => {
    setIsTaskComplete(true);
    setIsTaskOpen(false); // Close drawer after completion flow
  };

  return (
    <div className="flex bg-[#f3f4f6] min-h-screen font-sans">
      <Sidebar activeItem={activeSidebarItem} />
      
      {currentView === ViewState.INBOX && (
        <Inbox onNavigate={setCurrentView} />
      )}

      {currentView === ViewState.COMPANY_DETAIL && (
        <CompanyDetail 
          onOpenTask={() => setIsTaskOpen(true)} 
          taskStatus={taskStatus}
          reminderTime={reminderTime}
          isTaskComplete={isTaskComplete}
        />
      )}

      {/* Task Slide Over works as an overlay, independent of view but logically tied to Company */}
      <TaskSlideOver 
        isOpen={isTaskOpen} 
        onClose={() => setIsTaskOpen(false)}
        onMarkWaiting={handleMarkWaiting}
        onSetReminder={handleSetReminder}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};

export default App;