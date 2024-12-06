import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/owndialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const EditProfile = ({ isOpen = true, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "",
    bio: "",
    dob: "",
    location: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, countryCode: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await apiClient
      .patch("/profile", formData)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          toast({
            title: "Profile Updated",
            description: "Your profile has been updated successfully.",
            variant: "success",
          });
          navigate("/profile");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast({
          title: "Profile Update Failed",
          description:
            err.response?.data?.message ||
            "Failed to update profile. Please try again.",
          variant: "destructive",
        });

        setIsLoading(false);
      });

    if (onClose) onClose();
  };

  const countryCodes = [
    { code: "+355", country: "Albania" },
    { code: "+213", country: "Algeria" },
    { code: "+54", country: "Argentina" },
    { code: "+61", country: "Australia" },
    { code: "+43", country: "Austria" },
    { code: "+880", country: "Bangladesh" },
    { code: "+32", country: "Belgium" },
    { code: "+55", country: "Brazil" },
    { code: "+359", country: "Bulgaria" },
    { code: "+1", country: "Canada" },
    { code: "+56", country: "Chile" },
    { code: "+86", country: "China" },
    { code: "+57", country: "Colombia" },
    { code: "+506", country: "Costa Rica" },
    { code: "+385", country: "Croatia" },
    { code: "+357", country: "Cyprus" },
    { code: "+420", country: "Czech Republic" },
    { code: "+45", country: "Denmark" },
    { code: "+593", country: "Ecuador" },
    { code: "+20", country: "Egypt" },
    { code: "+358", country: "Finland" },
    { code: "+33", country: "France" },
    { code: "+49", country: "Germany" },
    { code: "+30", country: "Greece" },
    { code: "+91", country: "India" },
    { code: "+62", country: "Indonesia" },
    { code: "+98", country: "Iran" },
    { code: "+964", country: "Iraq" },
    { code: "+353", country: "Ireland" },
    { code: "+972", country: "Israel" },
    { code: "+39", country: "Italy" },
    { code: "+81", country: "Japan" },
    { code: "+962", country: "Jordan" },
    { code: "+254", country: "Kenya" },
    { code: "+965", country: "Kuwait" },
    { code: "+961", country: "Lebanon" },
    { code: "+60", country: "Malaysia" },
    { code: "+52", country: "Mexico" },
    { code: "+31", country: "Netherlands" },
    { code: "+64", country: "New Zealand" },
    { code: "+47", country: "Norway" },
    { code: "+92", country: "Pakistan" },
    { code: "+51", country: "Peru" },
    { code: "+63", country: "Philippines" },
    { code: "+48", country: "Poland" },
    { code: "+351", country: "Portugal" },
    { code: "+7", country: "Russia" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+65", country: "Singapore" },
    { code: "+27", country: "South Africa" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-background rounded-lg shadow-xl">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-2xl font-bold">
            Edit Your Profile
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1">
            Provide additional information to complete your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <Select
                  onValueChange={handleSelectChange}
                  value={formData.countryCode}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="flex-grow"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full"
                rows={3}
                placeholder="Tell us a bit about yourself..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </motion.div>
          <DialogFooter className="flex justify-end gap-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
