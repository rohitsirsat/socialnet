import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/owndialog";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { FiLoader, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AvatarUpload = ({ isOpen = true, onClose }) => {
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      setIsLoading(true);

      // API request to upload the avatar
      await apiClient.patch("/users/avatar", formData);
      toast({
        title: "Avatar Updated",
        description: "Your avatar has been updated successfully.",
        variant: "success",
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Upload Failed",
        description:
          error.response?.data?.message || "Failed to upload avatar.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setAvatar(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Upload Avatar
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Select an image file to update your avatar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* File Input */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {avatar ? (
                <span>{avatar.name}</span>
              ) : (
                <>
                  <FiUpload className="mb-2 h-6 w-6 text-gray-400 dark:text-gray-600" />
                  Click to select an image
                </>
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Update Avatar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUpload;
