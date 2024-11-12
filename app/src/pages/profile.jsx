import { Link, useParams, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Link as LinkIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LocalStorage } from "@/utils";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/api";
import { createSocialProfile } from "@/api";
import Loader from "@/components/loader";

const ImagePreview = ({ src, alt, onClose }) => (
  <Dialog open onOpenChange={onClose}>
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
  </Dialog>
);

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    const getitt = async () => {
      setIsLoading(true);
      await apiClient
        .get("/profile")
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            const { data } = res;
            console.log("get it: ", data.data);
            setProfileData(data.data);
            console.log("coverima   g", profileData.coverImage.url);
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
    <div className="min-h-screen">
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
              alt={"profile image"}
              width={120}
              height={120}
              className="rounded-full border-4 w-24 h-24 sm:w-32 sm:h-32 cursor-pointer"
              onClick={() =>
                setPreviewImage(
                  profileData?.account?.avatar?.url
                    ? profileData?.account?.avatar?.url
                    : "/placeholder-user.jpg"
                )
              }
            />
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
            {profileData?.ownIt === true ? (
              <Button variant="outline">Edit profile</Button>
            ) : profileData?.isFollowing === true ? (
              <Button variant="outline">Unfollow</Button>
            ) : (
              <Button variant="outline">Follow</Button>
            )}
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
              {15 + "November" + 2002}
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
      </div>
      {previewImage && (
        <ImagePreview
          src={previewImage}
          alt={previewImage.includes("user") ? "user.name" : "Cover Image"}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
}

/** 
 * 'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MapPin, Link as LinkIcon, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const ImagePreview = ({ src, alt, onClose }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[800px] p-0">
      <div className="relative">
        <Image src={src} alt={alt} width={800} height={600} className="w-full h-auto" />
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
  </Dialog>
)

export default function Component() {
  const [showHeader, setShowHeader] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(document.documentElement.scrollTop > 100)
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  const user = {
    name: "Jane Doe",
    handle: "@janedoe",
    bio: "Software engineer. Open source enthusiast. Coffee lover.",
    location: "San Francisco, CA",
    website: "https://janedoe.com",
    joinDate: "Joined September 2010",
    following: 1234,
    followers: 5678,
    tweets: [
      { id: 1, content: "Just pushed a new update to my latest project!", timestamp: "2h" },
      { id: 2, content: "Excited to attend the upcoming tech conference next month!", timestamp: "5h" },
      { id: 3, content: "Learning a new programming language is always an adventure.", timestamp: "1d" },
      { id: 4, content: "Enjoying a beautiful sunset after a productive day of coding.", timestamp: "2d" },
      { id: 5, content: "Just finished reading an amazing book on software architecture!", timestamp: "3d" },
    ],
  }

  return (
    <div className="min-h-screen">
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
          <div className="max-w-2xl mx-auto px-4 py-2 flex items-center">
            <Image
              src="/placeholder-user.jpg"
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <h2 className="text-lg font-bold">{user.name}</h2>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto pb-16">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=200&width=600"
            alt="Cover"
            width={600}
            height={200}
            className="w-full h-32 sm:h-48 object-cover cursor-pointer"
            onClick={() => setPreviewImage("/placeholder.svg?height=200&width=600")}
          />
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <Image
              src="/placeholder-user.jpg"
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-white w-24 h-24 sm:w-32 sm:h-32 cursor-pointer"
              onClick={() => setPreviewImage("/placeholder-user.jpg")}
            />
          </div>
        </div>
        <div className="mt-16 sm:mt-20 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-gray-500">{user.handle}</p>
            </div>
            <Button className="mt-4 sm:mt-0">Edit profile</Button>
          </div>
          <p className="mt-4">{user.bio}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {user.location}
            </span>
            <span className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <Link href={user.website} className="text-blue-500 hover:underline">
                {user.website.replace("https://", "")}
              </Link>
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {user.joinDate}
            </span>
          </div>
          <div className="flex gap-4 mt-4 text-gray-500">
            <span>
              <strong className="text-black">{user.following}</strong> Following
            </span>
            <span>
              <strong className="text-black">{user.followers}</strong> Followers
            </span>
          </div>
        </div>
        <Tabs defaultValue="tweets" className="mt-6">
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
                        <span className="text-gray-500">· {tweet.timestamp}</span>
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
        </Tabs>
      </div>
      {previewImage && (
        <ImagePreview
          src={previewImage}
          alt={previewImage.includes("user") ? user.name : "Cover Image"}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  )
}
*/
