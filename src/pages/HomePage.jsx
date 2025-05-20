
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile || !selectedUser);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [selectedUser]);

  return (
    <div className="h-screen bg-base-200 flex">

      {/* Sidebar */}
      <div className={`${showSidebar ? 'block' : 'hidden'} ${isMobile ? 'fixed inset-0 z-40' : 'w-64 flex-shrink-0'}`}>
        <Sidebar onClose={() => setShowSidebar(false)} />
      </div>

      {/* Chat Area */}
      <div className={`flex-1 ${isMobile ? 'fixed inset-0' : ''}`}>
        {selectedUser ? (
          <ChatContainer />
        ) : isMobile ? (
          <div className="h-full flex items-center justify-center bg-base-100">
            <button
              onClick={() => setShowSidebar(true)}
              className="btn btn-primary"
            >
              Open Contacts
            </button>
          </div>
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
};

export default HomePage;