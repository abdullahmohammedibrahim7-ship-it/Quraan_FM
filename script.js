/* ─── NAV & THEME ─── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const lnk = document.getElementById('nav-' + id);
  if (lnk) lnk.classList.add('active');
  if (id === 'prayer' && Object.keys(prayerTimes).length === 0) loadPrayers();
}
function toggleMenu() { document.getElementById('navLinks').classList.toggle('open'); }
function closeMenu()  { document.getElementById('navLinks').classList.remove('open'); }
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
  } else {
    body.setAttribute('data-theme', 'dark');
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"/>';
  }
}

/* ─── LIVE AUDIO ─── */
function togglePlayback() {
  const audio   = document.getElementById('quranAudio');
  const btnText = document.getElementById('btnText');
  const svgIcon = document.getElementById('svgIcon');
  if (audio.paused) {
    audio.play();
    btnText.textContent = 'إيقاف البث المؤقت';
    svgIcon.innerHTML   = '<path d="M2 1h3v12H2zm5 0h3v12H7z"/>';
  } else {
    audio.pause();
    btnText.textContent = 'فتح البث الصوتي المباشر';
    svgIcon.innerHTML   = '<path d="M1 1l10 6-10 6z"/>';
  }
}

/* ════════════════════════════════════════════════════════════════
   ▌ بيانات القرّاء + الروايات
   ▌ كل قارئ عنده مصفوفة "mushaf" فيها الروايات المتاحة
   ▌ baseUrl: الجزء الثابت من الرابط — الكود يضيف 001.mp3 .. 114.mp3
   ════════════════════════════════════════════════════════════════ */
