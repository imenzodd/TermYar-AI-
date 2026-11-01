import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, User, Plus, X } from 'lucide-react';
import { Course, CourseSchedule } from '../types';
import { PERSIAN_DAYS, getJalaliWeekDays, toPersianDigits } from '../utils/persian';

interface WeeklyScheduleViewProps {
  courses: Course[];
  onAddScheduleSlot: (courseId: string, slot: CourseSchedule) => void;
  lang?: 'en' | 'fa';
}

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({
  courses,
  onAddScheduleSlot,
  lang = 'fa',
}) => {
  const isFa = lang === 'fa';
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState(0);
  const [startTime, setStartTime] = useState('10:30');
  const [endTime, setEndTime] = useState('12:00');
  const [room, setRoom] = useState(isFa ? 'کلاس ۱۰۲ تالارها' : 'Room 302, Science Hall');

  const weekDays = getJalaliWeekDays();
  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  // Flatten all class schedules with course info
  const scheduledClasses: Array<{
    course: Course;
    schedule: CourseSchedule;
  }> = [];

  courses.forEach((course) => {
    course.schedule.forEach((sch) => {
      scheduledClasses.push({ course, schedule: sch });
    });
  });

  const [activeMobileDay, setActiveMobileDay] = useState<number>(() => {
    const today = weekDays.find((d) => d.isToday);
    return today ? today.dayIndex : 0;
  });
  const [mobileViewMode, setMobileViewMode] = useState<'day' | 'table'>('day');

  const selectedMobileDayData = weekDays.find((d) => d.dayIndex === activeMobileDay) || weekDays[0];
  const selectedMobileClasses = scheduledClasses.filter((c) => c.schedule.day === activeMobileDay);

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;
    onAddScheduleSlot(selectedCourseId, {
      day: Number(selectedDay),
      startTime,
      endTime,
      room,
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>{isFa ? 'برنامه هفتگی و کلاسی دانشگاه' : 'Weekly Class Schedule'}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isFa
              ? 'مشاهده زمان‌بندی دقیق کلاس‌ها، اساتید و شماره اتاق‌ها در طول هفته'
              : 'Weekly timetable, classrooms, professors, and course time slots'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Mobile view toggle */}
          <div className="flex md:hidden items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setMobileViewMode('day')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                mobileViewMode === 'day'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {isFa ? 'روزانه' : 'Day View'}
            </button>
            <button
              onClick={() => setMobileViewMode('table')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                mobileViewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {isFa ? 'کل هفته' : 'Full Week'}
            </button>
          </div>

          <button
            onClick={() => {
              if (courses.length === 0) {
                alert(
                  isFa
                    ? 'برای تنظیم ساعات برنامه هفتگی، لطفاً ابتدا حداقل یک درس را از بخش «دروس و نمرات» اضافه نمایید.'
                    : 'Please add at least one course in the Courses section first.'
                );
                return;
              }
              setShowAddModal(true);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isFa ? 'افزودن کلاس' : 'Add Class'}</span>
          </button>
        </div>
      </div>

      {/* MOBILE DAY SELECTOR VIEW (md:hidden when mobileViewMode is 'day') */}
      {mobileViewMode === 'day' && (
        <div className="md:hidden space-y-4">
          {/* Days bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {weekDays.map((d) => {
              const count = scheduledClasses.filter((c) => c.schedule.day === d.dayIndex).length;
              const isSelected = activeMobileDay === d.dayIndex;
              return (
                <button
                  key={d.name}
                  onClick={() => setActiveMobileDay(d.dayIndex)}
                  className={`flex flex-col items-center py-2 px-3 rounded-2xl min-w-[68px] shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : d.isToday
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold">{d.name}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {d.dateStr}
                  </span>
                  {count > 0 && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full mt-1 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                      }`}
                    >
                      {toPersianDigits(count)} کلاس
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Day Classes Card List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                کلاس‌های {selectedMobileDayData.name} ({selectedMobileDayData.dateStr})
              </span>
              <span>
                {selectedMobileClasses.length > 0
                  ? `${toPersianDigits(selectedMobileClasses.length)} جلسه آموزشی`
                  : 'تعطیل یا بدون کلاس'}
              </span>
            </div>

            {selectedMobileClasses.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                <CalendarDays className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">
                  در این روز هیچ کلاسی ثبت نشده است. می‌توانید استراحت کنید یا به مطالعه بپردازید.
                </p>
              </div>
            ) : (
              selectedMobileClasses.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5"
                  style={{ borderRightWidth: '4px', borderRightColor: item.course.color }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.course.name}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.course.code}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="tabular-nums font-medium">
                        {toPersianDigits(item.schedule.startTime)} - {toPersianDigits(item.schedule.endTime)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{item.schedule.room}</span>
                    </div>

                    <div className="flex items-center gap-1.5 truncate col-span-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>استاد: {item.course.professor}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Week Calendar Grid (Visible on md+ or when mobileViewMode is 'table') */}
      <div className={`${mobileViewMode === 'table' ? 'block' : 'hidden md:block'} space-y-2`}>
        {mobileViewMode === 'table' && (
          <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-xl text-[11px] text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-100 dark:border-indigo-900/50">
            <span>{isFa ? '💡 برای دیدن تمام روزها، جدول را به چپ یا راست بکشید' : '💡 Swipe horizontally to view all week days'}</span>
            <span className="font-mono text-xs">⟷</span>
          </div>
        )}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
          <div className="min-w-[720px]">
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-800/50">
            {weekDays.map((d) => (
              <div
                key={d.name}
                className={`p-3 border-l border-slate-200 dark:border-slate-800 last:border-l-0 ${
                  d.isToday ? 'bg-indigo-50/70 dark:bg-indigo-950/40 font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="block text-xs font-bold">{d.name}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">{d.dateStr}</span>
              </div>
            ))}
          </div>

          {/* Calendar Body: 7 Days Columns */}
          <div className="grid grid-cols-7 min-h-[460px] divide-x divide-x-reverse divide-slate-100 dark:divide-slate-800/80">
            {weekDays.map((d) => {
              const dayClasses = scheduledClasses.filter((c) => c.schedule.day === d.dayIndex);

              return (
                <div
                  key={d.name}
                  className={`p-2 space-y-2 min-h-full ${
                    d.isToday ? 'bg-indigo-50/20 dark:bg-indigo-950/10' : ''
                  }`}
                >
                  {dayClasses.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[11px] text-slate-300 dark:text-slate-600">
                      بدون کلاس
                    </div>
                  ) : (
                    dayClasses.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl text-right shadow-sm border transition-transform hover:-translate-y-0.5"
                        style={{
                          backgroundColor: `${item.course.color}15`,
                          borderColor: `${item.course.color}40`,
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: item.course.color }}
                          />
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {item.course.name}
                          </h4>
                        </div>

                        <div className="mt-1.5 space-y-1 text-[10px] text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="tabular-nums">
                              {toPersianDigits(item.schedule.startTime)} - {toPersianDigits(item.schedule.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{item.schedule.room}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] text-slate-400 truncate">
                            <User className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{item.course.professor}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-black text-sm text-slate-900 dark:text-white">
                {isFa ? 'ثبت ساعت کلاسی جدید' : 'Add New Class Slot'}
              </span>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isFa ? 'درس مربوطه:' : 'Select Course:'}
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.professor})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isFa ? 'روز هفته:' : 'Day of Week:'}
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
                >
                  {PERSIAN_DAYS.map((day, idx) => (
                    <option key={day} value={idx}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'ساعت شروع:' : 'Start Time:'}
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'ساعت پایان:' : 'End Time:'}
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  محل کلاس یا دانشکده:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: کلاس ۱۰۲ تالارها یا سایت ۲"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-bold"
                >
                  ثبت در تقویم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
