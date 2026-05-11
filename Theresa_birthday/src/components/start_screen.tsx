import start_video from "../assets/video.mp4"
import {ChevronDown} from "lucide-react";
import GlowBackground from "./PageBackground";

export default function Start() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <GlowBackground color="#a855f7" intensity={0.2} />
      <h1 className=" z-10">
        <video  
        src={start_video} 
        autoPlay
        loop
        muted
        playsInline
        className="h-150"/>
      </h1>
    <ChevronDown size={50} color="#fff" className="absolute bottom-0 animate-bounce"/>
    </div>
  )
}