const reciters = [
  {
    name: 'الشيخ محمد صديق المنشاوي',
    laqab: 'الصوت الباكي',
    img: './images/المنشاوي.jpg',
    bio: 'وُلد بسوهاج ١٩٢٠، حفظ القرآن في الثامنة. تميَّز بصوت خاشع ذي مسحة حزن. سجَّل ختمتَين مرتلة ومجوَّدة. توفي ١٩٦٩ تاركًا أكثر من ١٥٠ تسجيلًا.',
    tags: ['مرتل','مجوَّد','ختمة ٢٠٢٦ الجديدة'],
    featured: true,
    mushaf: [
      { label: 'المصحف المجوَّد', icon: '🎙️', desc: 'رواية حفص عن عاصم', baseUrl: 'https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/' },
      { label: 'المصحف المرتَّل', icon: '📖', desc: 'رواية حفص عن عاصم', baseUrl: 'https://server10.mp3quran.net/minsh/' },
    ]
  },
  {
    name: 'الشيخ محمد رفعت',
    laqab: 'أبو القرّاء',
    img: './images/محمد رفعت.jpg',
    bio: 'وُلد بالقاهرة ١٨٨٢، افتتح بثَّ الإذاعة المصرية عام ١٩٣٤. أول قارئ بالإذاعة. ترك ١٣٠٠ تلاوة لا تزال تُبثّ حتى اليوم.',
    tags: ['أول قارئ إذاعي','مجوَّد','تلاوات نادرة'],
    featured: false,
    mushaf: [
      { label: 'المصحف المرتَّل', icon: '📖', desc: 'رواية حفص عن عاصم', baseUrl: 'https://server14.mp3quran.net/refat/' },
    ]
  },
  {
    name: 'الشيخ عبدالباسط عبدالصمد',
    laqab: 'صوت السماء',
    img: './images/عبدالباسط عبدالصمد.jpg',
    bio: 'وُلد بمصر العليا ١٩٢٧. اشتُهر بأسلوبه الفريد في التجويد والمقامات. سجَّل القرآن كاملًا عدة مرات. صوت يُعدّ من أجمل الأصوات القرآنية عالميًا.',
    tags: ['مجوَّد','مرتل','تسجيلات دولية'],
    featured: false,
    mushaf: [
      { label: 'المصحف المجوَّد',         icon: '🎙️', desc: 'رواية حفص عن عاصم',  baseUrl: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/' },
      { label: 'المصحف المرتَّل',         icon: '📖', desc: 'رواية حفص عن عاصم',  baseUrl: 'https://server7.mp3quran.net/basit/' },
      { label: 'المصحف المرتَّل (ورش)',   icon: '📖', desc: 'رواية ورش عن نافع',  baseUrl: 'https://server7.mp3quran.net/basit/Rewayat-Warsh-A-n-Nafi/' },
    ]
  },
  {
    name: 'الشيخ محمود خليل الحصري',
    laqab: 'شيخ عموم المقارئ',
    img: './images/الحصري.jpg',
    bio: 'وُلد بكفر الشيخ ١٩١٧. شيخ عموم المقارئ المصرية. سجَّل القرآن بروايات متعددة وأسهم في توثيق علم التجويد.',
    tags: ['مجوَّد','مرتل','عدة روايات'],
    featured: false,
    mushaf: [
      { label: 'المصحف المجوَّد',              icon: '🎙️', desc: 'رواية حفص عن عاصم',       baseUrl: 'https://server13.mp3quran.net/husr/Almusshaf-Al-Mojawwad/' },
      { label: 'المصحف المرتَّل',              icon: '📖', desc: 'رواية حفص عن عاصم',       baseUrl: 'https://server13.mp3quran.net/husr/' },
      { label: 'المصحف المرتَّل (الدوري)',     icon: '📖', desc: 'رواية الدوري عن أبي عمرو', baseUrl: 'https://server13.mp3quran.net/husr/Rewayat-Aldori-A-n-Abi-Amr/' },
      { label: 'المصحف المرتَّل (ورش)',        icon: '📖', desc: 'رواية ورش عن نافع',        baseUrl: 'https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/' },
      { label: 'المصحف المرتَّل (قالون)',      icon: '📖', desc: 'رواية قالون عن نافع',      baseUrl: 'https://server13.mp3quran.net/husr/Rewayat-Qalon-A-n-Nafi/' },
    ]
  },
  {
    name: 'الشيخ مصطفى إسماعيل',
    laqab: 'أمير القرّاء',
    img: './images/مصطفي اسماعيل.jpg',
    bio: 'وُلد بالغربية ١٩٠٥. اشتُهر بسعة صدره الصوتي وتنوُّع مقاماته. يُعدّ أحد أعظم قرّاء مصر في القرن العشرين.',
    tags: ['مجوَّد','تسجيلات نادرة'],
    featured: false,
    mushaf: [
      { label: 'المصحف المجوَّد', icon: '🎙️', desc: 'رواية حفص عن عاصم', baseUrl: 'https://server8.mp3quran.net/mustafa/Almusshaf-Al-Mojawwad/' },
      { label: 'المصحف المرتَّل', icon: '📖', desc: 'رواية حفص عن عاصم', baseUrl: 'https://server8.mp3quran.net/mustafa/' },
    ]
  },
  {
    name: 'الشيخ محمود علي البنا',
    laqab: 'البلبل المصري',
    img: './images/البنا.jpg',
    bio: 'وُلد باليجيرة ١٩٢٦. تميَّز بعذوبة صوته وأداء المقامات. من أبرز وجوه الإذاعة المصرية لعقود.',
    tags: ['مجوَّد','تسجيلات إذاعية'],
    featured: false,
    mushaf: [
      { label: 'المصحف المجوَّد', icon: '🎙️', desc: 'رواية حفص عن عاصم', baseUrl: 'https://server8.mp3quran.net/bna/Almusshaf-Al-Mojawwad/' },
      { label: 'المصحف المرتَّل', icon: '📖', desc: 'رواية حفص عن عاصم', baseUrl: 'https://server8.mp3quran.net/bna/' },
    ]
  },
  {
    name: 'الشيخ محمد محمود الطبلاوي',
    laqab: 'شيخ القرّاء',
    img: './images/الطبلاوي.jpg',
    bio: 'وُلد بالقاهرة ١٩٣٨. من أبرز قرّاء الجيل المعاصر. يجمع بين عمق التجويد وجمال الأداء. قرأ في المسجد الحرام والأقصى.',
    tags: ['معاصر','مجوَّد','تسجيلات متعددة'],
    featured: false,
    mushaf: [] // لا توجد روابط متاحة
  },
  {
    name: 'الشيخ علي محمود',
    laqab: 'شيخ المنشدين',
    img: './images/علي محمود.jpg',
    bio: 'رائد فن الإنشاد الديني في مصر. من أوائل القرّاء الذين سجَّلوا بالإذاعة المصرية. ترك إرثًا ثريًا من التواشيح والتلاوات.',
    tags: ['تلاوات','تواشيح','تراث'],
    featured: false,
    mushaf: [] // لا توجد روابط متاحة
  },
  {
    name: 'الشيخ أبو العينين شعيشع',
    laqab: 'صوت الوجد',
    img: './images/الشيخ أبو العينين شعيشع.jpg',
    bio: 'من أبرز قرّاء القرن العشرين. تميَّز بأسلوب أدائي عاطفي عميق. له تسجيلات إذاعية كثيرة لا تزال تُبثّ.',
    tags: ['مجوَّد','تسجيلات إذاعية'],
    featured: false,
    mushaf: [] // لا توجد روابط متاحة
  },
  {
    name: 'الشيخ طه الفشني',
    laqab: 'العبقري الصوتي',
    img: './images/الشيخ طه الفشنيالشيخ طه الفشني.jpg',
    bio: 'اشتُهر بقدرته الفائقة على تطويع الصوت في المقامات المختلفة. من رواد التجويد الإذاعي في مصر.',
    tags: ['مجوَّد','مقامات'],
    featured: false,
    mushaf: [] // لا توجد روابط متاحة
  },
  {
    name: 'الشيخ كامل يوسف البهتيمي',
    laqab: 'صاحب الأداء الفريد',
    img: './images/الشيخ كامل يوسف البهتيمي.jpg',
    bio: 'من كبار قرّاء الإذاعة المصرية. اشتُهر بدقة أدائه وانضباط تجويده. شارك في تلاوات مشتركة مع المنشاوي.',
    tags: ['مجوَّد','تلاوات مشتركة'],
    featured: false,
    mushaf: [] // لا توجد روابط متاحة
  },
  {
    name: 'الشيخ راغب مصطفى غلوش',
    laqab: 'المجوَّد الدقيق',
    img: './images/الشيخ راغب مصطفى غلوش.jpg',
    bio: 'متخصص في علم التجويد والقراءات. سجَّل القرآن بروايات متعددة. يُعدّ مرجعًا علميًا في ضبط أحكام التلاوة.',
    tags: ['مجوَّد','عدة روايات','علمي'],
    featured: false,
    mushaf: [] // لا توجد روابط متاحة
  },
];

/* ─── بناء كارتات القرّاء ─── */
const grid = document.getElementById('reciters-grid');
reciters.forEach(r => {
  const card = document.createElement('div');
  const hasAudio = r.mushaf && r.mushaf.length > 0;
  card.className = 'reciter-card' + (r.featured ? ' featured' : '') + (!hasAudio ? ' no-audio' : '');
  card.innerHTML = `
    ${r.featured ? '<span class="featured-badge">⭐ مميز</span>' : ''}
    <div class="reciter-header">
      <div class="reciter-icon">
        ${r.img ? `<img src="${r.img}" alt="${r.name}">` : '👤'}
      </div>
      <div>
        <div class="reciter-name">${r.name}</div>
        <div class="reciter-laqab">${r.laqab}</div>
      </div>
    </div>
    <p class="reciter-bio">${r.bio}</p>
    <div class="reciter-tags">${r.tags.map(t=>`<span class="rtag">${t}</span>`).join('')}</div>
    ${!hasAudio ? '<div class="no-audio-badge">قريبًا</div>' : ''}
  `;
  if (hasAudio) card.onclick = () => openReciterDetail(r);
  grid.appendChild(card);
});

/* ─── SURAHS DATA ─── */
const surahs = [
  {n:1,name:'الفاتحة',type:'مكية',verses:7},{n:2,name:'البقرة',type:'مدنية',verses:286},
  {n:3,name:'آل عمران',type:'مدنية',verses:200},{n:4,name:'النساء',type:'مدنية',verses:176},
  {n:5,name:'المائدة',type:'مدنية',verses:120},{n:6,name:'الأنعام',type:'مكية',verses:165},
  {n:7,name:'الأعراف',type:'مكية',verses:206},{n:8,name:'الأنفال',type:'مدنية',verses:75},
  {n:9,name:'التوبة',type:'مدنية',verses:129},{n:10,name:'يونس',type:'مكية',verses:109},
  {n:11,name:'هود',type:'مكية',verses:123},{n:12,name:'يوسف',type:'مكية',verses:111},
  {n:13,name:'الرعد',type:'مدنية',verses:43},{n:14,name:'إبراهيم',type:'مكية',verses:52},
  {n:15,name:'الحجر',type:'مكية',verses:99},{n:16,name:'النحل',type:'مكية',verses:128},
  {n:17,name:'الإسراء',type:'مكية',verses:111},{n:18,name:'الكهف',type:'مكية',verses:110},
  {n:19,name:'مريم',type:'مكية',verses:98},{n:20,name:'طه',type:'مكية',verses:135},
  {n:21,name:'الأنبياء',type:'مكية',verses:112},{n:22,name:'الحج',type:'مدنية',verses:78},
  {n:23,name:'المؤمنون',type:'مكية',verses:118},{n:24,name:'النور',type:'مدنية',verses:64},
  {n:25,name:'الفرقان',type:'مكية',verses:77},{n:26,name:'الشعراء',type:'مكية',verses:227},
  {n:27,name:'النمل',type:'مكية',verses:93},{n:28,name:'القصص',type:'مكية',verses:88},
  {n:29,name:'العنكبوت',type:'مكية',verses:69},{n:30,name:'الروم',type:'مكية',verses:60},
  {n:31,name:'لقمان',type:'مكية',verses:34},{n:32,name:'السجدة',type:'مكية',verses:30},
  {n:33,name:'الأحزاب',type:'مدنية',verses:73},{n:34,name:'سبأ',type:'مكية',verses:54},
  {n:35,name:'فاطر',type:'مكية',verses:45},{n:36,name:'يس',type:'مكية',verses:83},
  {n:37,name:'الصافات',type:'مكية',verses:182},{n:38,name:'ص',type:'مكية',verses:88},
  {n:39,name:'الزمر',type:'مكية',verses:75},{n:40,name:'غافر',type:'مكية',verses:85},
  {n:41,name:'فصلت',type:'مكية',verses:54},{n:42,name:'الشورى',type:'مكية',verses:53},
  {n:43,name:'الزخرف',type:'مكية',verses:89},{n:44,name:'الدخان',type:'مكية',verses:59},
  {n:45,name:'الجاثية',type:'مكية',verses:37},{n:46,name:'الأحقاف',type:'مكية',verses:35},
  {n:47,name:'محمد',type:'مدنية',verses:38},{n:48,name:'الفتح',type:'مدنية',verses:29},
  {n:49,name:'الحجرات',type:'مدنية',verses:18},{n:50,name:'ق',type:'مكية',verses:45},
  {n:51,name:'الذاريات',type:'مكية',verses:60},{n:52,name:'الطور',type:'مكية',verses:49},
  {n:53,name:'النجم',type:'مكية',verses:62},{n:54,name:'القمر',type:'مكية',verses:55},
  {n:55,name:'الرحمن',type:'مدنية',verses:78},{n:56,name:'الواقعة',type:'مكية',verses:96},
  {n:57,name:'الحديد',type:'مدنية',verses:29},{n:58,name:'المجادلة',type:'مدنية',verses:22},
  {n:59,name:'الحشر',type:'مدنية',verses:24},{n:60,name:'الممتحنة',type:'مدنية',verses:13},
  {n:61,name:'الصف',type:'مدنية',verses:14},{n:62,name:'الجمعة',type:'مدنية',verses:11},
  {n:63,name:'المنافقون',type:'مدنية',verses:11},{n:64,name:'التغابن',type:'مدنية',verses:18},
  {n:65,name:'الطلاق',type:'مدنية',verses:12},{n:66,name:'التحريم',type:'مدنية',verses:12},
  {n:67,name:'الملك',type:'مكية',verses:30},{n:68,name:'القلم',type:'مكية',verses:52},
  {n:69,name:'الحاقة',type:'مكية',verses:52},{n:70,name:'المعارج',type:'مكية',verses:44},
  {n:71,name:'نوح',type:'مكية',verses:28},{n:72,name:'الجن',type:'مكية',verses:28},
  {n:73,name:'المزمل',type:'مكية',verses:20},{n:74,name:'المدثر',type:'مكية',verses:56},
  {n:75,name:'القيامة',type:'مكية',verses:40},{n:76,name:'الإنسان',type:'مدنية',verses:31},
  {n:77,name:'المرسلات',type:'مكية',verses:50},{n:78,name:'النبأ',type:'مكية',verses:40},
  {n:79,name:'النازعات',type:'مكية',verses:46},{n:80,name:'عبس',type:'مكية',verses:42},
  {n:81,name:'التكوير',type:'مكية',verses:29},{n:82,name:'الانفطار',type:'مكية',verses:19},
  {n:83,name:'المطففين',type:'مكية',verses:36},{n:84,name:'الانشقاق',type:'مكية',verses:25},
  {n:85,name:'البروج',type:'مكية',verses:22},{n:86,name:'الطارق',type:'مكية',verses:17},
  {n:87,name:'الأعلى',type:'مكية',verses:19},{n:88,name:'الغاشية',type:'مكية',verses:26},
  {n:89,name:'الفجر',type:'مكية',verses:30},{n:90,name:'البلد',type:'مكية',verses:20},
  {n:91,name:'الشمس',type:'مكية',verses:15},{n:92,name:'الليل',type:'مكية',verses:21},
  {n:93,name:'الضحى',type:'مكية',verses:11},{n:94,name:'الشرح',type:'مكية',verses:8},
  {n:95,name:'التين',type:'مكية',verses:8},{n:96,name:'العلق',type:'مكية',verses:19},
  {n:97,name:'القدر',type:'مكية',verses:5},{n:98,name:'البينة',type:'مدنية',verses:8},
  {n:99,name:'الزلزلة',type:'مدنية',verses:8},{n:100,name:'العاديات',type:'مكية',verses:11},
  {n:101,name:'القارعة',type:'مكية',verses:11},{n:102,name:'التكاثر',type:'مكية',verses:8},
  {n:103,name:'العصر',type:'مكية',verses:3},{n:104,name:'الهمزة',type:'مكية',verses:9},
  {n:105,name:'الفيل',type:'مكية',verses:5},{n:106,name:'قريش',type:'مكية',verses:4},
  {n:107,name:'الماعون',type:'مكية',verses:7},{n:108,name:'الكوثر',type:'مكية',verses:3},
  {n:109,name:'الكافرون',type:'مكية',verses:6},{n:110,name:'النصر',type:'مدنية',verses:3},
  {n:111,name:'المسد',type:'مكية',verses:5},{n:112,name:'الإخلاص',type:'مكية',verses:4},
  {n:113,name:'الفلق',type:'مكية',verses:5},{n:114,name:'الناس',type:'مكية',verses:6},
];


/* ─── STATE ─── */
let currentReciter = null;
let currentMushafIdx = null;
let currentSurahIndex = 0;
let filteredSurahs = [...surahs];

/* ─── فتح صفحة القارئ ─── */
function openReciterDetail(reciter) {
  currentReciter = reciter;
  document.getElementById('rdName').textContent = reciter.name;
  document.getElementById('rdLaqab').textContent = reciter.laqab;
  document.getElementById('rdBio').textContent = reciter.bio;
  const imgEl = document.getElementById('rdImg');
  imgEl.innerHTML = reciter.img ? `<img src="${reciter.img}" alt="${reciter.name}">` : '👤';

  // بناء كارتات الروايات ديناميكيًا
  const wrap = document.getElementById('rdTypeCards');
  wrap.innerHTML = '';
  reciter.mushaf.forEach((m, idx) => {
    const card = document.createElement('div');
    card.className = 'rd-type-card';
    card.innerHTML = `
      <div class="rd-type-icon">${m.icon}</div>
      <div class="rd-type-name">${m.label}</div>
      <div class="rd-type-desc">${m.desc}</div>
    `;
    card.onclick = () => openSurahList(idx);
    wrap.appendChild(card);
  });

  showPage('reciter-detail');
}

/* ─── فتح قائمة السور ─── */
function openSurahList(mushafIdx) {
  currentMushafIdx = mushafIdx;
  const m = currentReciter.mushaf[mushafIdx];
  document.getElementById('slTitle').textContent = `${currentReciter.name} — ${m.label}`;
  document.getElementById('slSearch').value = '';
  filteredSurahs = [...surahs];
  renderSurahGrid(filteredSurahs);
  showPage('surah-list');
}

function backToReciterDetail() {
  stopSurahAudio();
  showPage('reciter-detail');
}

function filterSurahs() {
  const q = document.getElementById('slSearch').value.trim();
  filteredSurahs = q
    ? surahs.filter(s => s.name.includes(q) || String(s.n).includes(q))
    : [...surahs];
  renderSurahGrid(filteredSurahs);
}

function renderSurahGrid(list) {
  const g = document.getElementById('slGrid');
  g.innerHTML = '';
  list.forEach((s, idx) => {
    const card = document.createElement('div');
    card.className = 'sl-card';
    card.innerHTML = `
      <div class="sl-num">${s.n}</div>
      <div class="sl-name">${s.name}</div>
      <div class="sl-type">${s.type}</div>
      <div class="sl-verses">${s.verses} آية</div>
    `;
    card.onclick = () => openSurahPlayer(idx);
    g.appendChild(card);
  });
}


/* ─── المشغّل ─── */
function openSurahPlayer(idx) {
  currentSurahIndex = idx;
  loadSurahPlayer(filteredSurahs[idx]);
  showPage('surah-player');
}

function getSurahUrl(surahNum) {
  const m = currentReciter.mushaf[currentMushafIdx];
  const num = String(surahNum).padStart(3, '0');
  return m.baseUrl + num + '.mp3';
}

function loadSurahPlayer(s) {
  const m = currentReciter.mushaf[currentMushafIdx];
  document.getElementById('spNum').textContent = s.n;
  document.getElementById('spSurahName').textContent = `سورة ${s.name}`;
  document.getElementById('spReciter').textContent = `${currentReciter.name} · ${m.label}`;
  document.getElementById('spProgress').value = 0;
  document.getElementById('spCurrentTime').textContent = '0:00';
  document.getElementById('spDuration').textContent = '0:00';

  // تحميل الصوت
  const src = document.getElementById('surahSrc');
  src.src = getSurahUrl(s.n);
  document.getElementById('surahAudio').load();
  resetPlayerBtn();
}



function backToSurahList() {
  stopSurahAudio();
  showPage('surah-list');
}

function stopSurahAudio() {
  const audio = document.getElementById('surahAudio');
  audio.pause();
  document.getElementById('surahSrc').src = '';
  audio.load();
  resetPlayerBtn();
}

function resetPlayerBtn() {
  document.getElementById('spBtnIcon').innerHTML = '<path d="M1 1l10 6-10 6z"/>';
}

function toggleSurahPlayback() {
  const audio = document.getElementById('surahAudio');
  if (audio.paused) {
    audio.play();
    document.getElementById('spBtnIcon').innerHTML = '<path d="M2 1h3v12H2zm5 0h3v12H7z"/>';
  } else {
    audio.pause();
    resetPlayerBtn();
  }
}

function onMetaLoaded() {
  document.getElementById('spDuration').textContent = formatTime(document.getElementById('surahAudio').duration);
}

function updateProgress() {
  const audio = document.getElementById('surahAudio');
  if (!audio.duration) return;
  document.getElementById('spProgress').value = (audio.currentTime / audio.duration) * 100;
  document.getElementById('spCurrentTime').textContent = formatTime(audio.currentTime);
}

function seekAudio(val) {
  const audio = document.getElementById('surahAudio');
  if (audio.duration) audio.currentTime = (val / 100) * audio.duration;
}

function onSurahEnded() { resetPlayerBtn(); nextSurah(); }

function nextSurah() {
  if (currentSurahIndex < filteredSurahs.length - 1) {
    currentSurahIndex++;
    loadSurahPlayer(filteredSurahs[currentSurahIndex]);
  }
}

function prevSurah() {
  if (currentSurahIndex > 0) {
    currentSurahIndex--;
    loadSurahPlayer(filteredSurahs[currentSurahIndex]);
  }
}

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2,'0')}`;
}

/* ─── PRAYER TIMES ─── */
const prayersList = [
  { key:'Fajr',    name:'الفجر',   icon:'🌙' },
  { key:'Sunrise', name:'الشروق',  icon:'🌅' },
  { key:'Dhuhr',   name:'الظهر',   icon:'☀️' },
  { key:'Asr',     name:'العصر',   icon:'🌤️' },
  { key:'Maghrib', name:'المغرب',  icon:'🌆' },
  { key:'Isha',    name:'العشاء',  icon:'🌃' },
];
const govArabic = {
  'Cairo':'القاهرة','Giza':'الجيزة','Alexandria':'الإسكندرية','Luxor':'الأقصر',
  'Aswan':'أسوان','Assiut':'أسيوط','Sohag':'سوهاج','Qena':'قنا','Minya':'المنيا',
  'Beni Suef':'بني سويف','Faiyum':'الفيوم','Port Said':'بورسعيد','Suez':'السويس',
  'Ismailia':'الإسماعيلية','Damietta':'دمياط','Dakahlia':'الدقهلية','Sharqia':'الشرقية',
  'Kafr El Sheikh':'كفر الشيخ','Gharbia':'الغربية','Monufia':'المنوفية','Qalyubia':'القليوبية',
  'Beheira':'البحيرة','Matrouh':'مطروح','North Sinai':'شمال سيناء',
  'South Sinai':'جنوب سيناء','Red Sea':'البحر الأحمر','New Valley':'الوادي الجديد'
};
let prayerTimes = {}, cdInterval = null;

function padZ(n) { return String(n).padStart(2,'0'); }
function toMins(t) { const [h,m]=t.split(':').map(Number); return h*60+m; }

function getNextPrayer(obj) {
  const now = new Date(), nm = now.getHours()*60+now.getMinutes();
  const list = prayersList.filter(p=>p.key!=='Sunrise');
  for (let p of list) {
    const t = obj[p.key];
    if (t && toMins(t) > nm) return { name:p.name, time:t, nextDay:false };
  }
  return { name:'الفجر (غدًا)', time:obj['Fajr'], nextDay:true };
}

function startCountdown(timeStr, nextDay) {
  if (cdInterval) clearInterval(cdInterval);
  function tick() {
    const now = new Date();
    const [h,m] = (timeStr||'00:00').split(':').map(Number);
    const target = new Date(now); target.setHours(h,m,0,0);
    if (nextDay || target <= now) target.setDate(target.getDate()+1);
    let d = Math.max(0, Math.floor((target-now)/1000));
    const hh=Math.floor(d/3600); d%=3600;
    const mm=Math.floor(d/60), ss=d%60;
    document.getElementById('cdH').textContent=padZ(hh);
    document.getElementById('cdM').textContent=padZ(mm);
    document.getElementById('cdS').textContent=padZ(ss);
  }
  tick();
  cdInterval = setInterval(tick, 1000);
}

function renderPrayerCards(obj) {
  const pg = document.getElementById('prayersGrid'); pg.innerHTML='';
  const now = new Date(), nm = now.getHours()*60+now.getMinutes();
  const next = getNextPrayer(obj);
  prayersList.forEach(p => {
    const t = obj[p.key]; if (!t) return;
    const passed = toMins(t)<=nm && p.key!=='Sunrise';
    const isNext = next.name===p.name;
    const card = document.createElement('div');
    card.className='prayer-card'+(isNext?' next-prayer':'')+(passed&&!isNext?' passed':'');
    card.innerHTML=`
      ${isNext?'<span class="next-badge">التالية</span>':''}
      <span class="prayer-icon">${p.icon}</span>
      <div class="prayer-name">${p.name}</div>
      <div class="prayer-time">${t}</div>
    `;
    pg.appendChild(card);
  });
  document.getElementById('nextPrayerName').textContent=next.name;
  startCountdown(next.time, next.nextDay);
}

function updateDateRow(city) {
  const now = new Date();
  const hijri   = new Intl.DateTimeFormat('ar-SA-u-ca-islamic',{day:'numeric',month:'long',year:'numeric'}).format(now);
  const gregory = new Intl.DateTimeFormat('ar-EG',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now);
  document.getElementById('dateRow').textContent=`${gregory} — ${hijri} | ${govArabic[city]||city}`;
}

async function loadPrayers() {
  const city = document.getElementById('govSelect').value;
  document.getElementById('loadingMsg').style.display='block';
  document.getElementById('prayerContent').style.display='none';
  document.getElementById('prayerErrorMsg').style.display='none';
  updateDateRow(city);
  const now=new Date(), ds=`${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
  try {
    const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/${ds}?city=${encodeURIComponent(city)}&country=Egypt&method=5`);
    if(!res.ok) throw new Error('خطأ في الاتصال بالخادم');
    const data = await res.json();
    if(data.code!==200) throw new Error('تعذّر جلب المواقيت');
    prayerTimes = data.data.timings;
    document.getElementById('loadingMsg').style.display='none';
    document.getElementById('prayerContent').style.display='block';
    renderPrayerCards(prayerTimes);
  } catch(e) {
    document.getElementById('loadingMsg').style.display='none';
    const err=document.getElementById('prayerErrorMsg');
    err.innerHTML=`<span class="news-icon">⚠️</span><div class="news-text"><strong>تعذّر تحميل المواقيت</strong><p>${e.message} — تحقق من الاتصال وأعد المحاولة.</p></div>`;
    err.style.display='flex';
  }
}

setInterval(()=>{ if(Object.keys(prayerTimes).length) renderPrayerCards(prayerTimes); }, 60000);
