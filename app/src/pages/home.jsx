// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// import {
//   Bell,
//   Bookmark,
//   // Home,
//   Mail,
//   MoreHorizontal,
//   Search,
//   User,
// } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
//       <div className="container mx-auto flex">
//         {/* Left Sidebar */}
//         <aside className="w-1/4 p-4 hidden md:block">
//           <nav className="space-y-4">
//             <Button variant="ghost" className="w-full justify-start text-xl">
//               <Search className="mr-2 h-6 w-6" />
//               Home
//             </Button>
//             <Button variant="ghost" className="w-full justify-start text-xl">
//               <Search className="mr-2 h-6 w-6" />
//               Explore
//             </Button>
//             <Button variant="ghost" className="w-full justify-start text-xl">
//               <Bell className="mr-2 h-6 w-6" />
//               Notifications
//             </Button>
//             <Button variant="ghost" className="w-full justify-start text-xl">
//               <Mail className="mr-2 h-6 w-6" />
//               Messages
//             </Button>
//             <Button variant="ghost" className="w-full justify-start text-xl">
//               <Bookmark className="mr-2 h-6 w-6" />
//               Bookmarks
//             </Button>
//             <Button variant="ghost" className="w-full justify-start text-xl">
//               <User className="mr-2 h-6 w-6" />
//               Profile
//             </Button>
//             <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
//               Tweet
//             </Button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="w-full md:w-1/2 border-x border-gray-200 dark:border-gray-800">
//           {/* Header */}
//           <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-4">
//             <h1 className="text-xl font-bold">Home</h1>
//           </header>

//           {/* Tweet Composer */}
//           <div className="p-4 border-b border-gray-200 dark:border-gray-800">
//             <div className="flex">
//               <Avatar className="h-12 w-12 mr-4">
//                 <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
//                 <AvatarFallback>UN</AvatarFallback>
//               </Avatar>
//               <div className="flex-grow">
//                 <textarea
//                   placeholder="What's happening?"
//                   className="w-full mb-2"
//                 />
//                 <div className="flex justify-between items-center">
//                   <div className="flex space-x-2">
//                     {/* Tweet action buttons would go here */}
//                   </div>
//                   <Button className="bg-blue-500 hover:bg-blue-600 text-white">
//                     Tweet
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tweet Feed */}
//           <div className="divide-y divide-gray-200 dark:divide-gray-800">
//             {[...Array(5)].map((_, i) => (
//               <Card key={i} className="rounded-none border-x-0 shadow-none">
//                 <CardHeader className="flex flex-row space-x-4 items-start p-4">
//                   <Avatar>
//                     <AvatarImage
//                       src={`/placeholder-avatar-${i + 1}.jpg`}
//                       alt={`@user${i + 1}`}
//                     />
//                     <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-grow">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <span className="font-bold">User {i + 1}</span>
//                         <span className="text-gray-500 ml-2">@user{i + 1}</span>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="text-gray-500"
//                       >
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p>
//                     This is a sample tweet {i + 1}. It could be about anything!
//                   </p>
//                 </CardContent>
//                 <CardFooter className="p-4 flex justify-between">
//                   <Button variant="ghost" size="sm">
//                     💬 {Math.floor(Math.random() * 100)}
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     🔁 {Math.floor(Math.random() * 50)}
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     ❤️ {Math.floor(Math.random() * 200)}
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     📊 {Math.floor(Math.random() * 1000)}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </main>

//         {/* Right Sidebar */}
//         <aside className="w-1/4 p-4 hidden lg:block">
//           <div className="sticky top-4">
//             <div className="bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
//               <Input
//                 type="search"
//                 placeholder="Search Twitter"
//                 className="bg-transparent border-none rounded-full"
//               />
//             </div>
//             <Card className="mb-4">
//               <CardHeader>
//                 <h2 className="text-xl font-bold">Trends for you</h2>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {[...Array(5)].map((_, i) => (
//                   <div key={i}>
//                     <div className="text-sm text-gray-500">
//                       Trending in Your Area
//                     </div>
//                     <div className="font-bold">#Trend{i + 1}</div>
//                     <div className="text-sm text-gray-500">
//                       {Math.floor(Math.random() * 10000)}K Tweets
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <h2 className="text-xl font-bold">Who to follow</h2>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {[...Array(3)].map((_, i) => (
//                   <div key={i} className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <Avatar>
//                         <AvatarImage
//                           src={`/placeholder-avatar-${i + 6}.jpg`}
//                           alt={`@suggesteduser${i + 1}`}
//                         />
//                         <AvatarFallback>{`S${i + 1}`}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <div className="font-bold">Suggested User {i + 1}</div>
//                         <div className="text-sm text-gray-500">
//                           @suggesteduser{i + 1}
//                         </div>
//                       </div>
//                     </div>
//                     <Button variant="outline" size="sm">
//                       Follow
//                     </Button>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

import React from "react";

function Home() {
  return <div>Home</div>;
}

export default Home;
