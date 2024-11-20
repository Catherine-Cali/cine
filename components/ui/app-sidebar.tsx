import { LayoutGrid, Film, Users, Smile, Airplay} from "lucide-react"

import {
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
  } from "@/components/ui/sidebar";
  

// pour le discover
const discoverItem = {
    title: "Discover",
    url: "#",
    icon: LayoutGrid,
  };

//pour les autres items
const items = [
    {
      title: "Movies",
      url: "#",
      children: [
        { title: "Now Playing", url: "#", icon: Film },
        { title: "Popular", url: "#", icon: Users },
        { title: "Top Rated", url: "#", icon: Smile },
      ],
    },
    {
        title: "TV Shows",
        url: "#",
        children: [
          { title: "On the air", url: "#", icon: Airplay },
          { title: "Popular", url: "#", icon: Users },
          { title: "Top Rated", url: "#", icon: Smile },
        ],
      },
  ];

  
  export function AppSidebar() {
    return (
      <div className="w-full h-full p-4 ">
        <nav>
            {/* pour le discover */}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex items-center ">
                <discoverItem.icon className="mr-2 " />
                {discoverItem.title}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
  
          {/* pr film et serie */}
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton>
                <div className="flex items-center text-gray-600 ">
                  {item.title}
                </div>
              </SidebarMenuButton>
  
              {/* Sous-items */}
              {item.children && (
                <SidebarMenuSub>
                  {item.children.map((subItem, subIndex) => (
                    <SidebarMenuSubItem key={subIndex}>
                      <SidebarMenuSubButton>
                        <div className="flex items-center">
                          <subItem.icon className="mr-2" />
                          {subItem.title}
                        </div>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </nav>
      </div>
    );
  }
  