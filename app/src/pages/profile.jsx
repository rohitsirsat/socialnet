import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth/AuthContext";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { getMyProfile, followUnFollowUser } from "@/api";
import { requestHandler } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarDays,
  MapPin,
  MoreHorizontal,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Loader from "@/components/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MyPosts } from "@/components/myPost";

const ImagePreview = ({ src, alt, onClose }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogTitle>Image Preview</DialogTitle>
    <DialogContent className="sm:max-w-[800px] p-0">
      <div className="relative">
        <img
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
    </DialogContent>
    <DialogDescription>Preview</DialogDescription>
  </Dialog>
);

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);

  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      await requestHandler(
        async () => await getMyProfile(),
        null,
        (res) => {
          const { data } = res;
          setProfileData(data);
          setIsFollowing(data?.isFollowing || false);
        },
        (error) => {
          console.log(error);
        }
      );
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  const handleFollowUnfollow = async () => {
    try {
      setIsLoadingFollow(true);
      const response = await followUnFollowUser(profileData?.account?._id);
      setIsFollowing(response.data.data.following);
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
    } finally {
      setIsLoadingFollow(false);
    }
  };

  console.log("Curretn user id: ", currentUser?._id);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData && !isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load profile</p>
      </div>
    );
  }

  return (
    <>
      <div className="abspolute top-0 left-0 right-0 flex items-center gap-x-6 p-2 cursor-pointer bg-transparent bg-black">
        <Link to="/home" className="hover:bg-gray-800 rounded-full p-2">
          <ArrowLeft />
        </Link>

        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-bold">
            {" "}
            {(profileData &&
              profileData?.firstName + " " + profileData?.lastName) ||
              ""}
          </h1>
          {profileData?.account?._id === profileData?.owner ? (
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
                  <Link to={"/update-avatar"}>change avatar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/update-cover-image"}>change cover image</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            ""
          )}
        </div>
      </div>
      <ScrollArea className="h-screen">
        <div className="max-w-2xl mx-auto pb-16">
          <div className="relative">
            <img
              src={
                (profileData && profileData?.coverImage?.url) ||
                "/placeholder.svg?height=200&width=600"
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
                alt="Avatar"
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
              {currentUser?._id === profileData?.account?._id ? (
                // Show Edit Profile button for own profile
                <div>
                  <Link to="/edit-profile">
                    <Button variant="outline">Edit Profile</Button>
                  </Link>
                </div>
              ) : (
                // Show Follow/Unfollow button for other profiles
                <Button
                  variant="outline"
                  onClick={handleFollowUnfollow}
                  disabled={isLoadingFollow}
                >
                  {isLoadingFollow ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : isFollowing ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
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
                    ? "@" + profileData?.account?.username
                    : "add username"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              {profileData?.bio ? (
                profileData?.bio
              ) : (
                <p className="text-gray-500">add bio</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profileData?.location ? profileData?.location : "add location"}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <p>Born:</p>
                {profileData?.dob
                  ? dayjs(profileData?.dob).format("D MMMM YYYY")
                  : "add dob"}
              </span>
            </div>
            <div className="flex gap-4 mt-4 text-gray-500">
              <span>
                <strong>
                  {profileData?.followingCount
                    ? profileData?.followingCount
                    : 0}
                </strong>{" "}
                Following
              </span>
              <span>
                <strong>
                  {profileData?.followersCount
                    ? profileData?.followersCount
                    : 0}
                </strong>{" "}
                Followers
              </span>
            </div>
          </div>
          <div className="mt-6">
            {/* // navbar */}
            <nav className="border-b">
              <div className="flex justify-center items-center flex-col gap-y-3">
                <p className="text-center corsor-pointer font-bold rounded-full">
                  Posts
                </p>
                <div className="text-center corsor-pointer h-1 bg-blue-500 w-14 rounf"></div>
              </div>
            </nav>
            <div className="mt-2 pr-2">
              <MyPosts />
            </div>
          </div>
        </div>
        {previewImage && (
          <ImagePreview
            src={previewImage}
            alt={previewImage.includes("user") ? "user.name" : "Cover Image"}
            onClose={() => setPreviewImage(null)}
          />
        )}
      </ScrollArea>
    </>
  );
}
