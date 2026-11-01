import React, { useState, useEffect, useMemo } from 'react';
import {
  initialCourses,
  initialMarketItems,
  initialNeedRequests,
  initialProfile,
  initialTasks,
} from './data/initialData';
import {
  AcademicResource,
  Course,
  CourseSchedule,
  MarketItem,
  NeedRequest,
  ResourceNote,
  StudyLog,
  Task,
  TaskType,
  UserProfile,
} from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MarketplaceView } from './components/MarketplaceView';
import { NeedRequestsView } from './components/NeedRequestsView';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { CoursesView } from './components/CoursesView';
import { TasksView } from './components/TasksView';
import { FocusTimerView } from './components/FocusTimerView';
import { FavoritesView } from './components/FavoritesView';
import { SettingsView } from './components/SettingsView';
import { AcademicResourcesView } from './components/AcademicResourcesView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { UploadResourceModal } from './components/UploadResourceModal';
import { SemesterHealthScoreModal } from './components/SemesterHealthScoreModal';
import { SemesterHealthScoreCard } from './components/SemesterHealthScoreCard';
import { MonetizationPitchModal } from './components/MonetizationPitchModal';
import { NewTaskModal } from './components/NewTaskModal';
import { NewMarketItemModal } from './components/NewMarketItemModal';
import { NewNeedRequestModal } from './components/NewNeedRequestModal';
import { ProfileModal } from './components/ProfileModal';
import {
  loadAllResources,
  saveResourceToVault,
  deleteResourceFromVault,
  loadResourceNotes,
} from './utils/resourceStorage';
import { calculateSemesterHealthScore } from './utils/healthScoreCalculator';
import { BusinessDossierView } from './components/BusinessDossierView';
import { LayoutDashboard, BookOpen, CheckSquare, CalendarDays, Menu, GraduationCap } from 'lucide-react';

