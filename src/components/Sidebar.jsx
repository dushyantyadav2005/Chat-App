// Sidebar.jsx
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = ({ onClose }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => { getUsers(); }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="bg-base-100 h-full w-full lg:w-64 shadow-lg lg:shadow-none border-r border-base-300">
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-medium text-lg">Contacts</span>
        </div>
        <button 
          className="btn btn-ghost btn-sm lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-65px)]">
        {users.map(user => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 p-3 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-200" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-base-100" />
              )}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{user.fullName}</p>
              <p className="truncate text-xs text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
        {users.length === 0 && (
          <div className="text-center p-4 text-zinc-500">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;