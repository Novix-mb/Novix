;
        if (window.pdfjsLib) {
            try {
                pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/js/pdf.worker.js"
            } catch (e) {}
        }

;
(() => {
            const SOON = ['sims'];
            let curView = 'home';
            const $ = s => document.querySelector(s),
                $$ = s => [...document.querySelectorAll(s)],
                KEY = 'novix.site.v1';
            const AR = {
                'Body': 'النص',
                'Title': 'العنوان',
                'Pinned': 'المثبّتة',
                'All notes': 'كل الملاحظات',
                'New note': 'ملاحظة جديدة',
                'note': 'ملاحظة',
                'notes': 'ملاحظات',
                'Capture Every Idea': 'دوّن كل فكرة',
                'Plan your week and never miss a task.': 'خطّط لأسبوعك ولا تفوّت أي مهمة.',
                'No notes yet. Tap + to write your first note.': 'لا توجد ملاحظات بعد. اضغط + لكتابة أول ملاحظة.',
                'Untitled': 'بدون عنوان',
                'No additional text': 'لا يوجد نص إضافي',
                'Save': 'حفظ',
                'Pin': 'تثبيت',
                'Unpin': 'إلغاء التثبيت',
                'Bold': 'غامق',
                'Italic': 'مائل',
                'Underline': 'تسطير',
                'Smaller': 'أصغر',
                'Larger': 'أكبر',
                'Add plan': 'إضافة موعد',
                'Edit plan': 'تعديل الموعد',
                'Day': 'اليوم',
                'Time': 'الوقت',
                'Colour': 'اللون',
                'No plans': 'لا توجد مواعيد',
                'Plan saved': 'تم حفظ الموعد',
                'Link a task': 'اربط بمهمة',
                'No time': 'بدون وقت',
                'Clear time': 'مسح الوقت',
                'Save plan': 'حفظ الموعد',
                'Saved': 'تم الحفظ',
                'Notes & Timetable': 'الملاحظات والجدول',
                'Notes': 'الملاحظات',
                'Timetable': 'الجدول',
                'Capture ideas and plan your week.': 'دوّن أفكارك وخطّط لأسبوعك.',
                'Font': 'الخط',
                'Size': 'الحجم',
                'Style': 'النمط',
                'Align': 'المحاذاة',
                'Text colour': 'لون النص',
                'Paper colour': 'لون الورقة',
                'Note title': 'عنوان الملاحظة',
                'Write your note here…': 'اكتب ملاحظتك هنا…',
                'Save note': 'حفظ الملاحظة',
                'Update note': 'تحديث الملاحظة',
                'Note saved': 'تم حفظ الملاحظة',
                'Download note': 'تحميل الملاحظة',
                'Short break can’t be longer than 10 minutes': 'الاستراحة القصيرة لا تزيد عن 10 دقائق',
                'Long break must be at least 11 minutes': 'الاستراحة الطويلة لا تقل عن 11 دقيقة',
                'Time is locked during a session — reset or skip to change it': 'الوقت مقفل أثناء الجلسة — أعد الضبط أو تخطَّ لتغييره',
                'Something went wrong': 'حدث خطأ ما',
                'Note downloaded': 'تم تحميل الملاحظة',
                'Unlink task': 'إلغاء ربط المهمة',
                'Task': 'مهمة',
                'Note deleted': 'تم حذف الملاحظة',
                'Delete this note?': 'حذف هذه الملاحظة؟',
                'Write something first': 'اكتب شيئًا أولًا',
                'No notes yet. Write your first note above.': 'لا توجد ملاحظات بعد. اكتب أول ملاحظة من الأعلى.',
                'Edit': 'تعديل',
                'Task or event…': 'مهمة أو موعد…',
                'Pick from My Tasks': 'اختر من مهامي',
                'Repeat every week': 'تكرار كل أسبوع',
                'Add to timetable': 'إضافة للجدول',
                'This week': 'هذا الأسبوع',
                'All day': 'طوال اليوم',
                'Enable notifications': 'تفعيل الإشعارات',
                'Notifications': 'الإشعارات',
                'Clear all': 'مسح الكل',
                'No notifications yet': 'لا توجد إشعارات بعد',
                'Added to timetable': 'تمت الإضافة للجدول',
                'Removed': 'تم الحذف',
                'Remove this repeating task?': 'حذف هذه المهمة المتكررة؟',
                'Easy': 'سهلة',
                'Hard': 'صعبة',
                'Sorted from easiest to hardest': 'مرتبة من الأسهل إلى الأصعب',
                'Your Books & PDFs': 'كتبك وملفات PDF',
                'Small Steps, Big Wins': 'خطوات صغيرة، إنجازات كبيرة',
                'Plan Your Week': 'خطّط لأسبوعك',
                'Home': 'الرئيسية',
                'My Tasks': 'مهامي',
                'Library': 'المكتبة',
                'Simulations': 'المحاكاة',
                'Achievements': 'الإنجازات',
                'Settings': 'الإعدادات',
                'Light Mode': 'الوضع الفاتح',
                'Dream': 'احلم',
                'Plan': 'خطّط',
                'Achieve': 'حقّق',
                'Your smart companion for a brighter future': 'رفيقك الذكي نحو مستقبل أكثر إشراقًا',
                'Explore More': 'استكشف المزيد',
                'Your Progress': 'تقدّمك',
                'Study Today': 'مذاكرة اليوم',
                'Day Streak': 'أيام متتالية',
                'Today’s Tasks': 'مهام اليوم',
                'See All': 'عرض الكل',
                'Great Job!': 'أحسنت!',
                'Task completed successfully': 'تم إنجاز المهمة بنجاح',
                'Keep Going': 'واصل',
                'Upcoming': 'القادم',
                'Interactive Simulations': 'محاكاة تفاعلية',
                'Learn by Doing': 'تعلّم بالتجربة',
                'Track Your Progress': 'تابع تقدّمك',
                'Add': 'إضافة',
                'All': 'الكل',
                'Active': 'نشطة',
                'Done': 'منجزة',
                'Add a new task…': 'أضف مهمة جديدة…',
                'Search anything...  (Ctrl + K)': 'ابحث عن أي شيء...  (Ctrl + K)',
                'Coming soon': 'قريبًا',
                'Name': 'الاسم',
                'Language': 'اللغة',
                'Sound effects': 'المؤثرات الصوتية',
                'Volume': 'مستوى الصوت',
                'Reset demo data': 'إعادة ضبط البيانات التجريبية',
                'Reset': 'إعادة ضبط',
                'High': 'عالية',
                'Medium': 'متوسطة',
                'Low': 'منخفضة',
                'Review Electromagnetism': 'مراجعة الكهرومغناطيسية',
                'Solve 20 Physics Questions': 'حل 20 سؤال فيزياء',
                'Complete Project Draft': 'إكمال مسودة المشروع',
                'Watch Concept Video': 'مشاهدة فيديو المفهوم',
                'Project Review': 'مراجعة المشروع',
                'Math Quiz': 'اختبار الرياضيات',
                'Physics Lab': 'معمل الفيزياء',
                'Achievement unlocked': 'إنجاز جديد',
                'Opening': 'جارٍ فتح',
                'Nothing found': 'لا توجد نتائج',
                'All subjects': 'كل المواد',
                'Physics': 'الفيزياء',
                'Math': 'الرياضيات',
                'Chemistry': 'الكيمياء',
                'Biology': 'الأحياء',
                'Task added': 'تمت إضافة المهمة',
                'Data reset': 'تمت إعادة الضبط',
                'Book title': 'عنوان الكتاب',
                'New subject': 'مادة جديدة',
                'Choose file': 'اختر ملفًا',
                'Add book': 'إضافة كتاب',
                'Your library is empty. Add your first book above.': 'مكتبتك فارغة. أضف أول كتاب من الأعلى.',
                'No file attached': 'لا يوجد ملف مرفق',
                'Book added': 'تمت إضافة الكتاب',
                'Couldn’t store the file': 'تعذّر حفظ الملف',
                'Add 3 books': 'أضف 3 كتب',
                'Soon': 'قريبًا',
                'About': 'حول',
                'About NOVIX': 'عن نوفيكس',
                'Think Beyond': 'فكّر أبعد',
                'NOVIX is your personal study workspace: keep your books, tasks and notes, plan your week and stay focused, all in one calm place.': 'نوفيكس هو مساحتك الدراسية الشخصية: رتّب كتبك ومهامك وملاحظاتك، وخطّط لأسبوعك وحافظ على تركيزك في مكان واحد هادئ.',
                'Upload your PDF books, read them on this device and write on the pages with a pen, highlighter, text, sticky notes and shapes.': 'ارفع كتبك بصيغة PDF واقرأها على هذا الجهاز، واكتب على صفحاتها بالقلم والتظليل والنصوص والملصقات والأشكال.',
                'Add tasks by difficulty, easiest first, tick them off and watch your progress grow.': 'أضف مهامك حسب الصعوبة من الأسهل للأصعب، وأنجزها وشاهد تقدّمك ينمو.',
                'Coming soon': 'قريبًا',
                'Write and pin notes, format your text and keep every idea organised and easy to find.': 'دوّن ملاحظاتك وثبّتها ونسّق نصوصك وأبقِ كل فكرة منظّمة وسهلة الوصول.',
                'Plan your week with colour-coded sessions, link them to your tasks and get a reminder when it is time.': 'خطّط لأسبوعك بحصص ملوّنة، واربطها بمهامك، واحصل على تذكير عند حلول موعدها.',
                'Focus and break sessions with soft sounds, calm backgrounds and a screen that stays awake while the timer runs.': 'جلسات تركيز واستراحة بأصوات هادئة وخلفيات مريحة، وتبقى الشاشة مضاءة طوال عمل المؤقت.',
                'Smart Board and Simulations are on their way.': 'السبورة الذكية والمحاكيات في الطريق إليكم.',
                'Your data stays with you': 'بياناتك تبقى معك',
                'Books, notes and settings are saved on this device only and are never uploaded. Clearing your browser data will remove them.': 'تُحفظ الكتب والملاحظات والإعدادات على هذا الجهاز فقط ولا تُرفع إلى أي مكان. مسح بيانات المتصفح سيحذفها.',
                'Designed & developed by': 'تصميم وتطوير',
                'Reset settings': 'إعادة ضبط الإعدادات',
                'Settings reset': 'تمت إعادة ضبط الإعدادات',
                'Cancel': 'إلغاء',
                'Delete': 'حذف',
                'Cover colour': 'لون الغلاف',
                'Auto': 'تلقائي',
                'Custom colour': 'لون مخصص',
                'Saving…': 'جارٍ الحفظ…',
                'Choose PDF': 'اختر ملف PDF',
                'Please choose a PDF file': 'من فضلك اختر ملف PDF أولًا',
                'Only valid PDF files are supported': 'يُسمح بملفات PDF الصحيحة فقط',
                'Theme': 'الثيم',
                'Match device theme': 'مطابقة ثيم الجهاز',
                'Following device theme': 'يتبع ثيم الجهاز الآن',
                'Open': 'فتح',
                'Book added (kept until you close this page)': 'تمت إضافة الكتاب (يبقى حتى تغلق الصفحة)',
                'YOUR PERSONAL WORKSPACE': 'مساحتك الشخصية',
                'Small steps every day. Big progress over time.': 'خطوات صغيرة كل يوم، وتقدّم كبير مع الوقت.',
                'Interactive experiments you can run and explore. We’re putting the finishing touches on it.': 'تجارب تفاعلية يمكنك تشغيلها واستكشافها. نضع اللمسات الأخيرة عليها الآن.',
                'Badges and milestones that celebrate your progress. We’re putting the finishing touches on it.': 'شارات وإنجازات تحتفي بتقدّمك. نضع اللمسات الأخيرة عليها الآن.'
            };
            Object.assign(AR, {
                'Big': 'حلم',
                'Dream.': 'كبير.',
                'Hide names': 'إخفاء الأسماء',
                'Profile picture': 'صورة المستخدم',
                'Upload photo': 'رفع صورة',
                'Remove': 'إزالة',
                'Dark mode': 'الوضع الداكن',
                'Photo updated': 'تم تحديث الصورة',
                'Photo removed': 'تمت إزالة الصورة',
                'Please choose an image file': 'اختر ملف صورة صالحًا',
                'Big.': 'بلا حدود.',
                'Learn more, explore further, and build the future you imagine.': 'تعلّم أكثر، واستكشف أبعد، وابنِ المستقبل الذي تتخيّله.',
                'Personal Workspace': 'مساحة شخصية',
                'DESIGNED & DEVELOPED BY': 'تصميم وتطوير',
                'THINK BEYOND': 'فكّر أبعد',
                'Big Dream.<br>Learn More.': 'حلم كبير.<br>تعلّم أكثر.',
                'Explore what you can become <b>↗</b>': 'اكتشف ما يمكنك أن تصبح <b>↗</b>',
                'Main': 'الرئيسية',
                'Developer credit': 'حقوق المطوّر',
                'Light mode': 'الوضع الفاتح',
                'Book title': 'عنوان الكتاب',
                'Subject': 'المادة',
                'Auto': 'تلقائي',
                'Custom colour': 'لون مخصص',
                'New task': 'مهمة جديدة',
                'Difficulty': 'الصعوبة',
                'Delete': 'حذف',
                'Previous week': 'الأسبوع السابق',
                'Next week': 'الأسبوع التالي',
                'Name': 'الاسم',
                'Language': 'اللغة',
                'Sound effects': 'المؤثرات الصوتية',
                'Volume': 'مستوى الصوت',
                'Big Dream. Learn More. — NOVIX': 'حلم كبير. تعلّم أكثر. — نوفيكس',
                'Your books and PDFs, always within reach.': 'كتبك وملفات PDF دائمًا في متناول يدك.',
                'Capture ideas before they slip away.': 'دوّن أفكارك قبل أن تضيع.',
                'Learn by experimenting.': 'تعلّم بالتجربة.',
                'The story behind NOVIX.': 'القصة وراء نوفيكس.',
                'Make NOVIX feel like yours.': 'اجعل نوفيكس يشبهك.',
                'YOUR PERSONAL WORKSPACE': 'مساحتك الشخصية',
                'Hide': 'إخفاء',
                'None': 'بدون',
                'Title background': 'خلفية العنوان',
                'Export annotated PDF': 'تصدير PDF بالتعليقات',
                'Note': 'ملاحظة',
                'Unpin': 'إلغاء التثبيت',
                'Pin': 'تثبيت',
                'Close': 'إغلاق',
                'Search': 'بحث'
            });
            Object.assign(AR, {
                'Student': 'طالب',
                'No tasks yet. Add your first task above.': 'لا توجد مهام بعد. أضف أول مهمة من الأعلى.',
                'Storage is full. Recent changes may not be saved.': 'مساحة التخزين ممتلئة. قد لا تُحفظ آخر التغييرات.'
            });
            Object.assign(AR, {
                'A new version of NOVIX is available': 'يوجد تحديث جديد لـ NOVIX',
                'Update now': 'تحديث الآن',
                'Update site': 'تحديث الموقع',
                'Check for updates': 'التحقق من التحديثات',
                'Checking…': 'جارٍ التحقق…',
                'Updating…': 'جارٍ التحديث…',
                "You're up to date": 'أنت تستخدم أحدث نسخة',
                "Couldn't check for updates. Check your connection.": 'تعذّر التحقق من التحديثات. تأكد من اتصالك بالإنترنت.'
            });
            const seed = () => ({
                tasks: [],
                books: [],
                subjects: ['Physics', 'Math', 'Chemistry', 'Biology'],
                name: '',
                lang: 'en',
                theme: (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
                sound: true,
                vol: 60,
                nid: 1
            });
            let S;
            try {
                S = JSON.parse(localStorage.getItem(KEY) || 'null')
            } catch (e) {}
            if (!S || !S.tasks) S = seed();
            if (!S.themeUser) S.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            S.books = S.books || [];
            S.subjects = S.subjects || ['Physics', 'Math', 'Chemistry', 'Biology'];
            try {
                localStorage.removeItem('dsb.board.v1')
            } catch (e) {} ['board', 'progress', 'streak', 'studyMin', 'sims', 'added', 'last', 'un'].forEach(k => delete S[k]);
            let saveWarned = 0;
            const save = () => {
                try {
                    localStorage.setItem(KEY, JSON.stringify(S));
                    queueSync();
                    return true
                } catch (e) {
                    if (Date.now() - saveWarned > 2e4) {
                        saveWarned = Date.now();
                        toast('⚠️ ' + tr('Storage is full. Recent changes may not be saved.'))
                    }
                    return false
                }
            };
            const syncProfile = () => {
                const n = (S.name || '').trim() || tr('Student');
                $('#uname').textContent = n;
                $('#sideName').textContent = n;
                ['#av', '#sideAv', '#avPrev'].forEach(q => {
                    const e = $(q);
                    if (!e) return;
                    if (S.avatar) {
                        e.textContent = '';
                        e.style.backgroundImage = 'url("' + S.avatar + '")';
                        e.classList.add('has-img')
                    } else {
                        e.textContent = n[0].toUpperCase();
                        e.style.backgroundImage = '';
                        e.classList.remove('has-img')
                    }
                });
                const dl = $('#avDel');
                if (dl) dl.hidden = !S.avatar;
            };
            const done = s => s.tasks.filter(x => x.d).length,
                tr = k => S.lang === 'ar' && AR[k] || k;
            let ac;
            const tone = (f, t, d, ty = 'sine', g = .25) => {
                const o = ac.createOscillator(),
                    a = ac.createGain();
                o.type = ty;
                o.frequency.value = f;
                const v = g * S.vol / 100,
                    n = ac.currentTime + t;
                a.gain.setValueAtTime(0, n);
                a.gain.linearRampToValueAtTime(v, n + .015);
                a.gain.exponentialRampToValueAtTime(.0001, n + d);
                o.connect(a).connect(ac.destination);
                o.start(n);
                o.stop(n + d + .05)
            };
            const play = s => {
                if (!S.sound || !S.vol) return;
                try {
                    ac = ac || new(window.AudioContext || window.webkitAudioContext)();
                    if (ac.state === 'suspended') ac.resume();
                    s.forEach(([f, t, d, ty]) => tone(f, t, d, ty))
                } catch (e) {}
            };
            const SFX = {
                done: () => play([
                    [659, 0, .28],
                    [784, .09, .28],
                    [1047, .18, .5],
                    [1319, .18, .5, 'triangle']
                ]),
                tap: () => play([
                    [880, 0, .08, 'triangle']
                ]),
                add: () => play([
                    [523, 0, .14],
                    [784, .08, .22]
                ]),
                unlock: () => play([
                    [523, 0, .2],
                    [659, .1, .2],
                    [784, .2, .2],
                    [1047, .3, .2],
                    [1568, .42, .6, 'triangle']
                ]),
                undo: () => play([
                    [440, 0, .12, 'triangle']
                ])
            };

            function toast(m) {
                const e = $('#toast');
                e.textContent = m;
                e.classList.add('on');
                clearTimeout(toast.t);
                toast.t = setTimeout(() => e.classList.remove('on'), 2200)
            }
            window.NXTR = tr;
            window.NXTOAST = toast;
            const fx = $('#fx'),
                fc = fx.getContext('2d');
            let ps = [],
                raf = 0;

            function confetti(el) {
                if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
                const r = el.getBoundingClientRect(),
                    dp = devicePixelRatio || 1;
                fx.width = innerWidth * dp;
                fx.height = innerHeight * dp;
                const cols = ['#5fc2a4', '#f6c453', '#ef6f6c', '#6aa7e0', '#b78be0', '#ff9a4d'];
                for (let i = 0; i < 70; i++) ps.push({
                    x: r.left + r.width / 2,
                    y: r.top + r.height / 2,
                    vx: (Math.random() - .5) * 11,
                    vy: -Math.random() * 11 - 3,
                    w: 5 + Math.random() * 5,
                    h: 3 + Math.random() * 4,
                    c: cols[i % 6],
                    a: Math.random() * 6,
                    va: (Math.random() - .5) * .4,
                    l: 1
                });
                cancelAnimationFrame(raf);
                const step = () => {
                    fc.setTransform(dp, 0, 0, dp, 0, 0);
                    fc.clearRect(0, 0, innerWidth, innerHeight);
                    ps = ps.filter(p => p.l > 0);
                    for (const p of ps) {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.vy += .35;
                        p.vx *= .99;
                        p.a += p.va;
                        p.l -= .012;
                        fc.save();
                        fc.globalAlpha = Math.max(p.l, 0);
                        fc.translate(p.x, p.y);
                        fc.rotate(p.a);
                        fc.fillStyle = p.c;
                        fc.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                        fc.restore()
                    }
                    if (ps.length) raf = requestAnimationFrame(step)
                };
                step()
            }
            const ic = (n, c = '') => `<svg class="i ${c}"><use href="#i-${n}"/></svg>`;
            const esc = s => String(s).replace(/[&<>"']/g, c => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            } [c]));
            const fmt = n => n > 1e6 ? (n / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1e3)) + ' KB';
            const PAL = [
                    ['#2e6fa5', '#6fb5d6'],
                    ['#c4503f', '#f08a6b'],
                    ['#1f8f7c', '#5fd0b0'],
                    ['#c2892f', '#f2c15f'],
                    ['#7a56b8', '#b08ce8'],
                    ['#4c8f3a', '#93cf71'],
                    ['#b04a7a', '#ec8fb4'],
                    ['#3c4fb0', '#7f93ee'],
                    ['#d0602a', '#f59d5e'],
                    ['#2f7f94', '#7fd0dc']
                ];

            function taskRow(x, full) {
                return `<div class="task ${x.d?'done':''}" data-id="${x.id}"><button class="chk" role="checkbox" aria-checked="${!!x.d}" aria-label="${esc(tr(x.t))}">${ic('ck')}</button>${x.v&&!full?ic('play'):''}${x.no?`<span class="tno">#${x.no}</span>`:''}<span class="t">${esc(tr(x.t))}</span><span class="pill ${x.p}">${tr(DIFF[x.p]||x.p)}</span>${full?`<button class="x" data-del="${x.id}" aria-label="${tr('Delete')}">${ic('x')}</button>`:''}</div>`
            }
            const ORD = {
                    Low: 0,
                    Medium: 1,
                    High: 2
                },
                DIFF = {
                    Low: 'Easy',
                    Medium: 'Medium',
                    High: 'Hard'
                };
            let flt = 'all',
                subj = 'All',
                qv = '';
            const mq = t => !qv || t.toLowerCase().includes(qv) || tr(t).includes(qv);

            function render() {
                $('#allTasks').innerHTML = S.tasks.slice().sort((a, b) => (ORD[a.p] - ORD[b.p]) || (a.id - b.id)).filter(x => mq(x.t) && (flt === 'all' || (flt === 'done') === !!x.d)).map(x => taskRow(x, 1)).join('') || `<p style="color:var(--muted)">${tr(S.tasks.length?'Nothing found':'No tasks yet. Add your first task above.')}</p>`;
                const cnt = s => S.books.filter(b => s === 'All' || b.s === s).length;
                $('#subj').innerHTML = ['All', ...S.subjects].map(s => `<button class="chip ${s===subj?'on':''}" data-s="${esc(s)}">${esc(s==='All'?tr('All subjects'):tr(s))} (${cnt(s)})</button>`).join('');
                S.books.forEach((x, i) => {
                    if (x.c == null) x.c = i ? (S.books[i - 1].c + 1) % PAL.length : 0
                });
                const bk = S.books.filter(b => (subj === 'All' || b.s === subj) && (!qv || b.t.toLowerCase().includes(qv)));
                $('#lib').innerHTML = bk.map(b => {
                    const c = coverGrad(b);
                    return `<div class="book"><button class="cover" data-open="${b.id}" style="--c1:${c[0]};--c2:${c[1]}" aria-label="${esc(b.t)}"><span class="bt">${esc(b.t)}</span><span class="bs">${esc(tr(b.s))}</span></button><div class="bm"><span>${b.ty?esc(b.ty)+' · '+fmt(b.size):'—'}</span><button class="rc-btn" data-recolor="${b.id}" title="${tr('Cover colour')}" aria-label="${tr('Cover colour')}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.8-.4-1.1-.3-.4-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H17a4 4 0 0 0 4-4c0-4.4-4-8.5-9-8.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/></svg></button>${b.fn?`<button class="open-btn" data-open="${b.id}">${tr('Open')}</button>`:''}<button class="x" data-bdel="${b.id}" aria-label="${tr('Delete')}">${ic('x')}</button></div></div>`
                }).join('') || `<p class="empty">${tr('Your library is empty. Add your first book above.')}</p>`;
                {
                    const bs = $('#bs'),
                        cur = bs.value;
                    bs.innerHTML = S.subjects.map(s => `<option value="${esc(s)}">${esc(tr(s))}</option>`).join('') + `<option value="__new">➕ ${tr('New subject')}</option>`;
                    if ([...bs.options].some(o => o.value === cur)) bs.value = cur
                }
                $('#themeSw').setAttribute('aria-checked', S.theme === 'dark');
                $('#themeSw2').setAttribute('aria-checked', S.theme === 'dark');
                $('#sndSw').setAttribute('aria-checked', S.sound);
                {
                    const tl = tr('Dark mode');
                    ['#themeSw', '#themeSw2'].forEach(q => {
                        const b = $(q);
                        if (b) {
                            b.setAttribute('aria-label', tl);
                            b.title = tl
                        }
                    })
                }
                renderNotes();
                renderTT();
                updateDot();
                permUI();
                renderHome();
            }

            function lang() {
                const ar = S.lang === 'ar';
                document.documentElement.lang = S.lang;
                document.documentElement.dir = ar ? 'rtl' : 'ltr';
                $$('[data-t]').forEach(e => {
                    if (!e.dataset.en) e.dataset.en = e.textContent;
                    e.textContent = ar ? (AR[e.dataset.en] || e.dataset.en) : e.dataset.en
                });
                $$('[data-h]').forEach(e => {
                    if (!e.dataset.en) e.dataset.en = e.innerHTML;
                    e.innerHTML = ar ? (AR[e.dataset.en] || e.dataset.en) : e.dataset.en
                });
                $$('[aria-label],[title]').forEach(e => {
                    if (e.closest('#novix-pdf-reader')) return;
                    for (const a of ['aria-label', 'title']) {
                        const v = e.getAttribute(a);
                        if (v == null) continue;
                        const k = a === 'title' ? 'enTitle' : 'enAria';
                        let en = e.dataset[k];
                        if (en == null || (v !== en && v !== (AR[en] || en))) en = e.dataset[k] = v;
                        e.setAttribute(a, ar ? (AR[en] || en) : en)
                    }
                });
                $$('[data-ph]').forEach(e => e.placeholder = tr(e.dataset.ph));
                $$('.flip').forEach(e => e.style.transform = ar ? 'scaleX(-1)' : '');
                $('#langSel').value = S.lang;
                if (SOON.includes(curView)) fillSoon(curView);
                $$('#nav a.is-soon').forEach(a => a.title = tr('Coming soon'));
                dispatchEvent(new CustomEvent('novix:lang', {
                    detail: S.lang
                }))
            }

            function theme() {
                const l = S.theme === 'light';
                document.documentElement.dataset.theme = l ? 'light' : 'dark';
                window.nxThemeColor && nxThemeColor()
            }
            const SOONINFO = {
                sims: ['Simulations', 'flask', 'Interactive experiments you can run and explore. We’re putting the finishing touches on it.'],
                smartboard: ['Smart Board', 'board', 'Draw, explain and present on a smart whiteboard. We’re putting the finishing touches on it.']
            };

            function fillSoon(id) {
                const i = SOONINFO[id];
                if (!i) return;
                $('#soonT').textContent = tr(i[0]);
                $('#soonP').textContent = tr(i[2]);
                $('#soonIc,#v-soon .soon-ico use').setAttribute('href', '#i-' + i[1])
            }

            function route() {
                const v = (location.hash.replace('#/', '') || 'home');
                const id = (v !== 'soon' && $('#v-' + v)) ? v : 'home';
                curView = id;
                document.body.dataset.view = id;
                const soon = SOON.includes(id),
                    shown = soon ? 'soon' : id;
                $$('.view').forEach(e => e.classList.toggle('on', e.id === 'v-' + shown));
                $$('#nav a[data-v]').forEach(a => a.classList.toggle('on', a.dataset.v === id));
                if (soon) fillSoon(id);
                if (id === 'focus' && window.NXPRE && NXPRE.loadAudio) NXPRE.loadAudio();
                const m = $('.main');
                if (m) m.scrollTop = 0;
            }
            addEventListener('hashchange', route);
            document.addEventListener('click', e => {
                const c = e.target.closest('.chk');
                if (c) {
                    const id = +c.closest('.task').dataset.id,
                        x = S.tasks.find(t => t.id === id);
                    x.d = x.d ? 0 : 1;
                    if (x.d) {
                        SFX.done();
                        confetti(c);
                        toast('✅ ' + tr('Task completed successfully'))
                    } else {
                        SFX.undo()
                    }
                    save();
                    render();
                    return
                }
                const del = e.target.closest('[data-del]');
                if (del) {
                    S.tasks = S.tasks.filter(t => t.id !== +del.dataset.del);
                    SFX.tap();
                    save();
                    render();
                    return
                }
                const f = e.target.closest('#flt .chip');
                if (f) {
                    flt = f.dataset.f;
                    $$('#flt .chip').forEach(b => b.classList.toggle('on', b === f));
                    SFX.tap();
                    render();
                    return
                }
                const s = e.target.closest('#subj .chip');
                if (s) {
                    subj = s.dataset.s;
                    SFX.tap();
                    render();
                    return
                }
                const bo = e.target.closest('[data-open]');
                if (bo) {
                    openBook(+bo.dataset.open);
                    return
                }
                const bd = e.target.closest('[data-bdel]');
                if (bd) {
                    const id = +bd.dataset.bdel,
                        bk = S.books.find(x => x.id === id);
                    if (!bk) return;
                    const ar = S.lang === 'ar';
                    confirmDlg({
                        title: ar ? 'حذف هذا الكتاب؟' : 'Delete this book?',
                        msg: ar ? 'سيُحذف «' + bk.t + '» وكل تعليقاته من هذا الجهاز.' : '“' + bk.t + '” and its annotations will be removed from this device.',
                        ok: tr('Delete'),
                        danger: true
                    }).then(ok => {
                        if (ok) delBook(id)
                    });
                    return
                }

                if (e.target.closest('#themeSw,#themeSw2')) {
                    S.theme = S.theme === 'light' ? 'dark' : 'light';
                    S.themeUser = true;
                    theme();
                    SFX.tap();
                    save();
                    render()
                }
                if (e.target.closest('#sndSw')) {
                    S.sound = !S.sound;
                    save();
                    render();
                    if (S.sound) SFX.tap()
                }
                if (e.target.closest('#reset')) {
                    const ar = S.lang === 'ar';
                    confirmDlg({
                        title: ar ? 'إعادة ضبط الإعدادات؟' : 'Reset settings?',
                        msg: ar ? 'ستعود اللغة والثيم والصوت إلى الوضع الافتراضي. لن يتأثر اسمك ومهامك وكتبك وتعليقاتك.' : 'Your language, theme and sound will go back to their defaults. Your name, tasks, books and annotations will not be touched.',
                        ok: tr('Reset'),
                        danger: true
                    }).then(ok => {
                        if (!ok) return;
                        const d = seed();
                        S.lang = d.lang;
                        S.sound = d.sound;
                        S.vol = d.vol;
                        S.themeUser = false;
                        S.theme = d.theme;
                        save();
                        theme();
                        lang();
                        render();
                        $('#nameIn').value = S.name;
                        $('#vol').value = S.vol;
                        syncProfile();
                        toast(tr('Settings reset'))
                    })
                }
                if (e.target.closest('#bell')) {
                    toggleNP()
                }
            });
            $('#addF').onsubmit = e => {
                e.preventDefault();
                const t = $('#tin').value.trim();
                if (!t) return;
                S.tasks.push({
                    id: S.nid++,
                    no: S.tasks.reduce((m, x) => Math.max(m, x.no || 0), 0) + 1,
                    t,
                    p: $('#tpr').value,
                    d: 0
                });
                $('#tin').value = '';
                SFX.add();
                toast(tr('Task added'));
                save();
                render();
            };
            $('#nameIn').oninput = e => {
                S.name = e.target.value.slice(0, 24);
                syncProfile();
                save()
            };
            {
                const af = $('#avFile');
                if (af) af.onchange = e => {
                    const f = e.target.files && e.target.files[0];
                    e.target.value = '';
                    if (!f) return;
                    if (!/^image\//.test(f.type)) {
                        toast(tr('Please choose an image file'));
                        return
                    }
                    const url = URL.createObjectURL(f),
                        im = new Image();
                    im.onload = () => {
                        try {
                            const N = 256,
                                c = document.createElement('canvas');
                            c.width = c.height = N;
                            const x = c.getContext('2d'),
                                m = Math.min(im.naturalWidth, im.naturalHeight),
                                sx = (im.naturalWidth - m) / 2,
                                sy = (im.naturalHeight - m) / 2;
                            x.drawImage(im, sx, sy, m, m, 0, 0, N, N);
                            S.avatar = c.toDataURL('image/jpeg', .86);
                            save();
                            syncProfile();
                            SFX.add();
                            toast(tr('Photo updated'))
                        } catch (err) {
                            toast(tr('Please choose an image file'))
                        }
                        URL.revokeObjectURL(url)
                    };
                    im.onerror = () => {
                        URL.revokeObjectURL(url);
                        toast(tr('Please choose an image file'))
                    };
                    im.src = url
                };
                const ad = $('#avDel');
                if (ad) ad.onclick = () => {
                    delete S.avatar;
                    save();
                    syncProfile();
                    SFX.tap();
                    toast(tr('Photo removed'))
                }
            }
            try {
                matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                    if (!S.themeUser) {
                        S.theme = e.matches ? 'dark' : 'light';
                        theme();
                        save();
                        render()
                    }
                })
            } catch (x) {}
            $('#langSel').onchange = e => {
                S.lang = e.target.value;
                lang();
                render();
                save()
            };
            $('#vol').oninput = e => {
                S.vol = +e.target.value;
                save()
            };
            $('#vol').onchange = () => SFX.tap();
            window.NOVIX_MEM = window.NOVIX_MEM || new Map();
            const NXSTORE = window.NXSTORE = (() => {
                const CH = 64 * 1024 * 1024,
                    MEM = window.NOVIX_MEM;
                let dbp = null;
                const open = () => new Promise((ok, no) => {
                    const r = indexedDB.open('novix-lib', 1);
                    r.onupgradeneeded = () => r.result.createObjectStore('f');
                    r.onsuccess = () => ok(r.result);
                    r.onerror = () => no(r.error);
                    r.onblocked = () => no(new Error('IndexedDB blocked'))
                });
                const db = () => dbp || (dbp = Promise.race([open(), new Promise((_, no) => setTimeout(() => no(new Error('Browser storage did not respond')), 20000))]).catch(e => {
                    dbp = null;
                    throw e
                }));
                const tx = (d, mode, fn) => new Promise((ok, no) => {
                    let res, t;
                    try {
                        t = d.transaction('f', mode);
                        const r = fn(t.objectStore('f'));
                        if (r && 'onsuccess' in r) r.onsuccess = () => {
                            res = r.result
                        }
                    } catch (e) {
                        return no(e)
                    }
                    t.oncomplete = () => ok(res);
                    t.onerror = t.onabort = () => no(t.error || new Error('Storage write aborted'))
                });
                async function del(k) {
                    MEM.delete(k);
                    try {
                        const d = await db();
                        const v = await tx(d, 'readonly', s => s.get(k)).catch(() => null);
                        await tx(d, 'readwrite', s => {
                            if (v && v.nx)
                                for (let i = 0; i < v.n; i++) s.delete(k + ':' + i);
                            s.delete(k)
                        })
                    } catch (e) {}
                }
                async function put(k, f, onProg) {
                    MEM.set(k, f);
                    try {
                        navigator.storage && navigator.storage.persist && navigator.storage.persist()
                    } catch (e) {}
                    try {
                        if (navigator.storage && navigator.storage.estimate) {
                            const e = await navigator.storage.estimate();
                            if (e && e.quota && e.quota - (e.usage || 0) < f.size * 1.02) throw new Error('Not enough free storage')
                        }
                    } catch (e) {
                        if (/free storage/.test(e.message)) throw e
                    }
                    const d = await db();
                    await del(k);
                    MEM.set(k, f);
                    try {
                        if (f.size <= CH) {
                            await tx(d, 'readwrite', s => s.put(f, k));
                            onProg && onProg(1);
                            return
                        }
                        const n = Math.ceil(f.size / CH);
                        for (let i = 0; i < n; i++) {
                            await tx(d, 'readwrite', s => s.put(f.slice(i * CH, Math.min(f.size, (i + 1) * CH), f.type || 'application/pdf'), k + ':' + i));
                            onProg && onProg((i + 1) / n)
                        }
                        await tx(d, 'readwrite', s => s.put({
                            nx: 2,
                            n,
                            size: f.size,
                            type: f.type || 'application/pdf',
                            name: f.name,
                            lm: f.lastModified || 0
                        }, k))
                    } catch (e) {
                        const keep = MEM.get(k);
                        await del(k);
                        MEM.set(k, keep);
                        throw e
                    }
                }
                async function get(k, onProg) {
                    if (MEM.has(k)) {
                        onProg && onProg(1);
                        return MEM.get(k)
                    }
                    const d = await db(),
                        v = await tx(d, 'readonly', s => s.get(k));
                    if (!v || v instanceof Blob || !v.nx) {
                        onProg && onProg(1);
                        return v
                    }
                    const parts = [];
                    for (let i = 0; i < v.n; i++) {
                        const c = await tx(d, 'readonly', s => s.get(k + ':' + i));
                        if (!c) throw new Error('Missing stored part');
                        parts.push(c);
                        onProg && onProg((i + 1) / v.n)
                    }
                    return new File(parts, v.name || 'book.pdf', {
                        type: v.type || 'application/pdf',
                        lastModified: v.lm || 0
                    })
                }
                return {
                    put,
                    get,
                    del,
                    raw: {
                        put: (k, v) => db().then(d => tx(d, 'readwrite', st => st.put(v, k))),
                        get: k => db().then(d => tx(d, 'readonly', st => st.get(k))),
                        del: k => db().then(d => tx(d, 'readwrite', st => st.delete(k)))
                    }
                }
            })();
            const idbPut = (k, v, p) => NXSTORE.put(k, v, p);
            const idbGet = (k, p) => NXSTORE.get(k, p);
            const idbDel = k => NXSTORE.del(k);
            async function openBook(id) {
                const b = S.books.find(x => x.id === id);
                if (!b) return;
                if (!b.fn) {
                    toast(tr('No file attached'));
                    return
                }
                /* Open a tab synchronously while the click is still a user gesture;
                   opening it after the storage read is blocked by popup blockers. */
                const viewable = /\.(pdf|png|jpe?g|gif|webp|svg|txt|md|csv|json)$/i.test(b.fn);
                const win = viewable ? window.open('', '_blank') : null;
                try {
                    const f = await idbGet(id);
                    if (!f) throw new Error('Missing file');
                    const u = URL.createObjectURL(f);
                    if (win) {
                        win.location.href = u;
                    } else {
                        const a = document.createElement('a');
                        a.href = u;
                        a.rel = 'noopener';
                        a.download = b.fn;
                        a.click();
                    }
                    setTimeout(() => URL.revokeObjectURL(u), 6e4);
                    SFX.tap()
                } catch (e) {
                    console.error(e);
                    try {
                        if (win) win.close()
                    } catch (x) {}
                    toast(tr('No file attached'))
                }
            }

            function delBook(id) {
                S.books = S.books.filter(b => b.id !== id);
                idbDel(id);
                NXSTORE.raw.del('ann:' + id).catch(() => {});
                try {
                    localStorage.removeItem('novix.pdf.ann.v3.' + id)
                } catch (x) {}
                SFX.tap();
                save();
                render()
            }
            $('#bs').onchange = e => {
                $('#bsn').hidden = e.target.value !== '__new'
            };
            const isPdf = async f => {
                if (!f) return false;
                if (!(/\.pdf$/i.test(f.name) || f.type === 'application/pdf')) return false;
                try {
                    const h = new Uint8Array(await f.slice(0, 1024).arrayBuffer());
                    for (let i = 0; i < h.length - 4; i++)
                        if (h[i] === 37 && h[i + 1] === 80 && h[i + 2] === 68 && h[i + 3] === 70 && h[i + 4] === 45) return true
                } catch (x) {}
                return false
            };
            $('#bf').onchange = async e => {
                const f = e.target.files[0];
                if (f && !(await isPdf(f))) {
                    e.target.value = '';
                    $('#fn').textContent = '';
                    toast(tr('Only valid PDF files are supported'));
                    return
                }
                $('#fn').textContent = f ? f.name : '';
                if (f && !$('#bt').value) $('#bt').value = f.name.replace(/\.[^.]+$/, '')
            };
            const hx = h => [1, 3, 5].map(i => parseInt(String(h).slice(i, i + 2), 16) || 0);
            const mixc = (a, b, k) => {
                const A = hx(a),
                    B = hx(b);
                return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join('')
            };
            const lumc = h => {
                const [r, g, b] = hx(h);
                return (.299 * r + .587 * g + .114 * b) / 255
            };

            function coverGrad(b) {
                if (b.cc && /^#[0-9a-f]{6}$/i.test(b.cc)) {
                    let base = b.cc;
                    if (lumc(base) > .6) base = mixc(base, '#000000', .4);
                    return [base, mixc(base, '#ffffff', .36)]
                }
                return PAL[b.c % PAL.length]
            }

            function paintPick(box, cur, onPick) {
                box.innerHTML = '';
                const mk = (cls, c, title) => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'cp-chip' + cls;
                    if (c) b.style.background = c;
                    b.title = title;
                    return b
                };
                const auto = mk(cur ? ' auto' : ' auto on', null, tr('Auto'));
                auto.onclick = () => onPick(null, false);
                box.appendChild(auto);
                PAL.forEach(pp => {
                    const c = pp[0],
                        b = mk(cur && cur.toLowerCase() === c ? ' on' : '', c, c);
                    b.onclick = () => onPick(c, false);
                    box.appendChild(b)
                });
                const inp = document.createElement('input');
                inp.type = 'color';
                inp.className = 'cp-input';
                inp.value = cur && /^#[0-9a-f]{6}$/i.test(cur) ? cur : '#2e6fa5';
                inp.title = tr('Custom colour');
                inp.oninput = () => {
                    box.querySelectorAll('.cp-chip.on').forEach(x => x.classList.remove('on'));
                    onPick(inp.value, true)
                };
                box.appendChild(inp)
            }

            function confirmDlg(o) {
                return new Promise(res => {
                    const prev = document.activeElement,
                        m = document.createElement('div');
                    m.className = 'nx-modal';
                    m.innerHTML = '<div class="nx-dlg" role="alertdialog" aria-modal="true"><h3></h3><p></p><div class="nx-act"><button type="button" class="btn ghost" data-r="0"></button><button type="button" class="btn" data-r="1"></button></div></div>';
                    m.querySelector('h3').textContent = o.title;
                    m.querySelector('p').textContent = o.msg;
                    const [bc, bo] = m.querySelectorAll('button');
                    bc.textContent = o.cancel || tr('Cancel');
                    bo.textContent = o.ok || 'OK';
                    if (o.danger) bo.classList.add('danger');
                    const done = v => {
                        document.removeEventListener('keydown', kd, true);
                        m.classList.add('out');
                        setTimeout(() => {
                            m.remove();
                            try {
                                prev && prev.focus && prev.focus()
                            } catch (e) {}
                        }, 150);
                        res(v)
                    };
                    const kd = e => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            e.stopPropagation();
                            done(false)
                        }
                    };
                    m.addEventListener('click', e => {
                        if (e.target === m) done(false);
                        const b = e.target.closest('button[data-r]');
                        if (b) done(b.dataset.r === '1')
                    });
                    document.addEventListener('keydown', kd, true);
                    document.body.appendChild(m);
                    bc.focus()
                })
            }
            window.NX_confirm = confirmDlg;
            window.__coverPick = null;
            const cpBox = $('#cpSw');
            const repaintPick = () => paintPick(cpBox, window.__coverPick, (c, live) => {
                window.__coverPick = c;
                if (!live) repaintPick()
            });
            repaintPick();
            const recolorPop = document.createElement('div');
            recolorPop.className = 'recolor-pop';
            recolorPop.hidden = true;
            document.body.appendChild(recolorPop);
            let recolorId = null;
            const closePop = () => {
                recolorPop.hidden = true;
                recolorId = null
            };
            $('#lib').addEventListener('click', e => {
                const bt = e.target.closest('[data-recolor]');
                if (!bt) return;
                e.stopPropagation();
                const id = +bt.dataset.recolor;
                if (recolorId === id && !recolorPop.hidden) {
                    closePop();
                    return
                }
                const b = S.books.find(x => x.id === id);
                if (!b) return;
                recolorId = id;
                paintPick(recolorPop, b.cc || null, (c, live) => {
                    b.cc = c || undefined;
                    save();
                    render();
                    if (!live) closePop()
                });
                recolorPop.hidden = false;
                const r = bt.getBoundingClientRect(),
                    w = recolorPop.offsetWidth,
                    h = recolorPop.offsetHeight;
                recolorPop.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
                recolorPop.style.top = (r.bottom + h + 12 > innerHeight ? Math.max(8, r.top - h - 8) : r.bottom + 8) + 'px'
            });
            document.addEventListener('click', e => {
                if (!recolorPop.hidden && !recolorPop.contains(e.target) && !e.target.closest('[data-recolor]')) closePop()
            });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closePop()
            });
            $('#bkF').onsubmit = async e => {
                e.preventDefault();
                const t = $('#bt').value.trim();
                let s = $('#bs').value;
                if (!t) return;
                {
                    const f0 = $('#bf').files[0];
                    if (!f0) {
                        toast(tr('Please choose a PDF file'));
                        return
                    }
                    if (!(await isPdf(f0))) {
                        toast(tr('Only valid PDF files are supported'));
                        return
                    }
                }
                if (s === '__new') {
                    s = $('#bsn').value.trim();
                    if (!s) return;
                    if (!S.subjects.includes(s)) S.subjects.push(s)
                }
                const f = $('#bf').files[0],
                    b = {
                        id: S.nid++,
                        t,
                        s,
                        fn: f ? f.name : '',
                        ty: 'PDF',
                        cc: window.__coverPick || undefined,
                        size: f ? f.size : 0
                    };
                let mem = false;
                if (f) {
                    let ok = true;
                    {
                        const sb = $('#bkF button[type=submit]'),
                            lb = sb.firstElementChild;
                        sb.disabled = true;
                        if (lb) lb.textContent = tr('Saving…');
                        try {
                            await idbPut(b.id, f, p => {
                                if (lb) lb.textContent = tr('Saving…') + ' ' + Math.round(p * 100) + '%'
                            })
                        } catch (x) {
                            console.warn('store failed', x);
                            mem = NOVIX_MEM.has(b.id);
                            ok = mem
                        }
                        sb.disabled = false;
                        if (lb) lb.textContent = tr('Add book')
                    }
                    if (!ok) {
                        toast(tr('Couldn’t store the file'));
                        b.fn = '';
                        b.ty = '';
                        b.size = 0
                    }
                }
                S.books.push(b);
                $('#bt').value = '';
                $('#bf').value = '';
                $('#fn').textContent = '';
                $('#bsn').value = '';
                $('#bsn').hidden = true;
                SFX.add();
                if (!(f && !b.fn)) toast(tr(mem ? 'Book added (kept until you close this page)' : 'Book added'));
                save();
                subj = 'All';
                render();
                $('#bs').value = s;
                window.__coverPick = null;
                repaintPick();
                setTimeout(() => {
                    const o = document.querySelector('[data-open="' + b.id + '"]');
                    if (o) {
                        o.closest('.book').classList.add('fresh');
                        o.scrollIntoView({
                            block: 'nearest',
                            behavior: 'smooth'
                        })
                    }
                }, 60)
            };
            S.notes = S.notes || [];
            S.tt = S.tt || [];
            /* every task gets a stable number (#1, #2 …) that is shown in the list and in reminders */
            {
                let mx = S.tasks.reduce((m, x) => Math.max(m, x.no || 0), 0);
                S.tasks.slice().sort((a, b) => a.id - b.id).forEach(x => {
                    if (!x.no) x.no = ++mx
                })
            }
            S.notif = S.notif || [];
            S.nfired = S.nfired || {};
            const isAr = () => S.lang === 'ar',
                loc = () => isAr() ? 'ar-EG' : 'en';
            const cl = (c, d) => /^#[0-9a-f]{6}$/i.test(c) ? c : d;
            const FONTS = [
                ['Alexandria', "Alexandria,Manrope,sans-serif"],
                ['Manrope', "Manrope,Alexandria,sans-serif"],
                ['Cairo', "Cairo,Alexandria,sans-serif"],
                ['Amiri', "Amiri,Georgia,serif"],
                ['Playfair Display', "'Playfair Display',Georgia,serif"],
                ['Caveat', "Caveat,'Comic Sans MS',cursive"],
                ['Space Mono', "'Space Mono',ui-monospace,monospace"],
                ['تجوال · Tajawal', "Tajawal,Cairo,sans-serif"],
                ['المراعي · Almarai', "Almarai,Cairo,sans-serif"],
                ['نسخ · Noto Naskh', "'Noto Naskh Arabic',Amiri,serif"],
                ['كوفي · Reem Kufi', "'Reem Kufi',Cairo,sans-serif"],
                ['المسيري · El Messiri', "'El Messiri',Cairo,sans-serif"],
                ['لطيف · Lateef', "Lateef,Amiri,serif"],
                ['شهرزاد · Scheherazade', "'Scheherazade New',Amiri,serif"],
                ['رقعة · Aref Ruqaa', "'Aref Ruqaa',Amiri,serif"],
                ['تشانغا · Changa', "Changa,Cairo,sans-serif"],
                ['ليمونادا · Lemonada', "Lemonada,Cairo,sans-serif"],
                ['هرمتان · Harmattan', "Harmattan,Cairo,sans-serif"],
                ['ماركازي · Markazi', "'Markazi Text',Amiri,serif"],
                ['نوتو كوفي · Noto Kufi', "'Noto Kufi Arabic',Cairo,sans-serif"],
                ['رقاص · Rakkas', "Rakkas,Cairo,sans-serif"],
                ['مادة · Mada', "Mada,Cairo,sans-serif"],
                ['ريدكس · Readex', "'Readex Pro',Cairo,sans-serif"]
            ];
            const TBG = ['', '#fff3b0', '#ffd9e0', '#d6f5ea', '#d9e8ff', '#e9dcff', '#1c3a33', '#000000'];
            const INK = ['#1c3a33', '#000000', '#ffffff', '#1d4ed8', '#b91c1c', '#15803d', '#7c3aed', '#c2410c'];
            const PAPER = ['#fff3b0', '#ffd9e0', '#d6f5ea', '#d9e8ff', '#e9dcff', '#ffe5c7', '#ffffff', '#2b3a36'];
            const TTC = ['#5fc2a4', '#6aa7e0', '#f6c453', '#ef8a8a', '#b78be0', '#ff9a4d'];

            function swatches(box, list, cur, onPick) {
                box.innerHTML = '';
                list.forEach(c => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'nt-dot' + ((cur || '').toLowerCase() === c ? ' on' : '') + (c === '' ? ' none' : '');
                    b.style.setProperty('--c', c || 'transparent');
                    b.setAttribute('aria-label', c || tr('None'));
                    b.onclick = () => {
                        onPick(c, false);
                        SFX.tap()
                    };
                    box.appendChild(b)
                });
                const i = document.createElement('input');
                i.type = 'color';
                i.className = 'nt-col';
                i.value = cl(cur, '#888888');
                i.setAttribute('aria-label', tr('Custom colour'));
                i.oninput = () => {
                    box.querySelectorAll('.nt-dot.on').forEach(x => x.classList.remove('on'));
                    onPick(i.value, true)
                };
                box.appendChild(i)
            }
            function taskBanner(msg, go) {
                let box = document.getElementById('nx-banners');
                if (!box) {
                    box = document.createElement('div');
                    box.id = 'nx-banners';
                    box.setAttribute('role', 'region');
                    box.setAttribute('aria-live', 'polite');
                    document.body.appendChild(box)
                }
                const b = document.createElement('div');
                b.className = 'nx-banner';
                const t = document.createElement('span');
                t.className = 'nx-b-t';
                t.textContent = msg;
                const x = document.createElement('button');
                x.type = 'button';
                x.className = 'nx-b-x';
                x.textContent = '×';
                x.setAttribute('aria-label', tr('Hide'));
                x.title = tr('Hide');
                x.onclick = () => {
                    b.classList.add('out');
                    setTimeout(() => b.remove(), 180)
                };
                if (go) {
                    t.style.cursor = 'pointer';
                    t.setAttribute('role', 'button');
                    t.tabIndex = 0;
                    t.onclick = () => {
                        goNotif(go);
                        x.click()
                    };
                    t.onkeydown = e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            t.click()
                        }
                    }
                }
                b.append(t, x);
                box.appendChild(b)
            }
            function bigToast(t) {
                let e = document.getElementById('nx-save-toast');
                if (!e) {
                    e = document.createElement('div');
                    e.id = 'nx-save-toast';
                    e.setAttribute('role', 'status');
                    e.setAttribute('aria-live', 'polite');
                    document.body.appendChild(e)
                }
                e.textContent = t;
                e.classList.remove('on');
                void e.offsetWidth;
                e.classList.add('on');
                clearTimeout(bigToast.t);
                bigToast.t = setTimeout(() => e.classList.remove('on'), 2600)
            }

            const ne = {
                id: null,
                tc: INK[0],
                pc: PAPER[0],
                font: 0,
                size: 18,
                b: 0,
                i: 0,
                u: 0,
                al: 'start',
                pin: 0,
                T: null,
                tgt: 'b'
            };
            const defT = n => ({
                font: n.font | 0,
                size: Math.min(60, Math.round((n.size || 18) * 1.45)),
                b: 1,
                i: 0,
                u: 0,
                al: n.al || 'start',
                tc: n.tc || INK[0],
                bg: ''
            });
            const tOf = n => Object.assign(defT(n), n.T || {});
            const cur = () => ne.tgt === 't' ? ne.T : ne;
            const fmtD = ts => {
                const d = new Date(ts),
                    n = new Date();
                return d.toDateString() === n.toDateString() ? d.toLocaleTimeString(loc(), {
                    hour: '2-digit',
                    minute: '2-digit'
                }) : d.toLocaleDateString(loc(), {
                    day: 'numeric',
                    month: 'short',
                    year: d.getFullYear() === n.getFullYear() ? undefined : 'numeric'
                })
            };
            const RTLRX = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/,
                LTRRX = /[A-Za-z\u00C0-\u024F\u0370-\u052F]/;
            const textRtl = t => {
                t = String(t || '');
                for (const ch of t) {
                    if (RTLRX.test(ch)) return true;
                    if (LTRRX.test(ch)) return false
                }
                return document.documentElement.dir === 'rtl'
            };
            const physAl = (al, t) => al === 'left' || al === 'right' || al === 'center' ? al : (al === 'end' ? (textRtl(t) ? 'left' : 'right') : (textRtl(t) ? 'right' : 'left'));
            const tbg = o => o && o.bg ? `background:${cl(o.bg,'transparent')};padding:4px 10px;border-radius:10px;` : '';
            const tx = (o, t) => `color:${cl(o.tc,'#1c3a33')};font-family:${(FONTS[o.font]||FONTS[0])[1]};text-align:${['left','right','center'].includes(o.al)?o.al:physAl(o.al,t)};font-weight:${o.b?700:400};font-style:${o.i?'italic':'normal'};text-decoration:${o.u?'underline':'none'}`;

            function noteCard(n) {
                const body = (n.body || '').trim().split('\n').filter(Boolean).slice(0, 6).join('\n');
                return `<article class="nn-card" tabindex="0" role="button" data-nid="${n.id}" style="background:${cl(n.pc,'#fff3b0')};${tx(n,n.body)}">${n.pin?`<svg class="i nn-pinned"><use href="#i-pin"/></svg>`:''}<h3 dir="auto" style="${tx(tOf(n),n.title)};${tbg(tOf(n))}">${esc(n.title||tr('Untitled'))}</h3><p class="nn-pv" dir="auto">${esc(body)||`<i>${tr('No additional text')}</i>`}</p><small>${fmtD(n.ts)}</small><button type="button" class="nn-dl" data-dl="${n.id}" aria-label="${tr('Download note')}" title="${tr('Download note')}"><svg class="i" viewBox="0 0 24 24"><path d="M12 4v10M7.5 10 12 14.5 16.5 10M5 19h14"/></svg></button></article>`
            }

            function renderNotes() {
                const g = $('#nnGrid');
                if (!g) return;
                const all = S.notes.filter(n => !qv || (n.title + ' ' + n.body).toLowerCase().includes(qv)).slice().sort((a, b) => b.ts - a.ts);
                const pins = all.filter(n => n.pin),
                    rest = all.filter(n => !n.pin);
                $('#nnPin').innerHTML = pins.map(noteCard).join('');
                $('#nnPinLbl').hidden = !pins.length;
                $('#nnAllLbl').hidden = !pins.length || !rest.length;
                g.innerHTML = rest.map(noteCard).join('') || (pins.length ? '' : `<div class="nn-empty"><span>📝</span><p>${tr('No notes yet. Tap + to write your first note.')}</p></div>`);
                const c = S.notes.length;
                $('#nnCount').textContent = c + ' ' + tr(c === 1 ? 'note' : 'notes')
            }
            const fab = document.createElement('button');
            fab.type = 'button';
            fab.className = 'nn-fab';
            fab.id = 'nnNew';
            fab.setAttribute('aria-label', 'New note');
            fab.innerHTML = '<svg class="i"><use href="#i-plus"/></svg>';
            document.body.appendChild(fab);
            const nm = document.createElement('div');
            nm.className = 'nm';
            nm.hidden = true;
            nm.id = 'nm';
            nm.innerHTML = `<div class="nm-card" id="nmCard" role="dialog" aria-modal="true" aria-label="Note">
 <div class="nm-top"><button type="button" class="nm-b nm-back" id="nmBack" aria-label="Back"><svg class="i flip"><use href="#i-cl"/></svg></button><span class="nm-date" id="nmDate"></span><span class="nm-sp"></span><button type="button" class="nm-b" id="nmPin" aria-pressed="false"><svg class="i"><use href="#i-pin"/></svg></button><button type="button" class="nm-b" id="nmDl" aria-label="Download note"><svg class="i" viewBox="0 0 24 24"><path d="M12 4v10M7.5 10 12 14.5 16.5 10M5 19h14"/></svg></button><button type="button" class="nm-b" id="nmDel" aria-label="Delete"><svg class="i"><use href="#i-trash"/></svg></button><button type="button" class="nm-ok" id="nmOk"><svg class="i"><use href="#i-ck"/></svg><span id="nmOkL">Save</span></button></div>
 <div class="nm-body" id="nmBody"><input id="nTitle" maxlength="80" dir="auto"><textarea id="nBody" dir="auto"></textarea></div>
 <div class="nm-pop" id="nmPop" hidden></div>
 <div class="nm-tools" id="nmTools">
  <span class="nm-tgtlab" id="nTgtLab" aria-live="polite"></span>
  <button type="button" class="nm-t nm-font" id="nFontBtn" data-pop="font" aria-label="Font"><span class="nm-fa" id="nFontA">Aa</span><span class="nm-fn" id="nFontN"></span><svg class="i nm-fc" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg></button>
  <span class="nm-g"><button type="button" class="nm-t" id="nSm"><b>A</b><small>−</small></button><b class="nm-sz" id="nSizeV">18</b><button type="button" class="nm-t" id="nSp"><b>A</b><small>+</small></button></span>
  <span class="nm-g"><button type="button" class="nm-t" id="nB"><b>B</b></button><button type="button" class="nm-t" id="nI"><i>I</i></button><button type="button" class="nm-t" id="nU"><u>U</u></button></span>
  <span class="nm-g"><button type="button" class="nm-t" data-al="left">⇤</button><button type="button" class="nm-t" data-al="center">≡</button><button type="button" class="nm-t" data-al="right">⇥</button></span>
  <span class="nm-g"><button type="button" class="nm-t nm-c" id="nTxtBtn" data-pop="tc"><b>A</b><i></i></button><button type="button" class="nm-t nm-c" id="nPapBtn" data-pop="pc"><span class="nm-pap"></span></button><button type="button" class="nm-t nm-c" id="nTbgBtn" data-pop="tb" aria-label="Title background" title="Title background"><b style="font-size:13px">T</b><span class="nm-pap nm-tbgdot"></span></button></span>
 </div></div>`;
            document.body.appendChild(nm);
            let nmT = 0,
                nmPopK = '';

            function nmApply() {
                const c = $('#nmCard'),
                    f = FONTS[ne.font] || FONTS[0];
                c.style.background = ne.pc;
                c.style.color = ne.tc;
                const t = $('#nBody'),
                    h = $('#nTitle'),
                    C = cur();
                t.style.cssText = `${tx(ne,t.value)};font-size:${ne.size}px;color:${cl(ne.tc,'#1c3a33')}!important;-webkit-text-fill-color:${cl(ne.tc,'#1c3a33')};caret-color:${cl(ne.tc,'#1c3a33')}`;
                h.style.cssText = `${tx(ne.T,h.value)};font-size:${ne.T.size}px;background:${ne.T.bg?cl(ne.T.bg,'transparent'):'transparent'};${ne.T.bg?'padding:8px 12px;border-radius:12px;':''}color:${cl(ne.T.tc,'#1c3a33')}!important;-webkit-text-fill-color:${cl(ne.T.tc,'#1c3a33')};caret-color:${cl(ne.T.tc,'#1c3a33')}`;
                $('#nSizeV').textContent = C.size;
                {
                    const fo = FONTS[C.font] || FONTS[0],
                        parts = fo[0].split('·'),
                        fa = $('#nFontA');
                    fa.style.fontFamily = fo[1];
                    $('#nFontN').textContent = (parts[1] || parts[0]).trim();
                    $('#nFontBtn').setAttribute('aria-label', tr('Font') + ': ' + fo[0])
                }
                $('#nB').setAttribute('aria-pressed', !!C.b);
                $('#nI').setAttribute('aria-pressed', !!C.i);
                $('#nU').setAttribute('aria-pressed', !!C.u);
                $$('#nmTools [data-al]').forEach(b => b.setAttribute('aria-pressed', b.dataset.al === physAl(C.al, ne.tgt === 't' ? $('#nTitle').value : $('#nBody').value)));
                $('#nTgtLab').textContent = tr(ne.tgt === 't' ? 'Title' : 'Body');
                $('#nmBody').dataset.tgt = ne.tgt;
                $('#nTgtLab').dataset.tgt = ne.tgt;
                $('#nmPin').setAttribute('aria-pressed', !!ne.pin);
                $('#nmPin').setAttribute('aria-label', tr(ne.pin ? 'Unpin' : 'Pin'));
                $('#nTxtBtn i').style.background = C.tc;
                $('#nPapBtn .nm-pap').style.background = ne.pc;
                {
                    const tb = $('#nTbgBtn');
                    if (tb) {
                        tb.querySelector('.nm-tbgdot').style.background = ne.T.bg || 'transparent';
                        tb.setAttribute('aria-label', tr('Title background'));
                        tb.title = tr('Title background')
                    }
                }
                $('#nTitle').placeholder = tr('Note title');
                $('#nBody').placeholder = tr('Write your note here…');
                $('#nmOkL').textContent = tr('Save')
            }

            function nmCommit() {
                clearTimeout(nmT);
                const t = $('#nTitle').value,
                    b = $('#nBody').value;
                let n = ne.id && S.notes.find(x => x.id === ne.id);
                if (!n) {
                    if (!t.trim() && !b.trim()) return false;
                    n = {
                        id: S.nid++
                    };
                    S.notes.push(n);
                    ne.id = n.id
                }
                Object.assign(n, {
                    title: t,
                    body: b,
                    tc: ne.tc,
                    pc: ne.pc,
                    font: ne.font,
                    size: ne.size,
                    b: ne.b,
                    i: ne.i,
                    u: ne.u,
                    al: ne.al,
                    T: {
                        ...ne.T
                    },
                    pin: ne.pin ? 1 : 0,
                    ts: Date.now()
                });
                save();
                renderNotes();
                return true
            }
            const nmSched = () => {
                clearTimeout(nmT);
                nmT = setTimeout(nmCommit, 350)
            };

            function nmPop(k) {
                const p = $('#nmPop');
                if (!k || nmPopK === k) {
                    p.hidden = true;
                    p.classList.remove('fonts');
                    nmPopK = '';
                    return
                }
                nmPopK = k;
                p.hidden = false;
                p.classList.toggle('fonts', k === 'font');
                if (k === 'font') {
                    const mkF = () => {
                        p.innerHTML = '';
                        FONTS.forEach((f, i) => {
                            const b = document.createElement('button'),
                                parts = f[0].split('·');
                            b.type = 'button';
                            b.className = 'nm-fo' + (cur().font === i ? ' on' : '');
                            b.innerHTML = `<span class="nm-fs" style="font-family:${f[1]}">أبجد Abc</span><small>${esc(parts[parts.length-1].trim())}</small>`;
                            b.onclick = () => {
                                cur().font = i;
                                nmApply();
                                nmSched();
                                SFX.tap();
                                mkF()
                            };
                            p.appendChild(b)
                        });
                        const on = p.querySelector('.on');
                        if (on) on.scrollIntoView({
                            block: 'nearest'
                        })
                    };
                    mkF();
                    return
                }
                const mk = () => {
                    const o = k === 'tc' ? cur() : k === 'tb' ? ne.T : ne;
                    swatches(p, k === 'tc' ? INK : k === 'tb' ? TBG : PAPER, o[k === 'tb' ? 'bg' : k] || '', (c, live) => {
                        o[k === 'tb' ? 'bg' : k] = c;
                        nmApply();
                        nmSched();
                        if (!live) mk()
                    })
                };
                mk()
            }

            function openNote(id) {
                const n = id != null ? S.notes.find(x => x.id === id) : null;
                if (n) {
                    Object.assign(ne, {
                        id: n.id,
                        tc: n.tc,
                        pc: n.pc,
                        font: n.font | 0,
                        size: n.size || 18,
                        b: n.b,
                        i: n.i,
                        u: n.u,
                        al: n.al || 'start',
                        pin: n.pin || 0,
                        tgt: 'b'
                    });
                    ne.T = tOf(n)
                } else {
                    const last = S.notes.slice().sort((a, b) => b.ts - a.ts)[0];
                    Object.assign(ne, {
                        id: null,
                        tc: INK[0],
                        pc: last ? last.pc : PAPER[0],
                        font: last ? last.font | 0 : 0,
                        size: 18,
                        b: 0,
                        i: 0,
                        u: 0,
                        al: 'start',
                        pin: 0
                    });
                    if (last && last.tc) ne.tc = last.tc;
                    ne.tgt = 'b';
                    ne.T = last ? tOf(last) : defT(ne)
                }
                $('#nTitle').value = n ? n.title : '';
                $('#nBody').value = n ? n.body : '';
                $('#nmDate').textContent = n ? fmtD(n.ts) : fmtD(Date.now());
                $('#nmDel').hidden = !n;
                nmPop('');
                nmApply();
                nm.hidden = false;
                document.body.classList.add('nm-open');
                requestAnimationFrame(() => nm.classList.add('in'));
                if (!n) setTimeout(() => $('#nTitle').focus(), 60);
                SFX.tap()
            }

            function closeNote() {
                if (nm.hidden) return;
                const had = nmCommit();
                const n = ne.id && S.notes.find(x => x.id === ne.id);
                if (n && !n.title.trim() && !n.body.trim()) {
                    S.notes = S.notes.filter(x => x.id !== n.id);
                    save();
                    renderNotes()
                }
                nm.classList.remove('in');
                document.body.classList.remove('nm-open');
                setTimeout(() => {
                    nm.hidden = true
                }, 180);
                nmPop('');
                if (had && (n && (n.title.trim() || n.body.trim()))) {
                    bigToast('✓ ' + tr('Note saved'));
                    SFX.add()
                }
            }
            fab.onclick = () => openNote(null);
            const cardClick = e => {
                const d = e.target.closest('[data-dl]');
                if (d) {
                    e.stopPropagation();
                    const n = S.notes.find(x => x.id === +d.dataset.dl);
                    if (n) downloadNote(n);
                    return
                }
                const c = e.target.closest('[data-nid]');
                if (c) openNote(+c.dataset.nid)
            };
            $('#nnPin').addEventListener('click', cardClick);
            $('#nnGrid').addEventListener('click', cardClick);
            [$('#nnPin'), $('#nnGrid')].forEach(g => g.addEventListener('keydown', e => {
                if (e.target.closest('[data-dl]')) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    const c = e.target.closest('[data-nid]');
                    if (c) {
                        e.preventDefault();
                        openNote(+c.dataset.nid)
                    }
                }
            }));
            $('#nmBack').onclick = $('#nmOk').onclick = closeNote;
            nm.addEventListener('click', e => {
                if (e.target === nm) closeNote()
            });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && !nm.hidden) {
                    closeNote()
                }
            });
            $('#nTitle').oninput = $('#nBody').oninput = () => {
                nmApply();
                nmSched();
                keepCaret()
            };
            /* formatting always applies to the field the user is writing in */
            $('#nTitle').addEventListener('focus', () => {
                ne.tgt = 't';
                nmPop('');
                nmApply()
            });
            $('#nBody').addEventListener('focus', () => {
                ne.tgt = 'b';
                nmPop('');
                nmApply()
            });
            /* keep the keyboard open and the caret in place while tapping tools */
            ['#nmTools', '#nmPop'].forEach(q => $(q).addEventListener('mousedown', e => {
                if (!e.target.closest('input')) e.preventDefault()
            }));
            $('#nSm').onclick = () => {
                const c = cur();
                c.size = Math.max(12, c.size - 2);
                nmApply();
                nmSched()
            };
            $('#nSp').onclick = () => {
                const c = cur();
                c.size = Math.min(ne.tgt === 't' ? 60 : 44, c.size + 2);
                nmApply();
                nmSched()
            };
            $('#nB').onclick = () => {
                const c = cur();
                c.b = c.b ? 0 : 1;
                nmApply();
                nmSched()
            };
            $('#nI').onclick = () => {
                const c = cur();
                c.i = c.i ? 0 : 1;
                nmApply();
                nmSched()
            };
            $('#nU').onclick = () => {
                const c = cur();
                c.u = c.u ? 0 : 1;
                nmApply();
                nmSched()
            };
            $$('#nmTools [data-al]').forEach(b => b.onclick = () => {
                cur().al = b.dataset.al;
                nmApply();
                nmSched()
            });
            $$('#nmTools [data-pop]').forEach(b => b.onclick = () => nmPop(b.dataset.pop));
            $('#nmPin').onclick = () => {
                ne.pin = ne.pin ? 0 : 1;
                nmApply();
                nmSched();
                SFX.tap()
            };
            $('#nmDel').onclick = () => {
                const id = ne.id;
                if (!id) return;
                confirmDlg({
                    title: tr('Delete this note?'),
                    msg: '',
                    ok: tr('Delete'),
                    danger: true
                }).then(ok => {
                    if (!ok) return;
                    S.notes = S.notes.filter(x => x.id !== id);
                    ne.id = null;
                    save();
                    renderNotes();
                    nm.classList.remove('in');
                    document.body.classList.remove('nm-open');
                    setTimeout(() => {
                        nm.hidden = true
                    }, 180);
                    bigToast('🗑 ' + tr('Note deleted'));
                    SFX.tap()
                })
            };

            /* ---------- download a note as an image, laid out exactly like the editor shows it ---------- */
            async function noteToPng(n) {
                const W = 1080,
                    K = 2,
                    T = tOf(n),
                    fam = o => (FONTS[o.font] || FONTS[0])[1],
                    fstr = (o, px) => `${o.i?'italic ':''}${o.b?700:400} ${px}px ${fam(o)}`;
                try {
                    await Promise.all([document.fonts.load(fstr(T, 40)), document.fonts.load(fstr(n, 32))])
                } catch (x) {}
                const g = document.createElement('canvas').getContext('2d');
                const wrap = (text, o, px, maxW) => {
                    g.font = fstr(o, px);
                    const out = [];
                    String(text || '').split('\n').forEach(par => {
                        if (!par.trim()) {
                            out.push({
                                s: '',
                                rtl: false
                            });
                            return
                        }
                        const rtl = textRtl(par);
                        g.direction = rtl ? 'rtl' : 'ltr';
                        let line = '';
                        const push = () => {
                            if (line) out.push({
                                s: line,
                                rtl
                            });
                            line = ''
                        };
                        par.split(' ').forEach(w => {
                            let t = line ? line + ' ' + w : w;
                            if (g.measureText(t).width <= maxW) {
                                line = t;
                                return
                            }
                            push();
                            while (g.measureText(w).width > maxW && w.length > 1) {
                                let k = w.length - 1;
                                while (k > 1 && g.measureText(w.slice(0, k)).width > maxW) k--;
                                out.push({
                                    s: w.slice(0, k),
                                    rtl
                                });
                                w = w.slice(k)
                            }
                            line = w
                        });
                        push()
                    });
                    return out
                };
                /* same proportions as the editor card: 30px corners, 26px side padding, soft shadow */
                const P = 52,
                    CW = W - P * 2,
                    R = 30 * K,
                    M = 70,
                    TOP = 96,
                    BOT = 60,
                    PADX = 12 * K,
                    PADY = 8 * K,
                    tpx = T.size * K,
                    bpx = n.size * K || 36,
                    tw = CW - (T.bg ? PADX * 2 : 0),
                    tl = (n.title || '').trim() ? wrap(n.title, T, tpx, tw) : [],
                    bl = (n.body || '').trim() ? wrap(n.body, n, bpx, CW) : [],
                    tlh = tpx * 1.3,
                    blh = bpx * 1.75,
                    tbH = tl.length ? tl.length * tlh + (T.bg ? PADY * 2 : 0) : 0,
                    H = Math.max(560, Math.round(TOP + tbH + (tbH ? 14 : 0) + bl.length * blh + BOT));
                const cv = document.createElement('canvas');
                cv.width = W + M * 2;
                cv.height = H + M * 2;
                const c = cv.getContext('2d');
                const rr = (x, y, w, h, r) => {
                    c.beginPath();
                    if (c.roundRect) c.roundRect(x, y, w, h, r);
                    else c.rect(x, y, w, h)
                };
                const paper = cl(n.pc, '#fff3b0');
                c.save();
                c.shadowColor = 'rgba(0,0,0,.32)';
                c.shadowBlur = 76;
                c.shadowOffsetY = 30;
                c.fillStyle = paper;
                rr(M, M, W, H, R);
                c.fill();
                c.restore();
                c.save();
                rr(M, M, W, H, R);
                c.clip();
                c.translate(M, M);
                c.fillStyle = paper;
                c.fillRect(0, 0, W, H);
                c.textBaseline = 'middle';
                const dRtl = document.documentElement.dir === 'rtl';
                c.font = `700 24px Manrope,Alexandria,sans-serif`;
                c.fillStyle = cl(n.tc, '#1c3a33');
                c.globalAlpha = .6;
                c.direction = dRtl ? 'rtl' : 'ltr';
                c.textAlign = dRtl ? 'right' : 'left';
                c.fillText(fmtD(n.ts || Date.now()), dRtl ? W - 44 : 44, 50);
                c.globalAlpha = 1;
                const draw = (lines, o, px, lh, top, left, width) => {
                    c.font = fstr(o, px);
                    c.fillStyle = cl(o.tc, '#1c3a33');
                    lines.forEach((ln, i) => {
                        if (!ln.s) return;
                        c.direction = ln.rtl ? 'rtl' : 'ltr';
                        const al = ['left', 'right', 'center'].includes(o.al) ? o.al : physAl(o.al, ln.s),
                            x = al === 'left' ? left : al === 'right' ? left + width : left + width / 2,
                            y = top + i * lh + lh / 2;
                        c.textAlign = al;
                        c.fillText(ln.s, x, y);
                        if (o.u) {
                            const w = c.measureText(ln.s).width,
                                x0 = al === 'left' ? x : al === 'right' ? x - w : x - w / 2;
                            c.fillRect(x0, y + px * .42, w, Math.max(2, px / 15))
                        }
                    })
                };
                let y = TOP;
                if (tl.length) {
                    if (T.bg) {
                        c.fillStyle = cl(T.bg, 'transparent');
                        rr(P, y, CW, tbH, 12 * K);
                        c.fill()
                    }
                    draw(tl, T, tpx, tlh, y + (T.bg ? PADY : 0), P + (T.bg ? PADX : 0), tw);
                    y += tbH + 14
                }
                draw(bl, n, bpx, blh, y, P, CW);
                c.restore();
                /* hairline edge like the card on screen */
                c.save();
                c.lineWidth = 2;
                c.strokeStyle = 'rgba(0,0,0,.07)';
                rr(M + 1, M + 1, W - 2, H - 2, R - 1);
                c.stroke();
                c.restore();
                return new Promise(ok => cv.toBlob(ok, 'image/png'))
            }
            async function downloadNote(n) {
                try {
                    const blob = await noteToPng(n);
                    if (!blob) throw 0;
                    const name = ((n.title || '').trim().slice(0, 40).replace(/[\\/:*?"<>|\n]+/g, ' ').trim() || 'note') + '.png',
                        a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    setTimeout(() => URL.revokeObjectURL(a.href), 4e4);
                    bigToast('✓ ' + tr('Note downloaded'));
                    SFX.add()
                } catch (e) {
                    toast(tr('Something went wrong'))
                }
            }
            $('#nmDl').onclick = () => {
                nmCommit();
                const live = {
                    title: $('#nTitle').value,
                    body: $('#nBody').value,
                    tc: ne.tc,
                    pc: ne.pc,
                    font: ne.font,
                    size: ne.size,
                    b: ne.b,
                    i: ne.i,
                    u: ne.u,
                    al: ne.al,
                    T: {
                        ...ne.T
                    },
                    ts: (ne.id && (S.notes.find(x => x.id === ne.id) || {}).ts) || Date.now()
                };
                downloadNote(live)
            };

            /* ---------- keep the writing place above the on-screen keyboard ---------- */
            function caretLine(ta) {
                const cs = getComputedStyle(ta),
                    m = document.createElement('div');
                ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing', 'textAlign', 'direction', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'wordBreak', 'overflowWrap', 'tabSize'].forEach(k => m.style[k] = cs[k]);
                m.style.cssText += ';position:absolute;visibility:hidden;left:-9999px;top:0;white-space:pre-wrap;box-sizing:border-box;width:' + ta.clientWidth + 'px';
                m.textContent = ta.value.slice(0, ta.selectionEnd);
                const sp = document.createElement('span');
                sp.textContent = '\u200b';
                m.appendChild(sp);
                document.body.appendChild(m);
                const y = sp.offsetTop,
                    lh = parseFloat(cs.lineHeight) || 28;
                m.remove();
                return {
                    y,
                    lh
                }
            }

            function keepCaret() {
                const ta = $('#nBody');
                if (nm.hidden || document.activeElement !== ta) return;
                const {
                    y,
                    lh
                } = caretLine(ta), top = ta.scrollTop, vis = ta.clientHeight;
                if (y < top) ta.scrollTop = Math.max(0, y - lh * .5);
                else if (y + lh * 1.6 > top + vis) ta.scrollTop = y + lh * 1.6 - vis
            }
            document.addEventListener('selectionchange', () => {
                if (document.activeElement === $('#nBody')) requestAnimationFrame(keepCaret)
            });
            if (window.visualViewport) {
                const vv = window.visualViewport,
                    root = document.documentElement;
                let rf = 0;
                const fit = () => {
                    cancelAnimationFrame(rf);
                    rf = requestAnimationFrame(() => {
                        const open = window.innerHeight - vv.height > 110;
                        root.classList.toggle('kb-open', open);
                        root.style.setProperty('--vvh', vv.height + 'px');
                        root.style.setProperty('--vvt', vv.offsetTop + 'px');
                        if (!open) return;
                        const a = document.activeElement;
                        if (a === $('#nBody')) setTimeout(keepCaret, 60);
                        else if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && a.closest('.sheet,.nm')) setTimeout(() => a.scrollIntoView({
                            block: 'center',
                            behavior: 'smooth'
                        }), 80)
                    })
                };
                vv.addEventListener('resize', fit);
                vv.addEventListener('scroll', fit);
                document.addEventListener('focusin', e => {
                    if (e.target.closest && e.target.closest('.sheet,.nm')) setTimeout(fit, 250)
                })
            }

            const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
            const wkStart = () => 6;
            let wk = 0,
                ttSel = -1,
                ttc = TTC[0],
                ttEd = {
                    id: null,
                    day: 0
                };

            function weekDays(off) {
                const t = new Date();
                t.setHours(0, 0, 0, 0);
                const st = new Date(t);
                st.setDate(t.getDate() - ((t.getDay() - wkStart() + 7) % 7) + off * 7);
                return Array.from({
                    length: 7
                }, (_, k) => {
                    const d = new Date(st);
                    d.setDate(st.getDate() + k);
                    return d
                })
            }
            const dayName = (d, w = 'long') => d.toLocaleDateString(loc(), {
                weekday: w
            });
            const ttFor = d => {
                const k = ymd(d),
                    w = d.getDay();
                return S.tt.filter(e => e.rep ? (e.day === w && (!e.from || e.from <= k)) : e.date === k).sort((a, b) => (a.time || '~').localeCompare(b.time || '~'))
            };
            const selIdx = () => {
                if (ttSel >= 0 && ttSel < 7) return ttSel;
                const td = ymd(new Date()),
                    i = weekDays(wk).findIndex(d => ymd(d) === td);
                return i >= 0 ? i : 0
            };

            function ttChip(e) {
                const tk = e.task && S.tasks.find(x => x.id === e.task),
                    no = tk ? tk.no : e.tno;
                return no ? ` <i class="tno">#${no}</i>` : ''
            }

            function entryHTML(e, k) {
                const dn = !!(e.done && e.done[k]);
                return `<div class="tt-e ${dn?'done':''}" style="--c:${cl(e.c,'#5fc2a4')}" data-tedit="${e.id}" role="button" tabindex="0"><span class="tt-tm">${e.time?esc(e.time):'<svg class="i"><use href="#i-cal"/></svg>'}</span><div class="tt-m"><span dir="auto">${esc(e.t)}${ttChip(e)}</span><small>${e.time?'':tr('All day')}${e.rep?(e.time?'':' · ')+'↻':''}</small></div><button type="button" class="tt-ck" data-tck="${e.id}" data-k="${k}" role="checkbox" aria-checked="${dn}" aria-label="${esc(e.t)}">${ic('ck')}</button></div>`
            }

            function renderTT() {
                const g = $('#ttGrid');
                if (!g) return;
                const days = weekDays(wk),
                    td = ymd(new Date()),
                    si = selIdx();
                $('#wkLbl').textContent = days[0].toLocaleDateString(loc(), {
                    day: 'numeric',
                    month: 'short'
                }) + ' – ' + days[6].toLocaleDateString(loc(), {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                $('#ttStrip').innerHTML = days.map((d, i) => {
                    const n = ttFor(d).length;
                    return `<button type="button" class="tt-sp ${i===si?'on':''} ${ymd(d)===td?'today':''}" data-sel="${i}"><small>${dayName(d,'short')}</small><b>${d.getDate()}</b><i>${'•'.repeat(Math.min(n,3))||'&nbsp;'}</i></button>`
                }).join('');
                g.innerHTML = days.map((d, i) => {
                    const k = ymd(d),
                        items = ttFor(d).filter(e => !qv || e.t.toLowerCase().includes(qv));
                    return `<div class="tt-day ${k===td?'today':''} ${i===si?'sel':''}"><div class="tt-h"><div><b>${dayName(d)}</b><small>${d.toLocaleDateString(loc(),{day:'numeric',month:'short'})}</small></div><button type="button" class="tt-add" data-tadd="${d.getDay()}" aria-label="${tr('Add plan')}">${ic('plus')}</button></div><div class="tt-list">${items.map(e=>entryHTML(e,k)).join('')||`<button type="button" class="tt-empty" data-tadd="${d.getDay()}">${tr('No plans')}</button>`}</div></div>`
                }).join('')
            }
            $('#wkPrev').onclick = () => {
                wk--;
                ttSel = -1;
                renderTT()
            };
            $('#wkNext').onclick = () => {
                wk++;
                ttSel = -1;
                renderTT()
            };
            $('#wkToday').onclick = () => {
                wk = 0;
                ttSel = -1;
                renderTT()
            };
            $('#ttStrip').addEventListener('click', e => {
                const b = e.target.closest('[data-sel]');
                if (b) {
                    ttSel = +b.dataset.sel;
                    SFX.tap();
                    renderTT()
                }
            });
            const sh = document.createElement('div');
            sh.className = 'sheet';
            sh.hidden = true;
            sh.id = 'ttSheet';
            sh.innerHTML = `<form class="sheet-card" id="ttF" role="dialog" aria-modal="true"><div class="sheet-h"><h2 id="ttSheetT">Add plan</h2><button type="button" class="x" id="ttX" aria-label="Close">${ic('x')}</button></div>
 <label class="sh-f"><span>${'Title'}</span><span class="tt-tw"><input id="ttT" required maxlength="200" autocomplete="off" dir="auto"><button type="button" class="tt-no" id="ttNo" hidden></button></span></label>
 <label class="sh-f"><select id="ttLink" aria-label="Link a task"></select></label>
 <div class="sh-f"><span id="ttDayL">Day</span><div class="sh-days" id="ttDays"></div></div>
 <div class="sh-row"><label class="sh-f"><span id="ttTimeL">Time</span><span class="sh-time"><input id="ttTime" type="time"><button type="button" class="x" id="ttNoTime" aria-label="Clear time">${ic('x')}</button></span></label>
  <div class="sh-f"><span id="ttColL">Colour</span><span class="nt-sw" id="ttSw"></span></div></div>
 <label class="nt-chk"><input type="checkbox" id="ttRep" checked><span id="ttRepL">Repeat every week</span></label>
 <div class="sheet-act"><button class="btn" type="submit"><span id="ttSaveL">Save plan</span></button><button class="btn ghost" type="button" id="ttDel" hidden><span id="ttDelL">Delete</span></button></div></form>`;
            document.body.appendChild(sh);

            function ttLabels() {
                $('#ttSheetT').textContent = tr(ttEd.id ? 'Edit plan' : 'Add plan');
                $('#ttT').placeholder = tr('Task or event…');
                $('#ttSaveL').textContent = tr('Save plan');
                $('#ttDelL').textContent = tr('Delete');
                $('#ttDayL').textContent = tr('Day');
                $('#ttTimeL').textContent = tr('Time');
                $('#ttColL').textContent = tr('Colour');
                $('#ttRepL').textContent = tr('Repeat every week');
                $('#ttNoTime').setAttribute('aria-label', tr('Clear time'));
                $('#ttX').setAttribute('aria-label', tr('Cancel'));
                $('#ttT').closest('label').firstElementChild.textContent = tr('Title')
            }

            function paintDays() {
                $('#ttDays').innerHTML = weekDays(0).map(d => `<button type="button" class="sh-d ${d.getDay()===ttEd.day?'on':''}" data-day="${d.getDay()}">${dayName(d,'short')}</button>`).join('')
            }

            function paintTtSw() {
                swatches($('#ttSw'), TTC, ttc, (c, live) => {
                    ttc = c;
                    if (!live) paintTtSw()
                })
            }

            function paintTtNo() {
                const b = $('#ttNo');
                if (!b) return;
                const tk = ttEd.task && S.tasks.find(x => x.id === ttEd.task),
                    no = tk ? tk.no : ttEd.tno;
                b.hidden = !no;
                if (no) {
                    b.textContent = '#' + no + ' ×';
                    b.title = tr('Unlink task');
                    b.setAttribute('aria-label', tr('Unlink task') + ' #' + no)
                }
            }

            function openTT(id, day) {
                const e = id != null ? S.tt.find(x => x.id === id) : null;
                ttEd = {
                    id: e ? e.id : null,
                    day: e ? e.day : (day != null ? day : weekDays(wk)[selIdx()].getDay()),
                    task: e && e.task || 0,
                    tno: e && e.tno || 0
                };
                $('#ttT').value = e ? e.t : '';
                $('#ttTime').value = e ? e.time || '' : '';
                $('#ttRep').checked = e ? !!e.rep : true;
                ttc = e ? cl(e.c, TTC[0]) : ttc;
                $('#ttDel').hidden = !e;
                $('#ttLink').innerHTML = `<option value="">${tr('Pick from My Tasks')}</option>` + S.tasks.filter(x => !x.d).map(x => `<option value="${x.id}">${esc(tr(x.t))}</option>`).join('');
                $('#ttLink').parentElement.hidden = false;
                ttLabels();
                paintTtNo();
                paintDays();
                paintTtSw();
                sh.hidden = false;
                document.body.classList.add('nm-open');
                requestAnimationFrame(() => sh.classList.add('in'));
                setTimeout(() => $('#ttT').focus(), 80)
            }

            function closeTT() {
                sh.classList.remove('in');
                document.body.classList.remove('nm-open');
                setTimeout(() => {
                    sh.hidden = true
                }, 160)
            }
            $('#ttNew').onclick = () => openTT(null);
            $('#ttX').onclick = closeTT;
            sh.addEventListener('click', e => {
                if (e.target === sh) closeTT()
            });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && !sh.hidden) closeTT()
            });
            $('#ttDays').addEventListener('click', e => {
                const b = e.target.closest('[data-day]');
                if (b) {
                    ttEd.day = +b.dataset.day;
                    paintDays();
                    SFX.tap()
                }
            });
            $('#ttLink').onchange = e => {
                const t = S.tasks.find(x => x.id === +e.target.value);
                if (t) {
                    $('#ttT').value = tr(t.t);
                    ttEd.task = t.id;
                    ttEd.tno = t.no || 0;
                    paintTtNo()
                }
                e.target.value = ''
            };
            $('#ttNo').onclick = () => {
                ttEd.task = 0;
                ttEd.tno = 0;
                paintTtNo();
                SFX.tap()
            };
            $('#ttNoTime').onclick = () => {
                $('#ttTime').value = ''
            };
            /* a plan whose time/day changed is reminded again at the new time */
            function renotify(en) {
                const mine = k => /^[bt]:/.test(k) && k.endsWith(':' + en.id);
                Object.keys(S.nfired).forEach(k => {
                    if (mine(k)) delete S.nfired[k]
                });
                try {
                    swGet('fired').then(f => {
                        if (!f) return;
                        let ch = 0;
                        Object.keys(f).forEach(k => {
                            if (mine(k)) {
                                delete f[k];
                                ch = 1
                            }
                        });
                        if (ch) swPut('fired', f)
                    }).catch(() => {})
                } catch (x) {}
                if (!en.time) return;
                const now = new Date(),
                    k = ymd(now),
                    on = en.rep ? en.day === now.getDay() : en.date === k,
                    [h, m] = en.time.split(':').map(Number);
                if (on && now.getHours() * 60 + now.getMinutes() >= h * 60 + m) {
                    S.nfired['t:' + k + ':' + en.id] = 1;
                    S.nfired['b:' + k + ':' + en.id] = 1
                }
            }
            const dateFor = (day, rep) => {
                const t0 = new Date();
                t0.setHours(0, 0, 0, 0);
                let d = weekDays(wk).find(x => x.getDay() === day);
                if (!rep && d < t0) {
                    d = new Date(t0);
                    while (d.getDay() !== day) d.setDate(d.getDate() + 1)
                }
                return d
            };
            $('#ttF').onsubmit = ev => {
                ev.preventDefault();
                const t = $('#ttT').value.trim();
                if (!t) return;
                const rep = $('#ttRep').checked,
                    day = ttEd.day,
                    d = dateFor(day, rep);
                let en = ttEd.id && S.tt.find(x => x.id === ttEd.id);
                let timeMoved = false;
                if (en) {
                    const chg = en.day !== day || en.rep !== rep;
                    timeMoved = chg || (en.time || '') !== ($('#ttTime').value || '');
                    Object.assign(en, {
                        t,
                        day,
                        time: $('#ttTime').value,
                        rep,
                        c: ttc,
                        task: ttEd.task || 0,
                        tno: ttEd.tno || 0
                    });
                    if (chg) {
                        en.date = ymd(d);
                        en.from = ymd(d)
                    }
                } else S.tt.push(en = {
                    id: S.nid++,
                    t,
                    day,
                    time: $('#ttTime').value,
                    rep,
                    date: ymd(d),
                    from: ymd(d),
                    c: ttc,
                    task: ttEd.task || 0,
                    tno: ttEd.tno || 0,
                    done: {}
                });
                if (timeMoved) renotify(en);
                const todayK = ymd(new Date());
                if (ymd(d) === todayK || (rep && day === new Date().getDay())) S.nfired['d:' + todayK] = 1;
                const ws = weekDays(0)[0];
                wk = Math.floor(Math.round((d - ws) / 864e5) / 7);
                ttSel = weekDays(wk).findIndex(x => ymd(x) === ymd(d));
                SFX.add();
                bigToast('✓ ' + tr('Plan saved'));
                save();
                closeTT();
                renderTT();
                try {
                    if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission().then(permUI).catch(() => {})
                } catch (x) {}
                checkSchedule()
            };
            $('#ttDel').onclick = () => {
                const id = ttEd.id,
                    en = S.tt.find(x => x.id === id);
                if (!en) return;
                const go = () => {
                    S.tt = S.tt.filter(x => x.id !== id);
                    SFX.tap();
                    bigToast(tr('Removed'));
                    save();
                    closeTT();
                    renderTT()
                };
                if (en.rep) confirmDlg({
                    title: tr('Remove this repeating task?'),
                    msg: en.t,
                    ok: tr('Delete'),
                    danger: true
                }).then(ok => {
                    if (ok) go()
                });
                else go()
            };
            $('#ttGrid').addEventListener('click', e => {
                const c = e.target.closest('[data-tck]');
                if (c) {
                    e.stopPropagation();
                    const en = S.tt.find(x => x.id === +c.dataset.tck);
                    if (!en) return;
                    en.done = en.done || {};
                    const k = c.dataset.k;
                    if (en.done[k]) {
                        delete en.done[k];
                        SFX.undo()
                    } else {
                        en.done[k] = 1;
                        SFX.done();
                        confetti(c)
                    }
                    save();
                    renderTT();
                    return
                }
                const a = e.target.closest('[data-tadd]');
                if (a) {
                    openTT(null, +a.dataset.tadd);
                    return
                }
                const ed = e.target.closest('[data-tedit]');
                if (ed) openTT(+ed.dataset.tedit)
            });
            $('#ttGrid').addEventListener('keydown', e => {
                if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-tedit]')) {
                    e.preventDefault();
                    openTT(+e.target.dataset.tedit)
                }
            });

            const np = document.createElement('div');
            np.className = 'np';
            np.hidden = true;
            document.body.appendChild(np);

            function updateDot() {
                const d = $('#dot');
                if (d) d.style.display = S.notif.some(n => !n.read) ? '' : 'none'
            }

            function renderNP() {
                const L = S.notif.slice().reverse();
                np.innerHTML = `<div class="np-h"><b>${tr('Notifications')}</b><button type="button" class="np-clr" ${L.length?'':'hidden'}>${tr('Clear all')}</button></div>` + (L.length ? L.map(n => `<div class="np-i go ${n.read?'':'new'}" data-nid2="${n.id}" role="button" tabindex="0"><span>${esc(n.msg)}</span><small>${new Date(n.ts).toLocaleString(loc(),{weekday:'short',hour:'2-digit',minute:'2-digit'})}</small></div>`).join('') : `<p class="np-e">${tr('No notifications yet')}</p>`)
            }

            function toggleNP() {
                if (!np.hidden) {
                    np.hidden = true;
                    return
                }
                S.notif.forEach(n => n.read = 1);
                save();
                updateDot();
                renderNP();
                np.hidden = false;
                const r = $('#bell').getBoundingClientRect(),
                    w = np.offsetWidth;
                np.style.top = (r.bottom + 8) + 'px';
                np.style.left = Math.max(8, Math.min(innerWidth - w - 8, isAr() ? r.left : r.right - w)) + 'px'
            }
            document.addEventListener('click', e => {
                if (e.target.closest('.np-clr')) {
                    S.notif = [];
                    save();
                    renderNP();
                    updateDot();
                    return
                }
                if (!np.hidden && !np.contains(e.target) && !e.target.closest('#bell')) np.hidden = true
            });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') np.hidden = true
            });
            function goNotif(go) {
                if (go && go.tasks) {
                    np.hidden = true;
                    location.hash = '#/tasks';
                    return
                }
                try {
                    const k = (go && go.k) || ymd(new Date()),
                        d = new Date(k + 'T00:00:00');
                    if (!isNaN(d)) {
                        const ws = weekDays(0)[0];
                        wk = Math.floor(Math.round((d - ws) / 864e5) / 7);
                        ttSel = weekDays(wk).findIndex(x => ymd(x) === k)
                    }
                    renderTT()
                } catch (x) {}
                np.hidden = true;
                if (location.hash !== '#/timetable') location.hash = '#/timetable';
                else route();
                const id = go && go.id;
                setTimeout(() => {
                    let el = id != null ? document.querySelector('#ttGrid [data-tedit="' + id + '"]') : null;
                    if (el && el.offsetParent === null) el = null;
                    if (!el) el = document.querySelector('#ttGrid .tt-day.sel') || document.querySelector('#ttGrid .tt-day.today');
                    if (!el) return;
                    try {
                        el.scrollIntoView({
                            block: 'center',
                            behavior: 'smooth'
                        })
                    } catch (x) {}
                    el.classList.remove('nx-hl');
                    void el.offsetWidth;
                    el.classList.add('nx-hl');
                    setTimeout(() => el.classList.remove('nx-hl'), 3800)
                }, 280)
            }
            document.addEventListener('click', e => {
                const ni = e.target.closest && e.target.closest('.np-i[data-nid2]');
                if (!ni) return;
                const n = S.notif.find(x => String(x.id) === ni.dataset.nid2);
                goNotif(n && n.go)
            });
            document.addEventListener('keydown', e => {
                if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.np-i[data-nid2]')) {
                    e.preventDefault();
                    e.target.click()
                }
            });

            function fireN(msg, go, urgent) {
                S.notif.push({
                    id: Date.now() + Math.random(),
                    ts: Date.now(),
                    msg,
                    read: 0,
                    go: go || null
                });
                if (S.notif.length > 30) S.notif.shift();
                updateDot();
                if (!np.hidden) {
                    S.notif.forEach(n => n.read = 1);
                    renderNP()
                }
                taskBanner('🔔 ' + msg, go);
                SFX.unlock();
                sysNotify(msg, go, urgent)
            }
            async function sysNotify(msg, go, urgent) {
                if (!('Notification' in window) || Notification.permission !== 'granted') return;
                const ico = new URL('assets/img/novix-notif-192.png?v=8', location.href).href;
                const bdg = new URL('assets/img/novix-badge-96.png?v=8', location.href).href;
                const o = {
                    body: msg,
                    tag: 'novix-' + ((go && (go.k || 'x')) || 'x') + '-' + ((go && go.id) || (go && go.tasks ? 'tasks' : 'd')),
                    icon: ico,
                    badge: bdg,
                    lang: S.lang,
                    dir: isAr() ? 'rtl' : 'ltr',
                    vibrate: [200, 100, 200],
                    renotify: true,
                    requireInteraction: !!urgent,
                    data: {
                        go: go || null
                    }
                };
                let reg = null;
                try {
                    if (navigator.serviceWorker) reg = await Promise.race([
                        navigator.serviceWorker.ready,
                        new Promise((_, no) => setTimeout(() => no(new Error('sw timeout')), 3000))
                    ])
                } catch (x) {
                    reg = null
                }
                if (reg && reg.showNotification) {
                    try {
                        await reg.showNotification('NOVIX', o);
                        return
                    } catch (x) {
                        console.warn('Service worker notification failed', x)
                    }
                }
                try {
                    const nt = new Notification('NOVIX', o);
                    nt.onclick = () => {
                        try {
                            window.focus()
                        } catch (x) {}
                        goNotif(go);
                        try {
                            nt.close()
                        } catch (x) {}
                    }
                } catch (x) {}
            }

            function permUI() {
                const b = $('#permBox');
                if (!b) return;
                const has = 'Notification' in window,
                    p = has ? Notification.permission : 'none',
                    ar = isAr();
                $('#permTxt').textContent = !has ? (ar ? '🔔 ستظهر التذكيرات داخل نوفيكس (أيقونة الجرس) أثناء فتح التطبيق.' : '🔔 Reminders appear inside NOVIX (bell icon) while the app is open.') :
                    p === 'granted' ? (ar ? '🔔 الإشعارات مفعّلة — سيتم تذكيرك في يوم كل مهمة مجدولة.' : '🔔 Notifications are on — you’ll be reminded on the day of each scheduled task.') :
                    p === 'denied' ? (ar ? 'إشعارات المتصفح محظورة. ستظل التذكيرات تظهر داخل نوفيكس (أيقونة الجرس).' : 'Browser notifications are blocked. Reminders will still appear inside NOVIX (bell icon).') :
                    (ar ? 'فعّل الإشعارات ليصلك تذكير في يوم كل مهمة مجدولة.' : 'Turn on notifications to get a reminder on the day of each scheduled task.');
                $('#permBtn').hidden = !(has && p === 'default');
                b.hidden = has && p === 'granted' ? false : false
            }
            $('#permBtn').onclick = () => {
                try {
                    Notification.requestPermission().then(permUI).catch(permUI)
                } catch (x) {
                    permUI()
                }
            };

            const NOTIF_WORDS = 5;
            const shortW = (t, n = NOTIF_WORDS) => {
                const w = String(t || '').trim().split(/\s+/).filter(Boolean);
                let o = w.slice(0, n).join(' ');
                if (o.length > 42) o = o.slice(0, 41).trim() + '…';
                else if (w.length > n) o += '…';
                return o
            };
            const ttLbl = e => {
                const tk = e.task && S.tasks.find(x => x.id === e.task),
                    no = tk ? tk.no : e.tno;
                return shortW(e.t) + (no ? ' · #' + no : '')
            };

            function checkSchedule() {
                const now = new Date(),
                    k = ymd(now),
                    items = ttFor(now).filter(e => !(e.done && e.done[k])),
                    ar = isAr();
                let ch = 0;
                if (items.length && !S.nfired['d:' + k]) {
                    S.nfired['d:' + k] = 1;
                    ch = 1;
                    fireN(items.length === 1 ? (ar ? '📌 لديك مهمة مجدولة اليوم: ' : '📌 Scheduled today: ') + ttLbl(items[0]) + (items[0].time ? ' · ' + items[0].time : '') : (ar ? `📌 لديك ${items.length} مهام مجدولة اليوم` : `📌 You have ${items.length} scheduled tasks today`), {
                        k: k,
                        id: items.length === 1 ? items[0].id : null
                    })
                } {
                    const pend = S.tasks.filter(x => !x.d).length;
                    if (pend && now.getHours() >= 18 && !S.nfired['p:' + k]) {
                        S.nfired['p:' + k] = 1;
                        ch = 1;
                        fireN(ar ? `📝 لسه عندك ${pend} ${pend>2&&pend<11?'مهام':'مهمة'} ما اكتملتش` : `📝 ${pend} task${pend>1?'s':''} still to finish today`, {
                            tasks: 1
                        })
                    }
                }
                const mins = now.getHours() * 60 + now.getMinutes();
                items.forEach(e => {
                    if (!e.time) return;
                    const [h, m] = e.time.split(':').map(Number), due = h * 60 + m, bk = 'b:' + k + ':' + e.id, key = 't:' + k + ':' + e.id;
                    if (!S.nfired[bk] && !S.nfired[key] && mins >= due - 10 && mins < due) {
                        S.nfired[bk] = 1;
                        ch = 1;
                        fireN((ar ? `🔜 بعد ${due-mins} دقيقة: ` : `🔜 In ${due-mins} min: `) + ttLbl(e), {
                            k: k,
                            id: e.id
                        })
                    }
                    if (!S.nfired[key] && mins >= due) {
                        S.nfired[key] = 1;
                        ch = 1;
                        const late = mins - due;
                        if (late <= 720) fireN((late > 30 ? (ar ? '⏰ فاتك موعد: ' : '⏰ Missed: ') : (ar ? '⏰ حان موعد: ' : '⏰ Time for: ')) + ttLbl(e), {
                            k: k,
                            id: e.id
                        }, true)
                    }
                });
                const cut = ymd(new Date(Date.now() - 14 * 864e5));
                Object.keys(S.nfired).forEach(key => {
                    if (key.slice(2, 12) < cut) {
                        delete S.nfired[key];
                        ch = 1
                    }
                });
                if (ch) save()
            }
            const SWDB = () => new Promise((ok, no) => {
                try {
                    const q = indexedDB.open('novix-sw', 1);
                    q.onupgradeneeded = () => q.result.createObjectStore('kv');
                    q.onsuccess = () => ok(q.result);
                    q.onerror = () => no(q.error)
                } catch (e) {
                    no(e)
                }
            });
            const swGet = async k => {
                try {
                    const d = await SWDB();
                    return await new Promise(ok => {
                        const q = d.transaction('kv').objectStore('kv').get(k);
                        q.onsuccess = () => ok(q.result);
                        q.onerror = () => ok()
                    })
                } catch (e) {}
            };
            const swPut = async (k, v) => {
                try {
                    const d = await SWDB();
                    return await new Promise(ok => {
                        const t = d.transaction('kv', 'readwrite');
                        t.objectStore('kv').put(v, k);
                        t.oncomplete = ok;
                        t.onerror = ok
                    })
                } catch (e) {}
            };
            let syncT;

            function queueSync() {
                clearTimeout(syncT);
                syncT = setTimeout(schedSync, 1200)
            }
            async function schedSync() {
                try {
                    const ar = isAr(),
                        items = [],
                        pend = S.tasks.filter(x => !x.d).length;
                    for (let n = 0; n < 14; n++) {
                        const d = new Date();
                        d.setDate(d.getDate() + n);
                        const k = ymd(d),
                            at = (h, m) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m).getTime(),
                            its = ttFor(d).filter(e => !(e.done && e.done[k]));
                        if (its.length && !S.nfired['d:' + k]) items.push({
                            key: 'd:' + k,
                            ts: at(8, 0),
                            win: 12 * 36e5,
                            tag: 'novix-' + k + '-' + (its.length === 1 ? its[0].id : 'd'),
                            go: {
                                k,
                                id: its.length === 1 ? its[0].id : null
                            },
                            msg: its.length === 1 ? (ar ? '📌 لديك مهمة مجدولة اليوم: ' : '📌 Scheduled today: ') + ttLbl(its[0]) + (its[0].time ? ' · ' + its[0].time : '') : (ar ? `📌 لديك ${its.length} مهام مجدولة اليوم` : `📌 You have ${its.length} scheduled tasks today`)
                        });
                        its.forEach(e => {
                            if (!e.time || S.nfired['t:' + k + ':' + e.id]) return;
                            const [h, m] = e.time.split(':').map(Number);
                            if (!S.nfired['b:' + k + ':' + e.id]) items.push({
                                key: 'b:' + k + ':' + e.id,
                                ts: at(h, m) - 10 * 6e4,
                                win: 10 * 6e4,
                                tag: 'novix-' + k + '-' + e.id,
                                go: {
                                    k,
                                    id: e.id
                                },
                                msg: (ar ? '🔜 بعد 10 دقائق: ' : '🔜 In 10 min: ') + ttLbl(e)
                            });
                            items.push({
                                key: 't:' + k + ':' + e.id,
                                ts: at(h, m),
                                win: 720 * 6e4,
                                ri: 1,
                                tag: 'novix-' + k + '-' + e.id,
                                go: {
                                    k,
                                    id: e.id
                                },
                                msg: (ar ? '⏰ حان موعد: ' : '⏰ Time for: ') + ttLbl(e),
                                msg2: (ar ? '⏰ فاتك موعد: ' : '⏰ Missed: ') + ttLbl(e)
                            })
                        });
                        if (pend && !S.nfired['p:' + k]) items.push({
                            key: 'p:' + k,
                            ts: at(18, 0),
                            win: 4 * 36e5,
                            tag: 'novix-' + k + '-tasks',
                            go: {
                                tasks: 1
                            },
                            msg: ar ? `📝 لسه عندك ${pend} ${pend>2&&pend<11?'مهام':'مهمة'} ما اكتملتش` : `📝 ${pend} task${pend>1?'s':''} still to finish today`
                        })
                    }
                    armNext(items);
                    await swPut('sched', {
                        items,
                        lang: S.lang,
                        at: Date.now()
                    })
                } catch (e) {}
            }
            let nextT;

            function armNext(items) {
                clearTimeout(nextT);
                const n = Date.now(),
                    f = items.map(x => x.ts).filter(t => t > n);
                if (!f.length) return;
                nextT = setTimeout(() => {
                    checkSchedule();
                    queueSync()
                }, Math.min(Math.min(...f) - n + 400, 2e9))
            }
            async function setupBG() {
                try {
                    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
                    const reg = await navigator.serviceWorker.register('sw.js');
                    await navigator.serviceWorker.ready;
                    await schedSync();
                    if ('Notification' in window && Notification.permission === 'granted' && 'periodicSync' in reg) {
                        try {
                            await reg.periodicSync.register('novix-check', {
                                minInterval: 15 * 6e4
                            })
                        } catch (e) {}
                    }
                } catch (e) {}
            }
            if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
                navigator.serviceWorker.addEventListener('message', e => {
                    if (e.data && e.data.type === 'go') goNotif(e.data.go)
                });
                try {
                    navigator.permissions.query({
                        name: 'notifications'
                    }).then(p => {
                        p.onchange = setupBG
                    })
                } catch (e) {}
                (async () => {
                    const f = await swGet('fired');
                    if (f) {
                        Object.assign(S.nfired, f);
                        save()
                    }
                    setupBG()
                })()
            }
            setInterval(checkSchedule, 30000);
            addEventListener('focus', checkSchedule);
            addEventListener('pageshow', checkSchedule);
            addEventListener('online', () => {
                checkSchedule();
                setupBG()
            });
            queueSync();
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) checkSchedule()
            });
            setTimeout(checkSchedule, 1200);
            addEventListener('novix:lang', () => {
                if (!nm.hidden) nmApply();
                if (!sh.hidden) {
                    ttLabels();
                    paintDays()
                }
            });
            (function bannerArt() {
                const MAP = {
                    tasks: '#/tasks',
                    timetable: '#/timetable',
                    library: '#/library',
                    notes: '#/notes',
                    sims: '#/sims',
                    smartboard: '#/smartboard',
                    focus: '#/focus'
                };
                const EXTRA = {
                    about: "<svg viewBox=\"0 0 220 200\" aria-hidden=\"true\"><defs><linearGradient id=\"aeG\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffe08a\"/><stop offset=\"1\" stop-color=\"#e2902a\"/></linearGradient><radialGradient id=\"aeH\" cx=\".5\" cy=\".5\" r=\".5\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".9\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></radialGradient><filter id=\"aeS\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"170%\"><feDropShadow dx=\"0\" dy=\"9\" stdDeviation=\"7\" flood-color=\"#14606a\" flood-opacity=\".4\"/></filter></defs>\n<circle cx=\"110\" cy=\"100\" r=\"98\" fill=\"url(#aeH)\"/><circle cx=\"110\" cy=\"100\" r=\"92\" fill=\"none\" stroke=\"#f0b45f\" stroke-opacity=\".5\" stroke-width=\"2\" stroke-dasharray=\"3 8\" stroke-linecap=\"round\"/><circle cx=\"110\" cy=\"100\" r=\"78\" fill=\"#f0b45f\" fill-opacity=\".14\"/>\n<g filter=\"url(#aeS)\"><circle cx=\"110\" cy=\"100\" r=\"62\" fill=\"url(#aeG)\"/></g><circle cx=\"110\" cy=\"100\" r=\"62\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".7\" stroke-width=\"3\"/><circle cx=\"110\" cy=\"100\" r=\"53\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".28\" stroke-width=\"1.5\"/>\n<g filter=\"url(#aeS)\"><path d=\"M110 64v44\" stroke=\"#fff\" stroke-width=\"19\" stroke-linecap=\"round\"/><circle cx=\"110\" cy=\"136\" r=\"11\" fill=\"#fff\"/></g><path d=\"M111.5 66v44\" stroke=\"#a4620f\" stroke-opacity=\".22\" stroke-width=\"19\" stroke-linecap=\"round\" transform=\"translate(0 3)\"/>\n<path d=\"M68 70a50 50 0 0 1 62-26\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".7\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n<circle cx=\"186\" cy=\"150\" r=\"9\" fill=\"#6aa7e0\" stroke=\"#fff\" stroke-width=\"2.5\"/><circle cx=\"30\" cy=\"112\" r=\"7\" fill=\"#5fc2a4\" stroke=\"#fff\" stroke-width=\"2.5\"/>\n<g fill=\"#fff\"><path d=\"M190 100l2.6 7.4 7.4 2.6-7.4 2.6-2.6 7.4-2.6-7.4-7.4-2.6 7.4-2.6z\"/><path d=\"M26 56l2 5.6 5.6 2-5.6 2-2 5.6-2-5.6-5.6-2 5.6-2z\" opacity=\".9\"/><circle cx=\"40\" cy=\"152\" r=\"3\"/><circle cx=\"168\" cy=\"30\" r=\"2.4\" opacity=\".9\"/></g></svg>",
                    settings: "<svg viewBox=\"0 0 220 200\" aria-hidden=\"true\"><defs><linearGradient id=\"seG\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#5fe0c6\"/><stop offset=\"1\" stop-color=\"#12857f\"/></linearGradient><radialGradient id=\"seH\" cx=\".5\" cy=\".5\" r=\".5\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".9\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></radialGradient><filter id=\"seS\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"170%\"><feDropShadow dx=\"0\" dy=\"9\" stdDeviation=\"7\" flood-color=\"#14606a\" flood-opacity=\".4\"/></filter></defs>\n<circle cx=\"110\" cy=\"100\" r=\"98\" fill=\"url(#seH)\"/><circle cx=\"110\" cy=\"100\" r=\"92\" fill=\"none\" stroke=\"#2fb3a8\" stroke-opacity=\".5\" stroke-width=\"2\" stroke-dasharray=\"3 8\" stroke-linecap=\"round\"/><circle cx=\"110\" cy=\"100\" r=\"78\" fill=\"#2fb3a8\" fill-opacity=\".14\"/>\n<g filter=\"url(#seS)\"><circle cx=\"110\" cy=\"100\" r=\"62\" fill=\"url(#seG)\"/></g><circle cx=\"110\" cy=\"100\" r=\"62\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".7\" stroke-width=\"3\"/><circle cx=\"110\" cy=\"100\" r=\"53\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".28\" stroke-width=\"1.5\"/>\n<g filter=\"url(#seS)\"><path d=\"M141.0 88.6 L151.2 91.8 L151.2 108.2 L141.0 111.4 L140.0 113.8 L144.9 123.3 L133.3 134.9 L123.8 130.0 L121.4 131.0 L118.2 141.2 L101.8 141.2 L98.6 131.0 L96.2 130.0 L86.7 134.9 L75.1 123.3 L80.0 113.8 L79.0 111.4 L68.8 108.2 L68.8 91.8 L79.0 88.6 L80.0 86.2 L75.1 76.7 L86.7 65.1 L96.2 70.0 L98.6 69.0 L101.8 58.8 L118.2 58.8 L121.4 69.0 L123.8 70.0 L133.3 65.1 L144.9 76.7 L140.0 86.2Z M124 100 a14 14 0 1 0 -28 0 a14 14 0 1 0 28 0Z\" fill=\"#fff\" fill-rule=\"evenodd\"/></g>\n<path d=\"M68 70a50 50 0 0 1 62-26\" fill=\"none\" stroke=\"#fff\" stroke-opacity=\".7\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n<g filter=\"url(#seS)\"><path d=\"M194.8 38.0 L198.7 39.1 L198.7 44.9 L194.8 46.0 L194.4 46.8 L196.5 50.3 L192.3 54.5 L188.8 52.4 L188.0 52.8 L186.9 56.7 L181.1 56.7 L180.0 52.8 L179.2 52.4 L175.7 54.5 L171.5 50.3 L173.6 46.8 L173.2 46.0 L169.3 44.9 L169.3 39.1 L173.2 38.0 L173.6 37.2 L171.5 33.7 L175.7 29.5 L179.2 31.6 L180.0 31.2 L181.1 27.3 L186.9 27.3 L188.0 31.2 L188.8 31.6 L192.3 29.5 L196.5 33.7 L194.4 37.2Z M189 42 a5 5 0 1 0 -10 0 a5 5 0 1 0 10 0Z\" fill=\"#f6c453\" stroke=\"#fff\" stroke-width=\"2\" fill-rule=\"evenodd\"/></g><circle cx=\"34\" cy=\"132\" r=\"8\" fill=\"#6aa7e0\" stroke=\"#fff\" stroke-width=\"2.5\"/>\n<g fill=\"#fff\"><path d=\"M190 100l2.6 7.4 7.4 2.6-7.4 2.6-2.6 7.4-2.6-7.4-7.4-2.6 7.4-2.6z\"/><path d=\"M26 56l2 5.6 5.6 2-5.6 2-2 5.6-2-5.6-5.6-2 5.6-2z\" opacity=\".9\"/><circle cx=\"40\" cy=\"152\" r=\"3\"/><circle cx=\"168\" cy=\"30\" r=\"2.4\" opacity=\".9\"/></g></svg>"
                };
                const SUB = {
                    library: 'Your books and PDFs, always within reach.',
                    notes: 'Capture ideas before they slip away.',
                    sims: 'Learn by experimenting.',
                    about: 'The story behind NOVIX.',
                    settings: 'Make NOVIX feel like yours.'
                };
                const uniq = (html, id) => {
                    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
                    let o = html;
                    ids.forEach(i => {
                        o = o.split('id="' + i + '"').join('id="' + i + '-bn-' + id + '"').split('url(#' + i + ')').join('url(#' + i + '-bn-' + id + ')').split('href="#' + i + '"').join('href="#' + i + '-bn-' + id + '"')
                    });
                    o = o.replace('class="art"', 'class="banner-art"');
                    if (o.indexOf('class="banner-art"') < 0) o = o.replace('<svg ', '<svg class="banner-art" ');
                    return o
                };
                for (const id of ['tasks', 'timetable', 'library', 'notes', 'smartboard', 'focus', 'about', 'settings']) {
                    const sec = document.getElementById('v-' + id);
                    if (!sec) continue;
                    let ban = sec.querySelector('.section-banner');
                    if (!ban) {
                        const h = sec.querySelector('h1.pg');
                        if (!h) continue;
                        ban = document.createElement('div');
                        ban.className = 'section-banner';
                        const copy = document.createElement('div');
                        copy.className = 'banner-copy';
                        const ey = document.createElement('span');
                        ey.className = 'eyebrow';
                        ey.setAttribute('data-t', '');
                        ey.textContent = 'YOUR PERSONAL WORKSPACE';
                        copy.appendChild(ey);
                        copy.appendChild(h);
                        if (SUB[id]) {
                            const p = document.createElement('p');
                            p.setAttribute('data-t', '');
                            p.textContent = SUB[id];
                            copy.appendChild(p)
                        }
                        ban.appendChild(copy);
                        sec.insertBefore(ban, sec.firstChild)
                    }
                    if (ban.querySelector('.banner-art-wrap')) continue;
                    let svg = null;
                    if (MAP[id]) {
                        const src = document.querySelector('#v-home a.fc[href="' + MAP[id] + '"] svg.art');
                        if (src) svg = src.outerHTML
                    } else svg = EXTRA[id];
                    if (!svg) continue;
                    const w = document.createElement('div');
                    w.className = 'banner-art-wrap';
                    w.setAttribute('aria-hidden', 'true');
                    w.innerHTML = uniq(svg, id);
                    ban.classList.add('has-art');
                    ban.appendChild(w)
                }
            })();
            Object.assign(AR, {
                'Smart Board': 'السبورة الذكية',
                'Draw, Explain, Present': 'ارسم واشرح وقدّم',
                'Draw, explain and present on a smart whiteboard. We’re putting the finishing touches on it.': 'ارسم واشرح وقدّم على سبورة ذكية. نضع اللمسات الأخيرة عليها.'
            });
            (() => {
                const A = {
                    'Focus Timer': 'مؤقت المذاكرة',
                    'Study with focus': 'ذاكر بتركيز',
                    'Focus': 'تركيز',
                    'Short break': 'استراحة قصيرة',
                    'Long break': 'استراحة طويلة',
                    'Start': 'ابدأ',
                    'Pause': 'إيقاف مؤقت',
                    'Reset': 'إعادة',
                    'Skip': 'تخطي',
                    'Music': 'الموسيقى',
                    'Off': 'إيقاف',
                    'Lofi chill': 'لو-فاي هادئ',
                    'Deep space': 'فضاء عميق',
                    'Rain': 'مطر',
                    'Ocean waves': 'أمواج البحر',
                    'Fireplace': 'مدفأة',
                    'My music': 'موسيقاي',
                    'Add songs': 'إضافة أغاني',
                    'Repeat': 'تكرار',
                    'Auto-start next': 'ابدأ التالي تلقائيًا',
                    'min': 'دقيقة',
                    'Sessions today': 'جلسات اليوم',
                    'Focus time': 'وقت التركيز',
                    'Session': 'جلسة',
                    'Time is up! Take a break.': 'انتهى الوقت! خذ استراحة.',
                    'Break is over. Back to focus!': 'انتهت الاستراحة. نرجع للتركيز!',
                    'No songs yet. Add files from your device.': 'لسه مفيش أغاني. أضف ملفات من جهازك.',
                    'Volume': 'الصوت',
                    'Sound': 'الصوت',
                    'Tap a sound to preview it for 3 seconds. It plays while the timer runs.': 'اضغط على صوت لمعاينته ٣ ثوانٍ، ويشتغل مع المؤقت ويتوقف معه.',
                    'Background': 'الخلفية',
                    'Stay in the zone with a calm timer, soft sounds and a view you love.': 'ركّز بهدوء مع مؤقت وأصوات هادئة وخلفية تحبها.'
                };
                for (const k in A)
                    if (!AR[k]) AR[k] = A[k];
                const FK = 'novix.focus.v1',
                    D = Object.assign({
                        f: 30,
                        s: 5,
                        l: 15,
                        auto: 0,
                        vol: 60,
                        rep: 0,
                        day: '',
                        n: 0,
                        min: 0,
                        done: 0
                    }, (() => {
                        try {
                            return JSON.parse(localStorage.getItem(FK)) || {}
                        } catch (e) {
                            return {}
                        }
                    })()),
                    save2 = () => {
                        try {
                            localStorage.setItem(FK, JSON.stringify(D))
                        } catch (e) {}
                    };
                const ST = $('#fxStage'),
                    T0 = document.title,
                    PRE = {
                        f: [15, 25, 30, 45, 60],
                        s: [3, 5, 10],
                        l: [15, 20, 30, 45]
                    };
                /* short break: 10 min at most · long break: 11 min at least */
                const LIM = {
                        f: [1, 180],
                        s: [1, 10],
                        l: [11, 180]
                    },
                    clampM = (m, v) => Math.max(LIM[m][0], Math.min(LIM[m][1], Math.round(+v) || D[m]));
                ['f', 's', 'l'].forEach(m => {
                    D[m] = clampM(m, D[m])
                });
                let lockT = 0;
                const lockHint = () => {
                    const n = Date.now();
                    if (n - lockT < 3000) return;
                    lockT = n;
                    toast(tr('Time is locked during a session — reset or skip to change it'))
                };
                if (D.day !== ymd(new Date())) {
                    D.day = ymd(new Date());
                    D.n = 0;
                    D.min = 0
                }
                let fm = 'f',
                    rem = D.f * 60,
                    end = 0,
                    run = false,
                    act = false,
                    tk;
                const len = m => D[m] * 60,
                    left = () => run ? Math.max(0, Math.ceil((end - Date.now()) / 1000)) : rem;

                function render() {
                    if (dlReady) RING.classList.toggle('locked', !!act);
                    ST.classList.toggle('fx-act', act);
                    const C = 2 * Math.PI * 118,
                        r = left(),
                        tot = len(fm),
                        mm = String(Math.floor(r / 60)).padStart(2, '0'),
                        ss = String(r % 60).padStart(2, '0'),
                        p = $('#fxPrg');
                    $('#fxT').textContent = mm + ':' + ss;
                    p.style.strokeDasharray = C;
                    p.style.strokeDashoffset = C * (1 - r / tot);
                    $('#fxL').textContent = tr(fm === 'f' ? 'Focus' : fm === 's' ? 'Short break' : 'Long break') + (fm === 'f' ? ' · ' + tr('Session') + ' ' + (D.done % 4 + 1) : '');
                    $('#fxGo').textContent = run ? tr('Pause') : tr('Start');
                    document.title = run ? mm + ':' + ss + ' · NOVIX' : T0;
                    document.querySelectorAll('#fxTabs button').forEach(b => b.classList.toggle('on', b.dataset.m === fm));
                    $('#fxPre').innerHTML = PRE[fm].map(v => `<button type="button" data-v="${v}" class="${v===D[fm]?'on':''}" ${act?'disabled':''}>${v}</button>`).join('');
                    const mi = $('#fxMin');
                    mi.min = LIM[fm][0];
                    mi.max = LIM[fm][1];
                    if (document.activeElement !== mi) mi.value = D[fm];
                    mi.disabled = act;
                    $('#fxAuto').checked = !!D.auto;
                    $('#fxStat').textContent = tr('Sessions today') + ': ' + D.n + ' · ' + tr('Focus time') + ': ' + D.min + ' ' + tr('min');
                    dialSync();
                    window.__nxAwake && window.__nxAwake(run)
                }
                function mode(m) {
                    clearInterval(tk);
                    run = false;
                    act = false;
                    fm = m;
                    rem = len(m);
                    render();
                    soundSync()
                }

                function pause() {
                    rem = left();
                    run = false;
                    clearInterval(tk);
                    render();
                    soundHold()
                }

                function start() {
                    if (run) return pause();
                    if (rem <= 0) rem = len(fm);
                    end = Date.now() + rem * 1000;
                    run = true;
                    act = true;
                    clearInterval(tk);
                    tk = setInterval(tick, 250);
                    try {
                        if (AC && AC.state === 'suspended') AC.resume()
                    } catch (e) {}
                    render();
                    soundSync()
                }

                function tick() {
                    Date.now() >= end ? done() : render()
                }

                function chime() {
                    try {
                        const c = ac();
                        [659, 784, 1047].forEach((f, i) => tone(f, c.currentTime + i * .28, 1.6, 'sine', .25, c.destination, .01))
                    } catch (e) {}
                }

                function done() {
                    clearInterval(tk);
                    run = false;
                    chime();
                    const wasF = fm === 'f';
                    if (wasF) {
                        D.done++;
                        D.n++;
                        D.min += D.f;
                        save2()
                    }
                    fireN(wasF ? '🎯 ' + tr('Time is up! Take a break.') : '⏰ ' + tr('Break is over. Back to focus!'), null, true);
                    mode(wasF ? (D.done % 4 === 0 ? 'l' : 's') : 'f');
                    if (D.auto) start()
                }
                document.addEventListener('click', e => {
                    const t = e.target;
                    if (t.closest('#fxTabs button')) mode(t.closest('#fxTabs button').dataset.m)
                });
                $('#fxGo').onclick = start;
                $('#fxReset').onclick = () => mode(fm);
                $('#fxSkip').onclick = () => {
                    if (fm === 'f') {
                        mode('s')
                    } else mode('f')
                };
                $('#fxPre').onclick = e => {
                    const b = e.target.closest('button');
                    if (!b || act) return;
                    D[fm] = +b.dataset.v;
                    rem = len(fm);
                    save2();
                    render()
                };
                $('#fxMin').onchange = e => {
                    if (act) {
                        e.target.value = D[fm];
                        return lockHint()
                    }
                    const raw = Math.round(+e.target.value) || D[fm];
                    if (fm === 's' && raw > 10) toast(tr('Short break can’t be longer than 10 minutes'));
                    if (fm === 'l' && raw < 11) toast(tr('Long break must be at least 11 minutes'));
                    D[fm] = clampM(fm, raw);
                    e.target.value = D[fm];
                    rem = len(fm);
                    save2();
                    render()
                };
                $('#fxAuto').onchange = e => {
                    D.auto = e.target.checked ? 1 : 0;
                    save2()
                };
                addEventListener('novix:lang', () => {
                    render();
                    renderSt()
                });
                var dlReady = false,
                    HIT = null;
                const RING = ST.querySelector('.fx-ring'),
                    SV = RING.querySelector('svg'),
                    NS = 'http://www.w3.org/2000/svg',
                    mkE = (t, a) => {
                        const e = document.createElementNS(NS, t);
                        for (const k in a) e.setAttribute(k, a[k]);
                        return e
                    };
                const tkG = mkE('g', {
                    class: 'fx-ticks'
                });
                for (let i = 0; i < 60; i++) {
                    const a = i / 60 * 6.2832,
                        mj = i % 5 === 0,
                        r1 = mj ? 124 : 127,
                        r2 = mj ? 133 : 131;
                    tkG.append(mkE('line', {
                        x1: 130 + Math.cos(a) * r1,
                        y1: 130 + Math.sin(a) * r1,
                        x2: 130 + Math.cos(a) * r2,
                        y2: 130 + Math.sin(a) * r2,
                        class: mj ? 'mj' : ''
                    }))
                }
                const kH = mkE('circle', {
                        r: 11,
                        class: 'fx-kh'
                    }),
                    kN = mkE('circle', {
                        r: 5.5,
                        class: 'fx-kn'
                    }),
                    kC = mkE('circle', {
                        r: 2,
                        class: 'fx-kc'
                    });
                SV.append(tkG, kH, kN, kC);
                const dh = document.createElement('small');
                dh.className = 'fx-dh';
                RING.append(dh);
                HIT = document.createElement('i');
                HIT.className = 'fx-kh-hit';
                RING.append(HIT);
                const dhT = () => {
                    dh.textContent = document.documentElement.lang === 'ar' ? 'اسحب لضبط الوقت' : 'DRAG TO SET'
                };
                dhT();
                addEventListener('novix:lang', dhT);
                try {
                    if (localStorage.getItem('novix.fx.dh')) RING.classList.add('used')
                } catch (e) {}
                RING.setAttribute('role', 'slider');
                RING.setAttribute('tabindex', '0');
                RING.setAttribute('aria-valuemin', '1');
                RING.setAttribute('aria-valuemax', '180');
                RING.setAttribute('aria-orientation', 'circular');
                RING.setAttribute('aria-label', 'Timer minutes');

                function dialSync() {
                    if (!dlReady) return;
                    const tot = Math.max(1, len(fm)),
                        r = left(),
                        full = !run && r >= tot,
                        f = Math.max(.002, Math.min(1, r / tot)),
                        kf = full ? ((D[fm] % 60) || 60) / 60 : f,
                        a = kf * 6.2832,
                        x = 130 + 118 * Math.cos(a),
                        y = 130 + 118 * Math.sin(a);
                    [kH, kN, kC].forEach(n => {
                        n.setAttribute('cx', x);
                        n.setAttribute('cy', y)
                    });
                    if (HIT) {
                        HIT.style.left = (130 + 118 * Math.sin(a)) / 260 * 100 + '%';
                        HIT.style.top = (130 - 118 * Math.cos(a)) / 260 * 100 + '%'
                    }
                    const on = Math.round(kf * 60);
                    for (let i = 0; i < 60; i++) tkG.children[i].classList.toggle('on', i < on);
                    const vn = full ? D[fm] : Math.max(1, Math.ceil(r / 60));
                    RING.setAttribute('aria-valuemin', LIM[fm][0]);
                    RING.setAttribute('aria-valuemax', LIM[fm][1]);
                    RING.setAttribute('aria-valuenow', vn);
                    RING.setAttribute('aria-valuetext', vn + ' min')
                }
                let dr = null,
                    lt = 0,
                    lw = 0;
                const popT = () => {
                        const t = $('#fxT');
                        t.classList.remove('pop');
                        void t.offsetWidth;
                        t.classList.add('pop')
                    },
                    tickFx = () => {
                        const n = Date.now();
                        if (n - lt < 40) return;
                        lt = n;
                        try {
                            navigator.vibrate && navigator.vibrate(4)
                        } catch (e) {}
                        try {
                            if (S.sound) {
                                const c = ac();
                                tone(2200, c.currentTime, .025, 'sine', .035, c.destination, .002)
                            }
                        } catch (e) {}
                    },
                    used = () => {
                        if (!RING.classList.contains('used')) {
                            RING.classList.add('used');
                            try {
                                localStorage.setItem('novix.fx.dh', '1')
                            } catch (e) {}
                        }
                    },
                    setMin = m => {
                        m = clampM(fm, m);
                        if (m === D[fm] || act || rem < len(fm)) return false;
                        D[fm] = m;
                        rem = len(fm);
                        render();
                        popT();
                        tickFx();
                        return true
                    },
                    angOf = e => {
                        const r = RING.getBoundingClientRect();
                        return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI
                    };
                RING.addEventListener('pointerdown', e => {
                    if (!act) return;
                    if (dr) dEnd();
                    lockHint();
                    e.stopImmediatePropagation()
                }, true);
                RING.addEventListener('pointermove', e => {
                    if (!act) return;
                    if (dr) dEnd();
                    e.stopImmediatePropagation()
                }, true);
                RING.addEventListener('pointerdown', e => {
                    if (e.button > 0 || act) return;
                    if (e.pointerType === 'touch' && !(e.target.closest && e.target.closest('.fx-kh-hit'))) return;
                    try {
                        RING.setPointerCapture(e.pointerId)
                    } catch (x) {}
                    const full = !run && rem >= len(fm);
                    dr = {
                        a: angOf(e),
                        full,
                        acc: D[fm] * 6,
                        f: left() / Math.max(1, len(fm))
                    };
                    RING.classList.add('dragging');
                    used()
                });
                RING.addEventListener('pointermove', e => {
                    if (!dr) return;
                    if (act) return dEnd();
                    const a = angOf(e);
                    let dl = a - dr.a;
                    if (dl > 180) dl -= 360;
                    if (dl < -180) dl += 360;
                    dr.a = a;
                    if (dr.full) {
                        dr.acc = Math.max(LIM[fm][0] * 6, Math.min(LIM[fm][1] * 6, dr.acc + dl));
                        setMin(dr.acc / 6)
                    } else {
                        dr.f = Math.max(.004, Math.min(1, dr.f + dl / 360));
                        const nr = Math.max(1, Math.round(len(fm) * dr.f));
                        if (nr !== left()) {
                            rem = nr;
                            if (run) end = Date.now() + nr * 1000;
                            render();
                            tickFx()
                        }
                    }
                });
                const dEnd = () => {
                    if (!dr) return;
                    dr = null;
                    RING.classList.remove('dragging');
                    save2()
                };
                RING.addEventListener('pointerup', dEnd);
                RING.addEventListener('pointercancel', dEnd);
                RING.addEventListener('wheel', e => {
                    if (act || rem < len(fm)) return;
                    if (!ST.classList.contains('max') && document.activeElement !== RING) return;
                    e.preventDefault();
                    const n = Date.now();
                    if (n - lw < 35) return;
                    lw = n;
                    used();
                    if (setMin(D[fm] + (e.deltaY < 0 ? 1 : -1) * (e.shiftKey ? 5 : 1))) save2()
                }, {
                    passive: false
                });
                RING.addEventListener('keydown', e => {
                    if (act || rem < len(fm)) return;
                    const k = {
                        ArrowRight: 1,
                        ArrowUp: 1,
                        ArrowLeft: -1,
                        ArrowDown: -1,
                        PageUp: 5,
                        PageDown: -5
                    } [e.key];
                    if (k) {
                        e.preventDefault();
                        used();
                        if (setMin(D[fm] + k)) save2()
                    } else if (e.key === 'Home') {
                        e.preventDefault();
                        setMin(1)
                    } else if (e.key === 'End') {
                        e.preventDefault();
                        setMin(60)
                    }
                });
                dlReady = true;
                const FS_EXP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
                    FS_CMP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
                const fsSet = on => {
                        ST.classList.toggle('max', on);
                        document.body.classList.toggle('fx-max', on);
                        $('#fxFs').innerHTML = on ? FS_CMP : FS_EXP
                    },
                    fsOf = () => document.fullscreenElement || document.webkitFullscreenElement,
                    exitFS = () => {
                        try {
                            const f = document.exitFullscreen || document.webkitExitFullscreen;
                            if (fsOf() === ST) f.call(document)
                        } catch (e) {}
                    };
                $('#fxFs').onclick = () => {
                    const on = !ST.classList.contains('max');
                    fsSet(on);
                    if (!on) return exitFS();
                    try {
                        const r = (ST.requestFullscreen || ST.webkitRequestFullscreen).call(ST);
                        if (r && r.catch) r.catch(() => {})
                    } catch (e) {}
                };
                const fsChg = () => {
                    if (fsOf() !== ST && ST.classList.contains('max')) fsSet(false)
                };
                document.addEventListener('fullscreenchange', fsChg);
                document.addEventListener('webkitfullscreenchange', fsChg);
                addEventListener('keydown', e => {
                    if (e.key === 'Escape' && ST.classList.contains('max')) fsSet(false)
                });
                addEventListener('hashchange', () => {
                    if (location.hash !== '#/focus') {
                        fsSet(false);
                        exitFS()
                    }
                });
                let AC, MG, NB, bus, st, nodes = [],
                    aud = null,
                    pl = [],
                    pi = 0,
                    cur = 'off',
                    pvT = 0,
                    playing = null;
                const ac = () => {
                    if (!AC) {
                        AC = new(window.AudioContext || window.webkitAudioContext)();
                        MG = AC.createGain();
                        const cp = AC.createDynamicsCompressor();
                        cp.threshold.value = -18;
                        cp.knee.value = 24;
                        cp.ratio.value = 3.5;
                        cp.attack.value = .008;
                        cp.release.value = .3;
                        const lp = AC.createBiquadFilter();
                        lp.type = 'lowpass';
                        lp.frequency.value = 12000;
                        MG.connect(cp);
                        cp.connect(lp);
                        lp.connect(AC.destination);
                        NB = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate);
                        const d = NB.getChannelData(0);
                        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
                    }
                    if (AC.state === 'suspended') AC.resume();
                    MG.gain.value = D.vol / 100 * .9;
                    return AC
                };

                const tone = (f, t, d, ty, v, dst, att = .02) => {
                    const o = AC.createOscillator(),
                        g = AC.createGain();
                    o.type = ty;
                    o.frequency.value = f;
                    g.gain.setValueAtTime(0, t);
                    g.gain.linearRampToValueAtTime(v, t + att);
                    g.gain.exponentialRampToValueAtTime(.0001, t + d);
                    o.connect(g);
                    g.connect(dst);
                    o.start(t);
                    o.stop(t + d + .05)
                };

                const bs = (f, t, d, v, dst) => {
                    const o = AC.createOscillator(),
                        g = AC.createGain(),
                        lp = AC.createBiquadFilter();
                    o.type = 'triangle';
                    o.frequency.value = f;
                    lp.type = 'lowpass';
                    lp.frequency.value = 380;
                    g.gain.setValueAtTime(.0001, t);
                    g.gain.linearRampToValueAtTime(v, t + .02);
                    g.gain.setTargetAtTime(.0001, t + .05, d / 3.5);
                    o.connect(lp);
                    lp.connect(g);
                    g.connect(dst);
                    o.start(t);
                    o.stop(t + d * 1.4 + .2)
                };

                const fdb = () => new Promise((ok, no) => {
                    const q = indexedDB.open('novix-focus', 1);
                    q.onupgradeneeded = () => q.result.createObjectStore('t', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    q.onsuccess = () => ok(q.result);
                    q.onerror = () => no(q.error)
                });
                const fx = async (mode, fn) => {
                    try {
                        const d = await fdb();
                        return await new Promise(ok => {
                            const t = d.transaction('t', mode),
                                r = fn(t.objectStore('t'));
                            t.oncomplete = () => ok(r && r.result);
                            t.onerror = () => ok([])
                        })
                    } catch (e) {
                        return []
                    }
                };
                const loadList = async () => {
                    pl = (await fx('readonly', o => o.getAll())) || [];
                    renderList()
                };

                function renderList() {
                    $('#fxList').innerHTML = pl.length ? pl.map((x, i) => `<div class="${cur==='mine'&&i===pi?'on':''}"><span data-i="${i}">${esc(x.name)}</span><i data-d="${x.id}" title="×">×</i></div>`).join('') : `<div>${tr('No songs yet. Add files from your device.')}</div>`;
                    $('#fxNm').textContent = pl[pi] ? pl[pi].name : ''
                }

                function play(i) {
                    if (!pl.length) return;
                    pi = (i + pl.length) % pl.length;
                    if (!aud) {
                        aud = new Audio();
                        aud.addEventListener('ended', () => play(pi + 1));
                        aud.addEventListener('play', () => ppI(false));
                        aud.addEventListener('pause', () => ppI(true))
                    }
                    if (aud.src) URL.revokeObjectURL(aud.src);
                    aud.src = URL.createObjectURL(pl[pi].blob);
                    aud.volume = D.vol / 100;
                    aud.loop = !!D.rep;
                    aud.play().catch(() => {});
                    pv3();
                    renderList()
                }
                function pv3() {
                    clearTimeout(pvT);
                    if (!run) pvT = setTimeout(() => {
                        if (!run) stopAll()
                    }, 3000)
                }
                $('#fxFile').onchange = async e => {
                    for (const f of e.target.files) await fx('readwrite', o => o.add({
                        name: f.name.replace(/\.[^.]+$/, ''),
                        blob: f
                    }));
                    e.target.value = '';
                    await loadList();
                    if (cur === 'mine' && (!aud || aud.paused)) play(pi)
                };
                $('#fxList').onclick = async e => {
                    const s = e.target.closest('[data-i]'),
                        d = e.target.closest('[data-d]');
                    if (s) play(+s.dataset.i);
                    if (d) {
                        await fx('readwrite', o => o.delete(+d.dataset.d));
                        if (aud) aud.pause();
                        pi = 0;
                        await loadList()
                    }
                };
                $('#fxPp').onclick = () => {
                    if (!aud || !aud.src) return play(pi);
                    if (aud.paused) {
                        aud.play().catch(() => {});
                        pv3()
                    } else aud.pause()
                };
                const rpUI = () => {
                    const b = $('#fxRp');
                    b.classList.toggle('on', !!D.rep);
                    b.setAttribute('aria-pressed', String(!!D.rep));
                    b.title = tr('Repeat');
                    b.setAttribute('aria-label', tr('Repeat'))
                };
                $('#fxRp').onclick = () => {
                    D.rep = D.rep ? 0 : 1;
                    save2();
                    if (aud) aud.loop = !!D.rep;
                    rpUI()
                };
                rpUI();
                addEventListener('novix:lang', rpUI);
                $('#fxPv').onclick = () => play(pi - 1);
                $('#fxNx').onclick = () => play(pi + 1);

                const IC = {
                    off: '<circle cx="12" cy="12" r="8.5"/><path d="m6.5 6.5 11 11"/>',
                    lofi: '<path d="M4.5 10h11v4.2a4.3 4.3 0 0 1-4.3 4.3H8.8a4.3 4.3 0 0 1-4.3-4.3V10z"/><path d="M15.5 11.2h1.3a2.4 2.4 0 0 1 0 4.8h-1.3"/><path d="M8 3.8c-.7 1 .7 1.6 0 2.7M12 3.8c-.7 1 .7 1.6 0 2.7"/>',
                    space: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/><path d="M17.5 3.5v3M16 5h3"/>',
                    rain: '<path d="M7 15a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8a3.5 3.5 0 0 1 .5 7"/><path d="m9 18-1 2.5M13 18l-1 2.5M17 18l-1 2.5"/>',
                    ocean: '<path d="M2.5 9c2 0 2-1.6 4-1.6S8.5 9 10.5 9s2-1.6 4-1.6S16.5 9 18.5 9s2-1.6 3-1.6"/><path d="M2.5 13.5c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 3-1.6"/><path d="M2.5 18c2 0 2-1.6 4-1.6s2 1.6 4 1.6 2-1.6 4-1.6 2 1.6 4 1.6 2-1.6 3-1.6"/>',
                    fire: '<path d="M12 3c.5 3.2 4.5 5 4.5 9.5a4.5 4.5 0 0 1-9 0c0-2 1-3 2-4 .2 1.2.8 2 1.6 2.3C11 8.5 10.8 5.5 12 3z"/><path d="M10.2 17.2a1.9 1.9 0 0 0 3.6 0c0-1.2-1.2-1.8-1.8-3-.6 1.2-1.8 1.8-1.8 3z"/>',
                    mine: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'
                };
                const IC_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6L19 12z" fill="currentColor" stroke="none"/></svg>',
                    IC_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="3"/></svg>',
                    ppI = p => {
                        $('#fxPp').innerHTML = p ? IC_PLAY : IC_PAUSE
                    };
                ppI(true);

                function stopAll() {
                    clearInterval(st);
                    clearTimeout(pvT);
                    playing = null;
                    held = false;
                    const b = bus,
                        ns = nodes;
                    nodes = [];
                    bus = null;
                    if (b && AC) {
                        try {
                            b.gain.cancelScheduledValues(AC.currentTime);
                            b.gain.setTargetAtTime(0, AC.currentTime, .025)
                        } catch (e) {}
                        setTimeout(() => {
                            ns.forEach(n => {
                                try {
                                    n.stop()
                                } catch (e) {}
                            });
                            try {
                                b.disconnect()
                            } catch (e) {}
                        }, 180)
                    }
                    if (aud) aud.pause();
                    if (typeof saStop === 'function') saStop()
                }

                const SND_SRC = {
                    lofi: 'assets/audio/lofi.mp3',
                    rain: 'assets/audio/rain.mp3',
                    space: 'assets/audio/space.mp3',
                    ocean: 'assets/audio/ocean.mp3',
                    fire: 'assets/audio/fireplace.mp3'
                };
                let sa = null;
                const saStop = () => {
                    if (sa) {
                        try { sa.pause() } catch (e) {}
                    }
                };
                function saPlay(id) {
                    if (!sa) {
                        sa = new Audio();
                        sa.preload = 'none'
                    }
                    sa.loop = true;
                    sa.volume = D.vol / 100;
                    sa.src = (window.NXPRE && NXPRE.url[id]) || SND_SRC[id];
                    sa.onerror = () => console.warn('Sound source failed to load:', SND_SRC[id]);
                    sa.play().catch(() => {})
                }

                function startSt(id) {
                    stopAll();
                    if (SND_SRC[id]) {
                        playing = id;
                        saPlay(id)
                    } else if (id === 'mine') {
                        playing = id;
                        loadList().then(() => play(pi))
                    }
                }
                let held = false;

                function soundSync() {
                    if (run) {
                        if (cur === 'off') {
                            if (playing) stopAll()
                        } else if (held && playing === cur) soundResume();
                        else if (playing !== cur) startSt(cur)
                    } else stopAll();
                    renderSt()
                }
                function soundHold() {
                    clearTimeout(pvT);
                    if (playing) {
                        saStop();
                        if (aud) aud.pause();
                        held = true
                    }
                    renderSt()
                }

                function soundResume() {
                    held = false;
                    if (cur === 'mine') {
                        if (aud) aud.play().catch(() => {})
                    } else if (sa) sa.play().catch(() => {})
                }

                function setSt(id) {
                    cur = id;
                    if (run) soundSync();
                    else {
                        stopAll();
                        if (id !== 'off') {
                            startSt(id);
                            pvT = setTimeout(() => {
                                if (!run) stopAll()
                            }, 3000)
                        }
                    }
                    renderSt()
                }

                function renderSt() {
                    $('#fxSt').innerHTML = [
                        ['off', 'Off'],
                        ['lofi', 'Lofi chill'],
                        ['space', 'Deep space'],
                        ['rain', 'Rain'],
                        ['ocean', 'Ocean waves'],
                        ['fire', 'Fireplace'],
                        ['mine', 'My music']
                    ].map(([k, l]) => `<button type="button" data-s="${k}" class="${k===cur?'on':''}" aria-pressed="${k===cur}"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[k]}</svg><span>${tr(l)}</span></button>`).join('');
                    $('#fxMine').hidden = cur !== 'mine';
                    $('#fxMb').classList.toggle('live', cur !== 'off');
                    if (cur === 'mine') renderList()
                }
                $('#fxSt').onclick = e => {
                    const b = e.target.closest('[data-s]');
                    if (b) setSt(b.dataset.s)
                };
                const volUI = () => {
                    $('#fxVol').style.setProperty('--p', D.vol + '%');
                    $('#fxVv').textContent = D.vol + '%'
                };
                $('#fxVol').value = D.vol;
                volUI();
                $('#fxVol').oninput = e => {
                    D.vol = +e.target.value;
                    save2();
                    volUI();
                    if (MG) MG.gain.value = D.vol / 100 * .9;
                    if (aud) aud.volume = D.vol / 100;
                    if (sa) sa.volume = D.vol / 100
                };
                $('#fxMb').onclick = () => {
                    const m = $('#fxMusic');
                    m.hidden = !m.hidden;
                    $('#fxMb').setAttribute('aria-expanded', String(!m.hidden));
                    if (!m.hidden) renderSt()
                };
                $('#fxMx').onclick = () => {
                    $('#fxMusic').hidden = true;
                    $('#fxMb').setAttribute('aria-expanded', 'false')
                };
                {
                    const cv = $('#fxBg'),
                        g = cv.getContext('2d'),
                        RM = matchMedia('(prefers-reduced-motion:reduce)').matches,
                        rnd = Math.random,
                        mix = (a, b, t) => a + (b - a) * t,
                        mk = (w, h) => {
                            const c = document.createElement('canvas');
                            c.width = w;
                            c.height = h;
                            return c
                        };
                    const hs = (x, y, s) => {
                            let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(s, 1274126177);
                            h = Math.imul(h ^ h >>> 13, 1274126177);
                            return ((h ^ h >>> 16) >>> 0) / 4294967295
                        },
                        sm = t => t * t * (3 - 2 * t),
                        vn = (x, y, s) => {
                            const xi = Math.floor(x),
                                yi = Math.floor(y),
                                xf = sm(x - xi),
                                yf = sm(y - yi);
                            return mix(mix(hs(xi, yi, s), hs(xi + 1, yi, s), xf), mix(hs(xi, yi + 1, s), hs(xi + 1, yi + 1, s), xf), yf)
                        },
                        fbm = (x, y, s) => {
                            let a = .5,
                                f = 1,
                                r = 0;
                            for (let i = 0; i < 4; i++) {
                                r += a * vn(x * f, y * f, s + i);
                                f *= 2;
                                a *= .5
                            }
                            return r
                        };

                    function neb(seed, band, pal, gal) {
                        const w = 512,
                            h = 288,
                            c = mk(w, h),
                            x = c.getContext('2d'),
                            im = x.createImageData(w, h),
                            d = im.data;
                        for (let py = 0; py < h; py++)
                            for (let px = 0; px < w; px++) {
                                const u = px / w,
                                    v = py / h,
                                    n = fbm(u * 3.2, v * 3.2, seed),
                                    m = fbm(u * 6 + 9, v * 6 + 4, seed + 7),
                                    cl = Math.max(0, n - .46) * 2.2,
                                    p = pal(m);
                                let r = cl * p[0],
                                    gg = cl * p[1],
                                    b = cl * p[2];
                                if (band) {
                                    const t = (v - .5) + (u - .5) * .55,
                                        bi = Math.exp(-t * t / .02) * (.3 + .7 * m) * Math.max(0, 1 - Math.max(0, fbm(u * 9, v * 9, seed + 3) - .48) * 3.2);
                                    r += bi * 120;
                                    gg += bi * 135;
                                    b += bi * 185
                                }
                                const i = (py * w + px) * 4;
                                d[i] = Math.min(255, r * .45);
                                d[i + 1] = Math.min(255, gg * .45);
                                d[i + 2] = Math.min(255, b * .45);
                                d[i + 3] = 255
                            }
                        x.putImageData(im, 0, 0);
                        x.globalCompositeOperation = 'lighter';
                        for (let k = 0; k < (gal || 0); k++) {
                            x.save();
                            x.translate(rnd() * w, rnd() * h);
                            x.rotate(rnd() * 3);
                            x.scale(1, .35 + rnd() * .3);
                            const q = x.createRadialGradient(0, 0, 0, 0, 0, 10 + rnd() * 10);
                            q.addColorStop(0, 'rgba(255,240,220,.9)');
                            q.addColorStop(.25, 'rgba(190,200,255,.35)');
                            q.addColorStop(1, 'rgba(150,170,255,0)');
                            x.fillStyle = q;
                            x.fillRect(-24, -24, 48, 48);
                            x.restore()
                        }
                        return c
                    }
                    let W = 0,
                        H = 0,
                        Dp = 1,
                        Q = 1,
                        ft = 0,
                        fn = 0,
                        cm = null,
                        sat = null,
                        nextC = 8,
                        nextS = 12,
                        ast = [],
                        stars = [],
                        bok = [],
                        sh = null,
                        A, B, B2, C, spr, vig, grp, T = 0,
                        last = 0,
                        raf = 0,
                        pp = 0;

                    function size() {
                        const r = cv.getBoundingClientRect();
                        Dp = Math.max(.6, Math.min(devicePixelRatio || 1, 2, Math.sqrt(8.3e6 / Math.max(1, r.width * r.height))) * Q);
                        W = r.width | 0;
                        H = r.height | 0;
                        if (!W || !H) return false;
                        cv.width = W * Dp;
                        cv.height = H * Dp;
                        g.setTransform(Dp, 0, 0, Dp, 0, 0);
                        g.imageSmoothingQuality = 'high';
                        if (!A) {
                            A = neb(11, 1, () => [60, 45, 130], 5);
                            B = neb(29, 0, m => [mix(25, 150, m), mix(120, 35, m), mix(135, 75, m)], 0);
                            B2 = neb(47, 0, m => [mix(25, 150, m), mix(120, 35, m), mix(135, 75, m)], 0);
                            C = neb(63, 0, m => [mix(150, 60, m), mix(70, 150, m), mix(180, 200, m)], 0);
                            spr = mk(64, 64);
                            const s = spr.getContext('2d'),
                                q = s.createRadialGradient(32, 32, 0, 32, 32, 32);
                            q.addColorStop(0, 'rgba(255,255,255,1)');
                            q.addColorStop(.2, 'rgba(255,255,255,.3)');
                            q.addColorStop(1, 'rgba(255,255,255,0)');
                            s.fillStyle = q;
                            s.fillRect(0, 0, 64, 64);
                            const gc = mk(128, 128),
                                gx = gc.getContext('2d'),
                                im = gx.createImageData(128, 128);
                            for (let i = 0; i < im.data.length; i += 4) {
                                const k = rnd() * 255;
                                im.data[i] = im.data[i + 1] = im.data[i + 2] = k;
                                im.data[i + 3] = rnd() * 28
                            }
                            gx.putImageData(im, 0, 0);
                            grp = g.createPattern(gc, 'repeat')
                        }
                        stars = Array.from({
                            length: Math.round(W * H / 1400)
                        }, () => {
                            const z = rnd(),
                                d = z < .6 ? .25 : z < .9 ? .55 : 1;
                            return {
                                x: rnd() * W,
                                y: rnd() * H,
                                d,
                                r: d > .9 ? 1.3 : d > .5 ? .9 : .6,
                                a: .2 + d * .6 * (.5 + rnd() * .5),
                                v: d * 2.2,
                                f: .3 + rnd() * 1.4,
                                p: rnd() * 6.28,
                                big: z > .985,
                                c: z > .9 ? '#cfe0ff' : z > .8 ? '#ffe9c8' : '#fff'
                            }
                        });
                        bok = Array.from({
                            length: 14
                        }, () => ({
                            x: rnd() * W,
                            y: rnd() * H,
                            r: 8 + rnd() * 26,
                            a: .015 + rnd() * .03,
                            vx: -(1 + rnd() * 4),
                            vy: (rnd() - .5) * 2
                        }));
                        ast = Array.from({
                            length: 6
                        }, () => ({
                            x: rnd() * W,
                            y: rnd() * H,
                            r: 5 + rnd() * 24,
                            vx: -(5 + rnd() * 16) * (rnd() < .2 ? -1 : 1),
                            vy: (rnd() - .5) * 4,
                            rot: rnd() * 6.28,
                            w: (rnd() - .5) * .15,
                            pts: Array.from({
                                length: 9
                            }, () => .65 + rnd() * .5)
                        }));
                        vig = mk(W, H);
                        const v = vig.getContext('2d'),
                            vq = v.createRadialGradient(W / 2, H * .5, Math.min(W, H) * .3, W / 2, H * .5, Math.max(W, H) * .75);
                        vq.addColorStop(0, 'rgba(0,0,0,0)');
                        vq.addColorStop(1, 'rgba(0,0,0,.88)');
                        v.fillStyle = vq;
                        v.fillRect(0, 0, W, H);
                        return true
                    }

                    const SCN = {};
                    const sceneState = (k) => {
                        const key = W + 'x' + H;
                        if (!SCN[k] || SCN[k].key !== key) SCN[k] = {
                            key,
                            t: 0
                        };
                        return SCN[k]
                    };
                    const imgPt = (u, v) => {
                        const ia = 16 / 9,
                            ca = W / H;
                        let sw, sh;
                        if (ca > ia) {
                            sw = W;
                            sh = W / ia
                        } else {
                            sh = H;
                            sw = H * ia
                        }
                        return [(W - sw) / 2 + u * sw, (H - sh) * .48 + v * sh]
                    };
                    const mkMotes = (n, o) => Array.from({
                        length: n
                    }, () => ({
                        x: rnd() * W,
                        y: o.y0 !== undefined ? H * (o.y0 + rnd() * (o.y1 - o.y0)) : rnd() * H,
                        r: o.r[0] + rnd() * (o.r[1] - o.r[0]),
                        vx: o.vx[0] + rnd() * (o.vx[1] - o.vx[0]),
                        vy: o.vy[0] + rnd() * (o.vy[1] - o.vy[0]),
                        a: o.a[0] + rnd() * (o.a[1] - o.a[0]),
                        p: rnd() * 6.283,
                        f: .3 + rnd() * .9
                    }));
                    const tints = {};
                    const tint = col => {
                        if (!col) return spr;
                        if (!tints[col]) {
                            const c = mk(64, 64),
                                x = c.getContext('2d'),
                                q = x.createRadialGradient(32, 32, 0, 32, 32, 32);
                            q.addColorStop(0, `rgba(${col},1)`);
                            q.addColorStop(.25, `rgba(${col},.32)`);
                            q.addColorStop(1, `rgba(${col},0)`);
                            x.fillStyle = q;
                            x.fillRect(0, 0, 64, 64);
                            tints[col] = c
                        }
                        return tints[col]
                    };
                    const twinkle = (st, n, topFrac, col) => {
                        if (!st.tw) st.tw = Array.from({
                            length: n
                        }, () => ({
                            x: rnd() * W,
                            y: rnd() * H * topFrac,
                            r: .6 + rnd() * 1.4,
                            f: .5 + rnd() * 2,
                            p: rnd() * 6.283,
                            big: rnd() < .12
                        }));
                        g.fillStyle = `rgb(${col||'225,240,255'})`;
                        for (const t of st.tw) {
                            const a = .25 + .6 * (.5 + .5 * Math.sin(T * t.f + t.p));
                            g.globalAlpha = a;
                            g.fillRect(t.x, t.y, t.r, t.r);
                            if (t.big) {
                                g.globalAlpha = a * .45;
                                g.fillRect(t.x - 7, t.y + t.r / 2 - .3, 14 + t.r, .6);
                                g.fillRect(t.x + t.r / 2 - .3, t.y - 7, .6, 14 + t.r)
                            }
                        }
                    };
                    const glints = (st, n, x0, y0, x1, y1, col) => {
                        if (!st.gl) st.gl = Array.from({
                            length: n
                        }, () => ({
                            x: W * (x0 + rnd() * (x1 - x0)),
                            y: H * (y0 + rnd() * (y1 - y0)),
                            f: .25 + rnd() * .8,
                            p: rnd() * 6.283,
                            s: 4 + rnd() * 7
                        }));
                        g.fillStyle = `rgb(${col})`;
                        for (const t of st.gl) {
                            const v = Math.max(0, Math.sin(T * t.f + t.p)) ** 6;
                            if (v < .02) continue;
                            g.globalAlpha = .75 * v;
                            g.fillRect(t.x - t.s, t.y - .4, t.s * 2, .8);
                            g.fillRect(t.x - .4, t.y - t.s, .8, t.s * 2);
                            g.globalAlpha = .5 * v;
                            g.drawImage(tint(col), t.x - t.s, t.y - t.s, t.s * 2, t.s * 2)
                        }
                    };
                    const drawMotes = (arr, dt, col, wob) => {
                        const SP = tint(col);
                        for (const m of arr) {
                            m.x += (m.vx + Math.sin(T * .4 + m.p) * wob) * dt;
                            m.y += m.vy * dt;
                            if (m.x < -10) m.x = W + 10;
                            if (m.x > W + 10) m.x = -10;
                            if (m.y < -10) m.y = H + 10;
                            if (m.y > H + 10) m.y = -10;
                            g.globalAlpha = m.a * (.55 + .45 * Math.sin(T * m.f + m.p));
                            g.drawImage(SP, m.x - m.r, m.y - m.r, 2 * m.r, 2 * m.r)
                        }
                    };
                    const mist = (st, dt, n, yA, yB, col, al, sp) => {
                        if (!st.mist) st.mist = Array.from({
                            length: n
                        }, (_, i) => ({
                            x: rnd() * W,
                            y: H * (yA + rnd() * (yB - yA)),
                            w: W * (.35 + rnd() * .35),
                            h: H * (.05 + rnd() * .07),
                            v: sp * (.5 + rnd()),
                            a: al * (.6 + rnd() * .6),
                            p: rnd() * 6.283
                        }));
                        for (const m of st.mist) {
                            m.x += m.v * dt;
                            if (m.x - m.w > W) m.x = -m.w;
                            g.save();
                            g.translate(m.x, m.y);
                            g.scale(m.w, m.h);
                            const q = g.createRadialGradient(0, 0, 0, 0, 0, 1);
                            q.addColorStop(0, `rgba(${col},${m.a*(.7+.3*Math.sin(T*.12+m.p))})`);
                            q.addColorStop(1, `rgba(${col},0)`);
                            g.fillStyle = q;
                            g.globalAlpha = 1;
                            g.fillRect(-1, -1, 2, 2);
                            g.restore()
                        }
                    };
                    let auSpr = null;
                    const auSprite = () => {
                        if (auSpr) return auSpr;
                        auSpr = mk(4, 256);
                        const a = auSpr.getContext('2d'),
                            q = a.createLinearGradient(0, 0, 0, 256);
                        q.addColorStop(0, 'rgba(130,120,255,0)');
                        q.addColorStop(.3, 'rgba(120,140,255,.55)');
                        q.addColorStop(.62, 'rgba(70,240,215,.85)');
                        q.addColorStop(.85, 'rgba(60,255,190,.35)');
                        q.addColorStop(1, 'rgba(60,255,190,0)');
                        a.fillStyle = q;
                        a.fillRect(0, 0, 4, 256);
                        return auSpr
                    };
                    const rays = (ox, oy, n, spread, base, col, al, len) => {
                        g.save();
                        g.translate(ox, oy);
                        for (let i = 0; i < n; i++) {
                            g.save();
                            g.rotate(base + (i - (n - 1) / 2) * spread + Math.sin(T * .06 + i) * .04);
                            const rg = g.createLinearGradient(0, 0, len, 0);
                            rg.addColorStop(0, `rgba(${col},${al})`);
                            rg.addColorStop(1, `rgba(${col},0)`);
                            g.globalAlpha = .35 + .65 * Math.sin(T * .16 + i * 1.7) ** 2;
                            g.fillStyle = rg;
                            g.beginPath();
                            g.moveTo(0, 0);
                            g.lineTo(len, -len * .05);
                            g.lineTo(len, len * .05);
                            g.closePath();
                            g.fill();
                            g.restore()
                        }
                        g.restore()
                    };
                    const DEFP = {
                        lum: .4,
                        avg: [190, 200, 225],
                        accent: [255, 230, 190],
                        glow: null
                    };
                    const SCENES = {
                        aurora(dt, e) {
                            const st = sceneState('aurora');
                            if (!st.snow) st.snow = mkMotes(Math.round(W * H / 24000), {
                                r: [2, 5],
                                vx: [-6, 6],
                                vy: [10, 26],
                                a: [.15, .4]
                            });
                            g.globalCompositeOperation = 'lighter';
                            twinkle(st, Math.round(W * H / 9000), .62, '215,240,255');
                            const sp = auSprite(),
                                [, by] = imgPt(0, .33),
                                n = Math.ceil(W / 14),
                                cw = W / n;
                            for (let i = 0; i < n; i++) {
                                const w1 = Math.sin(T * .22 + i * .21),
                                    w2 = Math.sin(T * .13 + i * .07 + 1.7),
                                    h = H * (.20 + .13 * (.5 + .5 * w1) * (.6 + .4 * w2)),
                                    top = by + H * .1 - h * .72 + Math.sin(T * .17 + i * .05) * H * .03,
                                    al = (.075 + .09 * (.5 + .5 * Math.sin(T * .35 + i * .31))) * (.8 + .5 * e);
                                g.globalAlpha = al;
                                g.drawImage(sp, i * cw + Math.sin(T * .2 + i * .2) * 7, top, cw * 1.6, h)
                            }
                            const [, hy] = imgPt(0, .8),
                                hg = g.createLinearGradient(0, hy - H * .16, 0, hy + H * .02);
                            hg.addColorStop(0, 'rgba(60,220,200,0)');
                            hg.addColorStop(1, `rgba(60,220,200,${.07+.05*Math.sin(T*.25)})`);
                            g.globalAlpha = 1;
                            g.fillStyle = hg;
                            g.fillRect(0, hy - H * .16, W, H * .18);
                            glints(st, 14, .05, .72, .95, .9, '170,255,235');
                            drawMotes(st.snow, dt, '200,235,255', 6)
                        },
                        sunset(dt, e) {
                            const st = sceneState('sunset');
                            if (!st.dust) st.dust = mkMotes(Math.round(W * H / 26000), {
                                r: [3, 8],
                                vx: [2, 9],
                                vy: [-9, -2],
                                a: [.1, .32],
                                y0: .25,
                                y1: 1
                            });
                            g.globalCompositeOperation = 'lighter';
                            const [sx, sy] = imgPt(.62, .715),
                                R = Math.max(W, H) * (.16 + .012 * Math.sin(T * .5)),
                                q = g.createRadialGradient(sx, sy, 0, sx, sy, R);
                            q.addColorStop(0, `rgba(255,236,190,${.38+.22*e})`);
                            q.addColorStop(.35, `rgba(255,190,120,${.16+.1*e})`);
                            q.addColorStop(1, 'rgba(255,150,90,0)');
                            g.globalAlpha = 1;
                            g.fillStyle = q;
                            g.fillRect(0, 0, W, H);
                            rays(sx, sy, 7, .2, -Math.PI / 2, '255,215,150', .1, Math.max(W, H) * 1.1);
                            const fx = W / 2 - sx,
                                fy = H / 2 - sy;
                            [.5, .95, 1.5].forEach((k, i) => {
                                const sz = Math.max(W, H) * (.03 + i * .015);
                                g.globalAlpha = (.07 + .03 * Math.sin(T * .3 + i)) * (i === 1 ? 1.4 : 1);
                                g.drawImage(tint(i === 1 ? '255,170,140' : '255,225,170'), sx + fx * k - sz, sy + fy * k - sz, sz * 2, sz * 2)
                            });
                            mist(st, dt, 5, .45, .72, '255,200,150', .1, 6);
                            drawMotes(st.dust, dt, '255,215,150', 8);
                            g.globalCompositeOperation = 'source-over';
                            if (!RM) {
                                st.nb = (st.nb === undefined ? 4 + rnd() * 6 : st.nb) - dt;
                                if (!st.birds && st.nb <= 0) {
                                    const dir = rnd() < .5 ? 1 : -1,
                                        y = H * (.28 + rnd() * .22),
                                        sz = Math.max(5, H * .011);
                                    st.birds = {
                                        dir,
                                        sz,
                                        v: dir * (W * .035 + rnd() * W * .015),
                                        list: Array.from({
                                            length: 4 + (rnd() * 4 | 0)
                                        }, (_, i) => ({
                                            x: (dir > 0 ? -40 : W + 40) - dir * i * sz * 3.2 - dir * rnd() * sz,
                                            y: y + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * sz * 1.6 + rnd() * sz,
                                            p: rnd() * 6.283
                                        }))
                                    };
                                    st.nb = 22 + rnd() * 25
                                }
                                if (st.birds) {
                                    const B = st.birds;
                                    g.strokeStyle = 'rgba(48,20,52,.75)';
                                    g.lineWidth = Math.max(1, B.sz * .22);
                                    g.lineCap = 'round';
                                    g.globalAlpha = 1;
                                    let alive = false;
                                    for (const b of B.list) {
                                        b.x += B.v * dt;
                                        b.y += Math.sin(T * .6 + b.p) * dt * 3;
                                        const fl = Math.sin(T * 6 + b.p) * .8;
                                        g.beginPath();
                                        g.moveTo(b.x - B.sz, b.y - fl * B.sz * .6);
                                        g.quadraticCurveTo(b.x - B.sz * .4, b.y - B.sz * .45 * (1 + fl * .5), b.x, b.y);
                                        g.quadraticCurveTo(b.x + B.sz * .4, b.y - B.sz * .45 * (1 + fl * .5), b.x + B.sz, b.y - fl * B.sz * .6);
                                        g.stroke();
                                        if (b.x > -80 && b.x < W + 80) alive = true
                                    }
                                    if (!alive) st.birds = null
                                }
                            }
                        },
                        dawn(dt, e) {
                            const st = sceneState('dawn');
                            if (!st.dust) {
                                st.dust = mkMotes(Math.round(W * H / 30000), {
                                    r: [3, 7],
                                    vx: [-3, 3],
                                    vy: [-7, -1],
                                    a: [.08, .24],
                                    y0: .3,
                                    y1: 1
                                });
                                st.fly = mkMotes(8, {
                                    r: [3, 6],
                                    vx: [-5, 5],
                                    vy: [-4, 4],
                                    a: [.2, .5],
                                    y0: .55,
                                    y1: .95
                                })
                            }
                            g.globalCompositeOperation = 'lighter';
                            const [hx, hy] = imgPt(.5, .78);
                            rays(hx, hy, 9, .16, -Math.PI / 2, '255,225,185', .07, Math.max(W, H) * 1.0);
                            mist(st, dt, 6, .5, .85, '200,225,255', .1, 4);
                            const q = g.createLinearGradient(0, H * .5, 0, H);
                            q.addColorStop(0, 'rgba(255,205,170,0)');
                            q.addColorStop(1, `rgba(255,205,170,${.05+.04*Math.sin(T*.15)+.04*e})`);
                            g.globalAlpha = 1;
                            g.fillStyle = q;
                            g.fillRect(0, H * .5, W, H * .5);
                            glints(st, 16, .03, .72, .97, .97, '255,240,210');
                            drawMotes(st.dust, dt, '255,235,205', 5);
                            drawMotes(st.fly, dt, '255,240,170', 14)
                        },
                        custom(dt, e) {
                            const P = cv.__prof || DEFP;
                            let st = sceneState('custom');
                            if (st.prof !== P) {
                                st = SCN.custom = {
                                    key: W + 'x' + H,
                                    t: 0,
                                    prof: P
                                }
                            }
                            const dark = P.lum < .36,
                                bright = P.lum > .6,
                                acc = P.accent.join(','),
                                lite = P.avg.map(v => Math.min(255, Math.round(v * 1.25 + 45))).join(',');
                            if (!st.dust) {
                                st.dust = mkMotes(Math.round(W * H / (bright ? 30000 : 36000)), {
                                    r: [3, 8],
                                    vx: [-4, 6],
                                    vy: bright ? [-8, -2] : [-5, 2],
                                    a: [.08, .26]
                                });
                                st.fly = dark || !bright ? mkMotes(9, {
                                    r: [3, 6],
                                    vx: [-5, 5],
                                    vy: [-4, 4],
                                    a: [.2, .5]
                                }) : []
                            }
                            g.globalCompositeOperation = 'lighter';
                            if (P.glow) {
                                const [gx, gy] = imgPt(P.glow.u, P.glow.v),
                                    gr = Math.max(W, H) * (.1 + .12 * P.glow.s),
                                    k = (.1 + .22 * P.glow.s) * (.85 + .15 * Math.sin(T * .5)) * (.8 + .4 * e),
                                    q = g.createRadialGradient(gx, gy, 0, gx, gy, gr);
                                q.addColorStop(0, `rgba(${acc},${k})`);
                                q.addColorStop(1, `rgba(${acc},0)`);
                                g.globalAlpha = 1;
                                g.fillStyle = q;
                                g.fillRect(0, 0, W, H);
                                if (bright) rays(gx, gy, 5, .22, Math.PI / 2 + (gx < W / 2 ? -.35 : .35), acc, .06, Math.max(W, H))
                            } else if (bright) rays(W * .5, -H * .1, 6, .2, Math.PI / 2, '255,250,235', .05, Math.max(W, H) * 1.2);
                            if (dark) twinkle(st, Math.round(W * H / 11000), .65, '230,240,255');
                            mist(st, dt, 4, .45, .9, lite, dark ? .05 : .08, 5);
                            drawMotes(st.dust, dt, bright ? '255,250,235' : acc, 5);
                            if (st.fly.length) drawMotes(st.fly, dt, acc, 14)
                        }
                    };

                    function frame(dt) {
                        T += dt;
                        const FULL = cv.dataset.mode !== 'img';
                        const tg = fm === 'f' ? 1 - left() / Math.max(1, len(fm)) : 1;
                        pp = dt ? pp + (tg - pp) * Math.min(1, dt * .8) : tg;
                        const e = Math.pow(pp, 1.4),
                            c = [mix(110, 255, e), mix(150, 165, e), mix(220, 90, e)].map(Math.round).join(',');
                        g.globalAlpha = 1;
                        g.globalCompositeOperation = 'source-over';
                        if (FULL) {
                            g.fillStyle = '#01020a';
                            g.fillRect(0, 0, W, H)
                        } else g.clearRect(0, 0, W, H);
                        if (!FULL && cv.dataset.scene !== 'space') {
                            g.save();
                            (SCENES[cv.dataset.scene] || SCENES.custom)(dt, e);
                            g.restore();
                            g.globalCompositeOperation = 'source-over';
                            g.globalAlpha = 1;
                            return
                        }
                        g.save();
                        g.translate(W / 2, H / 2);
                        g.rotate(Math.sin(T * .017) * .012);
                        const z = 1.04 + .03 * Math.sin(T * .04);
                        g.scale(z, z);
                        g.translate(-W / 2, -H / 2);
                        g.globalCompositeOperation = 'lighter';
                        if (FULL) {
                            g.globalAlpha = .85 + .1 * Math.sin(T * .07);
                            g.drawImage(A, -W * .06 + Math.sin(T * .03) * W * .03, -H * .06 + Math.cos(T * .025) * H * .02, W * 1.12, H * 1.12);
                            const cf = .5 + .5 * Math.sin(T * .06),
                                bx0 = -W * .12 + Math.sin(T * .045 + 2) * W * .05,
                                by0 = -H * .12 + Math.cos(T * .035 + 1) * H * .04;
                            g.globalAlpha = .75 * (1 - cf);
                            g.drawImage(B, bx0, by0, W * 1.25, H * 1.25);
                            g.globalAlpha = .75 * cf;
                            g.drawImage(B2, bx0 + W * .02, by0 - H * .015, W * 1.25, H * 1.25);
                            g.save();
                            g.translate(W * .5, H * .5);
                            g.rotate(T * .004);
                            g.globalAlpha = .4 + .2 * Math.sin(T * .09 + 1);
                            g.drawImage(C, -W * .8, -H * .8, W * 1.6, H * 1.6);
                            g.restore();
                            const ox = Math.sin(T * .03) * W * .02;
                            for (const s of stars) {
                                s.x -= dt * s.v;
                                if (s.x < 0) s.x += W;
                                const X = s.x + ox * s.d * 3;
                                g.globalAlpha = s.a * (.7 + .3 * Math.sin(T * s.f + s.p));
                                g.fillStyle = s.c;
                                g.fillRect(X, s.y, s.r, s.r);
                                if (s.big) {
                                    g.globalAlpha = .35 * (.7 + .3 * Math.sin(T * s.f));
                                    const k = s.r * 20;
                                    g.drawImage(spr, X - k / 2, s.y - k / 2, k, k);
                                    g.globalAlpha = .12;
                                    g.fillRect(X - 30, s.y, 60, .6)
                                }
                            }
                            const sx = W * .78,
                                sy = H * .28,
                                q = g.createRadialGradient(sx, sy, 0, sx, sy, W * (.2 + .25 * e));
                            q.addColorStop(0, `rgba(${c},${.12+.4*e})`);
                            q.addColorStop(1, `rgba(${c},0)`);
                            g.globalAlpha = 1;
                            g.fillStyle = q;
                            g.fillRect(0, 0, W, H);
                            g.fillStyle = `rgba(255,250,240,${.7+.3*e})`;
                            g.beginPath();
                            g.arc(sx, sy, 1.2 + 1.2 * e, 0, 6.283);
                            g.fill();
                            const ls = g.createLinearGradient(sx - W * .3, 0, sx + W * .3, 0);
                            ls.addColorStop(0, `rgba(${c},0)`);
                            ls.addColorStop(.5, `rgba(${c},${.12+.3*e})`);
                            ls.addColorStop(1, `rgba(${c},0)`);
                            g.fillStyle = ls;
                            g.fillRect(sx - W * .3, sy - .5, W * .6, 1);
                            const bx = W * .2,
                                by = H * .64,
                                ba = .35 + .35 * Math.sin(T * .8),
                                rg = g.createRadialGradient(bx, by, 0, bx, by, 16);
                            rg.addColorStop(0, `rgba(255,90,70,${ba*.6})`);
                            rg.addColorStop(1, 'rgba(255,90,70,0)');
                            g.fillStyle = rg;
                            g.fillRect(bx - 16, by - 16, 32, 32);
                            g.fillStyle = `rgba(255,110,90,${ba})`;
                            g.fillRect(bx - .7, by - .7, 1.4, 1.4);
                            for (const b of bok) {
                                b.x += b.vx * dt;
                                b.y += b.vy * dt;
                                if (b.x < -b.r) b.x = W + b.r;
                                if (b.y < -b.r) b.y = H + b.r;
                                if (b.y > H + b.r) b.y = -b.r;
                                g.globalAlpha = b.a;
                                g.drawImage(spr, b.x - b.r, b.y - b.r, 2 * b.r, 2 * b.r)
                            }
                        }
                        g.globalCompositeOperation = 'source-over';
                        for (const a of ast) {
                            a.x += a.vx * dt;
                            a.y += a.vy * dt;
                            a.rot += a.w * dt;
                            if (a.x < -60) a.x = W + 60;
                            if (a.x > W + 60) a.x = -60;
                            if (a.y < -60) a.y = H + 60;
                            if (a.y > H + 60) a.y = -60;
                            g.save();
                            g.translate(a.x, a.y);
                            g.rotate(a.rot);
                            g.beginPath();
                            a.pts.forEach((k, i) => {
                                const t = i / 9 * 6.283,
                                    X = Math.cos(t) * a.r * k,
                                    Y = Math.sin(t) * a.r * k;
                                i ? g.lineTo(X, Y) : g.moveTo(X, Y)
                            });
                            g.closePath();
                            g.globalAlpha = 1;
                            g.fillStyle = '#02030a';
                            g.fill();
                            g.lineWidth = 1;
                            g.strokeStyle = `rgba(${c},${.12+.3*e})`;
                            g.stroke();
                            g.restore()
                        }
                        g.globalCompositeOperation = 'lighter';
                        if (!RM) {
                            nextC -= dt;
                            if (!cm && nextC <= 0) {
                                const dir = rnd() < .5 ? 1 : -1,
                                    sp = 45 + rnd() * 30;
                                cm = {
                                    x: dir > 0 ? -80 : W + 80,
                                    y: H * (.1 + rnd() * .5),
                                    vx: dir * sp,
                                    vy: sp * (.15 + rnd() * .2)
                                };
                                nextC = 25 + rnd() * 25
                            }
                            nextS -= dt;
                            if (!sat && nextS <= 0) {
                                const dir = rnd() < .5 ? 1 : -1;
                                sat = {
                                    x: dir > 0 ? -20 : W + 20,
                                    y: H * (.15 + rnd() * .6),
                                    vx: dir * (14 + rnd() * 8),
                                    vy: (rnd() - .5) * 3,
                                    t: 0
                                };
                                nextS = 18 + rnd() * 25
                            }
                        }
                        if (cm) {
                            cm.x += cm.vx * dt;
                            cm.y += cm.vy * dt;
                            const L = Math.hypot(cm.vx, cm.vy),
                                ux = cm.vx / L,
                                uy = cm.vy / L,
                                tl = W * .22,
                                tq = g.createLinearGradient(cm.x, cm.y, cm.x - ux * tl, cm.y - uy * tl);
                            tq.addColorStop(0, 'rgba(200,225,255,.55)');
                            tq.addColorStop(.3, 'rgba(120,170,255,.18)');
                            tq.addColorStop(1, 'rgba(120,170,255,0)');
                            g.globalAlpha = 1;
                            g.strokeStyle = tq;
                            g.lineWidth = 3;
                            g.lineCap = 'round';
                            g.beginPath();
                            g.moveTo(cm.x, cm.y);
                            g.lineTo(cm.x - ux * tl, cm.y - uy * tl);
                            g.stroke();
                            g.lineWidth = 1;
                            g.strokeStyle = 'rgba(255,240,220,.25)';
                            g.beginPath();
                            g.moveTo(cm.x, cm.y);
                            g.lineTo(cm.x - ux * tl * .5 - uy * 6, cm.y - uy * tl * .5 + ux * 6);
                            g.stroke();
                            g.globalAlpha = .9;
                            g.drawImage(spr, cm.x - 14, cm.y - 14, 28, 28);
                            g.fillStyle = '#fff';
                            g.fillRect(cm.x - 1, cm.y - 1, 2, 2);
                            if (cm.x < -W * .4 || cm.x > W * 1.4 || cm.y > H * 1.2) cm = null
                        }
                        if (sat) {
                            sat.x += sat.vx * dt;
                            sat.y += sat.vy * dt;
                            sat.t += dt;
                            const on = Math.sin(sat.t * 2.4) > .2 ? 1 : .15;
                            g.globalAlpha = .7 * on;
                            g.fillStyle = '#ff6a5a';
                            g.fillRect(sat.x - .8, sat.y - .8, 1.6, 1.6);
                            g.globalAlpha = .25 * on;
                            g.drawImage(spr, sat.x - 8, sat.y - 8, 16, 16);
                            if (sat.x < -40 || sat.x > W + 40) sat = null
                        }
                        if (!RM && !sh && rnd() < dt * .015) sh = {
                            x: W * (.3 + rnd() * .6),
                            y: H * rnd() * .5,
                            vx: -(260 + rnd() * 120),
                            vy: 90 + rnd() * 50,
                            l: 0
                        };
                        if (sh) {
                            sh.l += dt;
                            sh.x += sh.vx * dt;
                            sh.y += sh.vy * dt;
                            const a = Math.sin(Math.min(1, sh.l / 2.2) * Math.PI) * .5,
                                tq = g.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * .25, sh.y - sh.vy * .25);
                            tq.addColorStop(0, `rgba(220,230,255,${a})`);
                            tq.addColorStop(1, 'rgba(220,230,255,0)');
                            g.globalAlpha = 1;
                            g.strokeStyle = tq;
                            g.lineWidth = 1.2;
                            g.beginPath();
                            g.moveTo(sh.x, sh.y);
                            g.lineTo(sh.x - sh.vx * .25, sh.y - sh.vy * .25);
                            g.stroke();
                            if (sh.l > 2.2) sh = null
                        }
                        g.restore();
                        g.globalCompositeOperation = 'source-over';
                        g.globalAlpha = 1;
                        if (FULL) {
                            g.drawImage(vig, 0, 0);
                            g.globalAlpha = .5;
                            g.save();
                            g.translate(-(rnd() * 128 | 0), -(rnd() * 128 | 0));
                            g.fillStyle = grp;
                            g.fillRect(0, 0, W + 128, H + 128);
                            g.restore();
                            g.globalAlpha = 1
                        }
                    }

                    function loop(ts) {
                        raf = 0;
                        if (document.hidden || !cv.offsetParent) return;
                        const dt = Math.min(.05, (ts - last) / 1000 || 0);
                        last = ts;
                        if (!W && !size()) return;
                        if (dt) {
                            ft += dt;
                            if (++fn >= 120) {
                                if (ft / fn > .03 && Q > .6) {
                                    Q *= .8;
                                    size()
                                }
                                ft = 0;
                                fn = 0
                            }
                        }
                        frame(RM ? 0 : dt);
                        if (!RM) raf = requestAnimationFrame(loop)
                    }
                    const go = () => {
                        cancelAnimationFrame(raf);
                        if (size()) {
                            last = performance.now();
                            raf = requestAnimationFrame(loop)
                        }
                    };
                    cv.__go = go;
                    new ResizeObserver(go).observe(cv);
                    addEventListener('hashchange', () => setTimeout(go, 60));
                    document.addEventListener('visibilitychange', go)
                }
                render();
                renderSt()
            })();
            {
                const T = {
                    'Today’s Tasks': 'مهام اليوم',
                    'View All': 'عرض الكل',
                    'Completed': 'مكتملة',
                    'Today': 'اليوم',
                    'Your library is empty. Add your first book above.': 'مكتبتك فاضية. أضف أول كتاب.',
                    'No tasks yet. Add your first task above.': 'مفيش مهام لسه. أضف أول مهمة.'
                };
                for (const k in T)
                    if (!AR[k]) AR[k] = T[k]
            }

            function renderHome() {
                const B = $('#hmLib'),
                    K = $('#hmTasks');
                if (!B || !K) return;
                B.innerHTML = S.books.slice(-4).reverse().map(b => {
                    const c = coverGrad(b);
                    return `<div class="hm-b"><button class="cover" data-hopen="${b.id}" style="--c1:${c[0]};--c2:${c[1]}" aria-label="${esc(b.t)}"><span class="bt">${esc(b.t)}</span><span class="bs">${esc(tr(b.s))}</span></button><b class="hm-bn" title="${esc(b.t)}">${esc(b.t)}</b><span class="hm-chip">${esc(b.ty||'PDF')}</span></div>`
                }).join('') || `<p class="hm-empty">${tr('Your library is empty. Add your first book above.')}</p>`;
                const ts = S.tasks.slice().sort((a, b) => (!!a.d - !!b.d) || (ORD[a.p] - ORD[b.p]) || (a.id - b.id)).slice(0, 4);
                K.innerHTML = ts.map(x => `<div class="hm-t ${x.d?'done':''}"><button class="hm-chk" data-hid="${x.id}" role="checkbox" aria-checked="${!!x.d}" aria-label="${esc(tr(x.t))}">${ic('ck')}</button><span class="hm-tt"><b>${esc(tr(x.t))}</b><small>${tr(DIFF[x.p]||x.p)}</small></span>${x.d?`<span class="hm-ok">${tr('Completed')}</span>`:`<span class="hm-when"><svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${tr('Today')}</span>`}</div>`).join('') || `<p class="hm-empty">${tr('No tasks yet. Add your first task above.')}</p>`;
                const n = (S.name || '').trim() || tr('Student'),
                    ar = S.lang === 'ar';
                $('#hmKeep').innerHTML = `<span class="em">🏆</span><span><b>${ar?'كمّل يا '+esc(n)+'!':'Keep going, '+esc(n)+'!'}</b><small>${ar?'أنت بتبلي كويس!':'You’re doing great!'}</small></span>`
            }
            $('#hmTasks').addEventListener('click', e => {
                const c = e.target.closest('[data-hid]');
                if (!c) return;
                const x = S.tasks.find(t => t.id === +c.dataset.hid);
                if (!x) return;
                x.d = x.d ? 0 : 1;
                if (x.d) {
                    SFX.done();
                    confetti(c);
                    toast('✅ ' + tr('Task completed successfully'))
                } else SFX.undo();
                save();
                render()
            });
            $('#hmLib').addEventListener('click', e => {
                const c = e.target.closest('[data-hopen]');
                if (!c) return;
                const sel = '#lib .cover[data-open="' + c.dataset.hopen + '"]';
                let t = $(sel);
                if (!t) {
                    subj = 'All';
                    qv = '';
                    render();
                    t = $(sel)
                }
                if (t) t.click()
            });
            theme();
            lang();
            $('#nameIn').value = S.name;
            syncProfile();
            $('#vol').value = S.vol;
            render();
            route();
        })();

;
(() => {
    const r = document.getElementById('novix-pdf-reader');
    if (r) document.body.appendChild(r);
})();

;
        (() => {
            const $ = s => document.querySelector(s),
                $$ = s => [...document.querySelectorAll(s)];
            const reader = $('#novix-pdf-reader'),
                scroller = $('#nr-pages');
            if (!reader || !scroller) return;
            const isAr = () => document.documentElement.lang === 'ar';
            const L = (e, a) => isAr() ? a : e;
            const LS = {
                get(k, d) {
                    try {
                        const v = JSON.parse(localStorage.getItem(k));
                        return v == null ? d : v
                    } catch (e) {
                        return d
                    }
                },
                set(k, v) {
                    try {
                        localStorage.setItem(k, JSON.stringify(v));
                        return true
                    } catch (e) {
                        return false
                    }
                }
            };
            const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
            const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

            const DEF = {
                pen: {
                    color: '#253b34',
                    size: 3
                },
                highlighter: {
                    color: '#f2c230',
                    size: 14
                },
                eraser: {
                    size: 18
                },
                text: {
                    color: '#1f2a27',
                    size: 16,
                    bold: false,
                    family: 'sans'
                },
                sticky: {
                    paper: '#fff1b3',
                    size: 14,
                    textColor: '#2a2a2a'
                },
                laser: {
                    color: '#ff2d3d',
                    size: 12,
                    trail: true
                },
                shape: {
                    kind: 'rect',
                    stroke: '#278f79',
                    width: 2,
                    fill: '#e3f5eb',
                    fillOn: false,
                    textColor: '#20372e'
                }
            };
            const cfg = (() => {
                const s = LS.get('novix.pdf.tools.v1', {}),
                    o = {};
                for (const k in DEF) o[k] = {
                    ...DEF[k],
                    ...(s[k] || {})
                };
                return o
            })();
            const saveCfg = () => {
                LS.set('novix.pdf.tools.v1', cfg);
                try {
                    paintTools()
                } catch (e) {}
            };
            const menuEl = document.getElementById('nr-menu');
            let menuFor = null;
            if (!cfg.shape.nofill1) {
                cfg.shape.fillOn = false;
                cfg.shape.nofill1 = true;
                saveCfg()
            }
            const FAM = {
                sans: 'Alexandria,Manrope,Arial,sans-serif',
                serif: 'Georgia,"Times New Roman",serif',
                mono: 'ui-monospace,Menlo,Consolas,monospace'
            };
            const toolOfObj = o => o.type === 'textbox' ? 'text' : o.type === 'sticky' ? 'sticky' : 'shape';

            let file = null,
                fileId = null,
                pdfDoc = null,
                scale = 1,
                tool = 'pan',
                views = [],
                ann = {
                    pages: {}
                },
                undo = [],
                redo = [],
                sel = null,
                io = null,
                saveT = 0,
                zoomT = 0,
                posT = 0;
            let defW = 595,
                defH = 842,
                queue = [],
                drawing = null,
                creating = null,
                curPage = 1,
                currentUrl = null,
                lastMod = null;
            const dpr = () => Math.min(window.devicePixelRatio || 1, 3);
            const note = t => {
                const n = $('#nr-note');
                if (n) n.textContent = t
            };

            function askPw(wrong) {
                return new Promise(res => {
                    const m = document.createElement('div');
                    m.className = 'nx-modal';
                    m.innerHTML = '<form class="nx-dlg" role="alertdialog" aria-modal="true"><h3></h3><p></p><input type="password" autocomplete="off" style="width:100%;box-sizing:border-box;margin:10px 0;padding:10px 12px;border-radius:10px;border:1px solid var(--line,#cfd8d4);font:inherit;background:var(--card,#fff);color:var(--text,#1c2b26)"><div class="nx-act"><button type="button" class="btn ghost"></button><button type="submit" class="btn"></button></div></form>';
                    const f = m.firstChild,
                        i = m.querySelector('input'),
                        [bc, bo] = m.querySelectorAll('button');
                    m.querySelector('h3').textContent = L('Password required', 'كلمة المرور مطلوبة');
                    m.querySelector('p').textContent = wrong ? L('Wrong password. Try again:', 'كلمة المرور غير صحيحة. حاول مرة أخرى:') : L('This PDF is password-protected. Enter the password:', 'هذا الملف محمي بكلمة مرور. أدخلها:');
                    i.setAttribute('aria-label', L('Password', 'كلمة المرور'));
                    bc.textContent = L('Cancel', 'إلغاء');
                    bo.textContent = L('Open', 'فتح');
                    const done = v => {
                        m.remove();
                        res(v)
                    };
                    bc.onclick = () => done(null);
                    f.onsubmit = e => {
                        e.preventDefault();
                        done(i.value || null)
                    };
                    m.addEventListener('keydown', e => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            e.stopPropagation();
                            done(null)
                        }
                    });
                    document.body.appendChild(m);
                    i.focus()
                })
            }

            const annKey = id => 'novix.pdf.ann.v3.' + id;
            const AS = {
                mem: new Map(),
                async load(id) {
                    if (this.mem.has(id)) return this.mem.get(id);
                    let a = null;
                    try {
                        a = await NXSTORE.raw.get('ann:' + id)
                    } catch (e) {}
                    if (!a) {
                        a = LS.get(annKey(id), null);
                        if (!a) {
                            const old = LS.get('novix.pdf.annotations.v2', {});
                            a = old[id] || null
                        }
                        if (a && a.pages) {
                            try {
                                await NXSTORE.raw.put('ann:' + id, a);
                                localStorage.removeItem(annKey(id))
                            } catch (e) {}
                        }
                    }
                    return a
                },
                set(id, obj) {
                    const c = JSON.parse(JSON.stringify(obj));
                    this.mem.set(id, c);
                    NXSTORE.raw.put('ann:' + id, c).catch(() => {
                        if (!LS.set(annKey(id), c)) note(L('Storage is full. Export your annotations before closing.', 'مساحة التخزين ممتلئة. صدّر تعليقاتك قبل الإغلاق.'))
                    });
                    return true
                }
            };

            let sessionBase = {
                pages: {}
            };
            const annSig = a => JSON.stringify(Object.keys((a && a.pages) || {}).sort((x, y) => x - y).filter(k => {
                const p = a.pages[k];
                return p && ((p.strokes && p.strokes.length) || (p.objects && p.objects.length))
            }).map(k => [k, a.pages[k]]));
            async function loadAnn() {
                const a = await AS.load(fileId);
                ann = a && a.pages ? a : {
                    pages: {}
                };
                sessionBase = JSON.parse(JSON.stringify(ann))
            }

            function persist(now) {
                clearTimeout(saveT);
                const run = () => {
                    if (fileId == null) return true;
                    const ok = AS.set(fileId, ann);
                    note(ok ? '' : L('Storage is full. Export your annotations before closing.', 'مساحة التخزين ممتلئة. صدّر تعليقاتك قبل الإغلاق.'));
                    return ok
                };
                if (now) return run();
                saveT = setTimeout(run, 400)
            }
            const pageAnn = n => ann.pages[n] || (ann.pages[n] = {
                strokes: [],
                objects: []
            });
            const getList = (n, type) => type === 'stroke' ? pageAnn(n).strokes : pageAnn(n).objects;

            function norm(o) {
                if (o.fs == null) o.fs = o.type === 'textbox' ? 16 : 14;
                if (!o.color) o.color = o.type === 'textbox' ? '#1f2a27' : '#20372e';
                if (!o.family) o.family = 'sans';
                if (o.bold == null) o.bold = false;
                if (o.type === 'sticky' && !o.paper) o.paper = '#fff1b3';
                if (o.type === 'shape') {
                    if (o.stroke == null) o.stroke = '#368c75';
                    if (o.lw == null) o.lw = 2;
                    if (o.fill == null) o.fill = o.shape === 'speech' ? '#eaf2ff' : '#e3f5eb'
                }
                return o
            }

            function pushH(h) {
                undo.push(h);
                redo = [];
                if (undo.length > 300) undo.shift();
                updHist()
            }

            function updHist() {
                const u = $('#nr-undo'),
                    r = $('#nr-redo');
                if (u) u.disabled = !undo.length;
                if (r) r.disabled = !redo.length
            }

            function removeItem(n, type, id) {
                const l = getList(n, type),
                    i = l.findIndex(x => x.id === id);
                if (i >= 0) return l.splice(i, 1)[0]
            }

            function insertItem(n, type, item, idx) {
                const l = getList(n, type);
                if (l.some(x => x.id === item.id)) return;
                l.splice(clamp(idx == null ? l.length : idx, 0, l.length), 0, structuredClone(item))
            }

            function replaceItem(n, type, item) {
                const l = getList(n, type),
                    i = l.findIndex(x => x.id === item.id);
                if (i >= 0) l[i] = structuredClone(item);
                else l.push(structuredClone(item))
            }

            function stepH(h, undoing) {
                clearStrokeSel();
                if (h.op === 'add') {
                    undoing ? removeItem(h.n, h.type, h.after.id) : insertItem(h.n, h.type, h.after, h.index)
                } else if (h.op === 'del') {
                    undoing ? insertItem(h.n, h.type, h.before, h.index) : removeItem(h.n, h.type, h.before.id)
                } else replaceItem(h.n, h.type, undoing ? h.before : h.after);
                if (sel && !getList(sel.n, 'object').some(o => o.id === sel.id)) sel = null;
                refreshPage(h.n);
                buildOptions();
                persist()
            }

            function doUndo() {
                const h = undo.pop();
                if (!h) return;
                stepH(h, true);
                redo.push(h);
                updHist()
            }

            function doRedo() {
                const h = redo.pop();
                if (!h) return;
                stepH(h, false);
                undo.push(h);
                updHist()
            }

            function refreshPage(n) {
                const v = views[n - 1];
                if (v && v.mounted) {
                    drawInkAll(v);
                    renderObjects(v)
                }
            }

            /* Ink pen: each point carries a width factor p[2] (0.2-1) that comes from
               the writing speed, so fast strokes get thin and slow ones get thick. */
            function penVar(ctx, s, k, from, final) {
                const p = s.points,
                    n = p.length,
                    sz = s.size * k;
                if (!n) return 0;
                const W = i => sz * Math.max(.16, p[i][2] == null ? 1 : p[i][2]),
                    X = i => p[i][0] * k,
                    Y = i => p[i][1] * k;
                const S = []; /* samples along the curve: [x, y, radius] */
                const seg = (ax, ay, cx, cy, bx, by, w0, w1) => {
                    const m = Math.max(1, Math.min(14, Math.ceil(Math.hypot(bx - ax, by - ay) / (2.2 * Math.max(1, k)))));
                    for (let j = 0; j <= m; j++) {
                        const t = j / m,
                            u = 1 - t;
                        S.push([u * u * ax + 2 * u * t * cx + t * t * bx, u * u * ay + 2 * u * t * cy + t * t * by, (w0 + (w1 - w0) * t) / 2])
                    }
                };
                let i = from;
                if (i === 0) {
                    if (n === 1) {
                        S.push([X(0), Y(0), W(0) / 2])
                    } else {
                        const mx = (X(0) + X(1)) / 2,
                            my = (Y(0) + Y(1)) / 2;
                        seg(X(0), Y(0), X(0), Y(0), mx, my, W(0), (W(0) + W(1)) / 2);
                        i = 1
                    }
                }
                for (; i <= n - 2; i++) {
                    const ax = (X(i - 1) + X(i)) / 2,
                        ay = (Y(i - 1) + Y(i)) / 2,
                        bx = (X(i) + X(i + 1)) / 2,
                        by = (Y(i) + Y(i + 1)) / 2;
                    seg(ax, ay, X(i), Y(i), bx, by, (W(i - 1) + W(i)) / 2, (W(i) + W(i + 1)) / 2)
                }
                if (final && n > 1) {
                    const mx = (X(n - 2) + X(n - 1)) / 2,
                        my = (Y(n - 2) + Y(n - 1)) / 2;
                    seg(mx, my, mx, my, X(n - 1), Y(n - 1), (W(n - 2) + W(n - 1)) / 2, W(n - 1))
                }
                if (!S.length) return n === 1 ? 0 : i;
                /* one single fill: no overlapping translucent edges, so the outline stays crisp */
                ctx.save();
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 1;
                ctx.fillStyle = s.color || '#000';
                ctx.beginPath();
                for (let q = 0; q < S.length; q++) {
                    const [x, y, r] = S[q];
                    ctx.moveTo(x + r, y);
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    if (q) {
                        const [px, py, pr] = S[q - 1],
                            dx = x - px,
                            dy = y - py,
                            len = Math.hypot(dx, dy);
                        if (len > .01) {
                            const nx = -dy / len,
                                ny = dx / len,
                                P = [
                                    [px + nx * pr, py + ny * pr],
                                    [x + nx * r, y + ny * r],
                                    [x - nx * r, y - ny * r],
                                    [px - nx * pr, py - ny * pr]
                                ],
                                cr = (P[1][0] - P[0][0]) * (P[2][1] - P[1][1]) - (P[1][1] - P[0][1]) * (P[2][0] - P[1][0]);
                            if (cr < 0) P.reverse();
                            ctx.moveTo(P[0][0], P[0][1]);
                            for (let z = 1; z < 4; z++) ctx.lineTo(P[z][0], P[z][1]);
                            ctx.closePath()
                        }
                    }
                }
                ctx.fill('nonzero');
                ctx.restore();
                return n === 1 ? 0 : i
            }

            function drawInkStroke(ctx, s, k) {
                const pts = s.points;
                if (!pts || !pts.length) return;
                if (s.tool === 'pen' && pts[0].length > 2) {
                    penVar(ctx, s, k, 0, true);
                    return
                }
                ctx.save();
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.globalCompositeOperation = s.tool === 'eraser' ? 'destination-out' : 'source-over';
                ctx.strokeStyle = s.color || '#000';
                ctx.globalAlpha = s.tool === 'highlighter' ? .32 : 1;
                ctx.lineWidth = s.size * k;
                ctx.beginPath();
                ctx.moveTo(pts[0][0] * k, pts[0][1] * k);
                for (let i = 1; i < pts.length; i++) {
                    const x = pts[i][0] * k,
                        y = pts[i][1] * k,
                        px = pts[i - 1][0] * k,
                        py = pts[i - 1][1] * k;
                    ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2)
                }
                ctx.lineTo(pts[pts.length - 1][0] * k, pts[pts.length - 1][1] * k);
                ctx.stroke();
                ctx.restore()
            }

            function drawInkAll(v) {
                if (!v.mounted || !v.ink) return;
                const ctx = v.ink.getContext('2d');
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, v.ink.width, v.ink.height);
                for (const st of pageAnn(v.n).strokes) drawInkStroke(ctx, st, v.rs || 1)
            }

            function pickRs(w, h) {
                let rs = scale * dpr();
                const m = Math.max(w, h) * rs;
                if (m > 4096) rs *= 4096 / m;
                const a = w * h * rs * rs;
                if (a > 14e6) rs *= Math.sqrt(14e6 / a);
                return rs
            }

            function buildViews() {
                scroller.replaceChildren();
                views = [];
                if (io) io.disconnect();
                io = new IntersectionObserver(es => {
                    for (const e of es) {
                        const v = views[+e.target.dataset.page - 1];
                        if (!v) continue;
                        e.isIntersecting ? mountView(v) : unmountView(v)
                    }
                }, {
                    root: scroller,
                    rootMargin: '1400px 0px 1400px 0px'
                });
                const frag = document.createDocumentFragment();
                for (let n = 1; n <= pdfDoc.numPages; n++) {
                    const w = document.createElement('div');
                    w.className = 'pdf-page';
                    w.dataset.page = n;
                    w.style.setProperty('--pw', defW);
                    w.style.setProperty('--ph', defH);
                    views.push({
                        n,
                        wrap: w,
                        pw: defW,
                        ph: defH,
                        mounted: false,
                        rs: 0,
                        tok: 0
                    });
                    frag.appendChild(w)
                }
                scroller.appendChild(frag);
                views.forEach(v => io.observe(v.wrap));
                $('#nr-total').textContent = '/ ' + pdfDoc.numPages;
                $('#nr-page').max = pdfDoc.numPages
            }

            function mountView(v) {
                if (v.mounted) return;
                v.mounted = true;
                v.base = document.createElement('canvas');
                v.base.className = 'pdf-base';
                v.ink = document.createElement('canvas');
                v.ink.className = 'pdf-ink';
                v.objLayer = document.createElement('div');
                v.objLayer.className = 'pdf-object-layer';
                v.wrap.append(v.base, v.ink, v.objLayer);
                bindInk(v);
                renderObjects(v);
                enqueue(v)
            }

            function unmountView(v) {
                if (!v.mounted) return;
                if (v.objLayer && v.objLayer.contains(document.activeElement)) return;
                if ((drawing && drawing.v === v) || (creating && creating.v === v)) return;
                if (sel && sel.n === v.n) return;
                v.tok++;
                try {
                    v.task && v.task.cancel()
                } catch (e) {}
                v.task = null;
                v.mounted = false;
                v.rs = 0;
                v.wrap.classList.remove('ready');
                v.wrap.replaceChildren();
                v.base = v.ink = v.objLayer = null;
                try {
                    v.page && v.page.cleanup()
                } catch (e) {}
                if (v.page && pdfDoc && pdfDoc.release) {
                    pdfDoc.release(v.page);
                    v.page = null
                }
            }
            let active = 0;

            function enqueue(v) {
                if (!queue.includes(v)) queue.push(v);
                pump()
            }

            function pump() {
                while (active < 2 && queue.length) {
                    const mid = scroller.scrollTop + scroller.clientHeight / 2;
                    queue.sort((a, b) => Math.abs(a.wrap.offsetTop + a.wrap.offsetHeight / 2 - mid) - Math.abs(b.wrap.offsetTop + b.wrap.offsetHeight / 2 - mid));
                    const v = queue.shift();
                    active++;
                    renderView(v).finally(() => {
                        active = Math.max(0, active - 1);
                        pump()
                    })
                }
            }
            async function renderView(v) {
                if (!v.mounted || !pdfDoc) return;
                const tok = ++v.tok;
                try {
                    let page = v.page;
                    if (!page) {
                        page = await pdfDoc.getPage(v.n);
                        if (!v.mounted) {
                            if (pdfDoc.release) pdfDoc.release(page);
                            return
                        }
                        if (tok !== v.tok) return;
                        v.page = page
                    }
                    if (!v.mounted || tok !== v.tok) return;
                    const b = page.getViewport({
                        scale: 1
                    });
                    if (Math.abs(b.width - v.pw) > .5 || Math.abs(b.height - v.ph) > .5) {
                        v.pw = b.width;
                        v.ph = b.height;
                        v.wrap.style.setProperty('--pw', b.width);
                        v.wrap.style.setProperty('--ph', b.height)
                    }
                    const full = pickRs(b.width, b.height),
                        quick = !v.rs && full > scale * 1.25,
                        rs = quick ? Math.max(.5, scale * .7) : full,
                        vp = page.getViewport({
                            scale: rs
                        });
                    const tmp = document.createElement('canvas');
                    tmp.width = Math.ceil(vp.width);
                    tmp.height = Math.ceil(vp.height);
                    tmp.className = 'pdf-base';
                    const task = page.render({
                        canvasContext: tmp.getContext('2d'),
                        viewport: vp
                    });
                    v.task = task;
                    await task.promise;
                    if (!v.mounted || tok !== v.tok) return;
                    v.base.replaceWith(tmp);
                    v.base = tmp;
                    /* ink is drawn at a higher resolution than the page so pen lines stay razor sharp */
                    const ss = Math.max(1, Math.min(2, 4096 / Math.max(tmp.width, tmp.height), Math.sqrt(16e6 / (tmp.width * tmp.height))));
                    v.ink.width = Math.ceil(tmp.width * ss);
                    v.ink.height = Math.ceil(tmp.height * ss);
                    v.rs = rs * ss;
                    drawInkAll(v);
                    v.wrap.classList.add('ready');
                    if (quick) enqueue(v)
                } catch (err) {
                    if (err && err.name === 'RenderingCancelledException') return;
                    if (tok !== v.tok || !v.mounted) return;
                    console.error(err)
                }
            }

            function updZoomLabel() {
                const z = $('#nr-zoom');
                if (z) z.textContent = Math.round(scale * 100) + '%'
            }

            function setScale(ns, soft) {
                ns = clamp(ns, .4, 4);
                if (Math.abs(ns - scale) < .002) return;
                const ratio = (scroller.scrollTop + scroller.clientHeight / 2) / Math.max(1, scroller.scrollHeight);
                scale = ns;
                scroller.style.setProperty('--s', scale);
                scroller.scrollTop = ratio * scroller.scrollHeight - scroller.clientHeight / 2;
                updZoomLabel();
                clearTimeout(zoomT);
                zoomT = setTimeout(() => {
                    views.forEach(v => v.mounted && enqueue(v));
                    savePos()
                }, soft ? 120 : 160)
            }

            function fitWidth() {
                const avail = Math.max(240, scroller.clientWidth - 24);
                return clamp(avail / defW, .4, 2)
            }

            function scrollToPage(n) {
                n = clamp(Math.round(n) || 1, 1, views.length);
                const v = views[n - 1];
                if (v) scroller.scrollTop = v.wrap.offsetTop - 12;
                curPage = n;
                $('#nr-page').value = n
            }

            function updCurPage() {
                if (!views.length) return;
                const y = scroller.scrollTop + scroller.clientHeight * .35;
                let lo = 0,
                    hi = views.length - 1;
                while (lo < hi) {
                    const m = (lo + hi + 1) >> 1;
                    if (views[m].wrap.offsetTop <= y) lo = m;
                    else hi = m - 1
                }
                curPage = lo + 1;
                const inp = $('#nr-page');
                if (document.activeElement !== inp) inp.value = curPage
            }

            function savePos() {
                clearTimeout(posT);
                posT = setTimeout(() => {
                    if (fileId == null) return;
                    const all = LS.get('novix.pdf.pos.v1', {});
                    all[fileId] = {
                        page: curPage,
                        scale: +scale.toFixed(3)
                    };
                    LS.set('novix.pdf.pos.v1', all)
                }, 300)
            }
            let scrollRaf = 0;
            scroller.addEventListener('scroll', () => {
                if (scrollRaf) return;
                scrollRaf = requestAnimationFrame(() => {
                    scrollRaf = 0;
                    updCurPage();
                    savePos()
                })
            }, {
                passive: true
            });
            scroller.addEventListener('wheel', e => {
                if (!e.ctrlKey || !views.length) return;
                e.preventDefault();
                setScale(scale * (e.deltaY < 0 ? 1.08 : 1 / 1.08), true)
            }, {
                passive: false
            });
            const touchDown = new Set();

            /* ---------- Laser pointer: a glowing dot with a fading trail, never saved ---------- */
            const laser = {
                cv: null,
                pts: [],
                x: 0,
                y: 0,
                down: false,
                hover: false,
                pid: null,
                rel: 0,
                raf: 0
            };

            function laserCanvas() {
                if (!laser.cv) {
                    const c = document.createElement('canvas');
                    c.id = 'nr-laser';
                    c.setAttribute('aria-hidden', 'true');
                    reader.appendChild(c);
                    laser.cv = c
                }
                return laser.cv
            }

            function laserFrame() {
                laser.raf = 0;
                const c = laserCanvas(),
                    r = reader.getBoundingClientRect(),
                    d = Math.min(window.devicePixelRatio || 1, 2),
                    w = Math.round(r.width * d),
                    h = Math.round(r.height * d);
                if (c.width !== w || c.height !== h) {
                    c.width = w;
                    c.height = h
                }
                const g = c.getContext('2d'),
                    now = performance.now(),
                    cf = cfg.laser,
                    TRAIL = 620,
                    FADE = 520;
                g.setTransform(d, 0, 0, d, 0, 0);
                g.clearRect(0, 0, r.width, r.height);
                laser.pts = laser.pts.filter(p => now - p.t < TRAIL);
                const col = cf.color || '#ff2d3d',
                    R = Math.max(3, cf.size / 2);
                g.lineCap = 'round';
                g.lineJoin = 'round';
                if (cf.trail !== false) {
                    for (let i = 1; i < laser.pts.length; i++) {
                        const a = laser.pts[i - 1],
                            b = laser.pts[i],
                            k = 1 - (now - b.t) / TRAIL;
                        if (k <= 0) continue;
                        g.strokeStyle = col;
                        g.globalAlpha = Math.min(1, k * .9);
                        g.shadowColor = col;
                        g.shadowBlur = 14 * k;
                        g.lineWidth = R * 1.25 * (.12 + .88 * k);
                        g.beginPath();
                        g.moveTo(a.x - r.left, a.y - r.top);
                        g.lineTo(b.x - r.left, b.y - r.top);
                        g.stroke()
                    }
                }
                let ha = 0;
                if (laser.down || laser.hover) ha = 1;
                else if (laser.rel) ha = Math.max(0, 1 - (now - laser.rel) / FADE);
                if (ha > 0) {
                    const x = laser.x - r.left,
                        y = laser.y - r.top;
                    g.shadowColor = col;
                    g.shadowBlur = R * 2.4;
                    g.globalAlpha = ha;
                    const gr = g.createRadialGradient(x, y, 0, x, y, R * 2.3);
                    gr.addColorStop(0, '#ffffff');
                    gr.addColorStop(.28, col);
                    gr.addColorStop(.62, col);
                    gr.addColorStop(1, 'rgba(255,255,255,0)');
                    g.fillStyle = gr;
                    g.beginPath();
                    g.arc(x, y, R * 2.3, 0, Math.PI * 2);
                    g.fill();
                    g.shadowBlur = 0;
                    g.globalAlpha = ha * .95;
                    g.fillStyle = '#fff';
                    g.beginPath();
                    g.arc(x, y, Math.max(1.5, R * .38), 0, Math.PI * 2);
                    g.fill()
                }
                g.globalAlpha = 1;
                g.shadowBlur = 0;
                if (laser.pts.length || ha > 0) laser.raf = requestAnimationFrame(laserFrame)
            }

            function laserKick() {
                if (!laser.raf) laser.raf = requestAnimationFrame(laserFrame)
            }

            function laserStop() {
                laser.down = false;
                laser.hover = false;
                laser.pid = null;
                laser.pts = [];
                laser.rel = 0;
                if (laser.raf) cancelAnimationFrame(laser.raf);
                laser.raf = 0;
                if (laser.cv) {
                    const g = laser.cv.getContext('2d');
                    g.setTransform(1, 0, 0, 1, 0, 0);
                    g.clearRect(0, 0, laser.cv.width, laser.cv.height)
                }
            }

            function laserMove(e) {
                laser.x = e.clientX;
                laser.y = e.clientY;
                laser.pts.push({
                    x: e.clientX,
                    y: e.clientY,
                    t: performance.now()
                })
            }
            reader.addEventListener('pointermove', e => {
                if (tool !== 'laser') return;
                if (laser.down && e.pointerId === laser.pid) {
                    const ce = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
                    (ce.length ? ce : [e]).forEach(q => laserMove(q));
                    laserKick()
                } else if (!laser.down && e.pointerType !== 'touch' && e.target.closest && e.target.closest('.reader-scroll')) {
                    laser.hover = true;
                    laserMove(e);
                    laserKick()
                }
            });
            reader.addEventListener('pointerleave', e => {
                if (e.pointerType !== 'touch') {
                    laser.hover = false;
                    laser.rel = performance.now();
                    laserKick()
                }
            });
            ['pointerup', 'pointercancel'].forEach(k => reader.addEventListener(k, e => {
                if (laser.down && e.pointerId === laser.pid) {
                    laser.down = false;
                    laser.pid = null;
                    laser.rel = performance.now();
                    laserKick()
                }
            }));

            function startLaser(e, ink) {
                e.preventDefault();
                try {
                    ink.setPointerCapture(e.pointerId)
                } catch (z) {}
                laser.down = true;
                laser.hover = false;
                laser.pid = e.pointerId;
                laser.pts = [];
                laserMove(e);
                laserKick()
            }

            function abortGesture() {
                if (laser.down) laserStop();
                if (strokeDrag) strokeDrag.cancel();
                if (drawing) {
                    const d = drawing,
                        v = d.v;
                    if (d.raf) cancelAnimationFrame(d.raf);
                    if (d.live) d.live.remove();
                    drawing = null;
                    try {
                        drawInkAll(v)
                    } catch (e) {}
                }
                if (creating && creating.cancel) {
                    try {
                        creating.cancel()
                    } catch (e) {}
                }
            }
            scroller.addEventListener('pointerdown', e => {
                if (e.pointerType !== 'touch') return;
                touchDown.add(e.pointerId);
                if (touchDown.size > 1) abortGesture()
            }, true);
            ['pointerup', 'pointercancel'].forEach(k => scroller.addEventListener(k, e => {
                if (e.pointerType === 'touch') touchDown.delete(e.pointerId)
            }, true));
            let pinch = null;
            scroller.addEventListener('touchstart', e => {
                if (e.touches.length === 2 && views.length) {
                    const a = e.touches[0],
                        b = e.touches[1];
                    pinch = {
                        d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
                        s: scale,
                        mx: (a.clientX + b.clientX) / 2,
                        my: (a.clientY + b.clientY) / 2
                    };
                    abortGesture()
                }
            }, {
                passive: true
            });
            scroller.addEventListener('touchmove', e => {
                if (pinch && e.touches.length === 2) {
                    e.preventDefault();
                    const a = e.touches[0],
                        b = e.touches[1];
                    setScale(pinch.s * Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) / pinch.d, true);
                    const mx = (a.clientX + b.clientX) / 2,
                        my = (a.clientY + b.clientY) / 2;
                    scroller.scrollLeft -= mx - pinch.mx;
                    scroller.scrollTop -= my - pinch.my;
                    pinch.mx = mx;
                    pinch.my = my
                }
            }, {
                passive: false
            });
            scroller.addEventListener('touchend', e => {
                if (e.touches.length < 2) pinch = null;
                if (!e.touches.length) touchDown.clear()
            });
            $('#nr-minus').onclick = () => pdfDoc && setScale(scale / 1.15);
            $('#nr-plus').onclick = () => pdfDoc && setScale(scale * 1.15);
            $('#nr-zoom').onclick = () => {
                if (!pdfDoc) return;
                const f = fitWidth();
                setScale(Math.abs(scale - f) < .02 ? 1 : f)
            };
            $('#nr-page').onchange = e => scrollToPage(+e.target.value);
            $('#nr-page').onkeydown = e => {
                if (e.key === 'Enter') {
                    e.target.blur();
                    scrollToPage(+e.target.value)
                }
            };

            function setBox(el, o) {
                const s = el.style;
                s.setProperty('--x', o.x);
                s.setProperty('--y', o.y);
                s.setProperty('--w', o.w);
                s.setProperty('--h', o.h);
                el.classList.toggle('bar-below', o.y < 34)
            }

            function applyObjStyle(el, o) {
                const s = el.style;
                setBox(el, o);
                s.setProperty('--fs', o.fs);
                s.setProperty('--tc', o.color);
                if (o.type === 'sticky') s.setProperty('--paper', o.paper);
                if (o.type === 'shape') {
                    s.setProperty('--stroke', o.stroke);
                    s.setProperty('--lw', o.lw);
                    s.setProperty('--fill', o.fill || 'transparent');
                    el.className = el.className.replace(/shape-\w+/, 'shape-' + o.shape);
                    el.classList.toggle('nofill', !o.fill);
                    const t0 = el.querySelector('.pdf-obj-text');
                    if (t0) {
                        t0.tabIndex = o.fill ? 0 : -1;
                        if (!o.fill && document.activeElement === t0) t0.blur()
                    }
                }
                const ta = el.querySelector('.pdf-obj-text');
                if (ta) {
                    ta.style.fontFamily = FAM[o.family] || FAM.sans;
                    ta.style.fontWeight = o.bold ? '800' : '500'
                }
            }

            function objEl(v, o) {
                norm(o);
                const el = document.createElement('div');
                el.className = 'pdf-obj ' + (o.type === 'sticky' ? 'sticky' : o.type === 'textbox' ? 'textbox' : 'shape shape-' + o.shape);
                el.dataset.id = o.id;
                const bar = document.createElement('div');
                bar.className = 'pdf-obj-bar';
                const grip = document.createElement('button');
                grip.type = 'button';
                grip.className = 'grip';
                grip.title = L('Move', 'تحريك');
                grip.textContent = '✥';
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'del';
                del.title = L('Delete', 'حذف');
                del.textContent = '×';
                bar.append(grip, del);
                const ta = document.createElement('textarea');
                ta.className = 'pdf-obj-text';
                ta.dir = 'auto';
                ta.spellcheck = false;
                ta.value = o.text || '';
                ta.placeholder = o.type === 'sticky' ? L('Add a note…', 'أضف ملاحظة…') : L('Type here…', 'اكتب هنا…');
                el.append(bar, ta);
                if (o.type === 'shape') {
                    const NS = 'http://www.w3.org/2000/svg',
                        sv = document.createElementNS(NS, 'svg');
                    sv.setAttribute('class', 'shape-tri');
                    sv.setAttribute('viewBox', '0 0 100 100');
                    sv.setAttribute('preserveAspectRatio', 'none');
                    sv.setAttribute('aria-hidden', 'true');
                    const pg = document.createElementNS(NS, 'polygon');
                    pg.setAttribute('points', '50,0 100,100 0,100');
                    pg.setAttribute('vector-effect', 'non-scaling-stroke');
                    pg.setAttribute('stroke-linejoin', 'round');
                    sv.appendChild(pg);
                    el.insertBefore(sv, bar)
                }
                for (const d of ['nw', 'ne', 'sw', 'se']) {
                    const h = document.createElement('div');
                    h.className = 'rz rz-' + d;
                    h.dataset.dir = d;
                    el.appendChild(h);
                    h.addEventListener('pointerdown', e => dragObj(e, v, o, el, 'resize', d))
                }
                applyObjStyle(el, o);
                grip.addEventListener('pointerdown', e => dragObj(e, v, o, el, 'move'));
                del.addEventListener('pointerdown', e => e.stopPropagation());
                del.addEventListener('click', e => {
                    e.stopPropagation();
                    deleteObj(v, o)
                });
                el.addEventListener('pointerdown', e => {
                    if (e.target.closest('.pdf-obj-bar,.rz')) return;
                    e.stopPropagation();
                    selectObj(v, o, el)
                });
                ta.addEventListener('focus', () => {
                    selectObj(v, o, el);
                    el.classList.add('editing')
                });
                ta.addEventListener('input', () => {
                    o.text = ta.value;
                    if (o.type === 'textbox') {
                        const need = Math.min(ta.scrollHeight / scale, v.ph - o.y);
                        if (need > o.h + 1) {
                            o.h = Math.ceil(need);
                            setBox(el, o)
                        }
                    }
                    persist()
                });
                ta.addEventListener('blur', e => {
                    el.classList.remove('editing');
                    if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.reader-options,.reader-tools,.reader-shapes,.reader-head')) return;
                    finishEdit(v, o)
                });
                ta.addEventListener('keydown', e => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        ta.blur();
                        clearSel()
                    }
                    e.stopPropagation()
                });
                return el
            }

            function finishEdit(v, o) {
                if (o.type === 'textbox' && !(o.text || '').trim()) {
                    deleteObj(v, o, true);
                    return
                }
                for (let i = undo.length - 1; i >= 0; i--) {
                    const h = undo[i];
                    if (h.op === 'add' && h.type === 'object' && h.after.id === o.id) {
                        h.after = structuredClone(o);
                        break
                    }
                }
                persist()
            }

            function deleteObj(v, o, silent) {
                const l = pageAnn(v.n).objects,
                    i = l.findIndex(x => x.id === o.id);
                if (i < 0) return;
                const before = structuredClone(l[i]);
                l.splice(i, 1);
                if (!silent) pushH({
                    n: v.n,
                    type: 'object',
                    op: 'del',
                    before,
                    index: i
                });
                else {
                    for (let k = undo.length - 1; k >= 0; k--) {
                        if (undo[k].after && undo[k].after.id === o.id && undo[k].op === 'add') {
                            undo.splice(k, 1);
                            break
                        }
                    }
                    updHist()
                }
                if (sel && sel.id === o.id) sel = null;
                renderObjects(v);
                buildOptions();
                persist()
            }

            function renderObjects(v) {
                if (!v.objLayer) return;
                v.objLayer.replaceChildren();
                for (const o of pageAnn(v.n).objects) {
                    if (v.pw && v.ph) {
                        o.w = Math.min(o.w, v.pw);
                        o.h = Math.min(o.h, v.ph);
                        o.x = clamp(o.x, 0, Math.max(0, v.pw - o.w));
                        o.y = clamp(o.y, 0, Math.max(0, v.ph - o.h))
                    }
                    const el = objEl(v, o);
                    v.objLayer.appendChild(el);
                    if (sel && sel.id === o.id) el.classList.add('sel')
                }
                if (selStroke && selStroke.n === v.n) mountStrokeSel(v)
            }

            function objElOf(id) {
                return scroller.querySelector('.pdf-obj[data-id="' + id + '"]')
            }

            function selObj() {
                if (!sel) return null;
                return pageAnn(sel.n).objects.find(o => o.id === sel.id) || null
            }

            function selectObj(v, o, el) {
                if (sel && sel.id === o.id && el.classList.contains('sel')) return;
                $$('.pdf-obj.sel').forEach(x => x.classList.remove('sel'));
                el.classList.add('sel');
                sel = {
                    n: v.n,
                    id: o.id
                };
                $('#nr-shapes').classList.toggle('open', o.type === 'shape');
                syncShapeButtons(o.shape);
                buildOptions()
            }

            function clearSel() {
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) ae.blur();
                $$('.pdf-obj.sel').forEach(x => x.classList.remove('sel'));
                if (sel) {
                    sel = null
                }
                $('#nr-shapes').classList.toggle('open', tool === 'shape');
                syncShapeButtons(cfg.shape.kind);
                buildOptions()
            }

            function dragObj(e, v, o, el, mode, dir) {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                e.preventDefault();
                e.stopPropagation();
                selectObj(v, o, el);
                const tg = e.currentTarget;
                try {
                    tg.setPointerCapture(e.pointerId)
                } catch (x) {}
                const sx = e.clientX,
                    sy = e.clientY,
                    b0 = {
                        x: o.x,
                        y: o.y,
                        w: o.w,
                        h: o.h
                    },
                    before = structuredClone(o),
                    s = scale;
                let raf = 0,
                    cur = null;
                const minW = o.type === 'textbox' ? 60 : 80,
                    minH = o.type === 'textbox' ? 30 : 50;
                const apply = () => {
                    raf = 0;
                    if (!cur) return;
                    const dx = (cur.x - sx) / s,
                        dy = (cur.y - sy) / s;
                    let {
                        x,
                        y,
                        w,
                        h
                    } = b0;
                    const pad = o.shape === 'speech' ? 16 : 0;
                    if (mode === 'move') {
                        x = clamp(b0.x + dx, 0, Math.max(0, v.pw - b0.w));
                        y = clamp(b0.y + dy, 0, Math.max(0, v.ph - pad - b0.h))
                    } else {
                        if (dir.includes('e')) w = clamp(b0.w + dx, minW, Math.max(minW, v.pw - b0.x));
                        if (dir.includes('s')) h = clamp(b0.h + dy, minH, Math.max(minH, v.ph - pad - b0.y));
                        if (dir.includes('w')) {
                            const nw = clamp(b0.w - dx, minW, Math.max(minW, b0.x + b0.w));
                            x = b0.x + b0.w - nw;
                            w = nw
                        }
                        if (dir.includes('n')) {
                            const nh = clamp(b0.h - dy, minH, Math.max(minH, b0.y + b0.h));
                            y = b0.y + b0.h - nh;
                            h = nh
                        }
                    }
                    o.x = x;
                    o.y = y;
                    o.w = w;
                    o.h = h;
                    setBox(el, o)
                };
                const mv = q => {
                    cur = {
                        x: q.clientX,
                        y: q.clientY
                    };
                    if (!raf) raf = requestAnimationFrame(apply)
                };
                const up = () => {
                    tg.removeEventListener('pointermove', mv);
                    tg.removeEventListener('pointerup', up);
                    tg.removeEventListener('pointercancel', up);
                    if (raf) cancelAnimationFrame(raf);
                    apply();
                    if (o.x !== before.x || o.y !== before.y || o.w !== before.w || o.h !== before.h) {
                        pushH({
                            n: v.n,
                            type: 'object',
                            op: 'mod',
                            before,
                            after: structuredClone(o)
                        });
                        persist()
                    }
                };
                tg.addEventListener('pointermove', mv);
                tg.addEventListener('pointerup', up);
                tg.addEventListener('pointercancel', up)
            }

            function newObject(kind, box) {
                const o = {
                    id: uid('o'),
                    type: kind === 'text' ? 'textbox' : kind,
                    shape: kind === 'shape' ? cfg.shape.kind : '',
                    x: box.x,
                    y: box.y,
                    w: box.w,
                    h: box.h,
                    text: ''
                };
                if (kind === 'text') {
                    Object.assign(o, {
                        color: cfg.text.color,
                        fs: cfg.text.size,
                        bold: cfg.text.bold,
                        family: cfg.text.family
                    })
                } else if (kind === 'sticky') {
                    Object.assign(o, {
                        paper: cfg.sticky.paper,
                        fs: cfg.sticky.size,
                        color: cfg.sticky.textColor,
                        family: 'sans',
                        bold: false
                    })
                } else {
                    Object.assign(o, {
                        stroke: cfg.shape.stroke,
                        lw: cfg.shape.width,
                        fill: cfg.shape.fillOn ? cfg.shape.fill : '',
                        color: cfg.shape.textColor,
                        fs: 14,
                        family: 'sans',
                        bold: false
                    })
                }
                return norm(o)
            }

            function startCreate(e, v, x, y) {
                const ink = v.ink;
                try {
                    ink.setPointerCapture(e.pointerId)
                } catch (z) {}
                const pv = document.createElement('div');
                pv.className = 'pdf-create-preview' + (tool === 'shape' ? ' p-' + cfg.shape.kind : '');
                if (tool === 'shape') {
                    pv.style.setProperty('--ps', cfg.shape.stroke);
                    pv.style.setProperty('--pf', cfg.shape.fillOn ? cfg.shape.fill : 'transparent');
                    pv.style.setProperty('--pw2', cfg.shape.width)
                }
                v.objLayer.appendChild(pv);
                creating = {
                    v,
                    pid: e.pointerId,
                    cancel: () => end(null, true)
                };
                let moved = false,
                    cx = x,
                    cy = y;
                const at = q => {
                    const r = ink.getBoundingClientRect();
                    return [(q.clientX - r.left) / scale, (q.clientY - r.top) / scale]
                };
                const rect = () => ({
                    x: Math.min(x, cx),
                    y: Math.min(y, cy),
                    w: Math.abs(cx - x),
                    h: Math.abs(cy - y)
                });
                const draw = () => {
                    const r = rect();
                    pv.style.setProperty('--x', r.x);
                    pv.style.setProperty('--y', r.y);
                    pv.style.setProperty('--w', r.w);
                    pv.style.setProperty('--h', r.h)
                };
                const mv = q => {
                    [cx, cy] = at(q);
                    if (Math.hypot(cx - x, cy - y) > 8) moved = true;
                    if (moved) draw()
                };
                const end = (q, cancel) => {
                    ink.removeEventListener('pointermove', mv);
                    ink.removeEventListener('pointerup', up);
                    ink.removeEventListener('pointercancel', cn);
                    pv.remove();
                    creating = null;
                    if (cancel) return;
                    const kind = tool;
                    let b;
                    if (moved) {
                        const r = rect();
                        b = {
                            x: r.x,
                            y: r.y,
                            w: Math.max(r.w, kind === 'text' ? 80 : 110),
                            h: Math.max(r.h, kind === 'text' ? 32 : 70)
                        }
                    } else if (kind === 'text') b = {
                        x: x,
                        y: y - 14,
                        w: 230,
                        h: 36
                    };
                    else if (kind === 'sticky') b = {
                        x: x - 100,
                        y: y - 20,
                        w: 200,
                        h: 150
                    };
                    else b = {
                        x: x - 85,
                        y: y - 55,
                        w: 170,
                        h: 110
                    };
                    b.w = Math.min(b.w, v.pw);
                    b.h = Math.min(b.h, v.ph - (kind === 'shape' && cfg.shape.kind === 'speech' ? 16 : 0));
                    b.x = clamp(b.x, 0, Math.max(0, v.pw - b.w));
                    b.y = clamp(b.y, 0, Math.max(0, v.ph - (kind === 'shape' && cfg.shape.kind === 'speech' ? 16 : 0) - b.h));
                    const o = newObject(kind, b);
                    const l = pageAnn(v.n).objects;
                    l.push(o);
                    pushH({
                        n: v.n,
                        type: 'object',
                        op: 'add',
                        after: structuredClone(o),
                        index: l.length - 1
                    });
                    persist();
                    renderObjects(v);
                    const el = objElOf(o.id);
                    if (el) {
                        selectObj(v, o, el);
                        if (!(o.type === 'shape' && !o.fill)) setTimeout(() => {
                            const ta = el.querySelector('textarea');
                            ta && ta.focus()
                        }, 30)
                    }
                };
                const up = q => end(q, false),
                    cn = q => end(q, true);
                ink.addEventListener('pointermove', mv);
                ink.addEventListener('pointerup', up);
                ink.addEventListener('pointercancel', cn)
            }

            function startPan(e, ink) {
                try {
                    ink.setPointerCapture(e.pointerId)
                } catch (z) {}
                let lx = e.clientX,
                    ly = e.clientY;
                reader.classList.add('panning');
                const mv = q => {
                    scroller.scrollLeft -= q.clientX - lx;
                    scroller.scrollTop -= q.clientY - ly;
                    lx = q.clientX;
                    ly = q.clientY
                };
                const up = () => {
                    ink.removeEventListener('pointermove', mv);
                    ink.removeEventListener('pointerup', up);
                    ink.removeEventListener('pointercancel', up);
                    reader.classList.remove('panning')
                };
                ink.addEventListener('pointermove', mv);
                ink.addEventListener('pointerup', up);
                ink.addEventListener('pointercancel', up)
            }
            function bindInk(v) {
                const ink = v.ink;
                ink.addEventListener('pointerdown', e => {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    if (e.pointerType === 'touch' && (touchDown.size > 1 || !e.isPrimary)) {
                        abortGesture();
                        return
                    }
                    const ae = document.activeElement,
                        wasEditing = !!(ae && ae.classList && ae.classList.contains('pdf-obj-text'));
                    const r = ink.getBoundingClientRect(),
                        x = (e.clientX - r.left) / scale,
                        y = (e.clientY - r.top) / scale;
                    if (wasEditing) ae.blur();
                    if (tool === 'laser') {
                        clearSel();
                        startLaser(e, ink);
                        return
                    }
                    if (tool === 'text' || tool === 'sticky' || tool === 'shape') {
                        e.preventDefault();
                        if (wasEditing) {
                            clearSel();
                            return
                        }
                        clearSel();
                        startCreate(e, v, x, y);
                        return
                    }
                    if (tool === 'pan') {
                        const nowT = performance.now(),
                            dbl = lastTap && lastTap.n === v.n && nowT - lastTap.t < 450 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30;
                        lastTap = {
                            t: nowT,
                            x: e.clientX,
                            y: e.clientY,
                            n: v.n
                        };
                        if (dbl) {
                            const hit = hitStroke(v, x, y);
                            if (hit) {
                                lastTap = null;
                                e.preventDefault();
                                selectStroke(v, hit);
                                return
                            }
                        }
                        clearStrokeSel();
                        clearSel();
                        if (e.pointerType !== 'touch') {
                            e.preventDefault();
                            startPan(e, ink)
                        }
                        return
                    }
                    clearSel();
                    e.preventDefault();
                    const c = cfg[tool];
                    try {
                        ink.setPointerCapture(e.pointerId)
                    } catch (z) {}
                    const st = {
                        id: uid('s'),
                        tool,
                        color: c.color || '#000',
                        size: c.size,
                        points: [
                            tool === 'pen' ? [x, y, .8] : [x, y]
                        ]
                    };
                    drawing = {
                        v,
                        st,
                        pid: e.pointerId,
                        live: null,
                        raf: 0,
                        pdone: 0,
                        lastT: e.timeStamp,
                        sw: .8
                    };
                    if (tool !== 'eraser') {
                        const lv = document.createElement('canvas');
                        lv.className = 'pdf-live';
                        lv.width = ink.width;
                        lv.height = ink.height;
                        v.wrap.insertBefore(lv, v.objLayer);
                        drawing.live = lv;
                        paintLive()
                    }
                });
                ink.addEventListener('pointermove', e => {
                    if (!drawing || drawing.v !== v || drawing.pid !== e.pointerId) return;
                    const r = ink.getBoundingClientRect(),
                        pts = drawing.st.points,
                        evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
                    for (const q of (evs.length ? evs : [e])) {
                        const x = (q.clientX - r.left) / scale,
                            y = (q.clientY - r.top) / scale,
                            last = pts[pts.length - 1];
                        if (Math.hypot(x - last[0], y - last[1]) > .5) {
                            if (drawing.st.tool === 'pen') {
                                const dt = Math.max(1, (q.timeStamp || e.timeStamp) - drawing.lastT),
                                    sp = Math.hypot(x - last[0], y - last[1]) * scale / dt;
                                drawing.lastT = q.timeStamp || e.timeStamp;
                                let tg = 1 - Math.min(1, Math.max(0, (sp - .15) / 1.6)) * .68;
                                if (q.pointerType === 'pen' && q.pressure > 0 && q.pressure !== .5) tg = tg * .5 + (.25 + .75 * q.pressure) * .5;
                                drawing.sw += (tg - drawing.sw) * .22;
                                pts.push([x, y, +drawing.sw.toFixed(3)])
                            } else pts.push([x, y]);
                            if (drawing.st.tool === 'eraser') {
                                const ctx = ink.getContext('2d'),
                                    a = pts[pts.length - 2],
                                    b = pts[pts.length - 1];
                                drawInkStroke(ctx, {
                                    ...drawing.st,
                                    points: [a, b]
                                }, v.rs || 1)
                            }
                        }
                    }
                    if (drawing.live && !drawing.raf) drawing.raf = requestAnimationFrame(paintLive)
                });
                const finish = e => {
                    if (!drawing || drawing.v !== v || (e && e.pointerId != null && drawing.pid !== e.pointerId)) return;
                    const {
                        st,
                        live
                    } = drawing;
                    if (drawing.raf) cancelAnimationFrame(drawing.raf);
                    if (st.points.length === 1) st.points.push(st.points[0].length > 2 ? [st.points[0][0] + .1, st.points[0][1] + .1, st.points[0][2]] : [st.points[0][0] + .1, st.points[0][1] + .1]);
                    if (st.tool === 'pen' && st.points[0].length > 2) {
                        /* taper the tail like real ink */
                        const P = st.points,
                            n = P.length;
                        [.94, .84, .72, .58, .44, .3].forEach((f, j) => {
                            const q = P[n - 6 + j];
                            if (q && q.length > 2) q[2] = +(q[2] * f).toFixed(3)
                        })
                    }
                    if (live) {
                        drawInkStroke(v.ink.getContext('2d'), st, v.rs || 1);
                        live.remove()
                    } else drawInkStroke(v.ink.getContext('2d'), {
                        ...st,
                        points: st.points.slice(-2)
                    }, v.rs || 1);
                    const l = pageAnn(v.n).strokes;
                    l.push(st);
                    pushH({
                        n: v.n,
                        type: 'stroke',
                        op: 'add',
                        after: structuredClone(st),
                        index: l.length - 1
                    });
                    drawing = null;
                    persist()
                };
                ['pointerup', 'pointercancel'].forEach(k => ink.addEventListener(k, finish))
            }
            let selStroke = null,
                lastTap = null,
                strokeDrag = null;

            function strokeBox(st) {
                let x1 = 1e9,
                    y1 = 1e9,
                    x2 = -1e9,
                    y2 = -1e9;
                for (const p of st.points) {
                    if (p[0] < x1) x1 = p[0];
                    if (p[1] < y1) y1 = p[1];
                    if (p[0] > x2) x2 = p[0];
                    if (p[1] > y2) y2 = p[1]
                }
                const pad = st.size / 2 + 5;
                return {
                    x: x1 - pad,
                    y: y1 - pad,
                    w: x2 - x1 + pad * 2,
                    h: y2 - y1 + pad * 2
                }
            }

            function segDist(px, py, a, b) {
                const dx = b[0] - a[0],
                    dy = b[1] - a[1],
                    l2 = dx * dx + dy * dy;
                let t = l2 ? ((px - a[0]) * dx + (py - a[1]) * dy) / l2 : 0;
                t = Math.max(0, Math.min(1, t));
                return Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy))
            }

            function hitStroke(v, x, y) {
                const list = pageAnn(v.n).strokes,
                    tol = Math.max(8, 14 / scale);
                for (let i = list.length - 1; i >= 0; i--) {
                    const st = list[i];
                    if (st.tool === 'eraser' || !st.points || !st.points.length) continue;
                    const r = st.size / 2 + tol,
                        pts = st.points;
                    if (pts.length === 1) {
                        if (Math.hypot(x - pts[0][0], y - pts[0][1]) <= r) return st;
                        continue
                    }
                    for (let j = 1; j < pts.length; j++)
                        if (segDist(x, y, pts[j - 1], pts[j]) <= r) return st
                }
                return null
            }

            function clearStrokeSel() {
                if (strokeDrag) strokeDrag.cancel();
                if (selStroke) {
                    const v = views[selStroke.n - 1];
                    if (v && v.objLayer) {
                        const e = v.objLayer.querySelector('.pdf-strokesel');
                        if (e) e.remove()
                    }
                    selStroke = null
                }
            }

            function placeStrokeSel(st, el) {
                const b = strokeBox(st),
                    s = el.style;
                s.setProperty('--x', b.x);
                s.setProperty('--y', b.y);
                s.setProperty('--w', b.w);
                s.setProperty('--h', b.h)
            }

            function selectStroke(v, st) {
                clearStrokeSel();
                clearSel();
                selStroke = {
                    n: v.n,
                    id: st.id
                };
                mountStrokeSel(v)
            }

            function mountStrokeSel(v) {
                const st = pageAnn(v.n).strokes.find(x => x.id === selStroke.id);
                if (!st) {
                    selStroke = null;
                    return
                }
                const old = v.objLayer.querySelector('.pdf-strokesel');
                if (old) old.remove();
                const el = document.createElement('div');
                el.className = 'pdf-strokesel';
                el.title = L('Drag to move', 'اسحب للتحريك');
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 'ss-del';
                del.textContent = '×';
                del.title = L('Delete', 'حذف');
                el.appendChild(del);
                placeStrokeSel(st, el);
                v.objLayer.appendChild(el);
                del.addEventListener('pointerdown', e => e.stopPropagation());
                del.addEventListener('click', e => {
                    e.stopPropagation();
                    const list = pageAnn(v.n).strokes,
                        i = list.findIndex(x => x.id === st.id);
                    if (i < 0) return;
                    const before = structuredClone(list[i]);
                    list.splice(i, 1);
                    pushH({
                        n: v.n,
                        type: 'stroke',
                        op: 'del',
                        before,
                        index: i
                    });
                    clearStrokeSel();
                    drawInkAll(v);
                    persist()
                });
                el.addEventListener('pointerdown', e => {
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    if (e.pointerType === 'touch' && (touchDown.size > 1 || !e.isPrimary)) return;
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                        el.setPointerCapture(e.pointerId)
                    } catch (z) {}
                    const orig = structuredClone(st.points),
                        before = structuredClone(st),
                        sx = e.clientX,
                        sy = e.clientY;
                    let moved = false,
                        raf = 0,
                        dx = 0,
                        dy = 0;
                    const put = () => {
                        st.points = orig.map(p => [p[0] + dx, p[1] + dy, ...p.slice(2)]);
                        placeStrokeSel(st, el);
                        drawInkAll(v)
                    };
                    const apply = () => {
                        raf = 0;
                        put()
                    };
                    const mv = q => {
                        if (q.pointerId !== e.pointerId) return;
                        dx = (q.clientX - sx) / scale;
                        dy = (q.clientY - sy) / scale;
                        if (!moved && Math.hypot(dx, dy) * scale < 4) return;
                        moved = true;
                        if (!raf) raf = requestAnimationFrame(apply)
                    };
                    const end = (cancel) => {
                        el.removeEventListener('pointermove', mv);
                        el.removeEventListener('pointerup', up);
                        el.removeEventListener('pointercancel', cn);
                        strokeDrag = null;
                        if (raf) cancelAnimationFrame(raf);
                        if (cancel || !moved) {
                            st.points = orig;
                            placeStrokeSel(st, el);
                            drawInkAll(v);
                            return
                        }
                        put();
                        pushH({
                            n: v.n,
                            type: 'stroke',
                            op: 'mod',
                            before,
                            after: structuredClone(st)
                        });
                        persist()
                    };
                    const up = q => {
                            if (q.pointerId === e.pointerId) end(false)
                        },
                        cn = q => {
                            if (q.pointerId === e.pointerId) end(true)
                        };
                    strokeDrag = {
                        cancel: () => end(true)
                    };
                    el.addEventListener('pointermove', mv);
                    el.addEventListener('pointerup', up);
                    el.addEventListener('pointercancel', cn)
                })
            }
            document.addEventListener('keydown', e => {
                if (!selStroke || !reader.classList.contains('open')) return;
                const t = e.target;
                if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
                if (e.key === 'Escape') {
                    clearStrokeSel();
                    return
                }
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    const v = views[selStroke.n - 1],
                        list = pageAnn(selStroke.n).strokes,
                        i = list.findIndex(x => x.id === selStroke.id);
                    if (i >= 0) {
                        e.preventDefault();
                        const before = structuredClone(list[i]);
                        list.splice(i, 1);
                        pushH({
                            n: selStroke.n,
                            type: 'stroke',
                            op: 'del',
                            before,
                            index: i
                        });
                        clearStrokeSel();
                        if (v) drawInkAll(v);
                        persist()
                    }
                }
            });

            function paintLive() {
                if (!drawing || !drawing.live) return;
                drawing.raf = 0;
                const lv = drawing.live,
                    ctx = lv.getContext('2d');
                if (drawing.st.tool === 'pen' && drawing.st.points[0].length > 2) {
                    drawing.pdone = penVar(ctx, drawing.st, drawing.v.rs || 1, drawing.pdone || 0, false);
                    return
                }
                ctx.clearRect(0, 0, lv.width, lv.height);
                drawInkStroke(ctx, drawing.st, drawing.v.rs || 1)
            }

            const PAL = {
                ink: ['#253b34', '#278f79', '#3478c7', '#d4576e', '#e5a02d', '#7a56b8', '#ffffff'],
                laser: ['#ff2d3d', '#ff8a00', '#ffd400', '#22d36b', '#2a9dff', '#c04bff'],
                hl: ['#f2c230', '#7ddc6a', '#ff7aa8', '#59c3ff', '#ff9c40'],
                paper: ['#fff1b3', '#ffd6e0', '#d6ecff', '#d7f5dc', '#ffe0b8', '#e9dcff'],
                fill: ['#e3f5eb', '#fff1b3', '#d6ecff', '#ffd6e0', '#ffffff']
            };

            function el(tag, cls, html) {
                const e = document.createElement(tag);
                if (cls) e.className = cls;
                if (html != null) e.innerHTML = html;
                return e
            }

            function grp(label, ...nodes) {
                const g = el('span', 'opt-grp');
                if (label) g.appendChild(el('span', 'opt-lab', label));
                nodes.forEach(n => g.appendChild(n));
                return g
            }

            function swatches(list, get, set) {
                const wrap = el('span', 'opt-sw');
                const paint = () => {
                    [...wrap.querySelectorAll('.reader-swatch')].forEach(b => b.classList.toggle('on', b.dataset.c.toLowerCase() === String(get()).toLowerCase()))
                };
                list.forEach(c => {
                    const b = el('button', 'reader-swatch');
                    b.type = 'button';
                    b.dataset.c = c;
                    b.style.background = c;
                    b.title = c;
                    b.onclick = () => {
                        set(c);
                        inp.value = c;
                        paint()
                    };
                    wrap.appendChild(b)
                });
                const inp = el('input');
                inp.type = 'color';
                inp.value = toHex(get());
                inp.oninput = () => {
                    set(inp.value);
                    paint()
                };
                inp.title = L('Custom colour', 'لون مخصص');
                wrap.appendChild(inp);
                paint();
                return wrap
            }

            function toHex(c) {
                return /^#[0-9a-f]{6}$/i.test(c) ? c : '#000000'
            }

            function range(min, max, get, set, fmt) {
                const w = el('span', 'opt-rng'),
                    r = el('input');
                r.type = 'range';
                r.min = min;
                r.max = max;
                r.step = 1;
                r.value = get();
                const lab = el('span', 'opt-val', String(get()));
                r.oninput = () => {
                    set(+r.value);
                    lab.textContent = r.value
                };
                w.append(r, lab);
                return w
            }

            function toggle(text, get, set, title) {
                const b = el('button', 'opt-tg', text);
                b.type = 'button';
                if (title) b.title = title;
                const p = () => b.classList.toggle('on', !!get());
                b.onclick = () => {
                    set(!get());
                    p()
                };
                p();
                return b
            }
            function setProp(mode, key, val) {
                cfg[mode][key] = val;
                saveCfg();
                const o = selObj();
                if (!o || toolOfObj(o) !== mode) return;
                const map = {
                    text: {
                        color: 'color',
                        size: 'fs',
                        bold: 'bold',
                        family: 'family'
                    },
                    sticky: {
                        paper: 'paper',
                        size: 'fs',
                        textColor: 'color'
                    },
                    shape: {
                        stroke: 'stroke',
                        width: 'lw',
                        fill: 'fill',
                        kind: 'shape',
                        textColor: 'color'
                    }
                } [mode];
                let prop = map && map[key];
                if (mode === 'shape' && key === 'fillOn') {
                    prop = 'fill';
                    val = val ? cfg.shape.fill : ''
                }
                if (!prop) return;
                const now = Date.now();
                if (!(lastMod && lastMod.id === o.id && lastMod.key === prop && now - lastMod.t < 900)) {
                    lastMod = {
                        id: o.id,
                        key: prop,
                        t: now,
                        h: {
                            n: sel.n,
                            type: 'object',
                            op: 'mod',
                            before: structuredClone(o),
                            after: null
                        }
                    };
                    pushH(lastMod.h)
                }
                lastMod.t = now;
                o[prop] = val;
                lastMod.h.after = structuredClone(o);
                const e = objElOf(o.id);
                if (e) applyObjStyle(e, o);
                persist()
            }

            function buildOptions() {
                const box = $('#nr-options');
                if (!box) return;
                const o = selObj(),
                    mode = o ? toolOfObj(o) : tool;
                box.replaceChildren();
                reader.dataset.panel = mode;
                $$('[data-pdf-tool]').forEach(b => b.classList.toggle('has-sel', !!o && b.dataset.pdfTool === mode));
                if (mode === 'pan') {
                    box.hidden = true;
                    closeMenu();
                    return
                }
                box.hidden = false;
                const names = {
                    pen: L('Pen', 'القلم'),
                    highlighter: L('Highlighter', 'التظليل'),
                    eraser: L('Eraser', 'الممحاة'),
                    text: L('Text', 'النص'),
                    sticky: L('Sticky note', 'الملصق'),
                    shape: L('Shape', 'الشكل'),
                    laser: L('Laser pointer', 'مؤشر الليزر')
                };
                const c = cfg[mode],
                    cur = (key, prop) => o && o[prop] != null ? o[prop] : c[key];
                box.appendChild(el('span', 'opt-title' + (o ? ' is-sel' : ''), (o ? L('Selected · ', 'المحدد · ') : '') + names[mode]));
                const add = n => box.appendChild(n);
                if (mode === 'laser') {
                    add(grp(L('Colour', 'اللون'), swatches(PAL.laser, () => c.color, v => setProp('laser', 'color', v))));
                    add(grp(L('Size', 'الحجم'), range(6, 40, () => c.size, v => setProp('laser', 'size', v))));
                    add(toggle(L('Trail', 'الأثر'), () => c.trail !== false, v => setProp('laser', 'trail', v)))
                } else if (mode === 'pen') {
                    add(grp(L('Colour', 'اللون'), swatches(PAL.ink, () => c.color, v => setProp('pen', 'color', v))));
                    add(grp(L('Size', 'الحجم'), range(1, 28, () => c.size, v => setProp('pen', 'size', v))))
                } else if (mode === 'highlighter') {
                    add(grp(L('Colour', 'اللون'), swatches(PAL.hl, () => c.color, v => setProp('highlighter', 'color', v))));
                    add(grp(L('Size', 'الحجم'), range(6, 96, () => c.size, v => setProp('highlighter', 'size', v))))
                } else if (mode === 'eraser') {
                    add(grp(L('Size', 'الحجم'), range(6, 160, () => c.size, v => setProp('eraser', 'size', v))));
                    const cb = el('button', 'opt-clear', '');
                    cb.type = 'button';
                    cb.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5"/></svg><span>' + L('Clear this session’s edits', 'مسح تعديلات هذه الجلسة') + '</span>';
                    cb.onclick = () => {
                        closeMenu();
                        $('#nr-clear').click()
                    };
                    add(cb)
                } else if (mode === 'text') {
                    add(grp(L('Text colour', 'لون النص'), swatches(PAL.ink, () => cur('color', 'color'), v => setProp('text', 'color', v))));
                    add(grp(L('Font size', 'حجم الخط'), range(8, 192, () => cur('size', 'fs'), v => setProp('text', 'size', v))));
                    const seg = el('span', 'opt-seg');
                    [
                        ['sans', L('Sans', 'عادي'), 'system-ui,sans-serif'],
                        ['serif', L('Serif', 'مزخرف'), 'Georgia,serif'],
                        ['mono', L('Mono', 'ثابت'), 'ui-monospace,Menlo,monospace']
                    ].forEach(([k, t, ff]) => {
                        const b = el('button', 'opt-sg', '');
                        b.type = 'button';
                        b.innerHTML = `<b style="font-family:${ff}">Aa</b><small>${t}</small>`;
                        b.classList.toggle('on', cur('family', 'family') === k);
                        b.onclick = () => {
                            setProp('text', 'family', k);
                            seg.querySelectorAll('.opt-sg').forEach(x => x.classList.toggle('on', x === b))
                        };
                        seg.appendChild(b)
                    });
                    add(grp(L('Font', 'الخط'), seg));
                    add(toggle('B', () => cur('bold', 'bold'), v => setProp('text', 'bold', v), L('Bold', 'عريض')))
                } else if (mode === 'sticky') {
                    add(grp(L('Paper', 'لون الورقة'), swatches(PAL.paper, () => cur('paper', 'paper'), v => setProp('sticky', 'paper', v))));
                    add(grp(L('Text colour', 'لون النص'), swatches(PAL.ink, () => cur('textColor', 'color'), v => setProp('sticky', 'textColor', v))));
                    add(grp(L('Font size', 'حجم الخط'), range(9, 96, () => cur('size', 'fs'), v => setProp('sticky', 'size', v))))
                } else if (mode === 'shape') {
                    add(grp(L('Outline', 'الحدود'), swatches(PAL.ink, () => cur('stroke', 'stroke'), v => setProp('shape', 'stroke', v))));
                    add(grp(L('Thickness', 'السمك'), range(1, 24, () => cur('width', 'lw'), v => setProp('shape', 'width', v))));

                    add(grp(L('Fill', 'التعبئة'), swatches(PAL.fill, () => cur('fill', 'fill'), v => {
                        c.fillOn = true;
                        setProp('shape', 'fill', v);
                        if (!o) saveCfg()
                    })));
                    add(toggle(L('No fill', 'بدون تعبئة'), () => o ? !o.fill : !c.fillOn, v => {
                        if (o) {
                            setProp('shape', 'fillOn', !v)
                        } else {
                            c.fillOn = !v;
                            saveCfg()
                        }
                    }));
                    add(grp(L('Text colour', 'لون النص'), swatches(PAL.ink, () => cur('textColor', 'color'), v => setProp('shape', 'textColor', v))))
                }
                if (menuFor) requestAnimationFrame(placeMenu)
            }

            /* ---------- dropdown menu that hangs from the tool button ---------- */
            function placeMenu() {
                if (!menuFor || menuEl.hidden) return;
                const r = menuFor.getBoundingClientRect(),
                    mw = menuEl.offsetWidth,
                    mh = menuEl.offsetHeight,
                    vw = window.innerWidth,
                    vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                let left = r.left + r.width / 2 - mw / 2;
                left = Math.max(8, Math.min(vw - mw - 8, left));
                let top = r.bottom + 12,
                    up = false;
                if (top + mh > vh - 8 && r.top - mh - 12 > 8) {
                    top = r.top - mh - 12;
                    up = true
                }
                menuEl.classList.toggle('up', up);
                menuEl.style.left = left + 'px';
                menuEl.style.top = Math.max(8, top) + 'px';
                menuEl.style.setProperty('--ax', Math.max(18, Math.min(mw - 18, r.left + r.width / 2 - left)) + 'px')
            }

            function openMenu(anchor) {
                menuFor = anchor;
                buildOptions();
                menuFor = anchor;
                menuEl.hidden = false;
                $$('[data-pdf-tool]').forEach(b => {
                    b.classList.toggle('menu-open', b === anchor);
                    b.setAttribute('aria-expanded', b === anchor)
                });
                placeMenu();
                requestAnimationFrame(() => {
                    placeMenu();
                    menuEl.classList.add('in')
                })
            }

            function closeMenu() {
                if (!menuEl) return;
                menuFor = null;
                menuEl.classList.remove('in');
                menuEl.hidden = true;
                $$('[data-pdf-tool]').forEach(b => {
                    b.classList.remove('menu-open');
                    b.setAttribute('aria-expanded', 'false')
                })
            }
            /* the little coloured line under a tool's icon = its current colour */
            function paintTools() {
                const C = {
                    pen: () => cfg.pen.color,
                    highlighter: () => cfg.highlighter.color,
                    eraser: () => 'currentColor',
                    text: () => cfg.text.color,
                    sticky: () => cfg.sticky.paper,
                    shape: () => cfg.shape.stroke,
                    laser: () => cfg.laser.color
                };
                $$('[data-pdf-tool]').forEach(b => {
                    const f = C[b.dataset.pdfTool];
                    b.classList.toggle('has-menu', !!f);
                    if (f) b.style.setProperty('--tc', f())
                })
            }

            function syncShapeButtons(kind) {
                $$('[data-pdf-shape]').forEach(b => b.classList.toggle('active', b.dataset.pdfShape === kind))
            }

            function setTool(t) {
                closeMenu();
                clearStrokeSel();
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) ae.blur();
                tool = t;
                sel = null;
                $$('.pdf-obj.sel').forEach(x => x.classList.remove('sel'));
                reader.dataset.tool = t;
                if (t !== 'laser') laserStop();
                brush.style.display = 'none';
                $$('[data-pdf-tool]').forEach(b => b.classList.toggle('active', b.dataset.pdfTool === t));
                $('#nr-shapes').classList.toggle('open', t === 'shape');
                syncShapeButtons(cfg.shape.kind);
                buildOptions()
            }
            $$('[data-pdf-tool]').forEach(b => b.addEventListener('click', () => {
                const t = b.dataset.pdfTool,
                    o = selObj();
                if (t === 'pan') {
                    closeMenu();
                    setTool(t);
                    return
                }
                if (menuFor === b) {
                    closeMenu();
                    return
                }
                if (tool === t || (o && toolOfObj(o) === t)) {
                    openMenu(b);
                    return
                }
                setTool(t)
            }));
            reader.addEventListener('pointerdown', e => {
                if (!menuFor) return;
                if (e.target.closest('#nr-menu,[data-pdf-tool]')) return;
                closeMenu()
            }, true);
            reader.addEventListener('keydown', e => {
                if (e.key === 'Escape' && menuFor) {
                    e.stopPropagation();
                    closeMenu()
                }
            }, true);
            window.addEventListener('resize', placeMenu);
            new MutationObserver(() => {
                if (!reader.classList.contains('open')) closeMenu()
            }).observe(reader, {
                attributes: true,
                attributeFilter: ['class']
            });
            paintTools();
            $$('[data-pdf-shape]').forEach(b => b.addEventListener('click', () => {
                const k = b.dataset.pdfShape;
                cfg.shape.kind = k;
                saveCfg();
                const o = selObj();
                if (o && o.type === 'shape') setProp('shape', 'kind', k);
                else if (tool !== 'shape') setTool('shape');
                syncShapeButtons(k)
            }));
            $$('.reader-tools button,.reader-shapes button,.reader-head button').forEach(b => b.addEventListener('pointerdown', e => {
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) e.preventDefault()
            }));

            const brush = document.createElement('div');
            brush.id = 'nr-brush';
            reader.appendChild(brush);

            function brushUpdate(e) {
                const t = tool,
                    tg = e.target;
                if (!(t === 'pen' || t === 'highlighter' || t === 'eraser') || !tg.classList || !tg.classList.contains('pdf-ink') || (e.pointerType === 'touch' && !drawing)) {
                    brush.style.display = 'none';
                    return
                }
                const c = cfg[t],
                    d = Math.max(t === 'eraser' ? 10 : 6, c.size * scale);
                brush.dataset.t = t;
                brush.style.display = 'block';
                brush.style.width = brush.style.height = d + 'px';
                brush.style.transform = 'translate(' + (e.clientX - d / 2) + 'px,' + (e.clientY - d / 2) + 'px)';
                brush.style.setProperty('--bc', c.color || '#000')
            }
            scroller.addEventListener('pointermove', brushUpdate);
            scroller.addEventListener('pointerdown', brushUpdate);
            scroller.addEventListener('pointerleave', () => {
                brush.style.display = 'none'
            });
            ['pointerup', 'pointercancel'].forEach(k => scroller.addEventListener(k, e => {
                if (e.pointerType === 'touch') brush.style.display = 'none'
            }));
            function applyLang() {
                const names = isAr() ? {
                    pan: 'تحريك الصفحة',
                    pen: 'القلم',
                    highlighter: 'التظليل',
                    eraser: 'الممحاة',
                    text: 'مربع نص',
                    sticky: 'ملصق',
                    shape: 'الأشكال',
                    laser: 'الليزر'
                } : {
                    pan: 'Hand',
                    pen: 'Pen',
                    highlighter: 'Highlight',
                    eraser: 'Erase',
                    text: 'Text',
                    sticky: 'Sticky',
                    shape: 'Shapes',
                    laser: 'Laser'
                };
                $$('[data-pdf-tool]').forEach(b => {
                    const l = names[b.dataset.pdfTool];
                    if (l) {
                        b.title = l;
                        b.setAttribute('aria-label', l);
                        const s = b.querySelector('.tool-label');
                        if (s) s.textContent = l
                    }
                });
                $('#nr-undo').title = L('Undo', 'تراجع');
                $('#nr-redo').title = L('Redo', 'إعادة');
                $('#nr-minus').title = L('Zoom out', 'تصغير');
                $('#nr-plus').title = L('Zoom in', 'تكبير');
                $('#nr-zoom').title = L('Fit width / 100%', 'ملاءمة العرض / 100%');
                $('#nr-download').title = L('Download original file', 'تنزيل الملف الأصلي');
                $('#nr-export').textContent = L('Export PDF', 'تصدير PDF');
                $('#nr-close').title = L('Back to library', 'العودة للمكتبة');
                $('#nr-clear').title = L('Clear this session’s edits', 'مسح تعديلات هذه الجلسة');
                $('#nr-clear-l').textContent = L('Clear', 'مسح');
                const SH = isAr() ? {
                    rect: 'مستطيل',
                    round: 'دائري',
                    circle: 'دائرة',
                    triangle: 'مثلث',
                    speech: 'فقاعة'
                } : {
                    rect: 'Rectangle',
                    round: 'Rounded',
                    circle: 'Circle',
                    triangle: 'Triangle',
                    speech: 'Callout'
                };
                $$('[data-pdf-shape]').forEach(b => {
                    const t = SH[b.dataset.pdfShape],
                        sp = b.querySelector('span');
                    if (t && sp) sp.textContent = t
                });
                note('');
                buildOptions()
            }
            window.addEventListener('novix:lang', applyLang);

            $('#nr-undo').onclick = doUndo;
            $('#nr-redo').onclick = doRedo;
            $('#nr-clear').onclick = async () => {
                if (fileId == null) return;
                if (annSig(ann) === annSig(sessionBase)) {
                    note(L('No edits in this session to clear', 'لا توجد تعديلات في هذه الجلسة لمسحها'));
                    return
                }
                const yes = window.NX_confirm ? await NX_confirm({
                    title: L('Clear this session’s edits?', 'مسح تعديلات هذه الجلسة؟'),
                    msg: L('Only what you drew or wrote since you opened this document will be removed. Earlier saved annotations stay.', 'سيُحذف فقط ما رسمته أو كتبته منذ فتحك لهذا المستند. التعليقات المحفوظة سابقًا تبقى كما هي.'),
                    ok: L('Clear', 'مسح'),
                    danger: true
                }) : confirm(L('Clear this session’s edits?', 'مسح تعديلات هذه الجلسة؟'));
                if (!yes) return;
                ann = JSON.parse(JSON.stringify(sessionBase));
                undo = [];
                redo = [];
                sel = null;
                updHist();
                persist(true);
                views.forEach(v => {
                    if (v.mounted) {
                        drawInkAll(v);
                        renderObjects(v)
                    }
                });
                buildOptions()
            };
            reader.addEventListener('keydown', e => {
                const inText = e.target && e.target.classList && e.target.classList.contains('pdf-obj-text');
                if (inText || (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName))) return;
                if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
                    e.preventDefault();
                    doUndo()
                } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
                    e.preventDefault();
                    doRedo()
                } else if ((e.key === 'Delete' || e.key === 'Backspace') && sel) {
                    const v = views[sel.n - 1],
                        o = selObj();
                    if (v && o) {
                        e.preventDefault();
                        deleteObj(v, o)
                    }
                } else if (e.key === 'Escape') {
                    if (sel) clearSel();
                    else closeReader()
                }
            });
            reader.tabIndex = -1;

            async function getFile(id, cb) {
                return window.NXSTORE.get(id, cb)
            }
            let workerState = null;
            const NX_PDF_WORKER = 'assets/js/pdf.worker.js';

            function loadFakeWorker() {
                return new Promise(res => {
                    if (window.pdfjsWorker) {
                        res();
                        return
                    }
                    const sc = document.createElement('script');
                    sc.src = NX_PDF_WORKER;
                    sc.onload = sc.onerror = () => res();
                    document.head.appendChild(sc)
                })
            }
            async function getWorker() {
                if (workerState !== null) return workerState || undefined;
                try {
                    let src = '';
                    try {
                        const r = await fetch(NX_PDF_WORKER);
                        if (r.ok) src = await r.text()
                    } catch (e) {}
                    if (!src || typeof Worker === 'undefined') {
                        await loadFakeWorker();
                        workerState = false;
                        return undefined
                    }
                    const w = new Worker(URL.createObjectURL(new Blob([src], {
                        type: 'text/javascript'
                    })));
                    const ok = await new Promise(res => {
                        let done = false;
                        w.onerror = () => {
                            if (!done) {
                                done = true;
                                res(false)
                            }
                        };
                        setTimeout(() => {
                            if (!done) {
                                done = true;
                                res(true)
                            }
                        }, 60)
                    });
                    if (!ok) {
                        try {
                            w.terminate()
                        } catch (e) {}
                        await loadFakeWorker();
                        workerState = false;
                        return undefined
                    }
                    workerState = new window.pdfjsLib.PDFWorker({
                        port: w
                    });
                    return workerState
                } catch (e) {
                    await loadFakeWorker();
                    workerState = false;
                    return undefined
                }
            }
            setTimeout(() => {
                if (window.pdfjsLib) getWorker()
            }, 300);
            const NXPDF = (() => {
                const WS = new Uint8Array(256),
                    DL = new Uint8Array(256);
                for (const c of ' \t\r\n\f\0') WS[c.charCodeAt(0)] = 1;
                for (const c of '()<>[]{}/%') DL[c.charCodeAt(0)] = 1;
                class Eof extends Error {}
                class Ref {
                    constructor(n, g) {
                        this.n = n;
                        this.g = g
                    }
                }
                class Name {
                    constructor(v) {
                        this.v = v
                    }
                }
                class Raw {
                    constructor(u) {
                        this.u = u
                    }
                }
                class Kw {
                    constructor(v) {
                        this.v = v
                    }
                }
                const dec = u => {
                    let s = '';
                    for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]);
                    return s
                };
                const isInt = v => typeof v === 'number' && Number.isInteger(v);

                function P(b, p, final) {
                    this.b = b;
                    this.p = p || 0;
                    this.final = !!final
                }
                P.prototype.skip = function() {
                    const b = this.b;
                    while (this.p < b.length) {
                        const c = b[this.p];
                        if (WS[c]) this.p++;
                        else if (c === 37) {
                            while (this.p < b.length && b[this.p] !== 10 && b[this.p] !== 13) this.p++
                        } else return
                    }
                };
                P.prototype.need = function() {
                    if (this.p >= this.b.length) throw new Eof()
                };
                P.prototype.name = function() {
                    const b = this.b;
                    let s = '';
                    while (this.p < b.length && !WS[b[this.p]] && !DL[b[this.p]]) {
                        let c = b[this.p++];
                        if (c === 35 && this.p + 1 < b.length) {
                            const h = parseInt(String.fromCharCode(b[this.p], b[this.p + 1]), 16);
                            if (!isNaN(h)) {
                                c = h;
                                this.p += 2
                            }
                        }
                        s += String.fromCharCode(c)
                    }
                    if (this.p >= b.length && !this.final) throw new Eof();
                    return s
                };
                P.prototype.obj = function() {
                    this.skip();
                    this.need();
                    const b = this.b,
                        c = b[this.p];
                    if (c === 47) {
                        this.p++;
                        return new Name(this.name())
                    }
                    if (c === 60) {
                        if (b[this.p + 1] === 60) {
                            this.p += 2;
                            const d = Object.create(null);
                            for (;;) {
                                this.skip();
                                this.need();
                                if (b[this.p] === 62) {
                                    if (this.p + 1 >= b.length) throw new Eof();
                                    if (b[this.p + 1] === 62) {
                                        this.p += 2;
                                        return d
                                    }
                                }
                                const k = this.obj();
                                if (!(k instanceof Name)) throw new Error('bad dict');
                                d[k.v] = this.obj()
                            }
                        }
                        const s = this.p;
                        while (this.p < b.length && b[this.p] !== 62) this.p++;
                        if (this.p >= b.length) throw new Eof();
                        this.p++;
                        return new Raw(b.slice(s, this.p))
                    }
                    if (c === 91) {
                        this.p++;
                        const a = [];
                        for (;;) {
                            this.skip();
                            this.need();
                            if (b[this.p] === 93) {
                                this.p++;
                                return a
                            }
                            a.push(this.obj())
                        }
                    }
                    if (c === 40) {
                        const s = this.p;
                        let depth = 0;
                        for (;;) {
                            if (this.p >= b.length) throw new Eof();
                            const x = b[this.p++];
                            if (x === 92) this.p++;
                            else if (x === 40) depth++;
                            else if (x === 41 && --depth === 0) break
                        }
                        return new Raw(b.slice(s, this.p))
                    }
                    if (c === 41 || c === 62 || c === 93 || c === 123 || c === 125) throw new Error('unexpected delimiter');
                    const s = this.p;
                    while (this.p < b.length && !WS[b[this.p]] && !DL[b[this.p]]) this.p++;
                    if (this.p >= b.length && !this.final) throw new Eof();
                    const t = dec(b.subarray(s, this.p));
                    if (/^[+-]?\d+$/.test(t)) {
                        const n = parseInt(t, 10);
                        if (n >= 0 && !/^[+-]/.test(t)) {
                            const save = this.p;
                            this.skip();
                            const s2 = this.p;
                            while (this.p < b.length && b[this.p] >= 48 && b[this.p] <= 57) this.p++;
                            if (this.p > s2 && this.p < b.length) {
                                const g = parseInt(dec(b.subarray(s2, this.p)), 10);
                                this.skip();
                                if (b[this.p] === 82 && (this.p + 1 >= b.length || WS[b[this.p + 1]] || DL[b[this.p + 1]])) {
                                    this.p++;
                                    return new Ref(n, g)
                                }
                            } else if (this.p >= b.length && !this.final && this.p > s2) throw new Eof();
                            this.p = save
                        }
                        return n
                    }
                    if (/^[+-]?(\d+\.\d*|\.\d+)$/.test(t)) return parseFloat(t);
                    if (t === 'true') return true;
                    if (t === 'false') return false;
                    if (t === 'null') return null;
                    return new Kw(t)
                };
                const num = (v, d) => typeof v === 'number' ? v : d;
                async function inflate(u8) {
                    const s = new Blob([u8]).stream().pipeThrough(new DecompressionStream('deflate'));
                    return new Uint8Array(await new Response(s).arrayBuffer())
                }

                function unpredict(u8, parms) {
                    const pr = num(parms && parms.Predictor, 1);
                    if (pr < 10) return u8;
                    const cols = num(parms.Columns, 1),
                        colors = num(parms.Colors, 1),
                        bpc = num(parms.BitsPerComponent, 8),
                        bpp = Math.max(1, colors * bpc >> 3),
                        rb = Math.ceil(cols * colors * bpc / 8),
                        rows = Math.floor(u8.length / (rb + 1)),
                        out = new Uint8Array(rows * rb);
                    for (let r = 0; r < rows; r++) {
                        const f = u8[r * (rb + 1)],
                            so = r * (rb + 1) + 1,
                            d = r * rb,
                            pd = d - rb;
                        for (let i = 0; i < rb; i++) {
                            const x = u8[so + i],
                                a = i >= bpp ? out[d + i - bpp] : 0,
                                b = r ? out[pd + i] : 0,
                                c = (r && i >= bpp) ? out[pd + i - bpp] : 0;
                            let v;
                            switch (f) {
                                case 0:
                                    v = x;
                                    break;
                                case 1:
                                    v = x + a;
                                    break;
                                case 2:
                                    v = x + b;
                                    break;
                                case 3:
                                    v = x + ((a + b) >> 1);
                                    break;
                                case 4: {
                                    const p = a + b - c,
                                        pa = Math.abs(p - a),
                                        pb = Math.abs(p - b),
                                        pc = Math.abs(p - c);
                                    v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
                                    break
                                }
                                default:
                                    v = x
                            }
                            out[d + i] = v & 255
                        }
                    }
                    return out
                }
                class Lite {
                    constructor(f) {
                        this.f = f;
                        this.xref = new Map();
                        this.cache = new Map();
                        this.os = new Map();
                        this.trailer = null
                    }
                    async read(a, b) {
                        return new Uint8Array(await this.f.slice(Math.max(0, a), Math.min(this.f.size, b)).arrayBuffer())
                    }
                    async parseAt(off) {
                        let size = 8192;
                        for (;;) {
                            const end = Math.min(this.f.size, off + size),
                                b = await this.read(off, end),
                                final = end >= this.f.size;
                            try {
                                const p = new P(b, 0, final),
                                    n = p.obj(),
                                    g = p.obj(),
                                    kw = p.obj();
                                if (!isInt(n) || !(kw instanceof Kw) || kw.v !== 'obj') throw new Error('bad object header');
                                const val = p.obj();
                                p.skip();
                                let stream = null;
                                if (b[p.p] === 115 && dec(b.subarray(p.p, p.p + 6)) === 'stream') {
                                    let q = p.p + 6;
                                    if (b[q] === 13 && b[q + 1] === 10) q += 2;
                                    else if (b[q] === 10 || b[q] === 13) q++;
                                    stream = {
                                        start: off + q
                                    }
                                }
                                return {
                                    n,
                                    g,
                                    val,
                                    stream
                                }
                            } catch (e) {
                                if (e instanceof Eof && !final) {
                                    size *= 4;
                                    continue
                                }
                                throw e
                            }
                        }
                    }
                    async resolve(v) {
                        let i = 0;
                        while (v instanceof Ref && i++ < 20) v = (await this.get(v.n)).val;
                        return v
                    }
                    async get(n) {
                        if (this.cache.has(n)) return this.cache.get(n);
                        const e = this.xref.get(n);
                        if (!e) return {
                            val: null
                        };
                        let o;
                        if (e.t === 1) {
                            o = await this.parseAt(e.off);
                            if (o.n !== n) throw new Error('xref points to the wrong object')
                        } else {
                            o = await this.fromObjStm(e.stm, n)
                        }
                        if (this.cache.size > 4000) this.cache.clear();
                        this.cache.set(n, o);
                        return o
                    }
                    async streamLen(o) {
                        let len = await this.resolve(o.val.Length);
                        const s = o.stream.start;
                        if (isInt(len)) {
                            const t = await this.read(s + len, s + len + 16);
                            if (/^\s*endstream/.test(dec(t))) return len
                        }
                        let pos = s;
                        for (;;) {
                            const ch = await this.read(pos, pos + (4 << 20));
                            if (!ch.length) throw new Error('stream without end');
                            const i = dec(ch).indexOf('endstream');
                            if (i >= 0) {
                                let e = pos + i;
                                const bb = await this.read(e - 2, e);
                                if (bb[1] === 10) e--;
                                if (bb[1] === 10 && bb[0] === 13) e--;
                                else if (bb[1] === 13) e--;
                                return e - s
                            }
                            pos += ch.length - 9;
                            if (pos >= this.f.size) throw new Error('stream without end')
                        }
                    }
                    async decodeStream(o) {
                        const raw = await this.read(o.stream.start, o.stream.start + await this.streamLen(o));
                        let fl = await this.resolve(o.val.Filter),
                            pm = await this.resolve(o.val.DecodeParms);
                        fl = fl == null ? [] : Array.isArray(fl) ? fl : [fl];
                        if (Array.isArray(pm)) pm = pm[0];
                        let data = raw;
                        for (const x of fl) {
                            const nm = (await this.resolve(x)).v;
                            if (nm === 'FlateDecode' || nm === 'Fl') {
                                data = await inflate(data);
                                const p = pm && await this.resolve(pm);
                                if (p) {
                                    const pp = Object.create(null);
                                    for (const k in p) pp[k] = await this.resolve(p[k]);
                                    data = unpredict(data, pp)
                                }
                            } else throw new Error('unsupported stream filter ' + nm)
                        }
                        return data
                    }
                    async fromObjStm(sn, n) {
                        let c = this.os.get(sn);
                        if (!c) {
                            const o = await this.get(sn);
                            if (!o.stream) throw new Error('bad object stream');
                            const data = await this.decodeStream(o),
                                N = await this.resolve(o.val.N),
                                First = await this.resolve(o.val.First),
                                p = new P(data, 0, true),
                                idx = [];
                            for (let i = 0; i < N; i++) idx.push([p.obj(), p.obj()]);
                            c = {
                                data,
                                First,
                                idx
                            };
                            if (this.os.size > 6) this.os.clear();
                            this.os.set(sn, c)
                        }
                        const i = c.idx.findIndex(x => x[0] === n);
                        if (i < 0) return {
                            val: null
                        };
                        return {
                            n,
                            val: new P(c.data, c.First + c.idx[i][1], true).obj()
                        }
                    }
                    async load() {
                        if (this.f.size < 32) throw new Error('file too small');
                        const tail = await this.read(this.f.size - 4096, this.f.size),
                            m = [...dec(tail).matchAll(/startxref\s+(\d+)/g)].pop();
                        if (!m) throw new Error('startxref not found');
                        const seen = new Set(),
                            todo = [+m[1]];
                        while (todo.length) {
                            const off = todo.shift();
                            if (seen.has(off) || off < 0 || off >= this.f.size) continue;
                            seen.add(off);
                            const t = await this.xrefSection(off);
                            if (!this.trailer) this.trailer = t;
                            if (isInt(t.XRefStm)) todo.unshift(t.XRefStm);
                            if (isInt(t.Prev)) todo.push(t.Prev)
                        }
                        if (!this.trailer || !this.trailer.Root) throw new Error('no document root');
                        if (this.trailer.Encrypt) throw new Error('encrypted');
                        const root = await this.resolve(this.trailer.Root),
                            pages = await this.resolve(root.Pages);
                        this.pages = root.Pages;
                        this.numPages = num(await this.resolve(pages.Count), 0);
                        if (!this.numPages) throw new Error('no pages')
                    }
                    async xrefSection(off) {
                        let head = dec(await this.read(off, off + 32));
                        if (/^\s*xref/.test(head)) return this.xrefTable(off);
                        const o = await this.parseAt(off);
                        if (!o.stream || !o.val) throw new Error('bad xref');
                        const d = o.val,
                            data = await this.decodeStream(o),
                            W = (await this.resolve(d.W)).map(x => x | 0),
                            size = num(await this.resolve(d.Size), 0);
                        let idx = await this.resolve(d.Index);
                        idx = idx && idx.length ? idx : [0, size];
                        const rl = W[0] + W[1] + W[2];
                        let p = 0;
                        const rd = w => {
                            let v = 0;
                            for (let i = 0; i < w; i++) v = v * 256 + data[p++];
                            return v
                        };
                        for (let k = 0; k < idx.length; k += 2) {
                            for (let i = 0; i < idx[k + 1] && p + rl <= data.length; i++) {
                                const num_ = idx[k] + i,
                                    t = W[0] ? rd(W[0]) : 1,
                                    a = rd(W[1]),
                                    b = rd(W[2]);
                                if (!this.xref.has(num_)) {
                                    if (t === 1) this.xref.set(num_, {
                                        t: 1,
                                        off: a
                                    });
                                    else if (t === 2) this.xref.set(num_, {
                                        t: 2,
                                        stm: a,
                                        idx: b
                                    });
                                    else this.xref.set(num_, null)
                                }
                            }
                        }
                        const out = Object.create(null);
                        for (const k of ['Root', 'Encrypt', 'Prev', 'Size', 'Info'])
                            if (d[k] != null) out[k] = d[k];
                        return out
                    }
                    async xrefTable(off) {
                        let size = 1 << 20;
                        for (;;) {
                            const end = Math.min(this.f.size, off + size),
                                b = await this.read(off, end),
                                final = end >= this.f.size;
                            try {
                                const p = new P(b, 0, final);
                                p.skip();
                                if (dec(b.subarray(p.p, p.p + 4)) !== 'xref') throw new Error('bad xref');
                                p.p += 4;
                                const pend = [];
                                for (;;) {
                                    p.skip();
                                    p.need();
                                    if (b[p.p] === 116) {
                                        const kw = p.obj();
                                        if (!(kw instanceof Kw) || kw.v !== 'trailer') throw new Error('bad xref');
                                        break
                                    }
                                    const start = p.obj(),
                                        count = p.obj();
                                    if (!isInt(start) || !isInt(count)) throw new Error('bad xref subsection');
                                    for (let i = 0; i < count; i++) {
                                        const a = p.obj(),
                                            g = p.obj(),
                                            k = p.obj();
                                        if (!(k instanceof Kw)) throw new Error('bad xref entry');
                                        pend.push([start + i, k.v === 'n' ? a : -1])
                                    }
                                }
                                const t = p.obj();
                                for (const [n, a] of pend)
                                    if (!this.xref.has(n)) this.xref.set(n, a >= 0 ? {
                                        t: 1,
                                        off: a
                                    } : null);
                                const out = Object.create(null);
                                for (const k in t) out[k] = t[k];
                                for (const k of ['Prev', 'XRefStm', 'Size']) {
                                    const v = await this.resolve(out[k]);
                                    if (v != null) out[k] = v
                                }
                                return out
                            } catch (e) {
                                if (e instanceof Eof && !final) {
                                    size *= 4;
                                    continue
                                }
                                throw e
                            }
                        }
                    }
                    async pageNode(n) {
                        let node = this.pages,
                            idx = n - 1;
                        const inh = Object.create(null);
                        for (let guard = 0; guard < 64; guard++) {
                            const d = await this.resolve(node);
                            for (const k of ['Resources', 'MediaBox', 'CropBox', 'Rotate'])
                                if (d[k] != null) inh[k] = d[k];
                            const kids = await this.resolve(d.Kids);
                            if (!Array.isArray(kids)) return {
                                dict: d,
                                inh
                            };
                            let next = null;
                            for (const k of kids) {
                                const kd = await this.resolve(k);
                                if (kd && (kd.Kids != null || (kd.Type && kd.Type.v === 'Pages'))) {
                                    const c = num(await this.resolve(kd.Count), 0);
                                    if (idx < c) {
                                        next = k;
                                        break
                                    }
                                    idx -= c
                                } else {
                                    if (idx === 0) return {
                                        dict: kd,
                                        inh: {
                                            ...inh
                                        }
                                    };
                                    idx--
                                }
                            }
                            if (!next) throw new Error('page ' + n + ' not found');
                            node = next
                        }
                        throw new Error('page tree too deep')
                    }
                    async pageBlob(n) {
                        const pn = await this.pageNode(n),
                            page = Object.create(null);
                        for (const k in pn.dict) page[k] = pn.dict[k];
                        for (const k in pn.inh)
                            if (page[k] == null) page[k] = pn.inh[k];
                        for (const k of ['Parent', 'Annots', 'Thumb', 'StructParents', 'B', 'AA', 'Metadata', 'PieceInfo', 'Tabs']) delete page[k];
                        page.Type = new Name('Page');
                        const map = new Map(),
                            queue = [];
                        let next = 4;
                        const enc = s => s.replace(/[^!-~]|[#()<>\[\]{}\/%]/g, c => '#' + c.charCodeAt(0).toString(16).padStart(2, '0'));
                        const ser = (v, out) => {
                            if (v instanceof Ref) {
                                let m = map.get(v.n);
                                if (!m) {
                                    m = next++;
                                    map.set(v.n, m);
                                    queue.push(v.n)
                                }
                                out.push(m + ' 0 R')
                            } else if (v instanceof Name) out.push('/' + enc(v.v));
                            else if (v instanceof Raw) out.push(v.u);
                            else if (Array.isArray(v)) {
                                out.push('[');
                                v.forEach((x, i) => {
                                    if (i) out.push(' ');
                                    ser(x, out)
                                });
                                out.push(']')
                            } else if (typeof v === 'number') out.push(Number.isInteger(v) ? String(v) : v.toFixed(6).replace(/0+$/, '').replace(/\.$/, ''));
                            else if (typeof v === 'boolean') out.push(String(v));
                            else if (v === null || v === undefined) out.push('null');
                            else if (v instanceof Kw) out.push(v.v);
                            else if (typeof v === 'object') {
                                out.push('<<');
                                for (const k in v) {
                                    if (k === 'Parent' || v[k] === undefined) continue;
                                    out.push('/' + enc(k) + ' ');
                                    ser(v[k], out);
                                    out.push(' ')
                                }
                                out.push('>>')
                            }
                        };
                        const parts = [],
                            offs = [];
                        let pos = 0;
                        const add = a => {
                            for (const c of a) {
                                pos += typeof c === 'string' ? c.length : c.size !== undefined ? c.size : c.length;
                                parts.push(c)
                            }
                        };
                        add(['%PDF-1.7\n', new Uint8Array([37, 226, 227, 207, 211, 10])]);
                        const objOut = (num_, body) => {
                            offs[num_] = pos;
                            add([num_ + ' 0 obj\n']);
                            add(body);
                            add(['\nendobj\n'])
                        };
                        objOut(1, ['<</Type/Catalog/Pages 2 0 R>>']);
                        objOut(2, ['<</Type/Pages/Kids[3 0 R]/Count 1>>']);
                        const pb = [];
                        ser(page, pb);
                        pb[pb.length - 1] = '/Parent 2 0 R>>';
                        objOut(3, pb);
                        let count = 0;
                        while (queue.length) {
                            if (++count > 60000) throw new Error('page references too many objects');
                            const on = queue.shift(),
                                o = await this.get(on),
                                out = [],
                                id = map.get(on);
                            if (o.stream) {
                                const len = await this.streamLen(o),
                                    d = Object.create(null);
                                for (const k in o.val) d[k] = o.val[k];
                                d.Length = len;
                                ser(d, out);
                                out.push('\nstream\n');
                                out.push(this.f.slice(o.stream.start, o.stream.start + len));
                                out.push('\nendstream')
                            } else ser(o.val === undefined ? null : o.val, out);
                            objOut(id, out)
                        }
                        const total = next,
                            xs = pos;
                        let x = 'xref\n0 ' + total + '\n0000000000 65535 f \n';
                        for (let i = 1; i < total; i++) x += String(offs[i] || 0).padStart(10, '0') + ' 00000 n \n';
                        add([x + 'trailer\n<</Size ' + total + '/Root 1 0 R>>\nstartxref\n' + xs + '\n%%EOF\n']);
                        return new Blob(parts, {
                            type: 'application/pdf'
                        })
                    }
                }
                class BigDoc {
                    constructor(lite, lib, worker) {
                        this.lite = lite;
                        this.lib = lib;
                        this.worker = worker;
                        this.numPages = lite.numPages;
                        this.live = new Map();
                        this.dead = false
                    }
                    getPage(n) {
                        if (this.dead) return Promise.reject(new Error('document closed'));
                        let e = this.live.get(n);
                        if (e) return e.promise;
                        e = {
                            n,
                            doc: null,
                            page: null
                        };
                        e.promise = (async () => {
                            const blob = await this.lite.pageBlob(n),
                                data = new Uint8Array(await blob.arrayBuffer());
                            const task = this.lib.getDocument({
                                data,
                                isEvalSupported: false,
                                worker: this.worker
                            });
                            e.doc = await task.promise;
                            e.page = await e.doc.getPage(1);
                            if (this.dead || this.live.get(n) !== e) {
                                try {
                                    e.doc.destroy()
                                } catch (x) {}
                                throw new Error('page released')
                            }
                            return e.page
                        })();
                        e.promise.catch(() => {
                            if (this.live.get(n) === e) this.live.delete(n)
                        });
                        this.live.set(n, e);
                        return e.promise
                    }
                    release(page) {
                        for (const [n, e] of this.live)
                            if (e.page === page) {
                                this.live.delete(n);
                                try {
                                    e.doc.destroy()
                                } catch (x) {}
                            }
                    }
                    destroy() {
                        this.dead = true;
                        for (const e of this.live.values()) {
                            try {
                                e.doc && e.doc.destroy()
                            } catch (x) {}
                        }
                        this.live.clear()
                    }
                }
                return {
                    async open(f, lib, worker) {
                        const l = new Lite(f);
                        await l.load();
                        return new BigDoc(l, lib, worker)
                    },
                    Lite
                };
            })();

            async function readAll(f, cb) {
                const out = new Uint8Array(f.size),
                    step = 32 << 20;
                for (let o = 0; o < f.size; o += step) {
                    out.set(new Uint8Array(await f.slice(o, Math.min(f.size, o + step)).arrayBuffer()), o);
                    cb && cb(Math.min(1, (o + step) / f.size))
                }
                return out
            }

            function canAlloc(n) {
                try {
                    const t = new ArrayBuffer(n);
                    return !!t
                } catch (e) {
                    return false
                }
            }
            async function openPdfDoc(f, onProg) {
                const prog = (p, l) => {
                    try {
                        onProg && onProg(p, l)
                    } catch (e) {}
                };
                const lib = window.pdfjsLib;
                if (!lib) throw new Error('PDF engine unavailable');
                prog(0, L('Starting PDF engine…', 'جارٍ تشغيل محرك PDF…'));
                const worker = await getWorker();
                prog(.08);
                const modes = f.size <= 8e6 ? ['full'] : f.size > 4e8 ? ['paged', 'range', 'full'] : ['range', 'paged', 'full'];
                const errs = [];
                for (const mode of modes) {
                    if (mode === 'full' && f.size > 8e6 && (f.size > 1.9e9 || !canAlloc(f.size))) {
                        errs.push(mode + ': file larger than this browser can allocate');
                        continue
                    }
                    let task = null,
                        doc = null,
                        timer = 0;
                    try {
                        if (mode === 'paged') {
                            prog(.15, L('Indexing pages…', 'جارٍ فهرسة الصفحات…'));
                            doc = await Promise.race([NXPDF.open(f, lib, worker), new Promise((_, no) => setTimeout(() => no(new Error('Page index timed out')), 240000))]);
                            prog(.9);
                            await doc.getPage(1);
                            return doc
                        }
                        if (mode === 'full') {
                            prog(.1, L('Reading file…', 'جارٍ قراءة الملف…'));
                            const data = await readAll(f, fr => prog(.1 + .5 * fr));
                            task = lib.getDocument({
                                data,
                                isEvalSupported: false,
                                worker
                            });
                            task.onProgress = q => {
                                if (q && q.total) prog(.6 + .35 * q.loaded / q.total, L('Reading document structure…', 'جارٍ قراءة بنية المستند…'))
                            }
                        } else {
                            const init = new Uint8Array(await f.slice(0, Math.min(f.size, 1 << 16)).arrayBuffer()),
                                tr = new lib.PDFDataRangeTransport(f.size, init);
                            let got = 0;
                            prog(.12, L('Reading document structure…', 'جارٍ قراءة بنية المستند…'));
                            let kill = () => {};
                            const guard = new Promise((_, no) => {
                                kill = () => {
                                    clearTimeout(timer);
                                    timer = setTimeout(() => no(new Error('Range loading stalled')), 60000)
                                };
                                kill()
                            });
                            tr.requestDataRange = (b, e) => {
                                kill();
                                f.slice(b, e).arrayBuffer().then(buf => {
                                    kill();
                                    got += buf.byteLength;
                                    prog(.12 + .8 * (1 - Math.exp(-got / 6e6)));
                                    tr.onDataRange(b, new Uint8Array(buf))
                                }, () => {
                                    try {
                                        task && task.destroy()
                                    } catch (x) {}
                                })
                            };
                            task = lib.getDocument({
                                range: tr,
                                length: f.size,
                                disableStream: true,
                                disableAutoFetch: true,
                                rangeChunkSize: 1 << 20,
                                isEvalSupported: false,
                                worker
                            });
                            task.onPassword = (cb, reason) => {
                                askPw(reason === 2).then(p => p ? cb(p) : task.destroy())
                            };
                            const load = (async () => {
                                doc = await task.promise;
                                await doc.getPage(1);
                                return doc
                            })();
                            await Promise.race([load, guard]);
                            clearTimeout(timer);
                            return doc
                        }
                        task.onPassword = (cb, reason) => {
                            askPw(reason === 2).then(p => p ? cb(p) : task.destroy())
                        };
                        doc = await task.promise;
                        await doc.getPage(1);
                        return doc
                    } catch (err) {
                        clearTimeout(timer);
                        console.warn('PDF open (' + mode + ') failed', err);
                        errs.push(mode + ': ' + ((err && err.message) || err));
                        try {
                            doc && doc.destroy()
                        } catch (x) {}
                        try {
                            task && task.destroy()
                        } catch (x) {}
                        if (err && err.name === 'PasswordException') throw err
                    }
                }
                const e = new Error(errs.join(' | '));
                e.name = 'OpenError';
                throw e
            }

            function resetViewer() {
                queue = [];
                drawing = null;
                creating = null;
                sel = null;
                selStroke = null;
                strokeDrag = null;
                openTok++;
                if (io) {
                    io.disconnect();
                    io = null
                }
                views.forEach(v => {
                    v.tok++;
                    try {
                        v.task && v.task.cancel()
                    } catch (e) {}
                });
                views = [];
                scroller.replaceChildren();
                if (pdfDoc) {
                    try {
                        pdfDoc.destroy()
                    } catch (e) {}
                    pdfDoc = null
                }
                if (currentUrl) {
                    URL.revokeObjectURL(currentUrl);
                    currentUrl = null
                }
            }
            function threeDlg(o) {
                return new Promise(res => {
                    const prev = document.activeElement,
                        m = document.createElement('div');
                    m.className = 'nx-modal';
                    m.innerHTML = '<div class="nx-dlg" role="alertdialog" aria-modal="true"><h3></h3><p></p><div class="nx-act three"><button type="button" class="btn ghost" data-r="cancel"></button><button type="button" class="btn danger" data-r="discard"></button><button type="button" class="btn" data-r="save"></button></div></div>';
                    m.querySelector('h3').textContent = o.title;
                    m.querySelector('p').textContent = o.msg;
                    const [bc, bd, bs] = m.querySelectorAll('button');
                    bc.textContent = o.cancel;
                    bd.textContent = o.discard;
                    bs.textContent = o.save;
                    const done = v => {
                        document.removeEventListener('keydown', kd, true);
                        m.classList.add('out');
                        setTimeout(() => {
                            m.remove();
                            try {
                                prev && prev.focus && prev.focus()
                            } catch (e) {}
                        }, 150);
                        res(v)
                    };
                    const kd = e => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            e.stopPropagation();
                            done('cancel')
                        }
                    };
                    m.addEventListener('click', e => {
                        if (e.target === m) done('cancel');
                        const b = e.target.closest('button[data-r]');
                        if (b) done(b.dataset.r)
                    });
                    document.addEventListener('keydown', kd, true);
                    document.body.appendChild(m);
                    bs.focus()
                })
            }
            let closing = false;
            async function closeReader() {
                if (closing || !reader.classList.contains('open')) return;
                closing = true;
                const ae = document.activeElement;
                if (ae && ae.classList && ae.classList.contains('pdf-obj-text')) ae.blur();
                let discard = false;
                if (fileId != null && reader.classList.contains('is-pdf') && !reader.classList.contains('nx-loading') && !reader.classList.contains('nx-failed') && annSig(ann) !== annSig(sessionBase)) {
                    const r = await threeDlg({
                        title: L('Save your changes?', 'حفظ التغييرات؟'),
                        msg: L('You have changes on this document that haven’t been saved yet.', 'لديك تعديلات على هذا المستند لم تُحفظ بعد.'),
                        cancel: L('Cancel', 'إلغاء'),
                        discard: L('Exit without saving', 'خروج بدون حفظ'),
                        save: L('Save & exit', 'حفظ وخروج')
                    });
                    if (r === 'cancel') {
                        closing = false;
                        return
                    }
                    discard = (r === 'discard')
                }
                if (fileId != null && discard) {
                    clearTimeout(saveT);
                    AS.set(fileId, sessionBase);
                    ann = JSON.parse(JSON.stringify(sessionBase));
                    var savedPage = 0,
                        savedOk = false,
                        dropped = true
                }
                if (fileId != null && !discard) {
                    const ok = persist(true);
                    savePos();
                    var savedPage = reader.classList.contains('is-pdf') ? curPage : 0;
                    var savedOk = ok !== false;
                    if (ok === false && window.NX_confirm) {
                        const go = await NX_confirm({
                            title: L('Couldn’t save your annotations', 'تعذّر حفظ تعليقاتك'),
                            msg: L('Storage is full. Export an annotated PDF first, or close anyway and lose these changes.', 'مساحة التخزين ممتلئة. صدّر ملف PDF بالتعليقات أولًا، أو أغلق وستفقد هذه التغييرات.'),
                            ok: L('Close anyway', 'إغلاق على أي حال'),
                            danger: true
                        });
                        if (!go) {
                            closing = false;
                            return
                        }
                    }
                }
                reader.classList.add('closing');
                const sp = typeof savedPage === 'number' ? savedPage : 0,
                    so = typeof savedOk === 'boolean' ? savedOk : false;
                setTimeout(() => {
                    reader.classList.remove('open', 'closing', 'nx-loading', 'nx-failed');
                    document.body.style.overflow = '';
                    window.nxThemeColor && nxThemeColor();
                    resetViewer();
                    file = null;
                    fileId = null;
                    undo = [];
                    redo = [];
                    updHist();
                    closing = false;
                    if (so) saveToast(sp ? L('Saved ✓ Your annotations and reading position (page ' + sp + ') are saved on this device', 'تم الحفظ ✓ حُفظت تعليقاتك وموضع القراءة (صفحة ' + sp + ') على هذا الجهاز') : L('Saved ✓ Your changes are saved on this device', 'تم الحفظ ✓ حُفظت تغييراتك على هذا الجهاز'));
                    else if (typeof dropped !== 'undefined' && dropped) saveToast(L('Closed without saving your changes', 'تم الإغلاق دون حفظ التغييرات'))
                }, 230)
            }

            function saveToast(t) {
                let e = document.getElementById('nx-save-toast');
                if (!e) {
                    e = document.createElement('div');
                    e.id = 'nx-save-toast';
                    e.setAttribute('role', 'status');
                    e.setAttribute('aria-live', 'polite');
                    document.body.appendChild(e)
                }
                e.textContent = t;
                e.classList.remove('on');
                void e.offsetWidth;
                e.classList.add('on');
                clearTimeout(saveToast.t);
                saveToast.t = setTimeout(() => e.classList.remove('on'), 3200)
            }
            window.addEventListener('pagehide', () => {
                if (fileId != null) persist(true)
            });
            document.addEventListener('visibilitychange', () => {
                if (document.hidden && fileId != null) persist(true)
            });
            $('#nr-close').onclick = closeReader;
            $('#nr-download').onclick = () => {
                if (!file) return;
                const u = URL.createObjectURL(file),
                    a = document.createElement('a');
                a.href = u;
                a.download = file.name;
                a.click();
                setTimeout(() => URL.revokeObjectURL(u), 4000)
            };
            let openTok = 0;

            function openProgress() {
                scroller.replaceChildren();
                const w = document.createElement('div');
                w.className = 'nx-open';
                w.innerHTML = '<div class="nx-op-t"></div><div class="nx-op-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><div class="nx-op-row"><span class="nx-op-st"></span><b class="nx-op-p">0%</b></div><div class="nx-op-note" hidden></div>';
                scroller.appendChild(w);
                const bar = w.querySelector('.nx-op-bar'),
                    fill = bar.firstChild,
                    pc = w.querySelector('.nx-op-p'),
                    st = w.querySelector('.nx-op-st'),
                    nt = w.querySelector('.nx-op-note');
                w.querySelector('.nx-op-t').textContent = $('#nr-title').textContent;
                let cur = 0,
                    last = Date.now();
                const wd = setInterval(() => {
                    if (!w.isConnected) {
                        clearInterval(wd);
                        return
                    }
                    if (Date.now() - last > 15000) {
                        nt.hidden = false;
                        nt.textContent = L('Large files can take a little while — still working…', 'الملفات الكبيرة قد تستغرق بعض الوقت — ما زال العمل جاريًا…')
                    }
                }, 2000);
                const api = {
                    set(p, label) {
                        if (!w.isConnected) return;
                        p = Math.max(cur, Math.min(100, p));
                        if (p !== cur || label) {
                            last = Date.now();
                            nt.hidden = true
                        }
                        cur = p;
                        fill.style.width = p + '%';
                        const r = Math.floor(p);
                        pc.textContent = r + '%';
                        bar.setAttribute('aria-valuenow', r);
                        if (label) st.textContent = label
                    }
                };
                api.set(0, L('Reading from storage…', 'جارٍ القراءة من التخزين…'));
                return api
            }

            function showMsg(t) {
                scroller.replaceChildren();
                const m = document.createElement('p');
                m.className = 'pdf-msg';
                m.textContent = t;
                scroller.appendChild(m)
            }
            let pre = null;

            function dropPre() {
                if (!pre) return;
                clearTimeout(pre.timer);
                const p = pre;
                pre = null;
                p.promise.then(r => {
                    try {
                        r.doc.destroy()
                    } catch (e) {}
                }).catch(() => {})
            }

            function prefetch(id) {
                if (pre && pre.id === id) return;
                dropPre();
                const meta = (LS.get('novix.site.v1', {}).books || []).find(x => x.id === id);
                if (!meta || !meta.fn || meta.ty !== 'PDF' || !window.pdfjsLib) return;
                const pr = {
                    id,
                    cb: null,
                    last: null,
                    promise: null,
                    timer: 0
                };
                const rp = (p, l) => {
                    pr.last = [p, l];
                    pr.cb && pr.cb(p, l)
                };
                pr.promise = (async () => {
                    const f = await getFile(id, fr => rp(fr * 30, L('Reading from storage…', 'جارٍ القراءة من التخزين…')));
                    if (!f) throw Error('Missing file');
                    const doc = await openPdfDoc(f, (p, l) => rp(35 + p * 50, l));
                    const first = await doc.getPage(1);
                    return {
                        f,
                        doc,
                        first
                    }
                })();
                pr.promise.catch(() => {});
                pr.timer = setTimeout(() => {
                    if (!pr.cb) dropPre()
                }, 20000);
                pre = pr
            }
            let hoverT = 0;
            $('#lib').addEventListener('mouseover', e => {
                const b = e.target.closest('[data-open]');
                clearTimeout(hoverT);
                if (b && e.pointerType !== 'touch') hoverT = setTimeout(() => prefetch(+b.dataset.open), 80)
            });
            $('#lib').addEventListener('pointerdown', e => {
                const b = e.target.closest('[data-open]');
                if (b) prefetch(+b.dataset.open)
            }, true);
            async function openInside(id) {
                const meta = (LS.get('novix.site.v1', {}).books || []).find(x => x.id === id);
                if (!meta || !meta.fn) return;
                resetViewer();
                undo = [];
                redo = [];
                updHist();
                reader.classList.remove('nx-failed');
                reader.classList.add('nx-loading');
                reader.classList.add('open');
                reader.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
                document.body.style.overflow = 'hidden';
                $('#nr-title').textContent = meta.t || meta.fn;
                fileId = null;
                applyLang();
                const myTok = ++openTok;
                const P = openProgress();
                reader.focus({
                    preventScroll: true
                });
                window.nxThemeColor && nxThemeColor(getComputedStyle(reader).backgroundColor);
                try {
                    let f;
                    try {
                        f = await getFile(id, fr => P.set(fr * 30, L('Reading from storage…', 'جارٍ القراءة من التخزين…')))
                    } catch (e) {
                        e.storage = true;
                        throw e
                    }
                    if (!f) throw Error('Missing file');
                    if (myTok !== openTok) return;
                    P.set(32);
                    file = f;
                    fileId = String(id);
                    await loadAnn();
                    if (myTok !== openTok) return;
                    const isPdf = f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
                    document.body.classList.toggle('reader-pdf', isPdf);
                    reader.classList.toggle('is-pdf', isPdf);
                    if (isPdf) {
                        let first;
                        if (pre && pre.id === id) {
                            const pr = pre;
                            pr.cb = (p, l) => P.set(p, l);
                            if (pr.last) P.set(pr.last[0], pr.last[1]);
                            const r = await pr.promise.catch(() => null);
                            clearTimeout(pr.timer);
                            if (pre === pr) pre = null;
                            if (r) {
                                pdfDoc = r.doc;
                                first = r.first
                            }
                        }
                        if (myTok !== openTok) {
                            try {
                                pdfDoc && pdfDoc.destroy()
                            } catch (x) {}
                            pdfDoc = null;
                            return
                        }
                        if (!pdfDoc) {
                            pdfDoc = await openPdfDoc(f, (p, l) => P.set(35 + p * 50, l));
                            if (myTok !== openTok) {
                                try {
                                    pdfDoc.destroy()
                                } catch (x) {}
                                pdfDoc = null;
                                return
                            }
                            P.set(88, L('Loading the first page…', 'جارٍ تحميل أول صفحة…'));
                            first = await pdfDoc.getPage(1)
                        }
                        P.set(96, L('Preparing pages…', 'جارٍ تجهيز الصفحات…'));
                        const b = first.getViewport({
                            scale: 1
                        });
                        defW = b.width;
                        defH = b.height;
                        const pos = LS.get('novix.pdf.pos.v1', {})[fileId];
                        scale = clamp(pos && pos.scale || Math.min(1.15, fitWidth()), .4, 4);
                        scroller.style.setProperty('--s', scale);
                        updZoomLabel();
                        P.set(100, L('Opening…', 'جارٍ الفتح…'));
                        await new Promise(r => setTimeout(r, 220));
                        if (myTok !== openTok) return;
                        scroller.replaceChildren();
                        buildViews();
                        setTool('pan');
                        reader.classList.remove('nx-loading');
                        if (pos && pos.page > 1) scrollToPage(pos.page);
                        else {
                            scroller.scrollTop = 0;
                            $('#nr-page').value = 1
                        }
                        updCurPage();
                        for (let k = Math.max(0, curPage - 1); k < Math.min(views.length, curPage + 1); k++) mountView(views[k]);
                        note('')
                    } else {
                        scroller.replaceChildren();
                        setTool('pan');
                        reader.classList.remove('nx-loading');
                        if (f.type.startsWith('image/')) {
                            const im = document.createElement('img');
                            im.src = await new Promise((ok, no) => {
                                const r = new FileReader();
                                r.onload = () => ok(r.result);
                                r.onerror = no;
                                r.readAsDataURL(f)
                            });
                            im.style.cssText = 'max-width:100%;height:auto;box-shadow:0 5px 22px #132b2024';
                            scroller.appendChild(im)
                        } else if (/^text\//.test(f.type) || /\.(txt|md|csv|json|log)$/i.test(f.name)) {
                            const pre = document.createElement('pre');
                            pre.style.cssText = 'white-space:pre-wrap;word-break:break-word;text-align:start;width:min(860px,100%);margin:0 auto;padding:24px;border-radius:14px;background:#fff;color:#1c2b26;font:14px/1.8 ui-monospace,Menlo,Consolas,monospace;box-shadow:0 5px 22px #132b2024;box-sizing:border-box';
                            pre.textContent = await f.text();
                            scroller.appendChild(pre)
                        } else if (/^(audio|video)\//.test(f.type)) {
                            currentUrl = URL.createObjectURL(f);
                            const m = document.createElement(f.type.startsWith('audio') ? 'audio' : 'video');
                            m.src = currentUrl;
                            m.controls = true;
                            m.style.cssText = 'max-width:100%;width:min(860px,100%);display:block;margin:0 auto';
                            scroller.appendChild(m)
                        } else if (/\.docx$/i.test(f.name)) {
                            await new Promise((ok, no) => {
                                if (window.mammoth) return ok();
                                const s = document.createElement('script');
                                s.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js';
                                s.onload = ok;
                                s.onerror = () => no(new Error('Word engine unavailable'));
                                document.head.appendChild(s)
                            });
                            const r = await window.mammoth.convertToHtml({
                                arrayBuffer: await f.arrayBuffer()
                            });
                            const d = document.createElement('div');
                            d.style.cssText = 'width:min(860px,100%);margin:0 auto;padding:28px 32px;border-radius:14px;background:#fff;color:#1c2b26;line-height:1.8;font-size:15px;box-shadow:0 5px 22px #132b2024;box-sizing:border-box;overflow-wrap:anywhere';
                            d.innerHTML = r.value.replace(/<script[\s\S]*?<\/script>/gi, '');
                            scroller.appendChild(d)
                        } else showMsg(L('Preview is available for PDF, image, text, Word, audio and video files.', 'المعاينة متاحة لملفات PDF والصور والنصوص وWord والصوت والفيديو.'))
                    }
                } catch (err) {
                    console.error(err);
                    if (myTok !== openTok) return;
                    reader.classList.remove('nx-loading');
                    reader.classList.add('nx-failed');
                    const why = err && (err.name && err.name !== 'Error' ? err.name + ': ' : '') + (err && err.message || '');
                    showMsg(err && err.message === 'Missing file' ? L('This file is no longer stored in this browser. Please upload the book again.', 'هذا الملف لم يعد محفوظًا في هذا المتصفح. من فضلك ارفع الكتاب مرة أخرى.') : err && err.storage ? L('The browser could not read this large file from its storage (it may be low on space or memory). Close other tabs and try again, or upload the book again.', 'تعذّر على المتصفح قراءة هذا الملف الكبير من التخزين (قد تكون المساحة أو الذاكرة منخفضة). أغلق التبويبات الأخرى وحاول مجددًا أو ارفع الكتاب مرة أخرى.') : L('This PDF couldn’t be opened. It may be damaged or password-protected. You can still download it with the button above.', 'تعذّر فتح هذا الملف. قد يكون تالفًا أو محميًا بكلمة مرور. يمكنك تنزيله بزر التنزيل بالأعلى.') + (why ? '\n(' + why.slice(0, 320) + ')' : ''));
                    {
                        const rb = document.createElement('button');
                        rb.type = 'button';
                        rb.className = 'nx-retry';
                        rb.textContent = L('Try again', 'حاول مرة أخرى');
                        rb.onclick = () => openInside(id);
                        const m = scroller.querySelector('.pdf-msg');
                        if (m) m.appendChild(rb)
                    }
                }
            }

            function wrapLines(ctx, text, maxW) {
                const out = [];
                for (const para of String(text || '').split('\n')) {
                    const words = para.split(/\s+/);
                    let line = '';
                    for (const w of words) {
                        const nx = line ? line + ' ' + w : w;
                        if (ctx.measureText(nx).width > maxW && line) {
                            out.push(line);
                            line = w
                        } else line = nx
                    }
                    out.push(line)
                }
                return out
            }

            function drawObjCanvas(ctx, o, k) {
                norm(o);
                const x = o.x * k,
                    y = o.y * k,
                    w = o.w * k,
                    h = o.h * k;
                ctx.save();
                if (o.type !== 'textbox') {
                    ctx.beginPath();
                    if (o.type === 'shape' && o.shape === 'triangle') {
                        ctx.moveTo(x + w / 2, y);
                        ctx.lineTo(x + w, y + h);
                        ctx.lineTo(x, y + h);
                        ctx.closePath();
                        ctx.lineJoin = 'round'
                    } else if (o.shape === 'circle') ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
                    else if (o.type === 'sticky' || o.shape === 'round' || o.shape === 'speech') ctx.roundRect(x, y, w, h, (o.shape === 'round' ? 18 : o.type === 'sticky' ? 8 : 14) * k);
                    else ctx.rect(x, y, w, h);
                    ctx.fillStyle = o.type === 'sticky' ? o.paper : (o.fill || 'rgba(0,0,0,0)');
                    ctx.fill();
                    if (o.type === 'shape') {
                        ctx.lineWidth = o.lw * k;
                        ctx.strokeStyle = o.stroke;
                        ctx.stroke()
                    } else {
                        ctx.lineWidth = 1 * k;
                        ctx.strokeStyle = 'rgba(0,0,0,.15)';
                        ctx.stroke()
                    }
                }
                const text = (o.type === 'shape' && !o.fill) ? '' : (o.text || '');
                if (text) {
                    const pad = 8 * k,
                        fs = o.fs * k;
                    ctx.font = `${o.bold?'800':'500'} ${fs}px ${FAM[o.family]||FAM.sans}`;
                    ctx.fillStyle = o.type === 'textbox' ? o.color : (o.color || '#20372e');
                    ctx.textBaseline = 'top';
                    const rtl = /[\u0590-\u08FF]/.test(text);
                    ctx.direction = rtl ? 'rtl' : 'ltr';
                    const centered = o.type === 'shape';
                    ctx.textAlign = centered ? 'center' : (rtl ? 'right' : 'left');
                    const lines = wrapLines(ctx, text, w - 2 * pad),
                        lh = fs * 1.45;
                    let yy = y + pad;
                    const tx = centered ? x + w / 2 : (rtl ? x + w - pad : x + pad);
                    ctx.beginPath();
                    ctx.rect(x, y, w, Math.max(h, lh * lines.length + 2 * pad));
                    ctx.clip();
                    for (const ln of lines) {
                        ctx.fillText(ln, tx, yy);
                        yy += lh
                    }
                }
                ctx.restore()
            }
            async function loadPdfLib() {
                if (window.PDFLib) return;
                await new Promise((ok, no) => {
                    const s = document.createElement('script');
                    s.src = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js';
                    s.onload = ok;
                    s.onerror = () => no(new Error('pdf-lib unavailable'));
                    document.head.appendChild(s)
                })
            }
            async function exportAnnotatedPdf() {
                if (!file || !pdfDoc) return;
                const keys = Object.keys(ann.pages).filter(k => {
                    const a = ann.pages[k];
                    return a.strokes.length || a.objects.length
                });
                if (!keys.length) {
                    note(L('Nothing to export yet — add some annotations first.', 'لا توجد تعليقات للتصدير بعد.'));
                    return
                }
                try {
                    note(L('Preparing the annotated PDF…', 'جارٍ تجهيز الملف…'));
                    await loadPdfLib();
                    const {
                        PDFDocument
                    } = window.PDFLib, out = await PDFDocument.load(await file.arrayBuffer(), {
                        ignoreEncryption: true
                    }), outPages = out.getPages(), K = 2;
                    for (const key of keys) {
                        const n = +key,
                            a = ann.pages[key],
                            page = await pdfDoc.getPage(n),
                            b = page.getViewport({
                                scale: 1
                            }),
                            c = document.createElement('canvas');
                        c.width = Math.ceil(b.width * K);
                        c.height = Math.ceil(b.height * K);
                        const ctx = c.getContext('2d');
                        for (const st of a.strokes) drawInkStroke(ctx, st, K);
                        for (const o of a.objects) drawObjCanvas(ctx, o, K);
                        const png = await out.embedPng(c.toDataURL('image/png')),
                            pg = outPages[n - 1];
                        pg.drawImage(png, {
                            x: 0,
                            y: 0,
                            width: pg.getWidth(),
                            height: pg.getHeight()
                        })
                    }
                    const res = await out.save(),
                        url = URL.createObjectURL(new Blob([res], {
                            type: 'application/pdf'
                        })),
                        link = document.createElement('a');
                    link.href = url;
                    link.download = (file.name || 'NOVIX-document.pdf').replace(/\.pdf$/i, '') + '-annotated.pdf';
                    link.click();
                    setTimeout(() => URL.revokeObjectURL(url), 4000);
                    note(L('Annotated PDF exported successfully.', 'تم تصدير الملف مع التعليقات.'))
                } catch (err) {
                    console.error(err);
                    note(L('Could not export the PDF. Check your connection and try again.', 'تعذّر التصدير. تحقق من اتصالك وحاول مرة أخرى.'))
                }
            }
            $('#nr-export').onclick = exportAnnotatedPdf;

            $('#lib').addEventListener('click', e => {
                const b = e.target.closest('[data-open]');
                if (!b) return;
                try {
                    const m = (LS.get('novix.site.v1', {}).books || []).find(x => x.id === +b.dataset.open);
                    if (!m || !m.fn || !/^(PDF|PNG|JPG|JPEG|GIF|WEBP|BMP|SVG|TXT|MD|CSV|JSON|LOG|MP3|WAV|OGG|M4A|MP4|WEBM|DOCX)$/i.test(m.ty || '')) return
                } catch (x) {}
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                openInside(+b.dataset.open)
            }, true);
            new MutationObserver(() => {
                reader.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
            }).observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme']
            });
            window.addEventListener('resize', () => {
                if (pdfDoc && reader.classList.contains('open')) updCurPage()
            });
            applyLang();
            updHist();
            reader.dataset.tool = 'pan';
        })();

;
        (() => {
            const root = document.getElementById('novix-opening');
            if (!root) return;
            const SESSION_KEY = 'novix.opening.session.v1';
            const ENTERED_KEY = 'novix.welcome.entered.v1';
            const PROFILE_KEY = 'novix.site.v1';
            const PHOTO_KEY = 'novix-profile-photo-v1';
            const getStore = (kind) => {
                try {
                    return kind === 'session' ? window.sessionStorage : window.localStorage;
                } catch (_) {
                    return null;
                }
            };
            const sessionStore = getStore('session');
            const localStore = getStore('local');
            const safeGet = (store, key) => {
                try {
                    return store ? store.getItem(key) : null;
                } catch (_) {
                    return null;
                }
            };
            const safeSet = (store, key, value) => {
                try {
                    if (store) store.setItem(key, value);
                } catch (_) {}
            };

            safeSet(sessionStore, SESSION_KEY, '1');

            let profile = {};
            try {
                profile = JSON.parse(safeGet(localStore, PROFILE_KEY) || 'null') || {};
            } catch (_) {
                profile = {};
            }
            const name = String(profile.name || '').trim().slice(0, 24) || (profile.lang === 'ar' ? 'طالب' : 'Student');
            const isArabic = profile.lang === 'ar';
            const isReturning = safeGet(localStore, ENTERED_KEY) === '1';
            const $ = (id) => document.getElementById(id);
            const greeting = $('novix-welcome-greeting');
            const nameNode = $('novix-welcome-name');
            const kicker = $('novix-welcome-kicker');
            const message = $('novix-welcome-message');
            const chip = $('novix-welcome-chip');
            const enterLabel = $('novix-welcome-enter-label');
            const welcome = $('novix-welcome');
            const photo = $('novix-welcome-photo');
            const fallback = $('novix-welcome-fallback');
            const enterButton = $('novix-welcome-enter');

            if (isArabic) {}

            nameNode.textContent = name;
            fallback.textContent = (name[0] || 'N').toLocaleUpperCase();
            if (isArabic) {
                root.setAttribute('dir', 'rtl');
                kicker.textContent = isReturning ? 'مساحتك جاهزة' : 'بداية فصل جديد';
                greeting.textContent = isReturning ? 'أهلًا بعودتك،' : 'أهلًا بك في NOVIX،';
                message.textContent = isReturning ? 'مساحتك في انتظارك. أكمل رحلتك وتقدّمك من حيث توقفت.' : 'مساحتك للتعلّم والاستكشاف والتفكير خارج الحدود.';
                chip.textContent = 'مساحتك التعليمية';
                enterLabel.textContent = 'ابدأ رحلتك';
                enterButton.querySelector('svg').style.transform = 'scaleX(-1)';
            } else {
                root.setAttribute('dir', 'ltr');
                kicker.textContent = isReturning ? 'YOUR SPACE IS READY' : 'A NEW CHAPTER';
                greeting.textContent = isReturning ? 'Welcome back,' : 'Welcome to NOVIX,';
                message.textContent = isReturning ? 'Your space is ready. Pick up where you left off and keep moving forward.' : 'Your space to learn, explore, and think beyond.';
                chip.textContent = 'YOUR PERSONAL SPACE';
                enterLabel.textContent = 'Explore NOVIX';
            }

            const photoSrc = profile.avatar || safeGet(localStore, PHOTO_KEY);
            if (photoSrc) {
                photo.hidden = false;
                fallback.hidden = true;
                photo.addEventListener('error', () => {
                    photo.hidden = true;
                    fallback.hidden = false;
                }, {
                    once: true
                });
                photo.src = photoSrc;
            } else {
                photo.hidden = true;
                fallback.hidden = false;
            }

            const reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
            let welcomeTimer = window.setTimeout(() => {
                root.classList.remove('is-playing');
                root.classList.add('is-welcome');
                welcome.setAttribute('aria-hidden', 'false');
                window.setTimeout(() => enterButton.focus({
                    preventScroll: true
                }), reducedMotion ? 0 : 700);
            }, reducedMotion ? 60 : 2480);

            const finishOpening = () => {
                safeSet(localStore, ENTERED_KEY, '1');
                safeSet(sessionStore, SESSION_KEY, '1');
                root.classList.add('is-leaving');
                root.setAttribute('aria-hidden', 'true');
                window.setTimeout(() => root.remove(), reducedMotion ? 30 : 760);
            };

            enterButton.addEventListener('click', () => {
                window.clearTimeout(welcomeTimer);
                finishOpening();
            });

            (() => {
                const c = document.getElementById('novix-opening-fx');
                if (!c || !c.getContext) return;
                const aur = root.querySelector('.opening-aurora');
                const x = c.getContext('2d');
                const D = Math.min(window.devicePixelRatio || 1, 2);
                let W = 0,
                    H = 0,
                    P = [],
                    S = [],
                    R = [],
                    star = null,
                    nextStar = 1400;
                const ptr = {
                    mx: 0,
                    my: 0,
                    x: -999,
                    y: -999,
                    px: -999,
                    py: -999,
                    on: false,
                    down: false,
                    sx: 0,
                    sy: 0
                };
                const rnd = (a, b) => a + Math.random() * (b - a);
                const mk = () => {
                    const a = rnd(0, 6.283),
                        s = rnd(.15, .55);
                    return {
                        x: rnd(0, W),
                        y: rnd(0, H),
                        bx: Math.cos(a) * s,
                        by: Math.sin(a) * s - .05,
                        vx: 0,
                        vy: 0,
                        r: rnd(.7, 2.3),
                        b: Math.random() < .3,
                        t: rnd(0, 6.28)
                    };
                };
                const size = () => {
                    W = c.clientWidth;
                    H = c.clientHeight;
                    c.width = W * D;
                    c.height = H * D;
                    x.setTransform(D, 0, 0, D, 0, 0);
                    const n = Math.round(Math.min(300, Math.max(92, W * H / 4750)));
                    P = Array.from({
                        length: n
                    }, () => {
                        const p = mk();
                        p.vx = p.bx;
                        p.vy = p.by;
                        return p;
                    });
                };
                const spark = (px, py, n, power) => {
                    for (let i = 0; i < n; i++) {
                        const a = rnd(0, 6.283),
                            s = rnd(.6, 1) * power;
                        S.push({
                            x: px,
                            y: py,
                            vx: Math.cos(a) * s,
                            vy: Math.sin(a) * s,
                            l: 1,
                            d: rnd(.012, .026),
                            r: rnd(1, 2.6),
                            b: Math.random() < .35
                        });
                    }
                };
                const pos = (e) => {
                    const r = c.getBoundingClientRect();
                    return [e.clientX - r.left, e.clientY - r.top];
                };
                const move = (e) => {
                    const [px, py] = pos(e);
                    const dx = ptr.on ? px - ptr.x : 0,
                        dy = ptr.on ? py - ptr.y : 0;
                    ptr.mx = ptr.mx * .4 + dx * .6;
                    ptr.my = ptr.my * .4 + dy * .6;
                    if (ptr.on) {
                        const sp = Math.hypot(dx, dy);
                        if (sp > 6) spark(px, py, Math.min(3, 1 + (sp / 25 | 0)), .7);
                    }
                    ptr.x = px;
                    ptr.y = py;
                    ptr.on = true;
                };
                const draw = (move, dt) => {
                    x.clearRect(0, 0, W, H);
                    if (aur && ptr.on) {
                        ptr.sx += ((ptr.x / W - .5) * -60 - ptr.sx) * .06;
                        ptr.sy += ((ptr.y / H - .5) * -60 - ptr.sy) * .06;
                        aur.style.transform = `translate3d(${ptr.sx.toFixed(1)}px,${ptr.sy.toFixed(1)}px,0)`;
                    }
                    const RAD = ptr.down ? 280 : 190;
                    ptr.mx *= .9;
                    ptr.my *= .9;
                    for (const p of P) {
                        if (move) {
                            if (ptr.on) {
                                const dx = p.x - ptr.x,
                                    dy = p.y - ptr.y,
                                    d2 = dx * dx + dy * dy;
                                if (d2 < RAD * RAD && d2 > 1) {
                                    const d = Math.sqrt(d2),
                                        f = (1 - d / RAD);
                                    if (ptr.down) {
                                        p.vx += (-dx / d) * f * .9 + (-dy / d) * f * .35;
                                        p.vy += (-dy / d) * f * .9 + (dx / d) * f * .35;
                                    } else {
                                        p.vx += (dx / d) * f * .8 + ptr.mx * f * .16;
                                        p.vy += (dy / d) * f * .8 + ptr.my * f * .16;
                                    }
                                }
                            }
                            p.vx += (p.bx - p.vx) * .035;
                            p.vy += (p.by - p.vy) * .035;
                            const m = Math.hypot(p.vx, p.vy);
                            if (m > 7) {
                                p.vx *= 7 / m;
                                p.vy *= 7 / m;
                            }
                            p.x += p.vx;
                            p.y += p.vy;
                            p.t += .025;
                            if (p.x < -12) p.x = W + 12;
                            if (p.x > W + 12) p.x = -12;
                            if (p.y < -12) p.y = H + 12;
                            if (p.y > H + 12) p.y = -12;
                        }
                        const a = .38 + .32 * Math.sin(p.t),
                            col = p.b ? '165,201,255' : '115,225,209',
                            g = 1 + Math.min(1.2, Math.hypot(p.vx, p.vy) * .25);
                        x.beginPath();
                        x.arc(p.x, p.y, p.r * g, 0, 6.283);
                        x.fillStyle = `rgba(${col},${a})`;
                        x.shadowColor = `rgba(${col},.9)`;
                        x.shadowBlur = 9;
                        x.fill();
                    }
                    x.shadowBlur = 0;
                    for (let i = 0; i < P.length; i++)
                        for (let j = i + 1; j < P.length; j++) {
                            const dx = P[i].x - P[j].x,
                                dy = P[i].y - P[j].y,
                                d = dx * dx + dy * dy;
                            if (d < 11000) {
                                x.strokeStyle = `rgba(140,231,216,${(1 - d / 11000) * .24})`;
                                x.lineWidth = 1;
                                x.beginPath();
                                x.moveTo(P[i].x, P[i].y);
                                x.lineTo(P[j].x, P[j].y);
                                x.stroke();
                            }
                        }
                    if (ptr.on) {
                        for (const p of P) {
                            const dx = p.x - ptr.x,
                                dy = p.y - ptr.y,
                                d = dx * dx + dy * dy;
                            if (d < 22000) {
                                x.strokeStyle = `rgba(190,255,244,${(1 - d / 22000) * (ptr.down ? .7 : .5)})`;
                                x.lineWidth = 1.2;
                                x.beginPath();
                                x.moveTo(ptr.x, ptr.y);
                                x.lineTo(p.x, p.y);
                                x.stroke();
                            }
                        }
                        const gr = x.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, ptr.down ? 150 : 100);
                        gr.addColorStop(0, ptr.down ? 'rgba(165,255,238,.34)' : 'rgba(140,231,216,.2)');
                        gr.addColorStop(1, 'rgba(140,231,216,0)');
                        x.fillStyle = gr;
                        x.beginPath();
                        x.arc(ptr.x, ptr.y, ptr.down ? 150 : 100, 0, 6.283);
                        x.fill();
                        x.beginPath();
                        x.arc(ptr.x, ptr.y, ptr.down ? 5 : 3.2, 0, 6.283);
                        x.fillStyle = 'rgba(230,255,250,.9)';
                        x.fill();
                    }
                    for (let i = S.length - 1; i >= 0; i--) {
                        const s = S[i];
                        s.x += s.vx;
                        s.y += s.vy;
                        s.vx *= .96;
                        s.vy *= .96;
                        s.l -= s.d;
                        if (s.l <= 0) {
                            S.splice(i, 1);
                            continue;
                        }
                        x.beginPath();
                        x.arc(s.x, s.y, s.r * s.l + .3, 0, 6.283);
                        x.fillStyle = s.b ? `rgba(165,201,255,${s.l * .9})` : `rgba(190,255,244,${s.l * .9})`;
                        x.fill();
                    }
                    for (let i = R.length - 1; i >= 0; i--) {
                        const r = R[i];
                        r.r += 5.5;
                        r.a *= .955;
                        if (r.a < .02) {
                            R.splice(i, 1);
                            continue;
                        }
                        x.beginPath();
                        x.arc(r.x, r.y, r.r, 0, 6.283);
                        x.strokeStyle = `rgba(165,245,230,${r.a})`;
                        x.lineWidth = 2;
                        x.stroke();
                    }
                    nextStar -= dt;
                    if (nextStar <= 0 && !star) {
                        const fromLeft = Math.random() < .5;
                        star = {
                            x: fromLeft ? rnd(0, W * .5) : rnd(W * .5, W),
                            y: rnd(0, H * .4),
                            vx: (fromLeft ? 1 : -1) * rnd(9, 14),
                            vy: rnd(3.5, 6),
                            l: 1
                        };
                        nextStar = rnd(2200, 5200);
                    }
                    if (star) {
                        star.x += star.vx;
                        star.y += star.vy;
                        star.l -= .018;
                        if (star.l <= 0 || star.x < -80 || star.x > W + 80 || star.y > H + 80) star = null;
                        else {
                            const g2 = x.createLinearGradient(star.x, star.y, star.x - star.vx * 9, star.y - star.vy * 9);
                            g2.addColorStop(0, `rgba(235,255,250,${star.l})`);
                            g2.addColorStop(1, 'rgba(140,231,216,0)');
                            x.strokeStyle = g2;
                            x.lineWidth = 2;
                            x.lineCap = 'round';
                            x.beginPath();
                            x.moveTo(star.x, star.y);
                            x.lineTo(star.x - star.vx * 9, star.y - star.vy * 9);
                            x.stroke();
                        }
                    }
                };
                size();
                window.addEventListener('resize', size);
                if (reducedMotion) {
                    draw(false, 0);
                    return;
                }
                let last = performance.now();
                const loop = (now) => {
                    if (!root.isConnected) {
                        window.removeEventListener('resize', size);
                        return;
                    }
                    const dt = Math.min(64, now - last);
                    last = now;
                    if (!document.hidden) draw(true, dt);
                    requestAnimationFrame(loop);
                };
                requestAnimationFrame(loop);
            })();
        })();

;
        (() => {
            const K = 'novix.side.mini.v3',
                b = document.body,
                side = document.querySelector('.side');
            if (!side) return;
            const mq = matchMedia('(min-width:901px)'),
                rtl = () => document.documentElement.dir === 'rtl',
                MIN = 76,
                MAX = 214;
            const fsBtn = document.getElementById('fsBtn'),
                fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
            const labels = () => {
                if (fsBtn) {
                    const a = rtl(),
                        on = !!fsEl(),
                        t = a ? (on ? 'الخروج من ملء الشاشة' : 'ملء الشاشة') : (on ? 'Exit full screen' : 'Full screen');
                    fsBtn.title = t;
                    fsBtn.setAttribute('aria-label', t);
                    b.classList.toggle('is-fs', on)
                }
            };
            labels();
            new MutationObserver(labels).observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['dir', 'lang']
            });
            let mini = false;
            try {
                mini = localStorage.getItem(K) === '1'
            } catch (e) {}
            const setMini = (m, persist) => {
                mini = m;
                b.classList.toggle('side-collapsed', m);
                if (persist) {
                    try {
                        localStorage.setItem(K, m ? '1' : '0')
                    } catch (e) {}
                }
            };
            if (mini) setMini(true, false);
            let st = null,
                swallow = false;
            side.addEventListener('pointerdown', e => {
                if (!mq.matches || (e.pointerType === 'mouse' && e.button !== 0)) return;
                const w0 = mini ? MIN : MAX;
                st = {
                    id: e.pointerId,
                    x: e.clientX,
                    y: e.clientY,
                    drag: false,
                    w0,
                    w: w0,
                    last: e.clientX,
                    v: 0
                }
            });
            addEventListener('pointermove', e => {
                if (!st || e.pointerId !== st.id) return;
                const s = rtl() ? -1 : 1,
                    dx = (e.clientX - st.x) * s,
                    dy = e.clientY - st.y;
                if (!st.drag) {
                    if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) {
                        if (Math.abs(dy) > 16 && Math.abs(dy) > Math.abs(dx)) st = null;
                        return
                    }
                    st.drag = true;
                    try {
                        side.setPointerCapture(e.pointerId)
                    } catch (_) {}
                    b.classList.add('side-dragging')
                }
                st.v = (e.clientX - st.last) * s;
                st.last = e.clientX;
                st.w = Math.max(MIN, Math.min(MAX, st.w0 + dx));
                b.style.setProperty('--sw', st.w + 'px');
                b.classList.toggle('side-collapsed', st.w < 150)
            });
            const end = e => {
                if (!st || e.pointerId !== st.id) return;
                const d = st;
                st = null;
                if (!d.drag) return;
                swallow = true;
                setTimeout(() => {
                    swallow = false
                }, 80);
                const expand = d.v > 6 ? true : d.v < -6 ? false : d.w > (MIN + MAX) / 2;
                setMini(!expand, true);
                b.style.removeProperty('--sw');
                b.classList.remove('side-dragging')
            };
            addEventListener('pointerup', end);
            addEventListener('pointercancel', end);
            addEventListener('click', e => {
                if (swallow) {
                    e.stopPropagation();
                    e.preventDefault()
                }
            }, true);
            if (fsBtn) {
                const de = document.documentElement;
                if (!(de.requestFullscreen || de.webkitRequestFullscreen)) fsBtn.style.display = 'none';
                fsBtn.addEventListener('click', () => {
                    try {
                        if (fsEl())(document.exitFullscreen || document.webkitExitFullscreen).call(document);
                        else(de.requestFullscreen || de.webkitRequestFullscreen).call(de)
                    } catch (_) {}
                });
                document.addEventListener('fullscreenchange', labels);
                document.addEventListener('webkitfullscreenchange', labels)
            }
        })();

;
(() => {
            const st = document.getElementById('fxStage'),
                btn = document.getElementById('fxBgPickerBtn'),
                cv = document.getElementById('fxBg');
            if (!st || !btn) return;
            const IMG = {
                    dawn: "assets/img/focus-dawn.webp",
                    space: "assets/img/focus-space.webp",
                    aurora: "assets/img/focus-aurora.webp",
                    sunset: "assets/img/focus-sunset.webp"
                },
                KEY = 'novix.focus.background.v3',
                IDX = 'fxbg:index',
                MAX = 8,
                ar = () => document.documentElement.lang === 'ar',
                T = (e, a) => ar() ? a : e;
            const OPT = {
                cine: ['Deep space', 'فضاء عميق', 'Animated · drifting nebulae', 'متحرك · سدم تتحرك ببطء'],
                dawn: ['Dawn', 'الفجر', 'Still · 4K sky', 'ثابتة · سماء 4K'],
                space: ['Starfield', 'حقل النجوم', 'Still · deep sky', 'ثابتة · سماء عميقة'],
                aurora: ['Aurora', 'الشفق القطبي', 'Still · northern lights', 'ثابتة · الأضواء الشمالية'],
                sunset: ['Sunset', 'الغروب', 'Still · warm horizon', 'ثابتة · أفق دافئ']
            };
            let customs = [],
                mode = 'cine',
                items = [];
            const bk = id => id === 'legacy' ? 'fxbg' : 'fxbg:' + id,
                isC = m => typeof m === 'string' && m.indexOf('c:') === 0,
                urlOf = m => {
                    if (isC(m)) {
                        const c = customs.find(x => x.id === m.slice(2));
                        return c && c.url
                    }
                    return IMG[m]
                };
            const CK = '<svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                TRASH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.2a1.8 1.8 0 0 0 1.8 1.6h6.4a1.8 1.8 0 0 0 1.8-1.6L18 7M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7"/></svg>';
            const menu = document.createElement('div');
            menu.className = 'fx-menu';
            menu.hidden = true;
            menu.setAttribute('role', 'menu');
            st.appendChild(menu);
            const label = () => {
                btn.setAttribute('aria-label', T('Background', 'الخلفية'));
                btn.title = T('Background', 'الخلفية')
            };
            const radio = (k, title, sub, u, cls) => '<button type="button" role="menuitemradio" aria-checked="' + (k === mode) + '" data-w="' + k + '"><i class="fx-th' + (cls || '') + '"' + (u ? ' style=\'background-image:url("' + u + '")\'' : '') + '></i><span><b>' + title + '</b><small>' + sub + '</small></span>' + CK + '</button>';

            function build() {
                let h = '<div class="fx-menu-h">' + T('Background', 'الخلفية') + '</div>';
                ['cine', 'dawn', 'space', 'aurora', 'sunset'].forEach(k => {
                    const o = OPT[k];
                    h += radio(k, ar() ? o[1] : o[0], ar() ? o[3] : o[2], IMG[k], k === 'cine' ? ' cine' : '')
                });
                if (customs.length) {
                    h += '<div class="fx-menu-h fx-menu-h2">' + T('My images', 'صوري') + '</div>';
                    customs.forEach((c, i) => {
                        const dl = T('Delete image', 'حذف الصورة');
                        h += '<div class="fx-row">' + radio('c:' + c.id, T('My image ', 'صورتي ') + (i + 1), T('Imported', 'مستوردة'), c.url) + '<button type="button" class="fx-del" data-x="' + c.id + '" aria-label="' + dl + '" title="' + dl + '">' + TRASH + '</button></div>'
                    })
                }
                const full = customs.length >= MAX;
                h += '<hr><button type="button" role="menuitem" data-a="imp"' + (full ? ' aria-disabled="true"' : '') + '><i class="fx-th">＋</i><span><b>' + T('Import image…', 'استيراد صورة…') + '</b><small>' + (full ? T('Limit reached', 'وصلت للحد الأقصى') : T('Saved on this device', 'تتحفظ على الجهاز')) + '</small></span></button><input class="fx-bg-file" type="file" accept="image/*" multiple>';
                menu.innerHTML = h;
                items = [...menu.querySelectorAll('button')]
            }

            function place() {
                const s = st.getBoundingClientRect(),
                    b = btn.getBoundingClientRect(),
                    w = Math.min(310, s.width - 24);
                menu.style.width = w + 'px';
                menu.style.top = (b.bottom - s.top + 10) + 'px';
                menu.style.left = Math.max(12, Math.min(b.right - s.left - w, s.width - w - 12)) + 'px'
            }

            function open() {
                build();
                place();
                menu.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
                (menu.querySelector('[aria-checked="true"]') || items[0]).focus()
            }

            function close(f) {
                menu.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
                if (f) btn.focus()
            }

            function profile(u) {
                const im = new Image();
                im.onload = () => {
                    try {
                        const w = 48,
                            h = 27,
                            c = document.createElement('canvas');
                        c.width = w;
                        c.height = h;
                        const x = c.getContext('2d', {
                                willReadFrequently: true
                            }),
                            iw = im.naturalWidth,
                            ih = im.naturalHeight,
                            ia = 16 / 9;
                        let sw = iw,
                            sh = ih,
                            sx = 0,
                            sy = 0;
                        if (iw / ih > ia) {
                            sw = ih * ia;
                            sx = (iw - sw) / 2
                        } else {
                            sh = iw / ia;
                            sy = (ih - sh) * .48
                        }
                        x.drawImage(im, sx, sy, sw, sh, 0, 0, w, h);
                        const d = x.getImageData(0, 0, w, h).data,
                            px = [];
                        let L = 0,
                            R = 0,
                            G = 0,
                            B = 0;
                        for (let i = 0; i < d.length; i += 4) {
                            const l = (.2126 * d[i] + .7152 * d[i + 1] + .0722 * d[i + 2]) / 255;
                            px.push({
                                i: i / 4,
                                l,
                                r: d[i],
                                g: d[i + 1],
                                b: d[i + 2]
                            });
                            L += l;
                            R += d[i];
                            G += d[i + 1];
                            B += d[i + 2]
                        }
                        const n = px.length,
                            lum = L / n,
                            top = px.slice().sort((a, b) => b.l - a.l).slice(0, Math.ceil(n * .08));
                        let ar = 0,
                            ag = 0,
                            ab = 0,
                            gu = 0,
                            gv = 0,
                            gw = 0;
                        top.forEach(p => {
                            ar += p.r;
                            ag += p.g;
                            ab += p.b;
                            const wgt = p.l ** 3;
                            gu += (p.i % w + .5) / w * wgt;
                            gv += (Math.floor(p.i / w) + .5) / h * wgt;
                            gw += wgt
                        });
                        const t = top.length || 1,
                            s = Math.max(0, Math.min(1, (top[0].l - lum) * 1.6));
                        cv.__prof = {
                            lum,
                            avg: [R, G, B].map(v => Math.round(v / n)),
                            accent: [ar, ag, ab].map(v => Math.min(255, Math.round(v / t * 1.1 + 12))),
                            glow: s > .12 && gw ? {
                                u: gu / gw,
                                v: gv / gw,
                                s
                            } : null
                        }
                    } catch (e) {}
                };
                im.src = u
            }

            function apply(m) {
                if (isC(m) && !urlOf(m)) m = 'cine';
                mode = m;
                const u = urlOf(m);
                st.dataset.bg = isC(m) ? 'custom' : m;
                cv.dataset.mode = m === 'cine' ? 'cine' : 'img';
                cv.dataset.scene = isC(m) ? 'custom' : m;
                cv.__prof = null;
                if (isC(m) && u) profile(u);
                if (u) st.style.setProperty('--fx-bg-image', 'url("' + new URL(u, document.baseURI).href + '")');
                try {
                    localStorage.setItem(KEY, m)
                } catch (e) {}
                if (cv.__go) cv.__go()
            }
            async function shrink(f) {
                let src, w, h;
                try {
                    src = await createImageBitmap(f);
                    w = src.width;
                    h = src.height
                } catch (e) {
                    src = await new Promise((ok, no) => {
                        const im = new Image();
                        im.onload = () => ok(im);
                        im.onerror = no;
                        im.src = URL.createObjectURL(f)
                    });
                    w = src.naturalWidth;
                    h = src.naturalHeight
                }
                const k = Math.min(1, 3840 / Math.max(w, h)),
                    c = document.createElement('canvas');
                c.width = Math.round(w * k);
                c.height = Math.round(h * k);
                c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
                const bl = await new Promise(r => c.toBlob(r, 'image/webp', .9));
                if (!bl) throw new Error('encode');
                return bl
            }
            async function removeImg(id) {
                const c = customs.find(x => x.id === id);
                if (!c) return;
                customs.splice(customs.indexOf(c), 1);
                if (mode === 'c:' + id) apply('cine');
                try {
                    URL.revokeObjectURL(c.url)
                } catch (e) {}
                try {
                    await NXSTORE.raw.del(bk(id));
                    await NXSTORE.raw.put(IDX, customs.map(x => x.id))
                } catch (e) {}
                build();
                place();
                (menu.querySelector('.fx-del') || menu.querySelector('[aria-checked="true"]') || items[0]).focus()
            }
            btn.onclick = () => menu.hidden ? open() : close();
            document.addEventListener('pointerdown', e => {
                if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) close()
            });
            menu.addEventListener('keydown', e => {
                const i = items.indexOf(document.activeElement);
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    items[(i + 1) % items.length].focus()
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    items[(i - 1 + items.length) % items.length].focus()
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    close(1)
                } else if (e.key === 'Tab') close()
            });
            menu.addEventListener('click', e => {
                const x = e.target.closest('.fx-del');
                if (x) {
                    removeImg(x.dataset.x);
                    return
                }
                const b = e.target.closest('button');
                if (!b) return;
                if (b.dataset.w) {
                    apply(b.dataset.w);
                    close(1)
                } else if (b.dataset.a === 'imp' && b.getAttribute('aria-disabled') !== 'true') menu.querySelector('.fx-bg-file').click()
            });
            menu.addEventListener('change', async e => {
                if (!e.target.matches('.fx-bg-file')) return;
                const files = [...e.target.files].slice(0, MAX - customs.length);
                let last = null;
                for (const f of files) {
                    try {
                        const bl = await shrink(f),
                            id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
                        await NXSTORE.raw.put(bk(id), bl);
                        customs.push({
                            id,
                            url: URL.createObjectURL(bl)
                        });
                        await NXSTORE.raw.put(IDX, customs.map(x => x.id));
                        last = id
                    } catch (x) {}
                }
                if (last) apply('c:' + last);
                build();
                place();
                (menu.querySelector('[aria-checked="true"]') || items[0]).focus()
            });
            addEventListener('resize', () => {
                if (!menu.hidden) place()
            });
            addEventListener('novix:lang', () => {
                label();
                if (!menu.hidden) {
                    build();
                    place()
                }
            });
            let want = 'cine';
            try {
                want = localStorage.getItem(KEY) || 'cine'
            } catch (e) {}
            if (want === 'custom') want = 'c:legacy';
            label();
            apply(isC(want) ? 'cine' : want);
            (async () => {
                try {
                    let ids = await NXSTORE.raw.get(IDX);
                    if (!Array.isArray(ids)) {
                        ids = [];
                        if (await NXSTORE.raw.get('fxbg')) {
                            ids = ['legacy'];
                            await NXSTORE.raw.put(IDX, ids)
                        }
                    }
                    for (const id of ids) {
                        const bl = await NXSTORE.raw.get(bk(id));
                        if (bl) customs.push({
                            id,
                            url: URL.createObjectURL(bl)
                        })
                    }
                    if (isC(want)) apply(want)
                } catch (e) {}
            })();
        })();

;
        (() => {
            const MP4 = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAM2bW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAB9AAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAmB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAB9AAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAEAAAABAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAfQAAAAAAABAAAAAAHYbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABAAAAAgABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABg21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAUNzdGJsAAAAu3N0c2QAAAAAAAAAAQAAAKthdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAQABIAAAASAAAAAAAAAABFUxhdmM2MC4zMS4xMDIgbGlieDI2NAAAAAAAAAAAAAAAGP//AAAAMWF2Y0MBQsAK/+EAGGdCwAqmERCbARAAAAMAEAAAAwBA8SJhGAEABmjIQgOSyAAAABBwYXNwAAAAAQAAAAEAAAAUYnRydAAAAAAAAAq0AAAKtAAAABhzdHRzAAAAAAAAAAEAAAAEAAAgAAAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAEAAAAAQAAACRzdHN6AAAAAAAAAAAAAAAEAAACjQAAAAoAAAALAAAACwAAABRzdGNvAAAAAAAAAAEAAANmAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY2MC4xNi4xMDAAAAAIZnJlZQAAArVtZGF0AAACbwYF//9r3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE2NCByMzEwOCAzMWUxOWY5IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAyMyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTAgcmVmPTE2IGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMzEgbWU9dW1oIHN1Ym1lPTEwIHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MjQgY2hyb21hX21lPTEgdHJlbGxpcz0yIDh4OGRjdD0wIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9MSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTAgd2VpZ2h0cD0wIGtleWludD00IGtleWludF9taW49MSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQgcmM9Y3JmIG1idHJlZT0xIGNyZj00MC4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAFmWIggKeTFAAEge+++uuuuuuuuuuuvAAAAAGQZocBTwjAAAAB0GaKgFPCMAAAAAHQZo7AS8IwA==',
                WEBM = 'data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAIxEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHYTbuMU6uEElTDZ1OsggEeTbuMU6uEHFO7a1OsggIb7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsirXsYMPQkBNgI1MYXZmNjAuMTYuMTAwV0GNTGF2ZjYwLjE2LjEwMESJiECfQAAAAAAAFlSua8GuAQAAAAAAADjXgQFzxYhIqMh2MtBGnJyBACK1nIN1bmSIgQCGhVZfVlA4g4EBI+ODhB3NZQDgibCBQLqBQJqBAhJUw2f8c3OgY8CAZ8iaRaOHRU5DT0RFUkSHjUxhdmY2MC4xNi4xMDBzc9ZjwItjxYhIqMh2MtBGnGfIoUWjh0VOQ09ERVJEh5RMYXZjNjAuMzEuMTAyIGxpYnZweGfIoUWjiERVUkFUSU9ORIeTMDA6MDA6MDIuMDAwMDAwMDAwAB9DtnX354EAo6qBAACA8AIAnQEqQABAAABHCIWFiIWEiAICAAZwPEJgCrIg9zAA/v+rUICjloEB9ADRAQABEBAAGAAYWC/0AAiOgACjloED6ADRAQABEBAAGAAYWC/0AAiOgACjloEF3ADRAQABEBAAGAAYWC/0AAiOgAAcU7trkbuPs4EAt4r3gQHxggGf8IED';
            let want = false,
                lock = null,
                asking = false,
                failed = !('wakeLock' in navigator),
                vid = null,
                stopT = 0;

            function video() {
                if (vid) return vid;
                vid = document.createElement('video');
                vid.setAttribute('playsinline', '');
                vid.setAttribute('webkit-playsinline', '');
                vid.setAttribute('muted', '');
                vid.setAttribute('aria-hidden', 'true');
                vid.setAttribute('tabindex', '-1');
                vid.muted = true;
                vid.loop = true;
                vid.defaultMuted = true;
                vid.disableRemotePlayback = true;
                vid.style.cssText = 'position:fixed;left:0;bottom:0;width:2px;height:2px;opacity:.02;pointer-events:none;z-index:-1';
                for (const [u, ty] of [
                        [MP4, 'video/mp4'],
                        [WEBM, 'video/webm']
                    ]) {
                    const s = document.createElement('source');
                    s.src = u;
                    s.type = ty;
                    vid.appendChild(s)
                }
                document.body.appendChild(vid);
                return vid
            }

            function vidOn() {
                clearTimeout(stopT);
                const v = video();
                if (v.paused) {
                    const p = v.play();
                    if (p && p.catch) p.catch(() => {})
                }
            }

            function vidOff() {
                clearTimeout(stopT);
                stopT = setTimeout(() => {
                    if (vid && !want) vid.pause()
                }, 2500)
            }

            function lockOn() {
                if (failed || lock || asking || document.hidden) return;
                asking = true;
                navigator.wakeLock.request('screen').then(l => {
                    asking = false;
                    if (!want) {
                        l.release().catch(() => {});
                        return
                    }
                    lock = l;
                    l.addEventListener('release', () => {
                        if (lock === l) lock = null
                    })
                }).catch(() => {
                    asking = false;
                    failed = true;
                    if (want) vidOn()
                })
            }

            function lockOff() {
                if (!lock) return;
                const l = lock;
                lock = null;
                l.release().catch(() => {})
            }

            function sync() {
                if (want) {
                    lockOn();
                    if (failed) vidOn()
                } else {
                    lockOff();
                    vidOff()
                }
            }
            window.__nxAwake = on => {
                want = !!on;
                sync()
            };
            document.addEventListener('visibilitychange', () => {
                if (want && !document.hidden) {
                    lock = null;
                    sync();
                    if (vid && vid.paused && failed) vidOn()
                }
            });
            setInterval(() => {
                if (!want || document.hidden) return;
                if (!failed && !lock) lockOn();
                if (failed && vid && vid.paused) vidOn()
            }, 4000);
            addEventListener('pagehide', () => {
                want = false;
                lockOff()
            })
        })();

;
(() => {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    const tr = k => (window.NXTR ? window.NXTR(k) : k);
    const toast = m => {
        if (window.NXTOAST) window.NXTOAST(m);
    };
    let reg = null,
        waiting = null,
        base = null,
        baseV = null,
        running = null,
        quiet = false,
        lastAuto = 0,
        state = 'idle',
        hadController = !!navigator.serviceWorker.controller;

    const hash = s => {
        let h = 5381;
        for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
        return String(h);
    };
    const fingerprint = async res => hash(await res.clone().text());

    const remoteVersion = async () => {
        const r = await fetch('version.json?t=' + Date.now(), {
            cache: 'no-store'
        });
        if (!r.ok) return null;
        try {
            const j = await r.json();
            return j && j.v ? String(j.v) : null;
        } catch (e) {
            return null;
        }
    };

    const files = () => {
        const set = new Set([location.origin + location.pathname]);
        performance.getEntriesByType('resource').forEach(e => {
            const u = e.name.split('#')[0].split('?')[0];
            if (u.indexOf(location.origin) === 0 && /\.(?:js|css|webmanifest)$/i.test(u) && !/pdf\.worker/.test(u)) set.add(u);
        });
        return [...set];
    };

    const snapshot = async () => {
        const out = {};
        await Promise.all(files().map(async u => {
            const r = await fetch(u, {
                cache: 'no-cache'
            });
            if (!r.ok) throw new Error(u);
            out[u] = await fingerprint(r);
        }));
        return out;
    };

    const same = (a, b) => {
        const ka = Object.keys(a);
        return ka.every(k => !(k in b) || a[k] === b[k]);
    };

    const check = () => {
        if (running) return running;
        running = (async () => {
            try {
                if (reg) await reg.update().catch(() => {});
                if (reg && reg.waiting && navigator.serviceWorker.controller) {
                    waiting = reg.waiting;
                    return 'update';
                }
                const v = await remoteVersion();
                if (v) {
                    if (!baseV) {
                        baseV = v;
                        return 'same';
                    }
                    return v === baseV ? 'same' : 'update';
                }
                const now = await snapshot();
                if (!base) {
                    base = now;
                    return 'same';
                }
                return same(base, now) ? 'same' : 'update';
            } catch (e) {
                return 'error';
            } finally {
                running = null;
            }
        })();
        return running;
    };

    const apply = () => {
        if (waiting) waiting.postMessage({
            type: 'SKIP_WAITING'
        });
        else location.reload();
    };

    let bar = null;
    const barText = () => {
        if (!bar) return;
        bar.querySelector('span').textContent = tr('A new version of NOVIX is available');
        bar.querySelector('.nx-upd-go').textContent = tr('Update now');
        bar.querySelector('.nx-upd-x').setAttribute('aria-label', tr('Close'));
    };
    const showBar = () => {
        if (bar || quiet) return;
        bar = document.createElement('div');
        bar.id = 'nx-update-bar';
        bar.setAttribute('role', 'status');
        bar.innerHTML = '<span></span><button type="button" class="nx-upd-go"></button><button type="button" class="nx-upd-x">×</button>';
        bar.querySelector('.nx-upd-go').onclick = e => {
            e.currentTarget.disabled = true;
            apply();
        };
        bar.querySelector('.nx-upd-x').onclick = () => {
            quiet = true;
            bar.remove();
            bar = null;
        };
        document.body.appendChild(bar);
        barText();
    };

    const btn = () => document.getElementById('updBtn');
    const label = () => {
        const b = btn();
        if (!b) return;
        const t = b.querySelector('#updTxt');
        if (t) t.textContent = tr(state === 'checking' ? 'Checking…' : state === 'updating' ? 'Updating…' : state === 'ok' ? "You're up to date" : 'Check for updates');
        b.disabled = state === 'checking' || state === 'updating';
    };
    const setState = s => {
        state = s;
        label();
    };

    const manual = async () => {
        if (state !== 'idle') return;
        setState('checking');
        const r = await check();
        if (r === 'update') {
            setState('updating');
            apply();
            return;
        }
        if (r === 'error') {
            toast(tr("Couldn't check for updates. Check your connection."));
            setState('idle');
            return;
        }
        setState('ok');
        setTimeout(() => setState('idle'), 2500);
    };

    const auto = async () => {
        if (quiet || bar || state !== 'idle') return;
        if (await check() === 'update') showBar();
    };

    document.addEventListener('click', e => {
        if (e.target.closest && e.target.closest('#updBtn')) manual();
    });
    addEventListener('novix:lang', () => {
        barText();
        label();
    });
    label();

    const start = () => {
        navigator.serviceWorker.register('sw.js').then(r => {
            reg = r;
            const offer = w => {
                waiting = w;
                showBar();
            };
            if (r.waiting && navigator.serviceWorker.controller) offer(r.waiting);
            r.addEventListener('updatefound', () => {
                const w = r.installing;
                if (!w) return;
                w.addEventListener('statechange', () => {
                    if (w.state === 'installed' && navigator.serviceWorker.controller) offer(w);
                });
            });
        }).catch(() => {});

        let reloading = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!hadController) {
                hadController = true;
                return;
            }
            if (reloading) return;
            reloading = true;
            location.reload();
        });

        check();
        document.addEventListener('visibilitychange', () => {
            if (document.hidden || Date.now() - lastAuto < 60000) return;
            lastAuto = Date.now();
            auto();
        });
        addEventListener('online', auto);
        setInterval(auto, 30 * 60 * 1000);
    };

    if (document.readyState === 'complete') start();
    else addEventListener('load', start, {
        once: true
    });
})();

;
