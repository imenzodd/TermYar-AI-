import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Compass,
  HelpCircle,
  ShieldCheck,
  Scale,
  Users,
  Target,
  Cpu,
  Zap,
  Printer,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Clock,
  Laptop,
  Building2,
  CalendarDays,
  FileCheck,
  PackageCheck,
  Award,
  Activity,
  ArrowLeft,
  Check,
  Flame,
  Info,
  DollarSign,
  Maximize2
} from 'lucide-react';

interface BusinessDossierViewProps {
  onSwitchToLiveApp?: () => void;
}

export const BusinessDossierView: React.FC<BusinessDossierViewProps> = ({ onSwitchToLiveApp }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: true,
    6: false,
    7: false,
    8: false,
  });
  const [offlineFilter, setOfflineFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for Table of Contents spy and back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = [
        'intro',
        'problems',
        'customers',
        'eight-questions',
        'classification',
        'online-offline',
        'mvp-definition',
        'scenarios',
        'validation-plan',
        'synthesis',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const toggleQuestion = (qNum: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  const expandAllQuestions = (expand: boolean) => {
    const newState: { [key: number]: boolean } = {};
    for (let i = 1; i <= 8; i++) {
      newState[i] = expand;
    }
    setExpandedQuestions(newState);
  };

  const handlePrint = () => {
    // Expand all questions prior to print so nothing is hidden
    expandAllQuestions(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const navItems = [
    { id: 'intro', label: '۱. معرفی کسب‌وکار', icon: Building2 },
    { id: 'problems', label: '۲. تحلیل مسئله و نیاز', icon: AlertTriangle },
    { id: 'customers', label: '۳. تحلیل مشتری و ارزش', icon: Users },
    { id: 'eight-questions', label: '۴. پاسخ به ۸ سؤال ایده بالغ', icon: HelpCircle },
    { id: 'classification', label: '۵. طبقه‌بندی ماهیت ایده', icon: Layers },
    { id: 'online-offline', label: '۶. فرایندهای آنلاین و آفلاین', icon: Scale },
    { id: 'mvp-definition', label: '۷. تعریف و مرزهای MVP', icon: Target },
    { id: 'scenarios', label: '۸. سناریوهای عملیاتی', icon: Activity },
    { id: 'validation-plan', label: '۹. اعتبارسنجی اولیه', icon: CheckCircle2 },
    { id: 'synthesis', label: '۱۰. جمع‌بندی تحلیلی', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white print:bg-white print:text-black antialiased relative">
      {/* Background Decorative Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden print:hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-10 w-[550px] h-[450px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Top Academic Banner */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                پرونده تحلیلی کسب‌وکار ترم‌یار (TermYar)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                پروژه دانشگاهی تجارت الکترونیک
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              امکان‌سنجی جامع، تحلیل تقاضای بازار، تفکیک ارزش‌ها و ارزیابی نسخه اولیه
            </p>
          </div>
        </div>

        {/* Global Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct link to external deployment */}
          <a
            href="https://term-yar.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="مشاهده سایت مستقر شده در ورسل در برگه جدید"
          >
            <span>مشاهده نسخه اولیه ترمیار</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Switch to local interactive app */}
          {onSwitchToLiveApp && (
            <button
              onClick={onSwitchToLiveApp}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all"
              title="جابجایی مستقیم به رابط کاربری نرم‌افزار ترمیار"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>تست زنده در همین تب</span>
            </button>
          )}

          {/* Print / Save PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800/60 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
            title="چاپ یا ذخیره به صورت فایل PDF دانشگاهی"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">چاپ / خروجی PDF</span>
          </button>
        </div>
      </header>

      {/* Sub-Header Horizontal Table of Contents (Sticky under header) */}
      <nav className="sticky top-[61px] z-30 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-8 py-2 overflow-x-auto no-scrollbar print:hidden">
        <div className="flex items-center gap-2 min-w-max mx-auto max-w-7xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16 print:space-y-8 print:p-0">
        {/* ========================================================= */}
        {/* SECTION 1: معرفی کسب‌وکار */}
        {/* ========================================================= */}
        <section id="intro" className="scroll-mt-32">
          {/* Header Card */}
          <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-900/90 via-[#0E1528]/80 to-slate-900/90 border border-indigo-500/20 backdrop-blur-xl shadow-2xl overflow-hidden print:border-slate-300 print:bg-white print:text-black">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>بخش اول: معرفی طرح کسب‌وکار دانشگاهی</span>
                </div>
                <div className="text-xs text-slate-400 print:text-slate-600">
                  درس: تجارت الکترونیک • مخاطب: دانشجویان آموزش عالی ایران
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight print:text-black">
                  ترم‌یار (TermYar) — پلتفرم یکپارچه مدیریت زیست‌بوم تحصیلی و اقتصاد خرد دانشجویی
                </h1>
                <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl print:text-slate-700">
                  ترمیار راهکاری نرم‌افزاری با معماری مدرن وب است که با حذف مرز میان «مدیریت زمان و تکالیف دانشگاهی» و «بازارچه تبادل منابع و کتاب‌های خوابگاهی»، تمامی نیازهای جاری دوره تحصیل دانشجو را در یک پنجره واحد، هوشمند و بدون اختلال متمرکز می‌سازد.
                </p>
              </div>

              {/* Grid 4 pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 print:border-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                    ۰۱
                  </div>
                  <h4 className="font-bold text-sm text-white print:text-black">چشم‌انداز (Vision)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed print:text-slate-600">
                    تبدیل شدن به استاندارد بومی سامانه‌های همراه تحصیلی برای بیش از ۵۰۰ هزار دانشجوی فعال در دانشگاه‌های معتبر کشور تا سال ۱۴۰۶.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 print:border-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    ۰۲
                  </div>
                  <h4 className="font-bold text-sm text-white print:text-black">مأموریت (Mission)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed print:text-slate-600">
                    کاهش اضطراب شب امتحان و فرسایش ذهنی دانشجو با یکپارچه‌سازی برنامه هفتگی، مدیریت تکالیف و تقویم امتحانات با دسترسی بی‌واسطه به منابع.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 print:border-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    ۰۳
                  </div>
                  <h4 className="font-bold text-sm text-white print:text-black">مخاطب هدف (Audience)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed print:text-slate-600">
                    دانشجویان کارشناسی و ارشد دانشگاه‌های دولتی و آزاد (به‌ویژه دانشجویان خوابگاهی و دور از خانواده که نیازمند خودمدیریتی بالا هستند).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 print:border-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ۰۴
                  </div>
                  <h4 className="font-bold text-sm text-white print:text-black">ارزش پیشنهادی (Value)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed print:text-slate-600">
                    ترکیب LMS شخصی‌سازی‌شده + خزانه آفلاین جزوات + بازارچه همتا‌به‌همتا (P2P) درون‌دانشگاهی بدون کارمزدهای سرسام‌آور یا تبلیغات تلگرامی.
                  </p>
                </div>
              </div>

              {/* Callout box linking to Live prototype */}
              <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-bold text-white">
                      نسخه اولیه محصول هم‌اکنون به صورت آنلاین و عملیاتی در دسترس است
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    نسخه پروتوتایپ کامل ترمیار با پشتیبانی از برنامه هفتگی، مدیریت تکالیف، تایمر پومودورو و مخزن جزوات روی Vercel منتشر شده است:
                  </p>
                </div>
                <a
                  href="https://term-yar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>مشاهده نسخه اولیه ترمیار</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: تحلیل مسئله و نیاز بازار */}
        {/* ========================================================= */}
        <section id="problems" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش دوم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                تحلیل مسئله و نیاز بازار (بررسی ۵ چالش ساختاری دانشجو)
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              فرضیات نیاز بازار (فاقد آمار جعلی)
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed print:text-slate-700">
            دانشجویان در طول هر نیم‌سال تحصیلی با حجم متراکمی از اطلاعات نامتمرکز، تکالیف پراکنده، جزوات ناقص و معاملات نامطمئن کتاب‌های ترم‌های قبل مواجهند. در زیر، ۵ مسئله محوری با چارچوب ۴ وجهی (تعریف مشکل، پیامد برای دانشجو، روش‌های جاری حل، و پاسخ ترمیار) موشکافی شده‌اند:
          </p>

          <div className="space-y-4">
            {/* Problem 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 print:border-slate-300 print:bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                    ۱
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white print:text-black">
                    پراکندگی مفرط اطلاعات آموزشی در پیام‌رسان‌ها و ابزارهای متفرقه
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80">
                  فرضیه نیاز بازار #۱
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-rose-400 mb-1">۱. مشکل چیست؟</div>
                  <p className="text-slate-300 leading-relaxed">
                    اطلاعیه‌های درسی در گروه‌های شلوغ تلگرام، کانال‌های ایتا، نوت گوشی و پیامک‌های متفرقه پخش شده و یک مرکزیت مشخص ندارند.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-amber-400 mb-1">۲. پیامد برای دانشجو:</div>
                  <p className="text-slate-300 leading-relaxed">
                    سردرگمی، فراموشی زمان تحویل پروژه‌ها، از دست رفتن نمرات مستمر کلاسی و استرس دائمی بررسی ده‌ها گروه متفرقه.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-slate-400 mb-1">۳. روش‌های فعلی حل:</div>
                  <p className="text-slate-300 leading-relaxed">
                    پین کردن پیام‌ها در تلگرام، عکس گرفتن از تخته در گالری گوشی یا استفاده ناهماهنگ از ابزارهای غربی مانند Trello یا Notion.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="font-bold text-indigo-300 mb-1">۴. پاسخ ترمیار:</div>
                  <p className="text-slate-200 leading-relaxed">
                    ایجاد داشبورد یکپارچه با ساختار Course-Centric که تمامی تکالیف، جزوات و برنامه‌های هر درس را در یک کارت هوشمند گردآوری می‌کند.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 print:border-slate-300 print:bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                    ۲
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white print:text-black">
                    دشواری مدیریت تقویم فرجه‌ها، تمرین‌ها و امتحانات در تقویم رسمی
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80">
                  فرضیه نیاز بازار #۲
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-rose-400 mb-1">۱. مشکل چیست؟</div>
                  <p className="text-slate-300 leading-relaxed">
                    دانشجو تقویم دقیقی از تداخل امتحانات پایان‌ترم، حجم فرجه‌های میان‌ترم و مهلت ارسال پروژه‌ها به تفکیک درس در دست ندارد.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-amber-400 mb-1">۲. پیامد برای دانشجو:</div>
                  <p className="text-slate-300 leading-relaxed">
                    غافلگیری در هفته‌های امتحانات، شب‌زنده‌داری‌های فرساینده و افت محسوس معدل ترم (GPA).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-slate-400 mb-1">۳. روش‌های فعلی حل:</div>
                  <p className="text-slate-300 leading-relaxed">
                    نوشتن دستی تاریخ امتحانات پشت برگه انتخاب‌واحد یا سررسیدهای کاغذی که در طول ترم معمولاً گم یا فراموش می‌شوند.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="font-bold text-indigo-300 mb-1">۴. پاسخ ترمیار:</div>
                  <p className="text-slate-200 leading-relaxed">
                    تقویم تعاملی شمسی، سیستم شمارش معکوس فرجه‌ها (Countdown)، اولویت‌بندی هوشمند وظایف و نمره سلامت ترم (Health Score).
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 print:border-slate-300 print:bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                    ۳
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white print:text-black">
                    دشواری و اتلاف وقت در دسترسی به منابع، جزوات و نمونه‌سوالات معتبر
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80">
                  فرضیه نیاز بازار #۳
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-rose-400 mb-1">۱. مشکل چیست؟</div>
                  <p className="text-slate-300 leading-relaxed">
                    دانشجویان در شب امتحان ساعت‌ها وقت خود را صرف التماس در گروه‌ها برای دریافت جزوه خوش‌خط، حل‌المسائل یا نمونه‌سوال سال‌های قبل می‌کنند.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-amber-400 mb-1">۲. پیامد برای دانشجو:</div>
                  <p className="text-slate-300 leading-relaxed">
                    دریافت فایل‌های ناقص، بی‌کیفیت یا نامعتبر که نتیجه آن عدم تسلط بر سرفصل‌های واقعی استاد و افت نمره است.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-slate-400 mb-1">۳. روش‌های فعلی حل:</div>
                  <p className="text-slate-300 leading-relaxed">
                    مراجعه به انتشارات دانشکده، کپی‌های گران‌قیمت یا جستجوی تصادفی در کانال‌های تلگرامی دانشگاه‌های دیگر.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="font-bold text-indigo-300 mb-1">۴. پاسخ ترمیار:</div>
                  <p className="text-slate-200 leading-relaxed">
                    مخزن منابع درسی (Academic Vault) با امکان مطالعه آنلاین/آفلاین PDF، یادداشت‌گذاری مستقیم، برچسب‌گذاری و اشتراک‌گذاری شفاف.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 print:border-slate-300 print:bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                    ۴
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white print:text-black">
                    نبود ارتباط ارگانیک میان برنامه کلاسی هفتگی و منابع مطالعاتی
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80">
                  فرضیه نیاز بازار #۴
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-rose-400 mb-1">۱. مشکل چیست؟</div>
                  <p className="text-slate-300 leading-relaxed">
                    تقویم کلاسی دانشجو با فایل‌ها و اسلایدهای آموزشی پیوند داده نشده است؛ هنگام شروع کلاس یا مطالعه، پیدا کردن فایل جلسه بسیار زمان‌بر است.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-amber-400 mb-1">۲. پیامد برای دانشجو:</div>
                  <p className="text-slate-300 leading-relaxed">
                    قطع تمرکز (Context Switching) و هدررفت انرژی ذهنی در فایل‌منیجر شلوغ گوشی یا لپ‌تاپ.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-slate-400 mb-1">۳. روش‌های فعلی حل:</div>
                  <p className="text-slate-300 leading-relaxed">
                    ساخت دستی پوشه‌های درهم در حافظه دستگاه، دانلودهای تکراری از تلگرام و مصرف حجم بیهوده اینترنت.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="font-bold text-indigo-300 mb-1">۴. پاسخ ترمیار:</div>
                  <p className="text-slate-200 leading-relaxed">
                    پیوند خودکار منابع با برنامه هفتگی، امکان ثبت یادداشت اختصاصی برای هر فایل و تایمر تمرکز متصل به همان درس.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 5 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 print:border-slate-300 print:bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                    ۵
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white print:text-black">
                    پراکندگی، کلاهبرداری و عدم اطمینان در خریدوفروش منابع و لوازم خوابگاهی
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80">
                  فرضیه نیاز بازار #۵
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-rose-400 mb-1">۱. مشکل چیست؟</div>
                  <p className="text-slate-300 leading-relaxed">
                    دانشجوی سال بالایی کتاب‌های گران‌قیمت یا تجهیزات خوابگاهی بلااستفاده دارد و دانشجوی سال اولی نیاز به خرید دارد اما به یکدیگر وصل نمی‌شوند.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-amber-400 mb-1">۲. پیامد برای دانشجو:</div>
                  <p className="text-slate-300 leading-relaxed">
                    تحمیل هزینه‌های سنگین چاپ کتاب نو (افزایش سرسام‌آور قیمت کاغذ) یا کلاهبرداری در بیعانه دادن به افراد ناشناس در گروه‌های تلگرامی.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                  <div className="font-bold text-slate-400 mb-1">۳. روش‌های فعلی حل:</div>
                  <p className="text-slate-300 leading-relaxed">
                    دیوار و شیپور (نامناسب به دلیل عدم تفکیک دانشگاه و نیاز به هزینه پست) یا گروه‌های بی‌نام‌ونشان خریدوفروش خوابگاه.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="font-bold text-indigo-300 mb-1">۴. پاسخ ترمیار:</div>
                  <p className="text-slate-200 leading-relaxed">
                    بازارچه درون‌دانشگاهی تفکیک‌شده بر اساس دانشگاه و خوابگاه با بخش «نیازمندی‌های فوری» و امکان تحویل حضوری مطمئن در محوطه.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: تحلیل مشتری و ارزش پیشنهادی */}
        {/* ========================================================= */}
        <section id="customers" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش سوم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                تحلیل مشتری و تفکیک ارزش‌های پیشنهادی
              </h2>
            </div>
            <span className="text-xs text-slate-400">تحلیل اقتصادی و رفتاری کاربران</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">مشتریان اصلی (User Segments)</h3>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>دانشجویان کارشناسی (سال ۱ و ۲):</strong> نیازمند نظم‌دهی اولیه، تقویم امتحانات و دسترسی به نمونه سوالات.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>دانشجویان خوابگاهی:</strong> متقاضیان فعال خریدوفروش وسایل، کتاب دست‌دوم و جزوه در محدوده فیزیکی خوابگاه.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>نمایندگان کلاس و TAها:</strong> مایل به توزیع منسجم منابع درسی و جلوگیری از پاسخ به ده‌ها پیام تکراری.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">انگیزه‌ها و درایورهای پذیرش</h3>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>صرفه‌جویی اقتصادی ملموس:</strong> تهیه کتاب‌ها با ۳۰ الی ۵۰ درصد قیمت نو و کسب درآمد از فروش وسایل قدیمی.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>کاهش تنش تحصیلی:</strong> جلوگیری از شوک امتحانات با سیستم هشدار فرجه‌ها و نمره سلامت ترم.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>تمرکز بالا:</strong> بهره‌گیری از تایمر پومودورو متصل به گزارش پیشرفت هر درس.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">موانع و اصطکاک‌های ورود (Frictions)</h3>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>اینرسی رفتاری (Habit Inertia):</strong> عادت عمیق دانشجویان به ارسال فایل در گروه‌های غیررسمی تلگرام.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>تنبلی در ورود داده‌ها:</strong> عدم تمایل اولیه به تایپ مشخصات ۵ درس و تاریخ امتحانات در ابتدای ترم.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>اعتماد در بازارچه:</strong> نگرانی خریدار از ناقص بودن برگه جزوه یا عدم حضور فروشنده در قرار خوابگاه.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Deep Academic Distinction: Use Value vs Exchange Value */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-indigo-500/30 space-y-4 print:border-slate-300 print:bg-white">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-base sm:text-lg text-white print:text-black">
                تفکیک علمی: ارزش کاربردی (Use Value) در برابر ارزش مبادله‌ای (Exchange Value)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed print:text-slate-700">
              بر مبنای تئوری ارزش در اقتصاد دیجیتال و درس تجارت الکترونیک، تمایز میان مطلوبیت مستقیم برای مصرف‌کننده و پتانسیل مبادلاتی نقدی در بازار به شرح زیر تعریف می‌شود:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-indigo-300">الف) ارزش کاربردی (Use Value)</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">مطلوبیت مستقیم تحصیلی</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ارزشی است که دانشجو مستقیماً از به‌کارگیری روزانه نرم‌افزار کسب می‌کند و باعث بهره‌وری می‌شود، بدون آنکه پولی جابجا شود:
                </p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>جلوگیری از فراموشی پروژه‌ها و ارتقای معدل از طریق نمره سلامت ترم.</li>
                  <li>افزایش ساعات مطالعه خالص با زمان‌سنج پومودورو بدون مزاحمت نوتیفیکیشن‌ها.</li>
                  <li>مطالعه بدون‌دردسر کتاب‌ها و اسلایدهای PDF در کتابخانه آفلاین.</li>
                  <li>کاهش استرس هفته‌های پایانی با تسلط دیداری بر تقویم امتحانات.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-emerald-300">ب) ارزش مبادله‌ای (Exchange Value)</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">قابلیت نقدشوندگی و تراکنش مالی</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ارزشی که در قالب قیمت، مبادله کالا و جریان وجوه نقدی بین اعضای پلتفرم یا به نفع ترمیار محقق می‌گردد:
                </p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>صرفه‌جویی خریدار:</strong> تهیه کتب ۵۰۰ هزار تومانی به قیمت ۱۵۰ هزار تومان از دانشجوی ترم قبل.</li>
                  <li><strong>درآمدزایی فروشنده:</strong> نقد کردن جزوات دست‌نویس باکیفیت و وسایل خوابگاهی که راکد مانده بودند.</li>
                  <li><strong>مدل درآمدی پلتفرم:</strong> دریافت کارمزد اندک (۵ تا ۷ درصد) در صورت اتصال درگاه امن امانی در فاز بلوغ.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: پاسخ تحلیلی به ۸ سؤال ایده بالغ */}
        {/* ========================================================= */}
        <section id="eight-questions" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-3">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش چهارم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                پاسخ تحلیلی به ۸ سؤال ایده بالغ (دستورالعمل ویژه درس تجارت الکترونیک)
              </h2>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={() => expandAllQuestions(true)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                باز کردن همه
              </button>
              <button
                onClick={() => expandAllQuestions(false)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                بستن همه
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed print:text-slate-700">
            بررسی ۸ شاخص حیاتی برای راستی‌آزمایی بلوغ ایده، بررسی ریسک‌ها، درک محدودیت‌ها و دفاع در برابر هیئت داوری دانشگاه:
          </p>

          <div className="space-y-4">
            {/* Question 1 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(1)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۱
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    آیا تقاضای بالفعل و نیازی واقعی در بازار کنونی وجود دارد؟
                  </span>
                </div>
                {expandedQuestions[1] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[1] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>پاسخ تحلیلی:</strong> بله، تقاضای بالفعل به صورت رفتارهای روزمره و آشکار در دانشگاه‌ها در حال جوشش است اما در بستر کانال‌های غیررسمی سرکوب می‌شود. روزانه هزاران دانشجو در گروه‌های تلگرامی و ایتا با پیام‌هایی چون «کسی جزوه دکتر فلانی رو داره؟»، «کتاب ریاضی مهندسی تمیز برای فروش دارم» یا «فرجه این درس چقدره؟» تبادل می‌کنند.
                  </p>
                  <p>
                    وجود کانال‌های تلگرامی متعدد تحت عنوان «خریدوفروش دانشگاه شهید بهشتی / تهران / امیرکبیر» یا «بانک جزوه» بزرگ‌ترین گواه عینی بر <strong>تقاضای موجود</strong> است. با این حال، به دلیل فقدان زیرساخت پایگاه‌داده مناسب در پیام‌رسان‌ها، این تبادلات پر از کلاهبرداری، گم شدن پیام‌ها و اتلاف وقت است. تقاضای بالفعل وجود دارد؛ وظیفه ترمیار ایجاد کانال متمرکز و ساختارمند است.
                  </p>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                    ⚠️ <strong>نیاز به تحقیق بیشتر:</strong> آیا دانشجویان حاضرند از تلگرامی که همیشه باز است به وب‌اپلیکیشن مستقل نقل مکان کنند؟ این فرضیه اصطکاک رفتار کاربر نیازمند پایش در طرح پایلوت است.
                  </div>
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(2)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۲
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    آیا ایده پاسخگوی نیازی واقعی است یا صرفاً متکی بر فرضیات طراح است؟
                  </span>
                </div>
                {expandedQuestions[2] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[2] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>پاسخ تحلیلی:</strong> بخش عمده نیازها واقعی و اثبات‌شده در زیست تحصیلی هستند: «داشتن برنامه هفتگی کلاسی»، «یادآوری تاریخ امتحان پایانی» و «دسترسی به جزوات شب امتحان» قطعی‌ترین رفتارهای هر دانشجو در هر ترم است.
                  </p>
                  <p>
                    اما برخی مولفه‌ها ممکن است <strong>«فرضیه طراح»</strong> باشند؛ به عنوان مثال:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pr-2">
                    <li>فرضیه ۱: آیا دانشجو واقعاً حوصله دارد نمره هر کوییز را وارد کند تا نرم‌افزار نمره سلامت ترم محاسبه کند؟</li>
                    <li>فرضیه ۲: آیا دانشجوی ایرانی از تایمر پومودورو در دسکتاپ استفاده می‌کند یا این کار را در اپلیکیشن‌های مستقل موبایل انجام می‌دهد؟</li>
                  </ul>
                  <p>
                    بنابراین نسخه MVP با تمرکز بر نیازهای قطعی (برنامه هفتگی + تکالیف + فایل‌های درسی) ساخته شده و امکانات تحلیلی به عنوان مشوق‌های اختیاری گنجانده شده‌اند.
                  </p>
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(3)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۳
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    ایده در کدام طبقه‌بندی قرار می‌گیرد؟ بنیادین، ترکیبی یا تطبیقی؟
                  </span>
                </div>
                {expandedQuestions[3] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[3] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>پاسخ تحلیلی:</strong> ترمیار یک <strong>ایده ترکیبی (Hybrid / Combinatorial)</strong> با المان‌های بارز <strong>تطبیقی (Adaptive)</strong> است و به هیچ وجه ادعای «نوآوری بنیادین (Radical)» ندارد.
                  </p>
                  <p>
                    <strong>وجه ترکیبی:</strong> تجمیع ابزارهای مدیریت پروژه کلاسی (Personal LMS) + زمان‌سنج مطالعه (Pomodoro) + کتابخانه ابری جزوات (Cloud Vault) + بازارچه دست‌دوم خوابگاهی (P2P Campus Marketplace) که پیش‌تر هرکدام به شکل تکه‌تکه در جاهای مجزا وجود داشتند.
                  </p>
                  <p>
                    <strong>وجه تطبیقی:</strong> تطبیق کامل با تقویم هجری شمسی، ساختار دانشگاه‌های ایران (ترم مهر، بهمن و تابستان)، ادبیات امتحانات فرجه‌دار و واحدهای درسی سیستم وزارت علوم.
                  </p>
                </div>
              )}
            </div>

            {/* Question 4 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(4)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۴
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    سقف رشد طبیعی و ظرفیت مقیاس‌پذیری کسب‌وکار کجاست؟
                  </span>
                </div>
                {expandedQuestions[4] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[4] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>تحلیل حجم بازار (TAM / SAM / SOM):</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pr-2">
                    <li><strong>کل بازار بالقوه (TAM):</strong> حدود ۳.۲ میلیون دانشجو در کل دانشگاه‌های دولتی، آزاد، پیام‌نور و غیرانتفاعی کشور.</li>
                    <li><strong>بازار در دسترس (SAM):</strong> حدود ۸۰۰ هزار دانشجوی دوره‌های کارشناسی و کارشناسی‌ارشد روزانه و آزاد در دانشگاه‌های مراکز استان‌ها با ضریب نفوذ اینترنت بالا.</li>
                    <li><strong>بازار هدف اولیه (SOM):</strong> ۵۰ هزار دانشجوی دانشگاه‌های برتر تهران و کلان‌شهرها در ۲ سال نخست.</li>
                  </ul>
                  <p>
                    <strong>مقیاس‌پذیری فنی:</strong> به دلیل معماری وب مدرن و استفاده از IndexedDB و ذخیره‌سازی محلی کلاینت برای اسناد در نسخه ۱.۰، هزینه‌های سرور در شروع بسیار پایین است. در صورت ورود به کلود مرکزی، مقیاس‌پذیری به ازای هر کاربر با هزینه‌های ذخیره‌سازی ابری همراه خواهد بود.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                    💡 <strong>سقف رشد طبیعی:</strong> هر دانشجو پس از ۴ سال فارغ‌التحصیل شده و نیاز به جذب مداوم ورودی‌های جدید سال اول (Churn طبیعی ۴ ساله) وجود دارد که این ویژگی ذاتی بازارهای دانشجویی است.
                  </div>
                </div>
              )}
            </div>

            {/* Question 5 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(5)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۵
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    مشتریان حاضرند دقیقاً در ازای کدام ارزش یا خدمت پول پرداخت کنند؟
                  </span>
                </div>
                {expandedQuestions[5] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[5] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>تحلیل دقیق تمایل به پرداخت (Willingness to Pay):</strong>
                  </p>
                  <p>
                    دانشجوی ایرانی <strong>هرگز برای تقویم کلاسی یا تایمر پومودورو پول پرداخت نمی‌کند</strong>، چرا که جایگزین‌های رایگان بی‌شماری در بازار وجود دارد. ادعای درآمدزایی از اشتراک مدیریت زمان یک سراب است!
                  </p>
                  <p>
                    نقاط تمایل قطعی به پرداخت در ۳ حوزه شکل می‌گیرد:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 pr-2">
                    <li><strong>صرفه‌جویی آنی در خرید کتاب فیزیکی:</strong> پرداخت ۱۵۰ هزار تومان برای کتابی که قیمت بازار آزاد آن ۶۰۰ هزار تومان است (خلق سود نقدی مستقیم).</li>
                    <li><strong>جزوات طلایی شب امتحان و نمونه‌سوالات حل‌شده:</strong> پرداخت مبالغ خرد (مثلاً ۲۰ الی ۵۰ هزار تومان) جهت دانلود جزوه دست‌نویس رتبه یک دانشگاه برای شب امتحان.</li>
                    <li><strong>کارمزد پرداخت امن در بازارچه خوابگاهی:</strong> کارمزد ۱ الی ۲ درصدی برای حفظ پول در حساب واسط تا زمان تحویل فیزیکی کالا.</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Question 6 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(6)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۶
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    آیا امکان ارزیابی میدانی و دریافت بازخورد اولیه از کاربران بالقوه وجود دارد؟
                  </span>
                </div>
                {expandedQuestions[6] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[6] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>پاسخ تحلیلی:</strong> بله، کاملاً در دسترس است زیرا جامعه مخاطبان دقیقاً در دسترس دانشجویان بنیان‌گذار قرار دارد (دانشکده، خوابگاه و گروه‌های کلاسی هم‌رشته).
                  </p>
                  <p>
                    می‌توان نسخه اولیه منتشرشده در Vercel را در قالب لینک تست به ۸۰ تا ۱۰۰ نفر از دانشجویان کلاس یا خوابگاه ارائه داد و با پرسشنامه Google Forms و ترکینگ رفتاری (Heatmaps و لاگ‌های ثبت درس) موارد زیر را سنجید:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pr-2">
                    <li>چند درصد کاربران پس از روز اول دوباره به سایت سر زدند؟ (Retention D7)</li>
                    <li>کدام قابلیت محبوب‌تر بود: بارگذاری جزوات، تقویم امتحانات یا آگهی بازارچه؟</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Question 7 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(7)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۷
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    در صورت بروز مانع در مدل عملیاتی، چه راهکارها و سناریوهای واکنشی وجود دارد؟
                  </span>
                </div>
                {expandedQuestions[7] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[7] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>موانع محتمل و سناریوهای واکنش استراتژیک (Contingency Plans):</strong>
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="font-bold text-rose-400">مانع ۱: مقاومت در برابر وارد کردن دستی دروس و تکالیف</span>
                      <p className="text-slate-300 mt-1">
                        <strong>راهکار واکنشی:</strong> پیاده‌سازی قابلیت «واردسازی با یک کلیک» بر اساس بارگذاری فایل عکس برگه انتخاب‌واحد یا فرمت اکسل نماینده کلاس به طوری که یک نفر برنامه را بچیند و بقیه با یک کد دعوت عضو شوند.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="font-bold text-amber-400">مانع ۲: کمبود فایل و جزوه در ابتدای کار (Cold Start Problem)</span>
                      <p className="text-slate-300 mt-1">
                        <strong>راهکار واکنشی:</strong> پرداخت پاداش کوچک یا اعتبار رایگان به دانشجویان سال‌بالایی ممتاز جهت بارگذاری جزوات ۵ درس پرمخاطب پایه (ریاضی ۱، فیزیک ۱، مبانی برنامه‌نویسی).
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="font-bold text-cyan-400">مانع ۳: چالش‌های حقوقی کپی‌رایت کتب ناشران دانشگاهی</span>
                      <p className="text-slate-300 mt-1">
                        <strong>راهکار واکنشی:</strong> تمرکز صرف بر کتب دست‌دوم کاغذی در بازارچه فیزیکی و محدود کردن فایل‌های دانلودی به جزوات دست‌نویس شخصی و اسلایدهای عمومی اساتید.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 8 */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all print:border-slate-300 print:bg-white">
              <button
                onClick={() => toggleQuestion(8)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    ۸
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white print:text-black">
                    گزینه‌ها و روش‌های جاری مخاطبان برای حل این نیاز چیست؟ (تحلیل رقبا و هزینه سوئیچ)
                  </span>
                </div>
                {expandedQuestions[8] ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedQuestions[8] && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 space-y-3 border-t border-slate-800/60 leading-relaxed print:text-slate-700">
                  <p>
                    <strong>بررسی ماتریس جایگزین‌های فعلی:</strong>
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs border border-slate-800">
                      <thead>
                        <tr className="bg-slate-950 text-slate-300">
                          <th className="p-2 border-b border-slate-800">ابزار جایگزین</th>
                          <th className="p-2 border-b border-slate-800">مزیت فعلی</th>
                          <th className="p-2 border-b border-slate-800">نقص اساسی</th>
                          <th className="p-2 border-b border-slate-800">برتری ترمیار</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        <tr>
                          <td className="p-2 font-bold text-white">گروه‌های تلگرام و ایتا</td>
                          <td className="p-2">دسترس‌پذیری عمومی و عضویت همگانی</td>
                          <td className="p-2">هرج‌ومرج، گم شدن پیام‌ها، کلاهبرداری</td>
                          <td className="p-2 text-emerald-400">دسته‌بندی منظم درس‌به‌درس و بازارچه امن</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-white">دیوار و شیپور</td>
                          <td className="p-2">تعداد کاربر بسیار بالا</td>
                          <td className="p-2">عدم تمرکز بر محیط دانشگاهی و خوابگاهی</td>
                          <td className="p-2 text-emerald-400">تطبیق رایگان درون‌دانشگاهی بدون هزینه پست</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-white">Notion و Todoist</td>
                          <td className="p-2">امکانات سفارشی‌سازی پیشرفته</td>
                          <td className="p-2">پیچیدگی بالا، زبان انگلیسی، فقدان بازارچه</td>
                          <td className="p-2 text-emerald-400">زبان فارسی، تقویم شمسی و ساختار آماده تحصیلی</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-white">کاغذ و سررسید</td>
                          <td className="p-2">بدون نیاز به اینترنت و شارژ</td>
                          <td className="p-2">عدم هشداردهی هوشمند، آسیب‌پذیری فیزیکی</td>
                          <td className="p-2 text-emerald-400">هشدارهای خودکار ددلاین و نمره سلامت ترم</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: طبقه‌بندی ماهیت ایده */}
        {/* ========================================================= */}
        <section id="classification" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش پنجم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                طبقه‌بندی ماهیت ایده (بنیادین، ترکیبی یا تطبیقی؟)
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
              ارزیابی بر اساس تئوری نوآوری
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3 opacity-60">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs">
                رد فرضیه
              </div>
              <h3 className="font-bold text-slate-300 text-base">۱. نوآوری بنیادین (Radical)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ایجاد فناوری، مدل رفتاری یا بازاری کاملاً بی‌سابقه که جهان پیش از آن ندیده است (نظیر ظهور اولیه وب یا اینترنت اشیاء).
              </p>
              <div className="text-[11px] font-bold text-rose-400 pt-1">
                ❌ ترمیار در این رده قرار نمی‌گیرد (ادعای نوآوری بنیادین غیرعلمی و غیرواقع‌بینانه است).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500/50 space-y-3 relative shadow-lg shadow-indigo-500/10">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">
                تأیید اصلی
              </div>
              <h3 className="font-bold text-white text-base">۲. نوآوری ترکیبی (Hybrid / Combinatorial)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ادغام اجزای موجود در صنایع و بسترهای مختلف و بازآرایی آن‌ها در یک زنجیره ارزش جدید که اصطکاک رفتاری مصرف‌کننده را حذف می‌کند.
              </p>
              <div className="text-[11px] font-bold text-emerald-400 pt-1">
                ✅ جایگاه اصلی ترمیار: پیوند زدن مدیریت زمان شخصی با بازارچه اقتصادی P2P دانشگاهی.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-purple-500/40 text-purple-200 flex items-center justify-center font-bold text-xs">
                تأیید مکمل
              </div>
              <h3 className="font-bold text-white text-base">۳. نوآوری تطبیقی (Adaptive)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                بومی‌سازی مدل‌های بین‌المللی با ویژگی‌های محیطی، فرهنگی، تقویمی و حقوقی یک بازار خاص با ویژگی‌های محلی.
              </p>
              <div className="text-[11px] font-bold text-purple-300 pt-1">
                ✅ وجه ثانویه ترمیار: انطباق کامل با تقویم شمسی، فرجه‌های امتحانی و زیست‌بوم خوابگاه‌های ایران.
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
            <h4 className="font-bold text-white text-sm">استدلال دانشگاهی در دفاعیه:</h4>
            <p>
              «ترمیار با تلفیق سه الگوی کارکردی موفق (Personal LMS + Cloud Resource Vault + Hyperlocal Marketplace) و تطبیق آن با ساختار آموزشی و فرهنگ خوابگاهی دانشگاه‌های ایران، یک نوآوری ترکیبی-تطبیقی مؤثر ایجاد کرده است. مزیت رقابتی در اختراع چرخ از ابتدا نیست، بلکه در به صفر رساندن هزینه پرش مداوم کاربر میان ابزارهای نامتجانس است.»
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: تفکیک فرایندهای آنلاین و آفلاین */}
        {/* ========================================================= */}
        <section id="online-offline" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-3">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش ششم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                تفکیک فرایندهای آنلاین و آفلاین (ماتریس عملیاتی و مرز مسئولیت)
              </h2>
            </div>
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 print:hidden">
              <button
                onClick={() => setOfflineFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  offlineFilter === 'all'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                همه فرایندها
              </button>
              <button
                onClick={() => setOfflineFilter('online')}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  offlineFilter === 'online'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                صرفاً آنلاین
              </button>
              <button
                onClick={() => setOfflineFilter('offline')}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  offlineFilter === 'offline'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                فرایندهای آفلاین / فیزیکی
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed print:text-slate-700">
            یک پلتفرم تجارت الکترونیک دانشگاهی تنها در صورتی مقیاس‌پذیر خواهد بود که مرز تعهدات فنی سامانه با تعاملات فیزیکی کف دانشگاه و خوابگاه مشخص باشد:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-950/80 text-slate-300 border-b border-slate-800">
                  <th className="p-3.5 sm:p-4 font-bold text-white">عنوان فرایند</th>
                  <th className="p-3.5 sm:p-4 font-bold text-white">بستر اجرا</th>
                  <th className="p-3.5 sm:p-4 font-bold text-white">شرح عملیات</th>
                  <th className="p-3.5 sm:p-4 font-bold text-white">مسئولیت پلتفرم ترمیار</th>
                  <th className="p-3.5 sm:p-4 font-bold text-white">مرز مسئولیت کاربر (خارج از سامانه)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {(offlineFilter === 'all' || offlineFilter === 'online') && (
                  <>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 sm:p-4 font-bold text-white">مدیریت تکالیف و تقویم</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-semibold text-[11px]">
                          ۱۰۰٪ دیجیتال (آنلاین)
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4">ورود ددلاین‌ها، یادآور امتحانات و نمره سلامت ترم</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400">حفظ داده، اولویت‌بندی هوشمند و هشدارهای دقیق</td>
                      <td className="p-3.5 sm:p-4 text-slate-400">صحت تاریخ‌های وارد شده توسط دانشجو</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 sm:p-4 font-bold text-white">ثبت آگهی کتب و اقلام</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-semibold text-[11px]">
                          دیجیتال (آنلاین)
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4">درج مشخصات کتاب، تصویر، قیمت و وضعیت فیزیکی</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400">نمایش بهینه، فیلتر بر اساس دانشگاه و خوابگاه</td>
                      <td className="p-3.5 sm:p-4 text-slate-400">صداقت در بیان خط‌خوردگی یا تمیزی کتاب</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3.5 sm:p-4 font-bold text-white">مطالعه و نوت‌برداری PDF</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-semibold text-[11px]">
                          دیجیتال (مستقل/آفلاین در کلاینت)
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4">باز کردن اسلایدها و درج یادداشت روی صفحات</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400">ذخیره سریع در حافظه محلی مرورگر و سرعت بالا</td>
                      <td className="p-3.5 sm:p-4 text-slate-400">رعایت حقوق مولف و عدم انتشار فایل‌های محرمانه</td>
                    </tr>
                  </>
                )}

                {(offlineFilter === 'all' || offlineFilter === 'offline') && (
                  <>
                    <tr className="hover:bg-slate-800/30 bg-purple-950/10">
                      <td className="p-3.5 sm:p-4 font-bold text-white">هماهنگی محل تحویل کتاب</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-semibold text-[11px]">
                          هیبرید (آنلاین + ارتباط فردی)
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4">توافق روی زمان و مکان ملاقات در لابی دانشکده یا اتاق خوابگاه</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400">فراهم‌سازی راه‌های ارتباطی معتبر طرفین</td>
                      <td className="p-3.5 sm:p-4 text-slate-400">حضور به‌موقع سر قرار و توافق بر زمان معقول</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 bg-purple-950/10">
                      <td className="p-3.5 sm:p-4 font-bold text-white">تحویل فیزیکی و بررسی سلامت کالا</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-semibold text-[11px]">
                          ۱۰۰٪ فیزیکی (آفلاین)
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4">رویت کتاب، تورق صفحات، چک کردن پارگی و سلامت فیزیکی</td>
                      <td className="p-3.5 sm:p-4 text-slate-400">پلتفرم هیچ دخالت یا مسئولیتی در مبادله فیزیکی ندارد</td>
                      <td className="p-3.5 sm:p-4 text-rose-300 font-semibold">تایید نهایی خریدار قبل از هرگونه پرداخت</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 bg-purple-950/10">
                      <td className="p-3.5 sm:p-4 font-bold text-white">تسویه‌حساب مالی کتاب</td>
                      <td className="p-3.5 sm:p-4">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-semibold text-[11px]">
                          فاز ۱: کارت‌به‌کارت فیزیکی / فاز ۲: امانی
                        </span>
                      </td>
                      <td className="p-3.5 sm:p-4">پرداخت وجه به فروشنده پس از رویت کالا</td>
                      <td className="p-3.5 sm:p-4 text-slate-400">فاز ۱: عدم مسئولیت در مبادله دستی وجه</td>
                      <td className="p-3.5 sm:p-4 text-slate-400">خودداری خریدار از پرداخت بیعانه قبل از رویت فیزیکی کالا</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: تعریف و مرزهای MVP */}
        {/* ========================================================= */}
        <section id="mvp-definition" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش هفتم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                تعریف حداقل محصول پذیرفتنی (MVP) و مرزبندی قابلیت‌ها
              </h2>
            </div>
            <span className="text-xs text-slate-400">ماتریس اولویت‌بندی فیچرها</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed print:text-slate-700">
            بر اساس متدولوژی Lean Startup، ارائه قابلیت‌های زائد نه تنها باعث اتلاف بودجه می‌شود بلکه کاربر را سردرگم می‌کند. در اینجا مرزهای صریح نسخه فعلی، برنامه‌های آتی و موارد کنار گذاشته‌شده تفکیک شده‌اند:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Phase 1: MVP Core (Currently active) */}
            <div className="p-5 rounded-2xl bg-indigo-950/30 border-2 border-indigo-500/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-500 text-white">
                  فاز اول (MVP فعال)
                </span>
                <span className="text-[11px] text-emerald-400 font-bold">پیاده‌سازی‌شده در ورسل</span>
              </div>
              <h3 className="font-bold text-base text-white">امکانات الزامی و هسته اولیه</h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>داشبورد یکپارچه تحصیلی:</strong> خلاصه اولویت‌های روز، کوییزهای در پیش و شاخص سلامت ترم.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>جدول برنامه هفتگی با Collision Detection:</strong> تشخیص تداخل ساعات دروس کلاسی.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>مدیریت تکالیف و امتحانات:</strong> با پشتیبانی از تاریخ شمسی و میلادی و شمارنده فرجه.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>کتابخانه منابع و اسناد (Vault):</strong> پیش‌نمایش درون‌برنامه‌ای فایل‌های PDF و نوت‌نویسی بدون نیاز به فیلترشکن.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>بازارچه تبادل و نیازمندی‌های خوابگاهی:</strong> ثبت آگهی کتاب با فیلتر خوابگاه و وضعیت اقلام.</span>
                </li>
              </ul>
            </div>

            {/* Phase 2: Deferred Growth */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300">
                  فاز دوم (توسعه آتی)
                </span>
                <span className="text-[11px] text-slate-400">پس از اعتبارسنجی پایلوت</span>
              </div>
              <h3 className="font-bold text-base text-white">امکانات موکول به آینده</h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>درگاه پرداخت امن امانی (Escrow):</strong> نگه‌داری پول در حساب واسط تا تایید فیزیکی کتاب توسط دانشجو.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>چت متنی درون‌برنامه‌ای:</strong> مکالمه مستقیم خریدار و فروشنده بدون نیاز به اشتراک شماره تماس.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>اشتراک گروهی جزوه با لینک اختصاصی:</strong> امکان ساخت کلاب‌های مطالعه کلاسی.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>اپلیکیشن نصب‌شونده موبایل (PWA پیشرفته):</strong> دریافت نوتیفیکیشن ددلاین در موبایل.</span>
                </li>
              </ul>
            </div>

            {/* Omitted Complexities */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-rose-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300">
                  حذف از دامنه (Out of Scope)
                </span>
                <span className="text-[11px] text-rose-400 font-bold">پیچیدگی غیرضروری</span>
              </div>
              <h3 className="font-bold text-base text-white">امکانات حذف‌شده به دلیل ریسک</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>اتصال خودکار به سیستم گلستان/آموزشیار:</strong> ریسک بالای امنیتی، نبود API رسمی و احتمال فیلتر یا شکایت حراست.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>سیستم پیک اختصاصی درون‌شهری:</strong> هزینه فوق‌العاده سنگین لجستیکی و خروج از مدل پلتفرمی بدون‌دارایی (Asset-Light).</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>چت‌بات‌های عمومی LLM پرمصرف:</strong> هزینه دلاری نامعقول API و دور شدن از نیازهای عینی دانشجو.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: سناریوهای عملیاتی گام‌به‌گام */}
        {/* ========================================================= */}
        <section id="scenarios" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش هشتم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                سناریوهای عملیاتی واقعی (User Journey Maps)
              </h2>
            </div>
            <span className="text-xs text-slate-400">روایت ملموس از چرخه حیات کاربر در سامانه</span>
          </div>

          <div className="space-y-6">
            {/* Scenario 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 print:border-slate-300 print:bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm">
                    سناریوی اول
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg print:text-black">
                      مدیریت بحران فرجه‌ها و تکالیف شب امتحان
                    </h3>
                    <p className="text-xs text-slate-400">کاربر: سارا — دانشجوی ترم چهارم مهندسی کامپیوتر در هفته دهم ترم</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300">
                  ماژول: وظایف + اسناد + سلامت ترم
                </span>
              </div>

              {/* 5-Step Process */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-400">گام ۱: ورود و مشاهده وضعیت</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    سارا وارد داشبورد ترمیار می‌شود و کارت نمره سلامت ترم را روی ۵۸٪ (وضعیت زرد/هشدار) می‌بیند؛ ۳ تکلیف با فرجه کمتر از ۲ روز باقی مانده است.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-400">گام ۲: انتخاب اولویت اول</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    روی «تمرین سری سوم درس ساختمان داده‌ها» کلیک می‌کند؛ فایل PDF صورت سوالات مستقیماً در کنار صفحه باز می‌شود.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-400">گام ۳: فعال‌سازی تایمر مطالعه</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    تایمر ۲۵ دقیقه‌ای پومودورو را برای درس ساختمان داده‌ها روشن می‌کند و نکات حل تمرین را در بخش یادداشت‌های فایل ثبت می‌نماید.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-400">گام ۴: تیک تکمیل تمرین</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    پس از اتمام حل سوالات، گزینه «انجام شد» را علامت می‌زند؛ سیستم زمان مطالعه سارا را به آمار هفتگی اضافه می‌کند.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                  <span className="text-[10px] font-bold text-emerald-400">گام ۵: نتیجه نهایی</span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    نمره سلامت ترم سارا به ۷۶٪ ارتقا می‌یابد، استرس وی کاهش یافته و احساس کنترل کامل بر امتحانات ترم در او ایجاد می‌گردد.
                  </p>
                </div>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 print:border-slate-300 print:bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-sm">
                    سناریوی دوم
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg print:text-black">
                      تهیه کتاب مرجع فیزیکی و مبادله در خوابگاه
                    </h3>
                    <p className="text-xs text-slate-400">کاربر: علی — دانشجوی سال اول خوابگاهی در جستجوی کتاب ریاضی ۲</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300">
                  ماژول: بازارچه دانشجویی و نیازمندی‌ها
                </span>
              </div>

              {/* 5-Step Process */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-purple-400">گام ۱: جستجوی منبع در بازارچه</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    علی متوجه می‌شود قیمت کتاب نو در بازار انقلاب ۶۵۰ هزار تومان است؛ به تب بازارچه ترمیار رفته و واژه «حساب دیفرانسیل توماس» را جستجو می‌کند.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-purple-400">گام ۲: فیلتر خوابگاه و وضعیت</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    با فیلتر خوابگاه خود، آگهی دانشجوی ترم سومی (رضا، بلوک ۳) را پیدا می‌کند که کتاب را به قیمت ۲۰۰ هزار تومان آگهی کرده است.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-purple-400">گام ۳: هماهنگی قرار تحویل</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    از طریق شماره تماس ذکر شده، پیامکی می‌فرستد و برای ساعت ۲۱ در لابی بلوک خوابگاه قرار می‌گذارند.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-bold text-purple-400">گام ۴: بازبینی فیزیکی و تسویه</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    علی کتاب را تورق کرده، از عدم پارگی صفحات مطمئن می‌شود و مبلغ توافقی را کارت‌به‌کارت می‌کند.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                  <span className="text-[10px] font-bold text-emerald-400">گام ۵: نتیجه نهایی</span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    علی ۴۵۰ هزار تومان صرفه‌جویی کرده، رضا درآمد کسب کرده و هر دو از معامله امن محلی در کمتر از ۲ ساعت رضایت دارند.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: برنامه اعتبارسنجی اولیه */}
        {/* ========================================================= */}
        <section id="validation-plan" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش نهم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                برنامه پیشنهادی اعتبارسنجی اولیه بازار (طرح پایلوت دانشگاهی)
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              پیشنهاد پژوهشی (فاقد آمار جعلی اجراشده)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
            📢 <strong>تعهد به صداقت دانشگاهی:</strong> اطلاعات این بخش، چارچوب تجربی پیشنهادی برای راستی‌آزمایی فرضیات کسب‌وکار است و نباید به عنوان پروژه‌ای که قبلاً با اعداد واقعی به اتمام رسیده تلقی گردد.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base">طراحی پروتکل پایلوت تجربی</h3>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 font-bold text-[10px]">۱</span>
                  <span><strong>محل اجرای آزمایشی:</strong> دو دانشکده مهندسی برق و کامپیوتر در یک دانشگاه دولتی مرکزی.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 font-bold text-[10px]">۲</span>
                  <span><strong>جامعه نمونه:</strong> ۶۰ تا ۱۰۰ نفر از دانشجویان ترم‌های ۲، ۴ و ۶.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 font-bold text-[10px]">۳</span>
                  <span><strong>بازه زمانی تست:</strong> ۶ هفته متوالی (از ۳ هفته پیش از امتحانات میان‌ترم تا ۲ هفته پس از آن).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 font-bold text-[10px]">۴</span>
                  <span><strong>کانال جذب تسترها:</strong> همکاری با انجمن علمی دانشجویی و معرفی در کانال رسمی ورودی‌ها.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base">شاخص‌های کلیدی اعتبارسنجی (Metrics)</h3>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">A</span>
                  <span><strong>نرخ تکمیل ثبت برنامه (Activation):</strong> چه درصدی از تست‌کنندگان کل ۵ درس ترم خود را وارد سامانه کردند؟ (معیار پذیرش: &gt; ۶۰٪)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">B</span>
                  <span><strong>نرخ بازگشت هفتگی (Weekly Retention):</strong> چند درصد تسترها در هفته سوم و چهارم مجدداً وارد سامانه شدند؟ (معیار پذیرش: &gt; ۴۰٪)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">C</span>
                  <span><strong>تراکنش بازارچه (Marketplace Velocity):</strong> ثبت حداقل ۲۰ آگهی کتاب و انجام حداقل ۵ معامله موفق حضوری در بازه آزمایشی.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 font-bold text-[10px]">D</span>
                  <span><strong>پرسشنامه ارزیابی رضایت (NPS):</strong> سنجش تمایل به توصیه ترمیار به هم‌کلاسی‌ها (هدف: نمره بالای +۴۰).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: جمع‌بندی تحلیلی و ماتریس استراتژیک */}
        {/* ========================================================= */}
        <section id="synthesis" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">بخش دهم</span>
              <h2 className="text-xl sm:text-2xl font-black text-white print:text-black">
                جمع‌بندی تحلیلی، ریسک‌ها و تصمیم استراتژیک
              </h2>
            </div>
            <span className="text-xs text-slate-400">سنتز نهایی طرح کسب‌وکار</span>
          </div>

          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>نقاط قوت کلیدی (Strengths)</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>یکپارچگی کاربردی چند ابزار مجزا در یک رابط مدرن و چشم‌نواز (UI/UX تمیز).</li>
                <li>بومی‌سازی کامل با تقویم شمسی و اصطلاحات آموزش عالی ایران.</li>
                <li>هزینه صفر تا نزدیک به صفر زیرساخت در فاز اول (بهره‌گیری از IndexedDB مرورگر).</li>
                <li>قرابت بنیان‌گذاران با جامعه مخاطب به عنوان دانشجویان فعال دانشگاه.</li>
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>نقاط ضعف و محدودیت‌ها (Weaknesses)</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>نیاز به ورود دستی مشخصات دروس و امتحانات در غیاب API سامانه‌های دانشگاهی.</li>
                <li>نبود اپلیکیشن نیتیو موبایل (اندروید/iOS) در گام اولیه.</li>
                <li>اتکای بازارچه به تراکم فیزیکی دانشجویان در یک خوابگاه یا دانشکده خاص.</li>
              </ul>
            </div>

            {/* Opportunities */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
              <h4 className="font-bold text-cyan-400 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>فرصت‌های رشد بازار (Opportunities)</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>افزایش تصاعدی قیمت کاغذ و کتاب‌های نو که تقاضای کتب دست‌دوم را به اوج رسانده است.</li>
                <li>فیلترینگ تلگرام و واتساپ که باعث تمایل به ابزارهای وب‌محور پایدار بدون قطعی شده است.</li>
                <li>پتانسیل جذب اسپانسرهای دانشجویی (کلاس‌های کنکور ارشد، پلتفرم‌های کاریابی کارآموزی).</li>
              </ul>
            </div>

            {/* Threats */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>ریسک‌ها و تهدیدهای احتمالی (Threats)</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>اینرسی رفتاری شدید دانشجویان و مقاومت در برابر مهاجرت از کانال‌های تلگرامی.</li>
                <li>چرخه حیات ۴ ساله دانشجو (نیاز مداوم به بازاریابی برای ورودی‌های جدید).</li>
                <li>عدم توازن عرضه و تقاضا در کتاب‌های تخصصی رشته‌های کم‌جمعیت.</li>
              </ul>
            </div>
          </div>

          {/* Strategic Conclusion Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/50 border border-indigo-500/40 space-y-4">
            <h3 className="font-black text-base sm:text-lg text-white">
              نتیجه‌گیری نهایی و پیشنهاد مشورتی جهت دفاع دانشگاهی:
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              «طرح کسب‌وکار <strong>ترمیار (TermYar)</strong> روی نیازی ملموس و مستمر بنا نهاده شده است. نسخه اولیه پیاده‌سازی‌شده با برخورداری از جدول برنامه هفتگی، شمارنده فرجه‌ها، کتابخانه فایل‌های درسی و بازارچه دانشجویی، گام نخست (MVP) را با موفقیت اثبات کرده است.
            </p>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong>توصیه مشورتی:</strong> برای تبدیل این پروژه دانشگاهی به یک استارتاپ پایدار تجاری، بنیان‌گذاران نباید به سمت هزینه‌های سنگین سرور یا چت‌بات‌های غیرضروری حرکت کنند. تمرکز حیاتی در این مرحله، <strong>اعتبارسنجی پایلوت در دو دانشکده با حل چالش اصطکاک ورود دستی دروس (با امکان دعوت هم‌کلاسی‌ها)</strong> و ایجاد نقدشوندگی در بازارچه کتاب است. در صورت دستیابی به Retention بالای ۴۰٪ در پایلوت، این مدل ظرفیت جذب سرمایه بذری و توسعه به سایر دانشگاه‌های کشور را دارا خواهد بود.»
            </p>

            {/* Bottom Actions inside the dossier */}
            <div className="pt-4 border-t border-indigo-500/20 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                پایان پرونده تحلیلی • تهیه شده جهت ارائه در درس تجارت الکترونیک دانشگاه
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://term-yar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>بازدید از نسخه اولیه آنلاین</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>چاپ سند تحلیلی</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/40 border border-indigo-400/30 transition-all hover:scale-110 active:scale-95 print:hidden"
          title="بازگشت به ابتدای صفحه"
        >
          <ArrowLeft className="w-5 h-5 rotate-90" />
        </button>
      )}
    </div>
  );
};
