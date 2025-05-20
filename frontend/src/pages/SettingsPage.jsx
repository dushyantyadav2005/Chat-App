import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-auto container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-8">
        {/* Theme Selection Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Theme Settings</h2>
            <p className="text-sm text-base-content/80">
              Choose a theme that matches your style
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2 p-3 rounded-xl transition-all
                  border-2 border-transparent
                  ${theme === t ? "ring-2 ring-primary ring-offset-2" : "hover:border-base-300"}
                  focus:outline-none focus:ring-2 focus:ring-primary
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-16 w-full rounded-lg overflow-hidden shadow-sm" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded-sm bg-primary"></div>
                    <div className="rounded-sm bg-secondary"></div>
                    <div className="rounded-sm bg-accent"></div>
                    <div className="rounded-sm bg-neutral"></div>
                  </div>
                  {theme === t && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="text-white w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Live Preview</h3>
            <p className="text-sm text-base-content/80">
              See how your selected theme looks in a chat interface
            </p>
          </div>
          
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg" data-theme={theme}>
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto">
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-xl p-3 shadow-sm
                            ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-1.5
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0 px-3">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;