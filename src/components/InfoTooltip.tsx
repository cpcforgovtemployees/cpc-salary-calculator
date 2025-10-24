import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  content: React.ReactNode;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setOpen((prev) => !prev);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".info-tooltip-wrapper")) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile && open) {
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [isMobile, open]);

  return (
    <TooltipProvider delayDuration={isMobile ? 0 : 150}>
      <div className="relative inline-block info-tooltip-wrapper">
        <Tooltip open={!isMobile ? undefined : open}>
          <TooltipTrigger asChild>
            <button
              onClick={handleToggle}
              className="ml-1 text-gray-500 hover:text-gray-700 transition-transform duration-200 hover:scale-105 focus:outline-none"
              aria-label="More information"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>

          <TooltipContent
            side={isMobile ? "top" : "bottom"}
            align="center"
            className={`${
              isMobile ? "!w-[250px] left-1/2 -translate-x-1/2" : "!w-[300px]"
            } whitespace-normal bg-white border border-gray-200 text-gray-800 shadow-md rounded-lg px-4 py-3 text-xs leading-relaxed animate-fade-in z-[9999]`}
          >
            {content}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
