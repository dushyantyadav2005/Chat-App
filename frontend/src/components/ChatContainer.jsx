import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { formatMessageTime } from '../lib/utlis';

function ChatContainer() {
  const { message, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const endRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
    subscribeToMessages();
    return ()=>unsubscribeFromMessages();
  }, [message]);

  if (isMessagesLoading) {
    return (
      <div className="h-full flex flex-col pt-16"> {/* Added padding for main header */}
        <ChatHeader />
        <MessageSkeleton />
        <div className="sticky bottom-0 bg-base-100 border-t border-base-300">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col pt-16"> {/* Top padding for main header */}
      {/* Chat Header positioned below main header */}
      <div className="sticky top-16 z-40 bg-base-100 border-b border-base-300"> {/* Changed top position */}
        <ChatHeader />
      </div>

      {/* Messages Container with adjusted padding */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 mt-12"> {/* Added margin-top */}
        {message.map(m => (
          <div
            key={m._id}
            className={`chat ${m.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-image avatar">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border overflow-hidden">
                <img
                  src={
                    m.senderId === authUser._id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser.profilePic || '/avatar.png'
                  }
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-[10px] sm:text-xs text-gray-500 ml-1">
                {formatMessageTime(m.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%]">
              {m.image && (
                <img
                  src={m.image}
                  alt="Attachment"
                  className="w-32 sm:w-40 md:w-48 lg:w-64 rounded-md mb-2 object-cover"
                />
              )}
              {m.text && <p className="break-words text-sm sm:text-base">{m.text}</p>}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Sticky Input Container */}
      <div className="sticky bottom-0 bg-base-100 border-t border-base-300">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;