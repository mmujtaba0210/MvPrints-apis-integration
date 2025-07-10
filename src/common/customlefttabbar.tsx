import React, { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface LeftSideTabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  tabWidth?: string;
  tabHeight?: string;
  tabStyle?: React.CSSProperties;
  activeTabStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  showIcons?: boolean;
  containerClassName?: string;
}

const LeftSideTabs: React.FC<LeftSideTabsProps> = ({
  tabs,
  defaultActiveTab,
  tabWidth = '260px',
  tabHeight = '48px',
  tabStyle,
  activeTabStyle,
  contentStyle,
  showIcons = true,
  containerClassName = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [sidebarHeight, setSidebarHeight] = useState('100%');

  useEffect(() => {
    // Calculate height based on number of tabs
    const calculatedHeight = `calc(${tabs.length} * (${tabHeight} + 8px) + 16px`;
    setSidebarHeight(`min(100%, ${calculatedHeight})`);
  }, [tabs.length, tabHeight]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const tabBarContainerStyle: React.CSSProperties = {
    width: tabWidth,
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e1e4e8',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    height: sidebarHeight,
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start'
  };

  const baseTabStyle: React.CSSProperties = {
    padding: '0 20px',
    textAlign: 'left',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: tabHeight,
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
    margin: '4px 12px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
    ...tabStyle
  };

  const baseActiveTabStyle: React.CSSProperties = {
    backgroundColor: '#f0f7ff',
    color: '#1a73e8',
    fontWeight: '600',
    boxShadow: '0 2px 6px rgba(63, 131, 248, 0.15)',
    ...activeTabStyle
  };

  const activeIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '60%',
    width: '3px',
    backgroundColor: '#3b82f6',
    borderRadius: '3px',
    transition: 'all 0.3s ease'
  };

  const hoverTabStyle: React.CSSProperties = {
    backgroundColor: '#f8fafc',
    color: '#3b82f6'
  };

  return (
    <div className={`flex flex-col md:flex-row h-full w-full bg-white ${containerClassName}`}>
      {/* Tab Bar - Scrollable if many tabs */}
      <div style={tabBarContainerStyle} className="custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              ...baseTabStyle,
              ...(activeTab === tab.id ? baseActiveTabStyle : {}),
            }}
            className="hover:bg-gray-50 transition-colors"
          >
            {activeTab === tab.id && <div style={activeIndicatorStyle} />}
            {showIcons && tab.icon && (
              <span className="text-current opacity-80">
                {tab.icon}
              </span>
            )}
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area - Responsive padding */}
      <div 
        style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: '#f9fafb',
          ...contentStyle
        }}
        className="p-4 md:p-6 lg:p-8"
      >
        {tabs.find(tab => tab.id === activeTab)?.content || (
          <div className="text-gray-500">No content available</div>
        )}
      </div>
    </div>
  );
};

export default LeftSideTabs;