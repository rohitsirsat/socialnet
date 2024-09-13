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
import Container from "@/components/Container";

export default function Homee() {
  return (
    <Container>
      <div className="container mx-auto">
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
      </div>
    </Container>
  );
}
