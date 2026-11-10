        (() => {
            const SOON = ['sims', 'smartboard'];
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
            const HUES = [
                    ['#2f8d78', '#5fc2a4'],
                    ['#2e6fa5', '#6fb5d6'],
                    ['#7a56b8', '#a98be0'],
                    ['#c2792f', '#f0b45f'],
                    ['#b04a6a', '#e58aa5'],
                    ['#3a7a8a', '#7fc7d1']
                ],
                hue = s => HUES[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % HUES.length],
                PAL = [
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
                return `<div class="task ${x.d?'done':''}" data-id="${x.id}"><button class="chk" role="checkbox" aria-checked="${!!x.d}" aria-label="${esc(tr(x.t))}">${ic('ck')}</button>${x.v&&!full?ic('play'):''}<span class="t">${esc(tr(x.t))}</span><span class="pill ${x.p}">${tr(DIFF[x.p]||x.p)}</span>${full?`<button class="x" data-del="${x.id}" aria-label="${tr('Delete')}">${ic('x')}</button>`:''}</div>`
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
                try {
                    const f = await idbGet(id);
                    if (!f) throw 0;
                    const u = URL.createObjectURL(f),
                        a = document.createElement('a');
                    a.href = u;
                    a.rel = 'noopener';
                    if (/pdf|image/.test(f.type)) a.target = '_blank';
                    else a.download = b.fn;
                    a.click();
                    setTimeout(() => URL.revokeObjectURL(u), 6e4);
                    SFX.tap()
                } catch (e) {
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
                return `<article class="nn-card" tabindex="0" role="button" data-nid="${n.id}" style="background:${cl(n.pc,'#fff3b0')};${tx(n,n.body)}">${n.pin?`<svg class="i nn-pinned"><use href="#i-pin"/></svg>`:''}<h3 dir="auto" style="${tx(tOf(n),n.title)};${tbg(tOf(n))}">${esc(n.title||tr('Untitled'))}</h3><p class="nn-pv" dir="auto">${esc(body)||`<i>${tr('No additional text')}</i>`}</p><small>${fmtD(n.ts)}</small></article>`
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
 <div class="nm-top"><button type="button" class="nm-b nm-back" id="nmBack" aria-label="Back"><svg class="i flip"><use href="#i-cl"/></svg></button><span class="nm-date" id="nmDate"></span><span class="nm-sp"></span><button type="button" class="nm-b" id="nmPin" aria-pressed="false"><svg class="i"><use href="#i-pin"/></svg></button><button type="button" class="nm-b" id="nmDel" aria-label="Delete"><svg class="i"><use href="#i-trash"/></svg></button><button type="button" class="nm-ok" id="nmOk"><svg class="i"><use href="#i-ck"/></svg><span id="nmOkL">Save</span></button></div>
 <div class="nm-body" id="nmBody"><input id="nTitle" maxlength="80" dir="auto"><textarea id="nBody" dir="auto"></textarea></div>
 <div class="nm-pop" id="nmPop" hidden></div>
 <div class="nm-tools" id="nmTools">
  <span class="nm-g" id="nTgt"><button type="button" class="nm-t nm-tg" data-tgt="t"><b>T</b><small></small></button><button type="button" class="nm-t nm-tg" data-tgt="b"><b>Aa</b><small></small></button></span>
  <select id="nFont" aria-label="Font"></select>
  <span class="nm-g"><button type="button" class="nm-t" id="nSm"><b>A</b><small>−</small></button><b class="nm-sz" id="nSizeV">18</b><button type="button" class="nm-t" id="nSp"><b>A</b><small>+</small></button></span>
  <span class="nm-g"><button type="button" class="nm-t" id="nB"><b>B</b></button><button type="button" class="nm-t" id="nI"><i>I</i></button><button type="button" class="nm-t" id="nU"><u>U</u></button></span>
  <span class="nm-g"><button type="button" class="nm-t" data-al="left">⇤</button><button type="button" class="nm-t" data-al="center">≡</button><button type="button" class="nm-t" data-al="right">⇥</button></span>
  <span class="nm-g"><button type="button" class="nm-t nm-c" id="nTxtBtn" data-pop="tc"><b>A</b><i></i></button><button type="button" class="nm-t nm-c" id="nPapBtn" data-pop="pc"><span class="nm-pap"></span></button><button type="button" class="nm-t nm-c" id="nTbgBtn" data-pop="tb" aria-label="Title background" title="Title background"><b style="font-size:13px">T</b><span class="nm-pap nm-tbgdot"></span></button></span>
 </div></div>`;
            document.body.appendChild(nm);
            {
                const f = $('#nFont');
                f.innerHTML = FONTS.map((x, i) => `<option value="${i}" style="font-family:${x[1]}">${x[0]}</option>`).join('')
            }
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
                $('#nFont').value = C.font;
                $('#nB').setAttribute('aria-pressed', !!C.b);
                $('#nI').setAttribute('aria-pressed', !!C.i);
                $('#nU').setAttribute('aria-pressed', !!C.u);
                $$('#nmTools [data-al]').forEach(b => b.setAttribute('aria-pressed', b.dataset.al === physAl(C.al, ne.tgt === 't' ? $('#nTitle').value : $('#nBody').value)));
                $$('#nTgt .nm-tg').forEach(b => {
                    b.setAttribute('aria-pressed', b.dataset.tgt === ne.tgt);
                    b.querySelector('small').textContent = tr(b.dataset.tgt === 't' ? 'Title' : 'Body')
                });
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
                    nmPopK = '';
                    return
                }
                nmPopK = k;
                p.hidden = false;
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
            $('#nnPin').addEventListener('click', e => {
                const c = e.target.closest('[data-nid]');
                if (c) openNote(+c.dataset.nid)
            });
            $('#nnGrid').addEventListener('click', e => {
                const c = e.target.closest('[data-nid]');
                if (c) openNote(+c.dataset.nid)
            });
            [$('#nnPin'), $('#nnGrid')].forEach(g => g.addEventListener('keydown', e => {
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
                nmSched()
            };
            $('#nFont').onchange = e => {
                cur().font = +e.target.value;
                nmApply();
                nmSched()
            };
            $$('#nTgt [data-tgt]').forEach(b => b.onclick = () => {
                ne.tgt = b.dataset.tgt;
                nmPop('');
                nmApply();
                SFX.tap()
            });
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

            function entryHTML(e, k) {
                const dn = !!(e.done && e.done[k]);
                return `<div class="tt-e ${dn?'done':''}" style="--c:${cl(e.c,'#5fc2a4')}" data-tedit="${e.id}" role="button" tabindex="0"><span class="tt-tm">${e.time?esc(e.time):'<svg class="i"><use href="#i-cal"/></svg>'}</span><div class="tt-m"><span dir="auto">${esc(e.t)}</span><small>${e.time?'':tr('All day')}${e.rep?(e.time?'':' · ')+'↻':''}</small></div><button type="button" class="tt-ck" data-tck="${e.id}" data-k="${k}" role="checkbox" aria-checked="${dn}" aria-label="${esc(e.t)}">${ic('ck')}</button></div>`
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
 <label class="sh-f"><span>${'Title'}</span><input id="ttT" required maxlength="60" autocomplete="off" dir="auto"></label>
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

            function openTT(id, day) {
                const e = id != null ? S.tt.find(x => x.id === id) : null;
                ttEd = {
                    id: e ? e.id : null,
                    day: e ? e.day : (day != null ? day : weekDays(wk)[selIdx()].getDay())
                };
                $('#ttT').value = e ? e.t : '';
                $('#ttTime').value = e ? e.time || '' : '';
                $('#ttRep').checked = e ? !!e.rep : true;
                ttc = e ? cl(e.c, TTC[0]) : ttc;
                $('#ttDel').hidden = !e;
                $('#ttLink').innerHTML = `<option value="">${tr('Pick from My Tasks')}</option>` + S.tasks.filter(x => !x.d).map(x => `<option value="${x.id}">${esc(tr(x.t))}</option>`).join('');
                $('#ttLink').parentElement.hidden = !!e;
                ttLabels();
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
                if (t) $('#ttT').value = tr(t.t);
                e.target.value = ''
            };
            $('#ttNoTime').onclick = () => {
                $('#ttTime').value = ''
            };
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
                if (en) {
                    const chg = en.day !== day || en.rep !== rep;
                    Object.assign(en, {
                        t,
                        day,
                        time: $('#ttTime').value,
                        rep,
                        c: ttc
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
                    done: {}
                });
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
                const ap = document.querySelector('link[rel="apple-touch-icon"]'),
                    ico = ap ? ap.href : 'icons/icon-192.png';
                const o = {
                    body: msg,
                    tag: 'novix-' + ((go && (go.k || 'x')) || 'x') + '-' + ((go && go.id) || (go && go.tasks ? 'tasks' : 'd')),
                    icon: ico,
                    badge: ico,
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
                    reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration()
                } catch (x) {}
                if (reg && reg.showNotification) {
                    try {
                        await reg.showNotification('NOVIX', o);
                        return
                    } catch (x) {}
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

            function checkSchedule() {
                const now = new Date(),
                    k = ymd(now),
                    items = ttFor(now).filter(e => !(e.done && e.done[k])),
                    ar = isAr();
                let ch = 0;
                if (items.length && !S.nfired['d:' + k]) {
                    S.nfired['d:' + k] = 1;
                    ch = 1;
                    fireN(items.length === 1 ? (ar ? '📌 لديك مهمة مجدولة اليوم: ' : '📌 Scheduled today: ') + items[0].t + (items[0].time ? ' · ' + items[0].time : '') : (ar ? `📌 لديك ${items.length} مهام مجدولة اليوم` : `📌 You have ${items.length} scheduled tasks today`), {
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
                        fireN((ar ? `🔜 بعد ${due-mins} دقيقة: ` : `🔜 In ${due-mins} min: `) + e.t, {
                            k: k,
                            id: e.id
                        })
                    }
                    if (!S.nfired[key] && mins >= due) {
                        S.nfired[key] = 1;
                        ch = 1;
                        const late = mins - due;
                        if (late <= 720) fireN((late > 30 ? (ar ? '⏰ فاتك موعد: ' : '⏰ Missed: ') : (ar ? '⏰ حان موعد: ' : '⏰ Time for: ')) + e.t, {
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
                            msg: its.length === 1 ? (ar ? '📌 لديك مهمة مجدولة اليوم: ' : '📌 Scheduled today: ') + its[0].t + (its[0].time ? ' · ' + its[0].time : '') : (ar ? `📌 لديك ${its.length} مهام مجدولة اليوم` : `📌 You have ${its.length} scheduled tasks today`)
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
                                msg: (ar ? '🔜 بعد 10 دقائق: ' : '🔜 In 10 min: ') + e.t
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
                                msg: (ar ? '⏰ حان موعد: ' : '⏰ Time for: ') + e.t,
                                msg2: (ar ? '⏰ فاتك موعد: ' : '⏰ Missed: ') + e.t
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
                        l: [10, 15, 20, 30]
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
                    if (dlReady) RING.classList.toggle('locked', !!run);
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
                    $('#fxPre').innerHTML = PRE[fm].map(v => `<button type="button" data-v="${v}" class="${v===D[fm]?'on':''}" ${run?'disabled':''}>${v}</button>`).join('');
                    const mi = $('#fxMin');
                    if (document.activeElement !== mi) mi.value = D[fm];
                    mi.disabled = run;
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
                    if (!b || run) return;
                    D[fm] = +b.dataset.v;
                    rem = len(fm);
                    save2();
                    render()
                };
                $('#fxMin').onchange = e => {
                    D[fm] = Math.min(180, Math.max(1, Math.round(+e.target.value) || D[fm]));
                    if (!run) rem = len(fm);
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
                        m = Math.max(1, Math.min(180, Math.round(m)));
                        if (m === D[fm] || run || rem < len(fm)) return false;
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
                    if (!run) return;
                    if (dr) dEnd();
                    e.stopImmediatePropagation()
                }, true);
                RING.addEventListener('pointermove', e => {
                    if (!run) return;
                    if (dr) dEnd();
                    e.stopImmediatePropagation()
                }, true);
                RING.addEventListener('pointerdown', e => {
                    if (e.button > 0 || run) return;
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
                    if (run) return dEnd();
                    const a = angOf(e);
                    let dl = a - dr.a;
                    if (dl > 180) dl -= 360;
                    if (dl < -180) dl += 360;
                    dr.a = a;
                    if (dr.full) {
                        dr.acc = Math.max(6, Math.min(1080, dr.acc + dl));
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
                    if (run || rem < len(fm)) return;
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
                    if (run || rem < len(fm)) return;
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
                const hz = n => 440 * Math.pow(2, (n - 69) / 12);
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
                const nz = (t, d, v, ty, fr, dst) => {
                    const s = AC.createBufferSource();
                    s.buffer = NB;
                    const f = AC.createBiquadFilter();
                    f.type = ty;
                    f.frequency.value = fr;
                    const g = AC.createGain();
                    g.gain.setValueAtTime(v, t);
                    g.gain.exponentialRampToValueAtTime(.0001, t + d);
                    s.connect(f);
                    f.connect(g);
                    g.connect(dst);
                    s.start(t);
                    s.stop(t + d + .02)
                };
                const kick = (t, dst) => {
                    const o = AC.createOscillator(),
                        g = AC.createGain();
                    o.frequency.setValueAtTime(130, t);
                    o.frequency.exponentialRampToValueAtTime(42, t + .14);
                    g.gain.setValueAtTime(.55, t);
                    g.gain.exponentialRampToValueAtTime(.0001, t + .28);
                    o.connect(g);
                    g.connect(dst);
                    o.start(t);
                    o.stop(t + .3)
                };
                const echo = (time, fbk, wet) => {
                    const d = AC.createDelay(2);
                    d.delayTime.value = time;
                    const f = AC.createGain();
                    f.gain.value = fbk;
                    d.connect(f);
                    f.connect(d);
                    const w = AC.createGain();
                    w.gain.value = wet;
                    d.connect(w);
                    w.connect(bus);
                    return d
                };

                let IR = null,
                    RB = null;
                const verbIR = () => {
                    if (IR) return IR;
                    const sr = AC.sampleRate,
                        n = Math.floor(sr * 2.6);
                    IR = AC.createBuffer(2, n, sr);
                    for (let c = 0; c < 2; c++) {
                        const d = IR.getChannelData(c);
                        let y = 0;
                        for (let i = 0; i < n; i++) {
                            y += ((Math.random() * 2 - 1) - y) * .35;
                            d[i] = y * Math.pow(1 - i / n, 2.6) * (i < 700 ? i / 700 : 1)
                        }
                    }
                    return IR
                };
                const ep = (f, t, d, v, dst) => {
                    const out = AC.createGain(),
                        lp = AC.createBiquadFilter();
                    lp.type = 'lowpass';
                    lp.Q.value = .4;
                    lp.frequency.setValueAtTime(Math.min(4800, f * 6), t);
                    lp.frequency.exponentialRampToValueAtTime(Math.max(600, f * 1.6), t + d);
                    out.gain.setValueAtTime(.0001, t);
                    out.gain.linearRampToValueAtTime(v, t + .014);
                    out.gain.setTargetAtTime(.0001, t + .03, d / 4);
                    lp.connect(out);
                    out.connect(dst);
                    [
                        [1, 1, -4],
                        [1, .65, 5],
                        [2, .3, 0],
                        [3, .05, 0]
                    ].forEach(([m, a, dt], i) => {
                        const o = AC.createOscillator(),
                            g = AC.createGain();
                        o.type = 'sine';
                        o.frequency.value = f * m;
                        o.detune.value = dt;
                        g.gain.setValueAtTime(a, t);
                        if (i > 1) g.gain.setTargetAtTime(0, t, .18 / i);
                        o.connect(g);
                        g.connect(lp);
                        o.start(t);
                        o.stop(t + d * 1.5 + .2)
                    })
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
                const nzb = (t, d, v, ty, fr, q, dst) => {
                    const s = AC.createBufferSource();
                    s.buffer = NB;
                    const f = AC.createBiquadFilter();
                    f.type = ty;
                    f.frequency.value = fr;
                    f.Q.value = q;
                    const g = AC.createGain();
                    g.gain.setValueAtTime(.0001, t);
                    g.gain.linearRampToValueAtTime(v, t + .004);
                    g.gain.setTargetAtTime(.0001, t + .006, d / 4);
                    s.connect(f);
                    f.connect(g);
                    g.connect(dst);
                    s.start(t, Math.random() * 1.5);
                    s.stop(t + d * 1.6 + .02)
                };
                const kk = (t, v, dst) => {
                    const o = AC.createOscillator(),
                        g = AC.createGain();
                    o.frequency.setValueAtTime(120, t);
                    o.frequency.exponentialRampToValueAtTime(48, t + .12);
                    g.gain.setValueAtTime(.0001, t);
                    g.gain.linearRampToValueAtTime(v, t + .004);
                    g.gain.setTargetAtTime(.0001, t + .02, .07);
                    o.connect(g);
                    g.connect(dst);
                    o.start(t);
                    o.stop(t + .5)
                };

                function lofi() {
                    const warm = AC.createBiquadFilter();
                    warm.type = 'lowpass';
                    warm.frequency.value = 3400;
                    warm.Q.value = .5;
                    warm.connect(bus);
                    const vg = AC.createGain();
                    vg.gain.value = .45;
                    const verb = AC.createConvolver();
                    verb.buffer = verbIR();
                    verb.connect(vg);
                    vg.connect(warm);
                    const dly = AC.createDelay(2),
                        fb = AC.createGain(),
                        dlp = AC.createBiquadFilter();
                    dly.delayTime.value = .38;
                    fb.gain.value = .3;
                    dlp.type = 'lowpass';
                    dlp.frequency.value = 1700;
                    dly.connect(dlp);
                    dlp.connect(fb);
                    fb.connect(dly);
                    dlp.connect(warm);
                    const mkB = (rv, dv) => {
                        const g = AC.createGain(),
                            r = AC.createGain(),
                            d = AC.createGain();
                        r.gain.value = rv;
                        d.gain.value = dv;
                        g.connect(warm);
                        g.connect(r);
                        r.connect(verb);
                        g.connect(d);
                        d.connect(dly);
                        return g
                    };
                    const kb = mkB(.45, .12),
                        mb = mkB(.6, .45),
                        dr = AC.createBiquadFilter();
                    dr.type = 'lowpass';
                    dr.frequency.value = 7000;
                    dr.connect(bus);
                    const sp = 60 / 76 / 4,
                        SW = sp * .3,
                        CH = [
                            [53, 57, 60, 64, 67],
                            [52, 55, 59, 62, 66],
                            [50, 53, 57, 60, 64],
                            [48, 52, 55, 59, 62]
                        ],
                        PEN = [72, 74, 76, 79, 81, 84],
                        jit = () => (Math.random() - .5) * .014;
                    let step = 0,
                        t = AC.currentTime + .15,
                        mi = 2;
                    st = setInterval(() => {
                        if (t < AC.currentTime) t = AC.currentTime + .05;
                        while (t < AC.currentTime + 1.4) {
                            const bar = Math.floor(step / 16) % 4,
                                s = step % 16,
                                tt = t + (s % 2 ? SW : 0) + jit(),
                                ch = CH[bar];
                            if (s === 0) {
                                ch.forEach((n, i) => ep(hz(n), tt + i * .022, sp * 13, .028, kb));
                                bs(hz(ch[0] - 12), tt, sp * 7, .3, warm);
                                kk(tt, .3, dr)
                            }
                            if (s === 10) {
                                if (Math.random() < .7) ch.slice(1).forEach((n, i) => ep(hz(n), tt + i * .02, sp * 4, .016, kb));
                                if (Math.random() < .75) bs(hz(ch[0] - 12 + (Math.random() < .5 ? 0 : 7)), tt, sp * 4, .2, warm);
                                kk(tt, .24, dr)
                            }
                            if (s === 4 || s === 12) {
                                nzb(tt, .16, .09, 'bandpass', 1700, .8, dr);
                                tone(190, tt, .09, 'sine', .05, dr, .003)
                            }
                            if (s % 2 === 0) nzb(tt, .035, s % 4 === 2 ? .02 : .012, 'highpass', 6500, .5, dr);
                            if (s % 2 === 0 && s !== 0 && Math.random() < .22) {
                                mi = Math.max(0, Math.min(PEN.length - 1, mi + [-2, -1, 1, 2][Math.floor(Math.random() * 4)]));
                                ep(hz(PEN[mi]), tt, sp * 5, .02, mb)
                            }
                            t += sp;
                            step++
                        }
                    }, 250)
                }

                function space() {
                    const lf = AC.createBiquadFilter();
                    lf.type = 'lowpass';
                    lf.frequency.value = 700;
                    lf.connect(bus);
                    const dl = echo(.7, .5, .5);
                    [110, 164.8, 220, 277.2].forEach(f => [-5, 5].forEach(dt => {
                        const o = AC.createOscillator(),
                            g = AC.createGain();
                        o.type = 'sawtooth';
                        o.frequency.value = f;
                        o.detune.value = dt;
                        g.gain.value = .022;
                        o.connect(g);
                        g.connect(lf);
                        o.start();
                        nodes.push(o)
                    }));
                    const l = AC.createOscillator(),
                        lg = AC.createGain();
                    l.frequency.value = .07;
                    lg.gain.value = 420;
                    l.connect(lg);
                    lg.connect(lf.frequency);
                    l.start();
                    nodes.push(l);
                    st = setInterval(() => {
                        const n = [76, 79, 83, 88, 91][Math.floor(Math.random() * 5)],
                            t = AC.currentTime + .05;
                        tone(hz(n), t, 4, 'sine', .05, bus, .05);
                        tone(hz(n), t, 4, 'sine', .05, dl, .05)
                    }, 2600)
                }

                const rainBuf = () => {
                    if (RB) return RB;
                    const sr = AC.sampleRate,
                        N = Math.floor(sr * 10),
                        X = Math.floor(sr * 1.5),
                        T = N + X;
                    RB = AC.createBuffer(2, N, sr);
                    let ss = 0,
                        nn = 0;
                    for (let c = 0; c < 2; c++) {
                        const raw = new Float32Array(T);
                        let b0 = 0,
                            b1 = 0,
                            b2 = 0,
                            b3 = 0,
                            b4 = 0,
                            b5 = 0,
                            b6 = 0;
                        for (let i = 0; i < T; i++) {
                            const w = Math.random() * 2 - 1;
                            b0 = .99886 * b0 + w * .0555179;
                            b1 = .99332 * b1 + w * .0750759;
                            b2 = .969 * b2 + w * .153852;
                            b3 = .8665 * b3 + w * .3104856;
                            b4 = .55 * b4 + w * .5329522;
                            b5 = -.7616 * b5 - w * .016898;
                            raw[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362) * .11;
                            b6 = w * .115926
                        }
                        const nd = Math.floor(T / sr * 70);
                        for (let k = 0; k < nd; k++) {
                            const p = Math.floor(Math.random() * T),
                                f = 2200 + Math.random() * 4300,
                                L = Math.floor(sr * (.006 + Math.random() * .014)),
                                a = (.05 + Math.random() * .16) * (Math.random() < .12 ? 1.8 : 1);
                            for (let j = 0; j < L && p + j < T; j++) raw[p + j] += a * Math.sin(6.2832 * f * j / sr) * Math.exp(-j / (L * .25))
                        }
                        const o = RB.getChannelData(c);
                        for (let i = 0; i < N; i++) {
                            if (i < X) {
                                const th = i / X * 1.5708;
                                o[i] = raw[i] * Math.sin(th) + raw[N + i] * Math.cos(th)
                            } else o[i] = raw[i];
                            ss += o[i] * o[i];
                            nn++
                        }
                    }
                    const k = .12 / Math.sqrt(ss / nn || 1);
                    for (let c = 0; c < 2; c++) {
                        const o = RB.getChannelData(c);
                        for (let i = 0; i < N; i++) o[i] = Math.tanh(o[i] * k * 1.2) * .85
                    }
                    return RB
                };

                function rain() {
                    const bed = (off, rate, hp, lpf, g0) => {
                        const s = AC.createBufferSource();
                        s.buffer = rainBuf();
                        s.loop = true;
                        s.playbackRate.value = rate;
                        const a = AC.createBiquadFilter();
                        a.type = 'highpass';
                        a.frequency.value = hp;
                        const b = AC.createBiquadFilter();
                        b.type = 'lowpass';
                        b.frequency.value = lpf;
                        const g = AC.createGain();
                        g.gain.value = g0;
                        s.connect(a);
                        a.connect(b);
                        b.connect(g);
                        g.connect(bus);
                        s.start(0, off);
                        nodes.push(s);
                        return g
                    };
                    const g1 = bed(0, 1, 260, 7800, 1);
                    bed(4.7, .9, 120, 1400, .7);
                    const l = AC.createOscillator(),
                        lg = AC.createGain();
                    l.frequency.value = .05;
                    lg.gain.value = .12;
                    l.connect(lg);
                    lg.connect(g1.gain);
                    l.start();
                    nodes.push(l)
                }
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
                    } else if (false) {
                        ac();
                        bus = AC.createGain();
                        bus.connect(MG);
                        playing = id;
                        space()
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
