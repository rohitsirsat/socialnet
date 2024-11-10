import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Trending() {
  const trendingTopics = [
    { id: 1, topic: "#ReactJS", tweets: "100K" },
    { id: 2, topic: "#WebDev", tweets: "50K" },
    { id: 3, topic: "#JavaScript", tweets: "75K" },
  ];

  return (
    <aside className="h-full">
      <Card>
        <CardHeader>
          <CardTitle>Trending</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {trendingTopics.map((topic) => (
              <li key={topic.id} className="flex justify-between items-center">
                <span>{topic.topic}</span>
                <span className="text-sm text-muted-foreground">
                  {topic.tweets} tweets
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
