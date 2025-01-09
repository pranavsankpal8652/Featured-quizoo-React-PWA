
"use client";

import { Card, Dropdown } from "flowbite-react";
import Home_Portals from "./Home_Portals";

export function Home() {
  return (
    <div className="max-w-[100%] h-screen bg-gradient-to-br from-blue-300 via-transparent to-blue-50">
        <div className="max-w-[1000px]  flex  justify-around mx-auto items-center h-screen flex-col lg:flex-row ">
          <Home_Portals Portal_name='Admin' portal_desc="want to add quiz?"/>
          <Home_Portals Portal_name='Student' portal_desc="want to attempt quiz?"/>
        </div>
    </div> 
  
  );
}
