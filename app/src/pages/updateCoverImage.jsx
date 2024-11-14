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
import { FiLoader } from "react-icons/fi";
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
      const response = await apiClient.patch("/profile/cover-image", formData);
      toast({
        title: "cover image Updated",
        description: "Your avatar has been updated successfully.",
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Cover Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <Button type="submit" disabled={isLoading}>
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
      <DialogDescription>Upload your avatar</DialogDescription>
    </Dialog>
  );
};

export default CoverUpload;
