// app/dashboard/model/calendar/page.tsx
"use client";

import { useState } from "react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isSelected = selectedDate?.getDate() === day && 
                        selectedDate?.getMonth() === currentDate.getMonth();
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`
            h-12 rounded-xl font-medium transition-all
            ${isToday(day) ? "bg-yellow-500 text-black" : ""}
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${!isToday(day) && !isSelected ? "hover:bg-zinc-800 text-zinc-300" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">📆 Calendar</h1>
            <p className="text-zinc-400 text-sm">Manage your schedule</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              ←
            </button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              →
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-zinc-500 text-sm font-medium py-2">
                {day}
              </div>
            ))}
            {renderDays()}
          </div>

          {/* Events */}
          {selectedDate && (
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <h3 className="font-semibold mb-3">
                Events for {selectedDate.toLocaleDateString()}
              </h3>
              <div className="bg-zinc-800/50 rounded-lg p-4 text-center text-zinc-400">
                No events scheduled for this day
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}