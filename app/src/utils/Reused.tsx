import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  BookMarked,
  Home,
  Mail,
  Search,
  User,
  PenSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Homee() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0 text-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Sidebar (hidden on mobile) */}
          <div className="hidden md:block md:col-span-1 lg:col-span-1">
            <div className="sticky top-0 p-4">
              <nav className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-primary"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Explore
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground"
                >
                  <BookMarked className="mr-2 h-4 w-4" />
                  Bookmarks
                </Button>
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-foreground">
                  Tweet
                </Button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <main className="col-span-1 md:col-span-2 lg:col-span-2">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Home</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="What's happening?"
                    className="w-full bg-input"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground mb-4">
                  Tweet
                </Button>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((tweet) => (
                    <Card key={tweet} className="bg-card text-card-foreground">
                      <CardContent className="flex items-start space-x-4 pt-4">
                        <Avatar>
                          <AvatarImage
                            src={`https://i.pravatar.cc/150?img=${tweet}`}
                          />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">User Name</p>
                          <p className="text-sm text-muted-foreground">
                            @username
                          </p>
                          <p className="mt-2">
                            This is a sample tweet. It can contain text, images,
                            and more!
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Widgets (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-0 p-4">
              <Card className="mb-4 bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>What's happening</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Trending Topic 1",
                      "Trending Topic 2",
                      "Trending Topic 3",
                    ].map((topic, index) => (
                      <li key={index} className="text-sm">
                        <p className="font-semibold">{topic}</p>
                        <p className="text-muted-foreground">1,234 Tweets</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Who to follow</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[1, 2, 3].map((user) => (
                      <li
                        key={user}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage
                              src={`https://i.pravatar.cc/150?img=${user + 5}`}
                            />
                            <AvatarFallback>UN</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">User Name</p>
                            <p className="text-sm text-muted-foreground">
                              @username
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-muted text-foreground"
                        >
                          Follow
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex justify-around items-center h-16">
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="text-xs mt-1">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 flex flex-col items-center justify-center h-full text-foreground"
          >
            <Mail className="h-5 w-5" />
            <span className="text-xs mt-1">Messages</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Tweet Button */}
      <Button className="md:hidden fixed right-4 bottom-20 rounded-full w-14 h-14 bg-primary hover:bg-primary-foreground text-primary-foreground flex items-center justify-center">
        <PenSquare className="h-6 w-6" />
      </Button>
    </div>
  );
}
