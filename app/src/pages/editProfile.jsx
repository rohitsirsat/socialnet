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
import { FiLoader } from "react-icons/fi";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide some additional information to complete your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <div className="col-span-3 flex gap-2">
                <Select
                  onValueChange={handleSelectChange}
                  value={formData.countryCode}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Country Code" />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date of Birth
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button type="submit">
              {" "}
              {isLoading ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
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
