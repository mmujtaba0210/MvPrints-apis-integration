"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  FaHome,
  FaBars,
  FaTimes,
  FaStar,
  FaShoppingBasket,
  FaUsers,
  FaBoxes,
  FaChartBar,
  FaSignOutAlt,
  FaHandHoldingHeart,
  FaBook,
  FaListAlt,
  FaGift,
  FaCog,
} from "react-icons/fa";
import { FaMessage, FaTicket } from "react-icons/fa6";
import { SidebarType } from "../types/sidebar";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  link: SidebarType;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { text: "Dashboard", icon: <FaHome />, link: "dashboard" },
  {
    text: "Orders",
    icon: <FaShoppingBasket />,
    link: "orders",
    subItems: [
      { text: "Order Details", icon: <FaListAlt />, link: "order-details" },
      { text: "All Orders", icon: <FaListAlt />, link: "all-orders" },
      {
        text: "Order Verification",
        icon: <FaListAlt />,
        link: "order-verification",
      },
      { text: "Order Dispute", icon: <FaListAlt />, link: "order-dispute" },
      { text: "Order Proof", icon: <FaListAlt />, link: "order-proof" },
    ],
  },
  { text: "Quotation", icon: <FaHome />, link: "quotation" },
  { text: "Customers", icon: <FaUsers />, link: "customers" },
  { text: "Financing", icon: <FaChartBar />, link: "finance" },
  {
    text: "Products",
    icon: <FaBoxes />,
    link: "products",
    subItems: [
      {
        text: "Product Management",
        icon: <FaBoxes />,
        link: "product-management",
      },
      { text: "Product Category", icon: <FaBoxes />, link: "product-category" },
    ],
  },
  { text: "Loyalty", icon: <FaStar />, link: "loyality" },
  {
    text: "Gift Cards",
    icon: <FaGift />,
    link: "gift-card-transactions",
    subItems: [
      { text: "Gift Cards", icon: <FaGift />, link: "gift-cards" },
      {
        text: "Gift Cards Transactions",
        icon: <FaGift />,
        link: "gift-card-transactions",
      },
    ],
  },
  {
    text: "Support",
    icon: <FaHandHoldingHeart />,
    link: "support",
    subItems: [
      { text: "Message", icon: <FaMessage />, link: "message" },
      { text: "Ticket", icon: <FaTicket />, link: "ticket" },
    ],
  },
  { text: "Marketing", icon: <FaChartBar />, link: "marketing" },
  {
    text: "Donations",
    icon: <FaHandHoldingHeart />,
    link: "charity",
    subItems: [
      { text: "Charity", icon: <FaHandHoldingHeart />, link: "charity" },
      { text: "Donation", icon: <FaHandHoldingHeart />, link: "donations" },
    ],
  },
  { text: "Blog", icon: <FaBook />, link: "blog" },
  { text: "Reports", icon: <FaChartBar />, link: "reports" },
  {
    text: "Settings",
    icon: <FaCog />,
    link: "settings",
    subItems: [
      { text: "General Settings", icon: <FaCog />, link: "general-settings" },
      { text: "Menu Settings", icon: <FaCog />, link: "menu-settings" },
      { text: "Payment Settings", icon: <FaCog />, link: "payment-settings" },
      { text: "Email Settings", icon: <FaCog />, link: "email-settings" },
      {
        text: "HomePage Settings",
        icon: <FaCog />,
        link: "home-page-settings",
      },
      { text: "Social Settings", icon: <FaCog />, link: "social-settings" },
    ],
  },
  {
    text: "Users",
    icon: <FaUsers />,
    link: "roles",
    subItems: [
      { text: "Staff", icon: <FaUsers />, link: "staff" },
      { text: "Manage Roles", icon: <FaUsers />, link: "roles" },
    ],
  },
];

interface SidebarProps {
  onSelect: (link: SidebarType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeSection?: SidebarType;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSelect,
  isOpen,
  setIsOpen,
  activeSection = "dashboard",
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const router = useRouter();
  const pathname = usePathname() || "";

  const toggleExpand = (text: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [text.toLowerCase()]: !prev[text.toLowerCase()],
    }));
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => {
      const isActive =
        activeSection === item.link || pathname.includes(item.link);

      return (
        <div key={`${item.text}-${level}`} className="flex flex-col">
          <div
            onClick={() =>
              item.subItems ? toggleExpand(item.text) : onSelect(item.link)
            }
            className={clsx(
              "relative rounded-tl-full rounded-bl-full flex items-center justify-start px-2 py-3 cursor-pointer hover:bg-[#e1e4e8d4] transition-transform gap-2",
              isActive ? "bg-[#e1e4e8d4] text-pink-500" : "text-gray-700",
              !isOpen && "justify-center"
            )}
            style={{ paddingLeft: isOpen ? `${level * 12 + 8}px` : "0" }}
          >
            <span
              className={clsx(
                "p-1.5 text-xl rounded-full",
                isActive
                  ? "bg-pink-500 text-white"
                  : "hover:bg-pink-500 hover:text-white",
                !isOpen && "mx-1"
              )}
            >
              {item.icon}
            </span>

            {isOpen && (
              <>
                <span className="text-sm truncate transition-all duration-300">
                  {item.text}
                </span>
                {item.subItems && (
                  <span className="ml-auto text-xs">
                    {expandedItems[item.text.toLowerCase()] ? "▼" : "▶"}
                  </span>
                )}
              </>
            )}
          </div>

          {item.subItems &&
            expandedItems[item.text.toLowerCase()] &&
            isOpen && (
              <div className="ml-4">
                {renderNavItems(item.subItems, level + 1)}
              </div>
            )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden ">
        <aside
          className={clsx(
            "bg-white shadow-md h-full transition-all duration-500  border-gray-300 flex flex-col ",
            isOpen ? "w-64" : "w-16"
          )}
        >
          <nav className="py-4 flex flex-col gap-1 overflow-y-auto flex-1 scrollbar-hide">
            {renderNavItems(navItems)}
          </nav>

          {/* Logout Button at bottom */}
          <div
            onClick={() => console.log("Logout clicked")}
            className={clsx(
              "relative rounded-tl-full rounded-bl-full flex items-center justify-start px-2 py-3 cursor-pointer hover:bg-[#e1e4e8d4] transition-transform gap-2 mb-4",
              !isOpen && "justify-center"
            )}
          >
            <span className="p-1.5 text-xl rounded-full hover:bg-pink-500 hover:text-white">
              <FaSignOutAlt />
            </span>
            {isOpen && (
              <span className="text-sm truncate transition-all duration-300">
                Logout
              </span>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