export default function App() {
  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Language state (default 'en' matching the mockup screenshot, toggleable to 'fa')
  const [lang, setLang] = useState<'en' | 'fa'>(() => {
    return (localStorage.getItem('ty_lang') as 'en' | 'fa') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ty_lang', lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ty_dark_mode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ty_dark_mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Active navigation tab (defaults to 'dossier' for the academic presentation, easily toggled)
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('tab')) return urlParams.get('tab') as string;
    }
    const saved = localStorage.getItem('ty_active_tab_v7');
    return saved || 'dossier';
  });

  useEffect(() => {
    localStorage.setItem('ty_active_tab_v7', activeTab);
  }, [activeTab]);

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ty_profile_v6');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  // Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ty_courses_v6');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  // Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ty_tasks_v6');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Market Items
  const [marketItems, setMarketItems] = useState<MarketItem[]>(() => {
    const saved = localStorage.getItem('ty_market_v6');
    return saved ? JSON.parse(saved) : initialMarketItems;
  });

  // Need Requests
  const [needRequests, setNeedRequests] = useState<NeedRequest[]>(() => {
    const saved = localStorage.getItem('ty_needs_v6');
    return saved ? JSON.parse(saved) : initialNeedRequests;
  });

  // Study sessions
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem('ty_study_v6');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorite Items (Marketplace items, courses, tasks)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ty_favs_v6');
    return saved ? JSON.parse(saved) : ['m-1', 'c-1', 't-1'];
  });

  // Modals state
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskInitialType, setNewTaskInitialType] = useState<TaskType>('homework');
  const [isNewMarketModalOpen, setIsNewMarketModalOpen] = useState(false);
  const [isNewNeedModalOpen, setIsNewNeedModalOpen] = useState(false);
  const [isMonetizationModalOpen, setIsMonetizationModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('ty_profile_v6', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ty_tasks_v6', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ty_courses_v6', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('ty_market_v6', JSON.stringify(marketItems));
  }, [marketItems]);

  useEffect(() => {
    localStorage.setItem('ty_needs_v6', JSON.stringify(needRequests));
  }, [needRequests]);

  useEffect(() => {
    localStorage.setItem('ty_study_v6', JSON.stringify(studyLogs));
  }, [studyLogs]);

  // Academic Resources Vault & Notes state
  const [resources, setResources] = useState<AcademicResource[]>([]);
  const [notes, setNotes] = useState<ResourceNote[]>([]);
  const [selectedViewerResource, setSelectedViewerResource] = useState<AcademicResource | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [weeklyGoalHours, setWeeklyGoalHours] = useState<number>(() => {
    const saved = localStorage.getItem('ty_goal_hours');
    return saved ? parseInt(saved, 10) : 15;
  });

  useEffect(() => {
    localStorage.setItem('ty_goal_hours', String(weeklyGoalHours));
  }, [weeklyGoalHours]);

  // Load vault resources and notes on mount
  useEffect(() => {
    loadAllResources().then(setResources);
    loadResourceNotes().then(setNotes);
  }, []);

  const handleRefreshNotes = () => {
    loadResourceNotes().then(setNotes);
  };

  const handleToggleFavoriteResource = async (id: string) => {
    setResources((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
      const target = updated.find((r) => r.id === id);
      if (target) saveResourceToVault(target);
      return updated;
    });
  };

  const handleDeleteResource = async (id: string) => {
    await deleteResourceFromVault(id);
    setResources((prev) => prev.filter((r) => r.id !== id));
    if (selectedViewerResource?.id === id) {
      setSelectedViewerResource(null);
    }
  };

  const handleAddResource = async (newResource: AcademicResource) => {
    await saveResourceToVault(newResource);
    setResources((prev) => [newResource, ...prev.filter((r) => r.id !== newResource.id)]);
  };

  const handleUpdateResource = async (updatedResource: AcademicResource) => {
    await saveResourceToVault(updatedResource);
    setResources((prev) => prev.map((r) => (r.id === updatedResource.id ? updatedResource : r)));
    if (selectedViewerResource?.id === updatedResource.id) {
      setSelectedViewerResource(updatedResource);
    }
  };

  // Deterministic Semester Health Score calculation
  const healthData = useMemo(() => {
    return calculateSemesterHealthScore(tasks, courses, studyLogs, weeklyGoalHours, lang);
  }, [tasks, courses, studyLogs, weeklyGoalHours, lang]);

  // Favorite toggle handler
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Reset to Mockup Demo Data
  const handleResetToSampleData = () => {
    setUser(initialProfile);
    setCourses(initialCourses);
    setTasks(initialTasks);
    setMarketItems(initialMarketItems);
    setNeedRequests(initialNeedRequests);
    setFavoriteIds(['m-1', 'c-1']);
  };

  // Clear all data (blank slate)
  const handleClearAllData = () => {
    setUser({
      name: '',
      studentId: '',
      university: '',
      major: '',
      dormitory: '',
      roomNumber: '',
      avatar: '👨‍🎓',
    });
    setCourses([]);
    setTasks([]);
    setMarketItems([]);
    setNeedRequests([]);
    setStudyLogs([]);
    setFavoriteIds([]);
  };

  // Handlers
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleUpdateCourseProgress = (courseId: string, progress: number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, progress } : c))
    );
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const handleAddScheduleSlot = (courseId: string, slot: CourseSchedule) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return { ...c, schedule: [...c.schedule, slot] };
        }
        return c;
      })
    );
  };

  const handleAddMarketItem = (newItem: MarketItem) => {
    setMarketItems((prev) => [newItem, ...prev]);
  };

  const handleAddNeedRequest = (newNeed: NeedRequest) => {
    setNeedRequests((prev) => [newNeed, ...prev]);
  };

  const handleRespondToNeed = (requestId: string) => {
    setNeedRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, responsesCount: r.responsesCount + 1 } : r
      )
    );
  };

  const handleAddStudyLog = (log: StudyLog) => {
    setStudyLogs((prev) => [log, ...prev]);
  };

  const openNewTaskModal = (type: TaskType = 'homework') => {
    setNewTaskInitialType(type);
    setIsNewTaskModalOpen(true);
  };

  const pendingTasksCount = tasks.filter((t) => !t.done).length;

  // Dedicated Academic Business Dossier view for E-commerce university course
  if (activeTab === 'dossier') {
    return (
      <BusinessDossierView
        onSwitchToLiveApp={() => {
          setActiveTab('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-row">
      {/* 1. Navigation Sidebar (Desktop permanent + Mobile slide-over drawer) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openNeedsCount={needRequests.length}
        marketItemsCount={marketItems.length}
        pendingTasksCount={pendingTasksCount}
        user={user}
        lang={lang}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Flow (Header + Dynamic Dashboard) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar
          user={user}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          lang={lang}
          setLang={setLang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenNewTaskModal={() => openNewTaskModal('homework')}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenDossier={() => {
            setActiveTab('dossier');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-8 max-w-[1400px] w-full mx-auto pb-24 lg:pb-8">
          {/* Academic Dossier Quick Access Banner */}
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-indigo-950/40 border border-indigo-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{lang === 'fa' ? 'پرونده تحلیلی درس تجارت الکترونیک دانشگاه (TermYar Dossier)' : 'E-Commerce Academic Business Dossier'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-500/30">
                    {lang === 'fa' ? '۱۰ بخش تحلیلی' : '10 Sections'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  {lang === 'fa' ? 'امکان‌سنجی، تفکیک ارزش کاربردی/مبادله‌ای، پاسخ ۸ سؤال ایده بالغ و سناریوهای عملیاتی' : 'Feasibility, use vs exchange value, 8 mature idea questions, and pilot strategy'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  setActiveTab('dossier');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
              >
                {lang === 'fa' ? 'مطالعه پرونده تحلیلی' : 'Read Dossier'}
              </button>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <DashboardView
              user={user}
              tasks={tasks}
              courses={courses}
              marketItems={marketItems}
              needRequests={needRequests}
              lang={lang}
              healthData={healthData}
              onOpenHealthModal={() => setIsHealthModalOpen(true)}
              onToggleTask={handleToggleTask}
              onNavigateTab={(tab) => {
                if (tab === 'health_score') {
                  setIsHealthModalOpen(true);
                  return;
                }
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenNewTaskModal={() => openNewTaskModal('homework')}
              onOpenNewMarketModal={() => setIsNewMarketModalOpen(true)}
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
            />
          )}

          {activeTab === 'resources' && (
            <AcademicResourcesView
              resources={resources}
              courses={courses}
              lang={lang}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
              onOpenResourceViewer={(res) => setSelectedViewerResource(res)}
              onToggleFavorite={handleToggleFavoriteResource}
              onDeleteResource={handleDeleteResource}
              onQuickShare={(res) => setSelectedViewerResource(res)}
            />
          )}

          {activeTab === 'health_score' && (
            <div className="space-y-6">
              <SemesterHealthScoreCard
                healthData={healthData}
                lang={lang}
                onOpenAnalysisModal={() => setIsHealthModalOpen(true)}
                onNavigateTab={(tab: string) => setActiveTab(tab)}
              />
            </div>
          )}

          {activeTab === 'marketplace' && (
            <MarketplaceView
              items={marketItems}
              onOpenNewModal={() => setIsNewMarketModalOpen(true)}
              onOpenNeedRequestTab={() => setActiveTab('need_requests')}
              searchQuery={searchQuery}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              marketItems={marketItems}
              courses={courses}
              tasks={tasks}
              lang={lang}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              user={user}
              onSaveProfile={setUser}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              lang={lang}
              setLang={setLang}
              onResetToSampleData={handleResetToSampleData}
              onClearAllData={handleClearAllData}
            />
          )}

          {activeTab === 'need_requests' && (
            <NeedRequestsView
              requests={needRequests}
              onOpenNewNeedModal={() => setIsNewNeedModalOpen(true)}
              onRespondToNeed={handleRespondToNeed}
            />
          )}

          {activeTab === 'schedule' && (
            <WeeklyScheduleView
              courses={courses}
              onAddScheduleSlot={handleAddScheduleSlot}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourseProgress={handleUpdateCourseProgress}
              onDeleteCourse={handleDeleteCourse}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenNewTaskModal={openNewTaskModal}
              isExamOnly={false}
            />
          )}

          {activeTab === 'exams' && (
            <TasksView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenNewTaskModal={() => openNewTaskModal('exam')}
              isExamOnly={true}
            />
          )}

          {(activeTab === 'timer' || activeTab === 'statistics' || activeTab === 'reports') && (
            <FocusTimerView
              courses={courses}
              studyLogs={studyLogs}
              onAddStudyLog={handleAddStudyLog}
              lang={lang}
            />
          )}
        </main>

        {/* 3. Mobile Thumb Bottom Navigation Bar (Hidden on desktop lg+) */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg select-none">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium py-1 px-2.5 rounded-xl transition-colors ${
              activeTab === 'dashboard'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{lang === 'fa' ? 'داشبورد' : 'Home'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('resources');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium py-1 px-2.5 rounded-xl transition-colors ${
              activeTab === 'resources'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'fa' ? 'منابع درسی' : 'Vault'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('tasks');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium py-1 px-2.5 rounded-xl transition-colors ${
              activeTab === 'tasks'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>{lang === 'fa' ? 'تکالیف' : 'Tasks'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('schedule');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium py-1 px-2.5 rounded-xl transition-colors ${
              activeTab === 'schedule'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>{lang === 'fa' ? 'برنامه' : 'Schedule'}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-[10px] font-medium py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 transition-colors"
          >
            <Menu className="w-4 h-4" />
            <span>{lang === 'fa' ? 'بیشتر' : 'More'}</span>
          </button>
        </nav>
      </div>

      {/* Global Modals */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAddTask={handleAddTask}
        courses={courses}
        initialType={newTaskInitialType}
      />

      <NewMarketItemModal
        isOpen={isNewMarketModalOpen}
        onClose={() => setIsNewMarketModalOpen(false)}
        onAddItem={handleAddMarketItem}
        userDorm={user.dormitory || 'خوابگاه دانشجو'}
        userName={user.name || 'Alex Morgan'}
      />

      <NewNeedRequestModal
        isOpen={isNewNeedModalOpen}
        onClose={() => setIsNewNeedModalOpen(false)}
        onAddNeed={handleAddNeedRequest}
        userDorm={user.dormitory || 'خوابگاه دانشجو'}
        userName={user.name || 'Alex Morgan'}
      />

      <MonetizationPitchModal
        isOpen={isMonetizationModalOpen}
        onClose={() => setIsMonetizationModalOpen(false)}
        onGoToMarket={() => setActiveTab('marketplace')}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onSaveProfile={setUser}
      />

      {/* Module 1: PDF & Document Reader with Notes & Sharing */}
      <PdfViewerModal
        isOpen={!!selectedViewerResource}
        onClose={() => setSelectedViewerResource(null)}
        resource={selectedViewerResource}
        notes={notes}
        onRefreshNotes={handleRefreshNotes}
        onUpdateResource={handleUpdateResource}
        lang={lang}
      />

      {/* Module 1: Upload Academic Resource Modal */}
      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        courses={courses}
        userName={user.name || 'Alex Morgan'}
        onAddResource={handleAddResource}
        lang={lang}
      />

      {/* Module 2: Intelligent Semester Health Score Diagnostics Modal */}
      <SemesterHealthScoreModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
        healthData={healthData}
        lang={lang}
        onNavigateTab={(tab) => {
          setIsHealthModalOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onUpdateGoalHours={(hours) => setWeeklyGoalHours(hours)}
      />
    </div>
  );
}
