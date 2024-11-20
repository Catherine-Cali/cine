import RootLayout from "./layout";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"

export default function Connexion() {
    return (
      <SidebarProvider>
      <div className="h-screen w-screen flex flex-col font-sans">
        <div className="flex-[0.05]">
          <h1 className="text-lg pt-1.5 pl-3">🎬 Cinetica</h1>
        </div>
        
        <div className="border-t border-gray-300"></div>
        
        {/* Section du bas divisée en deux colonnes */}
        <div className="bg-white flex-1 flex">
          <div className="flex-[0.20] p-1"> {/* Première colonne */}
              <AppSidebar />
          </div>
          <div className="border-l border-gray-300"></div>
          <div className="flex-1 p-4"> {/* Deuxième colonne */}
            <p>Coding in progress essai</p>
          </div>
        </div>
      </div>
      </SidebarProvider>
    );
  }

  // essai ?????????????
 
