import Container from "./Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const RightContent = () => {
  return (
    <Container>
      <div className="container mx-auto">
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
    </Container>
  );
};

export default RightContent;
