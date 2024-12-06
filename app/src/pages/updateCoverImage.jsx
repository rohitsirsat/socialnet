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

const CoverUpload = ({ isOpen = true, onClose }) => {
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("coverImage", coverImage);

    try {
      setIsLoading(true);

      // API request to upload the avatar
      await apiClient.patch("/profile/cover-image", formData);
      toast({
        title: "Cover Image Updated",
        description: "Your cover image has been updated successfully.",
        variant: "success",
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Upload Failed",
        description:
          error.response?.data?.message || "Failed to upload cover image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setCoverImage(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Upload Cover Image
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Select and upload an image to update your cover photo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* File Input */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {coverImage ? (
                <span>{coverImage.name}</span>
              ) : (
                <>
                  <FiUpload className="mb-2 h-6 w-6 text-gray-400 dark:text-gray-600" />
                  Click to select an image
                </>
              )}
            </label>
            <input
              id="file-upload"
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
              "Update Cover"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CoverUpload;
