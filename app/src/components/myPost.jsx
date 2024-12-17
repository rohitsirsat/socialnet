import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Bookmark,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
  Info,
  BookmarkIcon,
} from "lucide-react";
import { addComment } from "@/api";
import { requestHandler } from "@/utils";
import { useAuth } from "@/context/Auth/AuthContext";
import { usePost } from "@/context/Post/PostContext";
import CreatePost from "@/components/createPost";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

dayjs.extend(relativeTime);

export function MyPosts() {
  // const [postData, setPostData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  const { posts, fetchPosts, hasMore, isLoading } = usePost();

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Intersection Observer callback
  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center mt-5">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div
          key={`${post._id}-${index}`}
          ref={index === posts.length - 1 ? lastPostRef : null}
        >
          <PostCard post={post} />
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center justify-center mt-5">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center text-gray-500 mt-5">
          No more posts to load
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="flex items-center justify-center mt-5">
          <p>No posts available</p>
        </div>
      )}
    </div>
  );
}

export function PostCard({ post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments || 0);
  const [commentLikes, setCommentLikes] = useState({});
  const [likeLoadingStates, setLikeLoadingStates] = useState({});
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  // state for post dialog
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  // ... existing state declarations ...
  const { user } = useAuth(); // Add this to get current user
  const isOwner = user?._id === post.author.owner;

  const {
    handleDeletePost,
    handleLikePost,
    handleLikeComment,
    handleGetComments,
    handleBookmarkPost,
  } = usePost();

  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await handleDeletePost(post._id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  }, [post._id, handleDeletePost]);

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

  const handleBookmark = async () => {
    if (isBookmarkLoading) return;

    try {
      setIsBookmarkLoading(true);
      // Optimistic update
      setIsBookmarked(!isBookmarked);

      // Make API call
      const response = await handleBookmarkPost(post._id);

      // Update with server response
      setIsBookmarked(response.data.isBookmarked);

      toast({
        title: isBookmarked ? "Post removed from bookmarks" : "Post bookmarked",
        description: isBookmarked
          ? "The post has been removed from your bookmarks"
          : "The post has been added to your bookmarks",
      });
    } catch (error) {
      // Revert optimistic update
      setIsBookmarked(!isBookmarked);
      console.log("error", error);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const handleLike = async () => {
    const previousLiked = isLiked;
    const previousLikesCount = likesCount;
    try {
      setIsLikeLoading(true);
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

      // make api call
      const response = await handleLikePost(post._id);
    } catch (error) {
      // Revert optimistic update if the API call fails
      setIsLiked(previousLiked);
      setLikesCount(previousLikesCount);

      console.log("error", error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleCommentClick = async () => {
    setShowComments(!showComments);

    if (!showComments && comments.length === 0) {
      try {
        setIsLoadingComments(true);
        const { comments: fetchedComments, initialLikes } =
          await handleGetComments(post._id);

        if (fetchedComments && fetchedComments.length > 0) {
          setComments(fetchedComments);
          setCommentLikes(initialLikes);
        } else {
          setComments([]);
          setCommentLikes({});
        }
      } catch (error) {
        console.error("Error loading comments:", error);

        setComments([]);
        setCommentLikes({});
      } finally {
        setIsLoadingComments(false);
      }
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    await requestHandler(
      async () => await addComment(post._id, newComment),
      setIsLoading,
      (res) => {
        const newCommentObj = {
          _id: res.data._id,
          content: res.data.content,
          createdAt: res.data.createdAt,
          author: {
            account: {
              username: post.author.account.username,
              avatar: post.author.account.avatar,
            },
          },
        };

        setComments((prevComments) => [...prevComments, newCommentObj]);
        setCommentCount((prevCount) => prevCount + 1);
        setNewComment("");
      },
      (error) => {
        console.error("Error posting comment:", error);
      }
    );
  };

  const handleCommentLike = async (commentId) => {
    if (likeLoadingStates[commentId]) return;

    try {
      const previousLikeState = commentLikes[commentId]?.isLiked;
      const previousLikesCount = commentLikes[commentId]?.likes || 0;

      setLikeLoadingStates((prev) => ({
        ...prev,
        [commentId]: true,
      }));

      setCommentLikes((prev) => ({
        ...prev,
        [commentId]: {
          isLiked: !previousLikeState,
          likes: previousLikeState
            ? previousLikesCount - 1
            : previousLikesCount + 1,
        },
      }));

      const response = await handleLikeComment(commentId);

      setCommentLikes((prev) => ({
        ...prev,
        [commentId]: {
          isLiked: response.data.isLiked,
          likes: response.data.likes,
        },
      }));
    } catch (error) {
      setCommentLikes((prev) => ({
        ...prev,
        [commentId]: {
          isLiked: previousLikeState,
          likes: previousLikesCount,
        },
      }));

      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    } finally {
      setLikeLoadingStates((prev) => ({
        ...prev,
        [commentId]: false,
      }));
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto transition-colors duration-200 border-b">
        <CardContent className="p-4">
          {/* Author Info */}
          <div className="flex gap-3 flex-col">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  className="object-cover cursor-pointer"
                  src={post.author.account.avatar.url}
                />
                <AvatarFallback>
                  {post.author.account.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Author Header */}
              <div className="flex items-center gap-2">
                <h1 className="font-bold hover:underline cursor-pointer">
                  {post.author.firstName + " " + post.author.lastName}
                </h1>
                <h2 className="text-gray-500 text-sm">
                  {"@" + post.author.account.username}
                </h2>
                <span className="text-gray-500 text-sm">·</span>
                <p className="text-gray-500 text-sm">
                  {dayjs(post.updatedAt).fromNow()}
                </p>
              </div>
              {/* Add dropdown menu */}
              <div className="flex items-center gap-2 ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="-mr-2">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    {isOwner ? (
                      <>
                        <DropdownMenuItem
                          onClick={() => setIsCreateDialogOpen(true)}
                          className="cursor-pointer"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setIsDeleteDialogOpen(true)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Post
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem className="cursor-pointer">
                        <Info className="h-4 w-4 mr-2" />
                        About This Post
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Post Content */}
            <div>
              <p className="mt-1 text-[15px] pl-12 break-words whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Images Carousel */}
              {post.images?.length > 0 && (
                <div className="relative mt-3 rounded-2xl overflow-hidden bg-blue-800">
                  <img
                    src={post.images[currentImageIndex].url}
                    alt={`Post image ${currentImageIndex + 1}`}
                    className="w-full rounded-2xl object-cover"
                    style={{ maxHeight: "500px" }}
                  />
                  {post.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        {currentImageIndex + 1} / {post.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Interaction Buttons */}
              <div className="flex items-center justify-around mt-3">
                <button
                  onClick={handleLike}
                  className={cn(
                    "flex items-center gap-2 text-gray-600 group transition-colors",
                    isLiked ? "text-red-500" : "hover:text-red-500",
                    isLikeLoading && "opacity-50"
                  )}
                >
                  <div className="p-2 rounded-full">
                    <Heart
                      className={cn(
                        "h-4 w-4 transition-all",
                        isLiked && "fill-red-500 text-red-500 scale-110",
                        isLikeLoading && "animate-bounce delay-75"
                      )}
                    />
                  </div>
                  <span className="text-sm">{likesCount}</span>
                </button>

                <button
                  onClick={handleCommentClick}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 group transition-colors"
                >
                  <div className="p-2 rounded-full">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{commentCount}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  disabled={isBookmarkLoading}
                  className={cn(
                    "flex items-center gap-2 text-gray-600 group transition-colors",
                    isBookmarked ? "text-blue-500" : "hover:text-blue-500",
                    isBookmarkLoading && "opacity-50"
                  )}
                >
                  <div className={cn("p-2 rounded-full")}>
                    {isBookmarked ? (
                      <Bookmark
                        className={cn(
                          "h-4 w-4 transition-all",
                          isBookmarkLoading && "animate-pulse"
                        )}
                        fill="currentColor"
                      />
                    ) : (
                      <BookmarkIcon
                        className={cn(
                          "h-4 w-4 transition-all",
                          isBookmarkLoading && "animate-pulse"
                        )}
                      />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              {/* Comments Section */}
              {showComments && (
                <div className="mt-4 border-t">
                  {isLoadingComments ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      {/* Comment Input */}
                      <form
                        onSubmit={handleSubmitComment}
                        className="flex items-start gap-3 py-4 px-0 border-b"
                      >
                        <Avatar className="w-10 h-10 border-2 shadow-sm">
                          <AvatarImage
                            src={post.author.account.avatar.url}
                            className="object-cover"
                          />
                          <AvatarFallback className="font-semibold">
                            {post.author.account.username[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="rounded-full border-none pl-4 pr-20 py-6 min-h-[44px]"
                          />
                          <Button
                            type="submit"
                            size="sm"
                            disabled={isLoading || !newComment.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-4"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </form>

                      {/* Comments List */}
                      {comments && comments.length > 0 ? (
                        <div className="space-y-4">
                          {comments.map((comment) => (
                            <div
                              key={comment._id}
                              className="flex gap-3 py-3 transition-colors border-b border-border last:border-0"
                            >
                              <Avatar className="w-10 h-10 shadow-sm">
                                <AvatarImage
                                  src={comment.author?.account?.avatar?.url}
                                  className="object-cover"
                                  alt={`${comment.author?.account?.username}'s avatar`}
                                />
                                <AvatarFallback className="font-semibold">
                                  {comment.author?.account?.username?.[0]?.toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h2 className="font-bold text-[15px] hover:underline cursor-pointer">
                                    {comment.author?.firstName +
                                      " " +
                                      comment.author?.lastName}
                                  </h2>
                                  <h3 className="text-[15px] text-gray-500 cursor-pointer">
                                    {"@" + comment.author?.account?.username}
                                  </h3>
                                  <span className="text-gray-500 text-sm">
                                    ·
                                  </span>
                                  <span className="text-gray-500 text-sm">
                                    {dayjs(comment.createdAt).fromNow()}
                                  </span>
                                </div>
                                <p className="text-[15px] mt-1">
                                  {comment.content}
                                </p>
                                {/* Like Button for Comments */}
                                <div className="flex items-center gap-4 mt-2">
                                  <button
                                    onClick={() =>
                                      handleCommentLike(comment._id)
                                    }
                                    disabled={likeLoadingStates[comment._id]}
                                    className={cn(
                                      "flex items-center gap-2 text-gray-600 group transition-colors",
                                      commentLikes[comment._id]?.isLiked
                                        ? "text-red-500"
                                        : "hover:text-red-500",
                                      likeLoadingStates[comment._id] &&
                                        "opacity-50"
                                    )}
                                  >
                                    <div className={cn("p-1.5 rounded-full")}>
                                      <Heart
                                        className={cn(
                                          "h-3.5 w-3.5 transition-all",
                                          commentLikes[comment._id]?.isLiked &&
                                            "fill-red-500 text-red-500 scale-110",
                                          likeLoadingStates[comment._id] &&
                                            "animate-pulse"
                                        )}
                                      />
                                    </div>
                                    <span
                                      className={cn(
                                        "text-xs transition-all",
                                        likeLoadingStates[comment._id] &&
                                          "animate-pulse"
                                      )}
                                    >
                                      {commentLikes[comment._id]?.likes ||
                                        comment.likes ||
                                        0}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No replies yet
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Post Dialog */}
      <CreatePost
        isEdit={true}
        post={post}
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      {/* Delete Confirmation Dialog for post */}
      {isDeleteDialogOpen && ( // Only render dialog when open
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            if (!isDeleting) {
              setIsDeleteDialogOpen(open);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Are you sure you want to delete
                this post?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isDeleting}
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Deleting...</span>
                  </div>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
