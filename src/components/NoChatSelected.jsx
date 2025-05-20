import React from 'react';
import { MessageSquare, Users, UsersRound } from 'lucide-react';

const NoChatSelected = ({ isMobile, onOpenContacts }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-base-100/30 to-base-200/50">
    <div className="max-w-md text-center space-y-6">
      <div className="flex justify-center animate-float">
        <div className="p-4 bg-primary/10 rounded-2xl">
          <UsersRound className="w-12 h-12 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Welcome to ChatApp
      </h2>
      
      <p className="text-base-content/70 text-sm sm:text-base">
        {isMobile ? (
          <>
            Tap the <Users className="inline w-4 h-4" /> icon to view contacts
            and start chatting!
          </>
        ) : (
          "Select a conversation from the sidebar or create a new Chat to begin"
        )}
      </p>

      {isMobile && (
        <button
          onClick={onOpenContacts}
          className="btn btn-primary mt-6 animate-pulse"
        >
          <Users className="w-5 h-5 mr-2" />
          Open Contacts
        </button>
      )}

      <div className="mt-8 text-xs text-base-content/40">
        {isMobile ? "👆 Tap to get started" : "👈 Click a contact to chat"}
      </div>
    </div>
  </div>
);

export default NoChatSelected;