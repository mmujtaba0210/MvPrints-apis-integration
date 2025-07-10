// components/OrderManagementTabs.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSwipeable } from "react-swipeable";

type OrderTab = "proof" | "all" | "details" | "replacement" | "refund" | "return";

interface OrderTabConfig {
  id: OrderTab;
  label: string;
  content: React.ReactNode;
}

interface OrderManagementTabsProps {
  defaultActiveTab?: OrderTab;
  onTabChange?: (tabId: OrderTab) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  children?: (activeTab: OrderTab) => React.ReactNode;
}

const OrderManagementTabs: React.FC<OrderManagementTabsProps> = ({
  defaultActiveTab = "proof",
  onTabChange,
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  contentClassName = "",
  children,
}) => {
  const [activeTab, setActiveTab] = useState<OrderTab>(defaultActiveTab);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: "0px", width: "0px" });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs: OrderTabConfig[] = [
    { id: "proof", label: "Order Proof", content: children?.("proof") },
    { id: "all", label: "All Orders", content: children?.("all") },
    { id: "details", label: "Order Details", content: children?.("details") },
    { id: "replacement", label: "Replacements", content: children?.("replacement") },
    { id: "refund", label: "Refunds", content: children?.("refund") },
    { id: "return", label: "Return Requests", content: children?.("return") },
  ];

  // Initialize ref array
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  const updateIndicator = useCallback((tabIndex: number) => {
    const tabElement = tabRefs.current[tabIndex];
    if (tabElement) {
      setIndicatorStyle({
        left: `${tabElement.offsetLeft}px`,
        width: `${tabElement.offsetWidth}px`,
      });
    }
  }, []);

  const handleTabChange = (tabId: OrderTab) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleSwipeLeft = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      handleTabChange(tabs[currentIndex + 1].id);
    }
  };

  const handleSwipeRight = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      handleTabChange(tabs[currentIndex - 1].id);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex >= 0) {
      updateIndicator(activeIndex);
    }
  }, [activeTab, tabs, updateIndicator]);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Tab Headers */}
      <div className="relative flex overflow-x-auto no-scrollbar border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors duration-200 whitespace-nowrap ${
                tab.id === activeTab
                  ? `text-primary-600 border-b-2 border-primary-600 ${activeTabClassName}`
                  : `text-gray-500 hover:text-gray-700 ${tabClassName}`
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div 
        className={`mt-4 ${contentClassName}`}
        {...swipeHandlers}
      >
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default OrderManagementTabs;