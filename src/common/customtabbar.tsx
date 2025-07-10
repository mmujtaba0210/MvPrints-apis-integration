// components/CustomTabs.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  notificationCount?: number;
}

interface CustomTabsProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  tabContainerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  showNotificationBadge?: boolean;
  variant?: "default" | "pill" | "underline";
  size?: "sm" | "md" | "lg";
  maxTabsPerRow?: number; // New prop to control when to wrap
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  className = "",
  tabContainerClassName = "",
  tabClassName = "",
  activeTabClassName = "",
  contentClassName = "",
  showNotificationBadge = true,
  variant = "default",
  size = "md",
  maxTabsPerRow = 5, // Default max tabs per row before wrapping
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || "");
  const [containerWidth, setContainerWidth] = useState(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Initialize ref array
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  // Calculate tab widths and container width
  useEffect(() => {
    if (containerRef.current && tabRefs.current.length > 0) {
      const widths = tabRefs.current.map(
        (tab) => tab?.getBoundingClientRect().width || 0
      );
      setTabWidths(widths);
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, [tabs]);

  const handleTabChange = (tabId: string) => {
    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const handleSwipeLeft = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      handleTabChange(tabs[currentIndex + 1].id);
    }
  };

  const handleSwipeRight = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      handleTabChange(tabs[currentIndex - 1].id);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  // Determine if tabs should wrap based on container width or maxTabsPerRow
  const shouldWrap = tabs.length > maxTabsPerRow;

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  // Variant classes
  const variantClasses = {
    default: {
      tab: "relative hover:text-primary-500",
      active: "text-primary-600 font-semibold",
    },
    pill: {
      tab: "rounded-lg hover:bg-gray-100",
      active: "bg-primary-100 text-primary-600 font-semibold",
    },
    underline: {
      tab: "border-b-2 border-transparent hover:text-primary-500",
      active: "text-primary-600 border-primary-600 font-semibold",
    },
  };

  if (tabs.length === 0) return null;

  return (
    <div className={`flex flex-col w-full ${className}`} ref={containerRef}>
      {/* Tab Headers */}
      <div
        className={`flex ${shouldWrap ? "flex-wrap" : "flex-nowrap"} gap-1 ${
          variant === "default" ? "border-b border-gray-200 pb-1" : ""
        } ${tabContainerClassName}`}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`flex items-center justify-center transition-all duration-300 ${
              sizeClasses[size]
            } min-w-fit whitespace-nowrap ${
              tab.id === activeTab
                ? `${variantClasses[variant].active} ${activeTabClassName}`
                : `text-gray-600 ${tabClassName}`
            } ${variantClasses[variant].tab}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {showNotificationBadge && tab.notificationCount ? (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {tab.notificationCount}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`mt-4 ${contentClassName}`} {...swipeHandlers}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default CustomTabs;