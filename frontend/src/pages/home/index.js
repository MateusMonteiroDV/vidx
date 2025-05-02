import * as React from "react"
import { BookUser, LayoutDashboard, User, Box } from "lucide-react"
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  openMobile,
  setOpenMobile,
  useSidebar
} from "../../components/ui/sidebar.js"

import {useSelector} from 'react-redux'
import {selectCurrentAdmin} from '../../context/authSlice.js'

export default function Home({ children }) {
  const isAdmin = useSelector(selectCurrentAdmin)
  const {isMobile, openMobile,setOpenMobile} = useSidebar()
  const defaultOpen = true;

  console.log(openMobile)
return (
  <SidebarProvider  className = "flex h-screen z-50 ">
    
   


   <Sidebar

   
          variant="sidebar"
          className={` md:block h-full w-60  text-xl [&_*]:text-xl [&_button]:py-3 [&_a]:py-2 [&_.icon]:size-6  z-50 relative `}
          style={{ backgroundColor: "transparent" }} 
       
         
        
        >

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="group">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg group-hover:brightness-90 transition-all duration-200">
                  <BookUser className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-lg font-medium">Pagina Principal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-10">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/" className="mt-5 flex items-center gap-3 hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground px-3 py-2 rounded transition-colors duration-200">
                  <LayoutDashboard className="size-5" />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/courses" className="flex items-center gap-3 hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground px-3 py-2 rounded transition-colors duration-200">
                  <BookUser className="size-5" />
                  <span>Meus Cursos</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
         {isAdmin?( 
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="myproducts" className="flex items-center gap-3 hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground px-3 py-2 rounded transition-colors duration-200">
                  <Box className="size-5" />
                  <span>Meus Produtos</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
           

           ) : (
           <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="instructor" className="flex items-center gap-3 hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground px-3 py-2 rounded transition-colors duration-200">
                  <Box className="size-5" />
                  <span>Ser um instrutor</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>


           ) 
          }
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/profile" className="flex items-center gap-3 hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground px-3 py-2 rounded transition-colors duration-200">
                  <User className="size-5" />
                  <span>Perfil</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  
        <main className=" z-0 flex-1 overflow-auto p-6 bg-transparent">
        {isMobile && <SidebarTrigger className={ "bg-white"} /> }
        
        {children}
      
      </main>

   
 </SidebarProvider>
  );
}