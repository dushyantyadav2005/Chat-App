import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    await sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    removeImage();
  };

  return (
    <div className="p-2 sm:p-4 w-full bg-base-100">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 bg-base-300 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-circle btn-sm sm:btn-md p-1 text-zinc-500"
          aria-label="Attach image"
        >
          <Image className="w-5 h-5" />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <input
          type="text"
          className="flex-1 input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle btn-sm sm:btn-md"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;