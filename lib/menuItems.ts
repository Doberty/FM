export interface MenuItem {
    id: string;
    title: string;
    description: string;
    image: string;
    path: string;
  }
  
  export const menuItems: MenuItem[] = [
    {
      id: "bar",
      title: "Bar",
      description: "Discover our signature cocktails and tapas",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/bar-hFBu6jcksCZqwAYtu21ocK87i3lfzo.webp",
      path: "/bar",
    },
    {
      id: "cooking",
      title: "Cooking Wars",
      description: "Explore our culinary competitions and endeavors",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/DALL%C2%B7E%202025-03-19%2021.26.10%20-%20A%20colorful%2C%20cartoon-style%20%27Cooking%20Wars%27%20themed%20image%20featuring%20a%20fun%20and%20exaggerated%20kitchen%20battle.%20The%20scene%20includes%20animated%20flying%20knives%2C%20overs-ZUwYu91EvgouxTbtvOYo21HIClzDLV.webp",
      path: "/cooking",
    },
    {
      id: "freezer-inventory",
      title: "Freezer Inventory",
      description: "Our freezer inventory helps you track what you have",
      image: "https://gype7srla1ab70k3.public.blob.vercel-storage.com/bar/DALL%C2%B7E%202025-03-19%2021.26.10%20-%20A%20colorful%2C%20cartoon-style%20%27Cooking%20Wars%27%20themed%20image%20featuring%20a%20fun%20and%20exaggerated%20kitchen%20battle.%20The%20scene%20includes%20animated%20flying%20knives%2C%20overs-ZUwYu91EvgouxTbtvOYo21HIClzDLV.webp",
      path: "/freezer-inventory",
    }
  ];