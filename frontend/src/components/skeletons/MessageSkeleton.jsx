import React from 'react';

const MessageSkeleton = () => {
  const skeletonMessages = Array.from({ length: 6 }, (_, idx) => ({
    id: idx,
    isIncoming: idx % 2 === 0,
    width: `${Math.min(80 + (idx % 4) * 15, 100)}%`,
    maxWidth: idx % 3 === 0 ? '280px' : '220px',
  }));

  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-3 md:space-y-4">
      {skeletonMessages.map(msg => (
        <div
          key={msg.id}
          className={`chat ${msg.isIncoming ? 'chat-start' : 'chat-end'} animate-pulse`}
        >
          <div className="chat-image avatar">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200/80" />
          </div>
          <div className="chat-bubble bg-transparent p-0">
            <div
              className="rounded-lg bg-gray-200/80"
              style={{ width: msg.width, maxWidth: msg.maxWidth, height: '3.5rem' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;