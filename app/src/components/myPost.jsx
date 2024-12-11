import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Bookmark,
  Loader2,
} from "lucide-react";
import { getMyPost, addComment, getPostComments } from "@/api";
import { requestHandler } from "@/utils";
dayjs.extend(relativeTime);

export default function MyPosts() {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      await requestHandler(
        async () => await getMyPost(),
        setIsLoading,
        (res) => {
          const { data } = res;
          const sortedPosts = data.posts.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );
          setPostData(sortedPosts || []);
          console.log("all post data", postData);
        },
        (error) => {
          console.warn(error);
          setIsLoading(false);
        }
      );
    };
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center mt-5">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : postData.length > 0 ? (
        postData.map((post, index) => <PostCard key={index} post={post} />)
      ) : (
        <div className="flex items-center justify-center mt-5">
          <p>No posts available</p>
        </div>
      )}
    </div>
  );
}

function PostCard({ post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [oldComments, setOldComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    await requestHandler(
      async () => await addComment(post._id, newComment),
      setIsLoading,
      async (res) => {
        // Clear the input
        setNewComment("");

        // Refresh comments list
        const commentsRes = await getPostComments(post._id);
        setComments(commentsRes.data.comments);
      },
      (error) => {
        console.error("Error posting comment:", error);
      }
    );
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log("Bookmark status:", !isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentClick = async () => {
    setShowComments(!showComments);

    if (!showComments) {
      setIsLoadingComments(true);
      await requestHandler(
        async () => await getPostComments(post._id),
        setIsLoadingComments,
        (res) => {
          setComments(res.data.comments);
          console.log("Fetched comments:", res.data.comments);
        },
        (error) => {
          console.error("Error fetching comments:", error);
        }
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-4 space-y-4">
        {/* Author Info */}
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={post.author.account.avatar.url}
            />
            <AvatarFallback>
              {post.author.account.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{post.author.account.username}</h2>
            <p className="text-sm text-gray-500">
              {dayjs(post.updatedAt).fromNow()}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <p>{post.content}</p>

        {/* Images Carousel */}
        {post.images?.length > 0 && (
          <div className="relative">
            <img
              src={post.images[currentImageIndex].url}
              alt={`Post image ${currentImageIndex + 1}`}
              className="w-full rounded-lg object-cover"
              style={{ maxHeight: "500px" }}
            />
            {post.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {post.images.length}
                </div>
              </>
            )}
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-red-500"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-5 w-5 mr-1 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span>{post.likes || 0}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-blue-500"
            onClick={handleCommentClick}
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{post.comments || 0}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-yellow-500"
            onClick={handleBookmark}
          >
            <Bookmark
              className={`h-5 w-5 ${
                isBookmarked ? "fill-yellow-500 text-yellow-500" : ""
              }`}
            />
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4 pt-4 border-t">
            {isLoadingComments ? (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.author?.account?.avatar?.url} />
                    <AvatarFallback>
                      {comment.author?.account?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">
                        {comment.author?.account?.username}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {dayjs(comment.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No comments yet</p>
            )}

            {/* Comment Input */}
            <form
              onSubmit={handleSubmitComment}
              className="flex items-center space-x-2"
            >
              <Input
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
