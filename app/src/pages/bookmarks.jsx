import React, { useState, useEffect, useRef, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePost } from "@/context/Post/PostContext";
import { PostCard } from "@/components/myPost";
import { Loader2 } from "lucide-react";

function Bookmarks() {
  const [page, setPage] = useState(1);
  const { handleGetBookmarks, isLoading, hasMore, bookmarkedPosts } = usePost();

  useEffect(() => {
    handleGetBookmarks(page);
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

  if (isLoading && bookmarkedPosts.length === 0) {
    return (
      <div className="flex items-center justify-center mt-5">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-6">
        {bookmarkedPosts.map((post, index) => (
          <div
            key={`${post._id}-${index}`}
            ref={index === bookmarkedPosts.length - 1 ? lastPostRef : null}
          >
            <PostCard post={post} />
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center justify-center mt-5">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        )}

        {!hasMore && bookmarkedPosts.length > 0 && (
          <div className="text-center text-gray-500 mt-5">
            No more posts to load
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export default Bookmarks;
