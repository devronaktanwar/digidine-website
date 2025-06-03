import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-[100dvh] w-full">
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => router.push("/business")}>
          Business Site
        </Button>
        <Button onClick={() => router.push("/scan")}>Ordering Site</Button>
      </div>
    </div>
  );
};

export default Hero;
