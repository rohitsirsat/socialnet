import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Link, X, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "@/api";
import Loader from "@/components/loader";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ImagePreview = ({ src, alt, onClose }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogTitle>Image Preview</DialogTitle>
    <DialogContent className="sm:max-w-[800px] p-0 bg-white">
      <div className="relative">
        <img
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-black/50 text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </DialogContent>
    <DialogDescription>Click the preview to close.</DialogDescription>
  </Dialog>
);

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  const handleFormClose = () => {
    setIsEditFormOpen(false);
  };

  useEffect(() => {
    const getitt = async () => {
      setIsLoading(true);
      await apiClient
        .get("/profile")
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            const { data } = res;
            setProfileData(data.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };

    getitt();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  return (
    <ScrollArea className="h-screen">
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
          <div className="max-w-2xl mx-auto px-4 py-2 flex items-center">
            <img
              src={
                profileData?.account?.avatar?.url
                  ? profileData?.account?.avatar?.url
                  : "/placeholder-user.jpg"
              }
              alt="profile image"
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <h2 className="text-lg font-bold">
              {profileData?.account?.username
                ? profileData?.account?.username
                : "add username"}
            </h2>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto pb-16">
        <div className="relative">
          <img
            src={
              profileData?.coverImage?.url
                ? profileData?.coverImage?.url
                : "/placeholder.svg?height=200&width=600"
            }
            alt="Cover"
            width={600}
            height={200}
            className="w-full h-32 sm:h-48 object-cover cursor-pointer"
            onClick={() =>
              setPreviewImage(
                profileData?.coverImage?.url
                  ? profileData?.coverImage?.url
                  : "/placeholder.svg?height=200&width=600"
              )
            }
          />
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <img
              src={
                profileData?.account?.avatar?.url
                  ? profileData?.account?.avatar?.url
                  : "/placeholder-user.jpg"
              }
              alt="profile image"
              width={120}
              height={120}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 cursor-pointer object-cover"
              onClick={() =>
                setPreviewImage(
                  profileData?.account?.avatar?.url
                    ? profileData?.account?.avatar?.url
                    : "/placeholder-user.jpg"
                )
              }
            />
          </div>
          <div className="absolute top-52 right-4">
            {profileData?.account?._id === profileData?.owner ? (
              <div>
                <Button variant="outline">
                  <Link to={"/edit-profile"}>Edit profile</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 bg-background text-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col">
                    <DropdownMenuItem>
                      <p>change avatar</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <p>change cover</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button variant="outline">
                {profileData?.isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>
        <div className="mt-16 sm:mt-20 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-xl font-bold">
                {profileData?.firstName + " " + profileData?.lastName}
              </h1>
              <p className="text-gray-500">
                {profileData?.account?.username
                  ? profileData?.account?.username
                  : "add username"}
              </p>
            </div>
          </div>
          <p className="mt-4">
            {profileData?.bio ? profileData?.bio : "add bio"}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {profileData?.location ? profileData?.location : "add location"}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <p>dob:</p>
              {profileData?.dob
                ? dayjs(profileData?.dob).format("D MMMM YYYY")
                : "add dob"}
            </span>
          </div>
          <div className="flex gap-4 mt-4 text-gray-500">
            <span>
              <strong>
                {profileData?.followingCount ? profileData?.followingCount : 0}
              </strong>{" "}
              Following
            </span>
            <span>
              <strong>
                {profileData?.followersCount ? profileData?.followersCount : 0}
              </strong>{" "}
              Followers
            </span>
          </div>
        </div>
        {/* <Tabs defaultValue="tweets" className="mt-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="tweets">Tweets</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>
          <TabsContent value="tweets" className="mt-4">
            {user.tweets.map((tweet) => (
              <Card key={tweet.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Image
                      src="/placeholder-user.jpg"
                      alt={user.name}
                      width={48}
                      height={48}
                      className="rounded-full w-12 h-12"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-gray-500">{user.handle}</span>
                        <span className="text-gray-500">
                          · {tweet.timestamp}
                        </span>
                      </div>
                      <p className="mt-1">{tweet.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="replies">
            <p className="text-center text-gray-500 my-4">No replies yet.</p>
          </TabsContent>
          <TabsContent value="media">
            <p className="text-center text-gray-500 my-4">No media yet.</p>
          </TabsContent>
          <TabsContent value="likes">
            <p className="text-center text-gray-500 my-4">No likes yet.</p>
          </TabsContent>
        </Tabs> */}
        <p>gedf</p>
      </div>
      {previewImage && (
        <ImagePreview
          src={previewImage}
          alt={previewImage.includes("user") ? "user.name" : "Cover Image"}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </ScrollArea>
  );
}
