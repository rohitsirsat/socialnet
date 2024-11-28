import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiLoader } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, ImageIcon, TagIcon, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/api";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("content", content);

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    images.forEach((image) => {
      formData.append("images", image); // Must match 'name' in upload.fields
    });

    await apiClient
      .post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      })
      .then((res) => {
        toast({
          title: "Post created successfully",
          description:
            res.data.message || "Your post has been created successfully",
        });
        setIsLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Post creation failed",
          description:
            err.response?.data?.message ||
            "Failed to create post. Please try again.",
        });
        setIsLoading(false);
      });
    setIsOpen(false);
    resetForm();
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const resetForm = () => {
    setContent("");
    setTags([]);
    setImages([]);
    setCurrentTag("");
  };

  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-9/12 text-white font-bold py-6 rounded-full text-lg">
          Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1 min-h-[100px]">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="w-full min-h-[100px] text-xl border-none focus:ring-0 resize-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
              >
                <TagIcon className="w-4 h-4 mr-1" />
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add a tag"
              className="flex-grow"
            />
            <Button type="button" onClick={handleAddTag} size="sm">
              Add Tag
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="w-6 h-6 text-blue-500" />
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="w-6 h-6 text-blue-500" />
              </button>
            </div>
            <Button type="submit">
              {isLoading ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-0 z-10">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </form>
      </DialogContent>
      <DialogDescription />
    </Dialog>
  );
}
