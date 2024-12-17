import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash/debounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePost } from "@/context/Post/PostContext";
import { PostCard } from "@/components/myPost";
import { Loader2, Search } from "lucide-react";
import { searchUsers } from "@/api";
import { requestHandler } from "@/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const { handleGetAllPosts, isLoading, hasMore, allPosts } = usePost();

  useEffect(() => {
    handleGetAllPosts(page);
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

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
    setSearchQuery("");
  };

  // Debounce search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      try {
        await requestHandler(
          async () => await searchUsers(query),
          setIsSearching,
          (res) => {
            console.log("search results", res);
            setSearchResults(res.data);
          },
          (error) => {
            console.log(error);
            setSearchResults([]);
          }
        );
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  if (isLoading && allPosts.length === 0) {
    return (
      <div className="flex items-center justify-center mt-5">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="username..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>

        {/* Search Results Dropdown */}
        {searchQuery && (
          <div className="absolute mt-2 w-full max-w-2xl mx-auto bg-background border rounded-md shadow-lg z-50">
            {isSearching ? (
              <div className="p-4 text-center">
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="px-4 py-2 hover:bg-accent cursor-pointer flex items-center gap-3"
                    onClick={() => handleUserClick(user.username)}
                  >
                    <img
                      src={user.avatar?.url}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No users found
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {allPosts.map((post, index) => (
          <div
            key={`${post._id}-${index}`}
            ref={index === allPosts.length - 1 ? lastPostRef : null}
          >
            <PostCard post={post} />
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center justify-center mt-5">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        )}

        {!hasMore && allPosts.length > 0 && (
          <div className="text-center text-gray-500 mt-5">
            No more posts to load
          </div>
        )}
      </div>

      {!isLoading && allPosts.length === 0 && (
        <div className="flex items-center justify-center mt-5">
          <p>No posts available</p>
        </div>
      )}
    </ScrollArea>
  );
}

export default Home;
