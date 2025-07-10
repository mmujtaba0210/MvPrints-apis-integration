import React from "react";

const activities = [
  { time: "10:10", message: "Morbi quis ex eu arcu auctor sagittis.", user: "Johne" },
  { time: "08:40", message: "Proin iaculis eros non odio ornare efficitur.", user: "Rima" },
  { time: "07:10", message: "In mattis mi ut posuere consectetur.", user: "Josef" },
  { time: "01:15", message: "Morbi quis ex eu arcu auctor sagittis.", user: "Rima" },
  { time: "23:12", message: "Morbi quis ex eu arcu auctor sagittis.", user: "Alaxa" },
];

const RecentActivity = () => {
  return (
    <div className="bg-white shadow rounded-xl p-4 max-w-xs">
      <h3 className="text-md font-semibold mb-4 text-black">Recent Activity</h3>
      {activities.map((activity, i) => (
        <div key={i} className="flex items-start space-x-2 mb-3">
          <div className="text-sm font-bold w-12 text-black">{activity.time}</div>
          <div className="text-sm text-gray-600">
            <p>{activity.message}</p>
            <p className="text-xs text-blue-600">by {activity.user}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
