/**
 * Interactive Cause & Effect Environment Quiz - State & Audio Engine
 * Refactored to play the local MP3 file inside the 'backsound' folder.
 * Retains Web Audio API procedural synthesis as an automatic fallback.
 */

// ==========================================
// 1. DATA STRUKTUR PERTANYAAN DENGAN ASSET APROJEK1
// ==========================================
const questions = [
  {
    id: 1,
    topic: "Pencemaran Sungai",
    title: "Kebiasaan Memperlakukan Aliran Sungai",
    description: "Sungai adalah urat nadi ekosistem darat. Bagaimana tindakan kita terhadap sungai di sekitar kita?",
    cause: {
      image: "Aprojek1/IMG-20260519-WA0013.jpg",
      altText: "Pilihan Tindakan Sungai: Membuang Sampah vs Gotong Royong",
      negative: {
        action: "Membuang Sampah",
        description: "Membuang sampah rumah tangga dan limbah langsung ke aliran sungai."
      },
      positive: {
        action: "Gotong Royong Bersih Sungai",
        description: "Bergotong royong membersihkan sungai bersama warga sekitar."
      }
    },
    effect: {
      negative: {
        image: "Aprojek1/IMG-20260519-WA0044.jpg",
        headline: "Akibat Membuang Sampah ke Sungai",
        description: "Sampah menyumbat aliran air memicu banjir, air tercemar zat kimia beracun yang menyebarkan krisis air bersih, mematikan ikan, dan memicu wabah penyakit gatal/kulit bagi warga bantaran.",
        themeColor: "from-red-950 via-purple-950 to-indigo-950",
        accentColor: "text-red-400"
      },
      positive: {
        image: "Aprojek1/IMG-20260519-WA0071.jpg",
        headline: "Dampak Gotong Royong Sungai",
        description: "Aliran air menjadi jernih dan bebas dari sumbatan, meniadakan risiko banjir. Tumbuhan air dan ikan berkembang biak sehat, menjaga keseimbangan ekosistem dan kesehatan tubuh warga sekitar.",
        themeColor: "from-emerald-950 via-teal-950 to-cyan-950",
        accentColor: "text-emerald-400"
      }
    }
  },
  {
    id: 2,
    topic: "Kualitas Udara",
    title: "Polusi Udara vs Paru-Paru Hijau",
    description: "Udara bersih adalah hak setiap makhluk hidup. Apa keputusan kita dalam mobilitas sehari-hari?",
    cause: {
      image: "Aprojek1/IMG-20260519-WA0014.jpg",
      altText: "Pilihan Tindakan Udara: Membakar Sampah & Kendaraan Polutif vs Menanam Pohon & Angkutan Umum",
      negative: {
        action: "Membakar & Emisi Gas",
        description: "Membakar sampah plastik terbuka dan menggunakan kendaraan pribadi berasap tebal."
      },
      positive: {
        action: "Menanam Pohon & Bus Umum",
        description: "Menanam pohon dan menggunakan bus umum, berjalan kaki, atau bersepeda."
      }
    },
    effect: {
      negative: {
        image: "Aprojek1/IMG-20260519-WA0072.jpg",
        headline: "Akibat Membakar Sampah & Asap Hitam",
        description: "Asap knalpot dan sampah plastik melepaskan gas rumah kaca yang memerangkap panas, memicu cuaca ekstrem, polusi udara yang menyesakkan dada (ISPA), dan mengancam makhluk hidup di bumi.",
        themeColor: "from-neutral-900 via-rose-950 to-stone-900",
        accentColor: "text-rose-400"
      },
      positive: {
        image: "Aprojek1/IMG-20260519-WA0070.jpg",
        headline: "Dampak Menanam Pohon & Transportasi Umum",
        description: "Udara menjadi bersih, sejuk, dan segar karena pohon menyaring polutan and melepaskan oksigen murni. Emisi berkurang drastis, meredakan pemanasan global demi masa depan bumi.",
        themeColor: "from-emerald-950 via-teal-950 to-blue-950",
        accentColor: "text-teal-400"
      }
    }
  },
  {
    id: 3,
    topic: "Kelestarian Hutan",
    title: "Nasib Paru-Paru Dunia",
    description: "Hutan melindungi kita dari erosi hidrologis dan menyimpan keanekaragaman hayati. Bagaimana kita menjaganya?",
    cause: {
      image: "Aprojek1/IMG-20260519-WA0015.jpg",
      altText: "Pilihan Tindakan Hutan: Penebangan Liar vs Reboisasi Hutan",
      negative: {
        action: "Penebangan Liar (Deforestasi)",
        description: "Menebang pohon hutan secara massal dan serampangan hingga gundul."
      },
      positive: {
        action: "Reboisasi & Konservasi",
        description: "Menanam bibit-bibit pohon baru dan menjaga kelestarian kawasan hutan."
      }
    },
    effect: {
      negative: {
        image: "Aprojek1/IMG-20260519-WA0067.jpg",
        headline: "Akibat Menebang Pohon di Hutan",
        description: "Tanah gundul kehilangan pengikat akar, memicu tanah longsor bandang saat hujan. Suhu bumi meningkat karena hilangnya kanopi penyaring karbon, serta satwa liar kelaparan kehilangan habitat.",
        themeColor: "from-amber-950 via-red-950 to-stone-950",
        accentColor: "text-amber-500"
      },
      positive: {
        image: "Aprojek1/IMG-20260520-WA0058.jpg",
        headline: "Dampak Melakukan Reboisasi Hutan",
        description: "Pepohonan baru menyerap gas CO2, menyuplai oksigen segar, mengikat struktur tanah untuk mencegah longsor, serta mengembalikan rumah yang aman bagi berbagai satwa liar agar lestari.",
        themeColor: "from-green-950 via-emerald-950 to-teal-950",
        accentColor: "text-green-400"
      }
    }
  },
  {
    id: 4,
    topic: "Penggunaan Energi & Plastik",
    title: "Kebiasaan Rumah & Belanja Sehari-hari",
    description: "Peralatan rumah tangga dan bungkus belanjaan berdampak langsung pada emisi dan sampah bumi. Apa pilihan kita?",
    cause: {
      image: "Aprojek1/IMG-20260519-WA0016.jpg",
      altText: "Pilihan Tindakan Energi: Pemborosan Listrik & Plastik vs Hemat Energi & Totebag",
      negative: {
        action: "Boros Energi & Plastik",
        description: "Membiarkan lampu/AC menyala seharian di rumah kosong dan memakai kantong plastik sekali pakai."
      },
      positive: {
        action: "Hemat Energi & Totebag",
        description: "Mematikan lampu/AC saat tidak digunakan dan memakai totebag ramah lingkungan saat belanja."
      }
    },
    effect: {
      negative: {
        image: "Aprojek1/IMG-20260519-WA0069.jpg",
        headline: "Akibat Boros Energi & Plastik",
        description: "Listrik terbuang boros meningkatkan polusi pembakaran batu bara. Sampah plastik sekali pakai mencemari tanah, selokan, dan laut selama berabad-abad karena sulit terurai, merusak bumi.",
        themeColor: "from-stone-900 via-zinc-950 to-blue-950",
        accentColor: "text-zinc-400"
      },
      positive: {
        image: "Aprojek1/IMG-20260519-WA0068.jpg",
        headline: "Dampak Hemat Energi & Totebag",
        description: "Penghematan listrik mengurangi tagihan dan menekan emisi asap pabrik energi. Tas belanja kain mengurangi timbunan sampah plastik di lautan, menyehatkan masa depan kehidupan bumi.",
        themeColor: "from-emerald-950 via-cyan-950 to-blue-950",
        accentColor: "text-cyan-400"
      }
    }
  }
];

// ==========================================
// 2. STATE MANAGEMENT KUIS
// ==========================================
const state = {
  currentQuestionIndex: 0,
  visited: [
    { negative: false, positive: false },
    { negative: false, positive: false },
    { negative: false, positive: false },
    { negative: false, positive: false }
  ],
  // Menyimpan pilihan PERTAMA user: null (belum pilih), 'positive', atau 'negative'
  firstChoice: [null, null, null, null],
  currentScreen: 'start',
  audio: {
    musicEnabled: false,
    sfxEnabled: true,
    musicTimeout: null
  }
};

// ==========================================
// 3. SYNTHESIZER & AUDIO PLAYER ENGINE
// ==========================================
let audioCtx = null;
let bgMusicElement = null; // Menyimpan HTML5 Audio Element untuk file kustom .mp3
let musicGain = null; // Menyimpan gain node untuk synthesizer fallback
let filterNode = null;
let activeOscillators = [];

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

/**
 * Memutar Background Music (Prioritas: File MP3 kustom dari folder backsound)
 */
function startAmbientMusic() {
  if (!state.audio.musicEnabled) return;
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Jika HTML5 Audio sudah pernah diinisialisasi, putar kembali
  if (bgMusicElement) {
    bgMusicElement.play().catch(err => {
      console.warn("Gagal memutar audio kustom, beralih ke Synth:", err);
      startSynthesizedMusic();
    });
    updateEqualizerUI(true);
    return;
  }

  // Coba memuat file MP3 kustom yang berada di folder backsound/
  try {
    bgMusicElement = new Audio('backsound/lofium-lofi-song-jinsei-by-lofium-236730 (1).mp3');
    bgMusicElement.loop = true;
    bgMusicElement.volume = 0.25; // Mengatur volume agar lembut dan tidak bising

    // Jalankan pemutaran
    bgMusicElement.play()
      .then(() => {
        updateEqualizerUI(true);
        console.log("Musik latar MP3 berhasil diputar!");
      })
      .catch(err => {
        console.warn("File MP3 diblokir oleh browser atau tidak ditemukan, memicu Synth fallback:", err);
        bgMusicElement = null; // Reset agar tidak menumpuk
        startSynthesizedMusic();
      });
  } catch (error) {
    console.warn("Gagal memuat sistem Audio kustom, memicu Synth fallback:", error);
    startSynthesizedMusic();
  }
}

/**
 * Matikan Background Music (Baik MP3 maupun Synth Fallback)
 */
function stopAmbientMusic() {
  // Matikan Audio Player kustom jika aktif
  if (bgMusicElement) {
    bgMusicElement.pause();
    updateEqualizerUI(false);
    return;
  }

  // Matikan Synthesizer fallback jika aktif
  stopSynthesizedMusic();
}

/**
 * BACKUP ENGINE: Memutar musik ambient buatan (Synthesizer prosedural) jika MP3 gagal/dihapus
 */
function startSynthesizedMusic() {
  if (musicGain) return; // Jika sudah menyala, hindari penumpukan
  
  musicGain = audioCtx.createGain();
  musicGain.gain.setValueAtTime(0, audioCtx.currentTime);
  musicGain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 2.0);
  
  filterNode = audioCtx.createBiquadFilter();
  filterNode.type = 'lowpass';
  filterNode.frequency.setValueAtTime(380, audioCtx.currentTime);
  filterNode.Q.setValueAtTime(1, audioCtx.currentTime);
  
  musicGain.connect(filterNode);
  filterNode.connect(audioCtx.destination);
  
  const progressions = [
    [130.81, 164.81, 196.00, 246.94], // C Maj7
    [174.61, 220.00, 261.63, 329.63], // F Maj7
    [196.00, 261.63, 293.66, 392.00], // G Sus4
    [220.00, 261.63, 329.63, 392.00]  // Am7
  ];
  
  let chordIndex = 0;
  
  function playChordProgression() {
    if (!musicGain) return;
    const freqs = progressions[chordIndex];
    const now = audioCtx.currentTime;
    const oldOscs = [...activeOscillators];
    activeOscillators = [];
    
    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((Math.random() * 8) - 4, now);
      
      const oscGain = audioCtx.createGain();
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.03, now + 1.8 + (idx * 0.1));
      oscGain.gain.setValueAtTime(0.03, now + 5.5);
      oscGain.gain.linearRampToValueAtTime(0, now + 7.5);
      
      osc.connect(oscGain);
      oscGain.connect(musicGain);
      osc.start(now);
      osc.stop(now + 7.6);
      
      activeOscillators.push(osc);
    });
    
    setTimeout(() => {
      oldOscs.forEach(o => {
        try { o.disconnect(); } catch(e) {}
      });
    }, 8000);
    
    chordIndex = (chordIndex + 1) % progressions.length;
    state.audio.musicTimeout = setTimeout(playChordProgression, 6600);
  }
  
  playChordProgression();
  updateEqualizerUI(true);
}

function stopSynthesizedMusic() {
  if (state.audio.musicTimeout) {
    clearTimeout(state.audio.musicTimeout);
    state.audio.musicTimeout = null;
  }
  
  if (musicGain && audioCtx) {
    const now = audioCtx.currentTime;
    try {
      musicGain.gain.cancelScheduledValues(now);
      musicGain.gain.setValueAtTime(musicGain.gain.value, now);
      musicGain.gain.linearRampToValueAtTime(0, now + 1.0);
      
      const oscsToKill = [...activeOscillators];
      activeOscillators = [];
      
      setTimeout(() => {
        oscsToKill.forEach(o => {
          try { o.stop(); o.disconnect(); } catch(e){}
        });
        if (musicGain) {
          musicGain.disconnect();
          musicGain = null;
        }
        if (filterNode) {
          filterNode.disconnect();
          filterNode = null;
        }
      }, 1100);
    } catch (e) {
      musicGain = null;
    }
  }
  updateEqualizerUI(false);
}

/**
 * Mensintesis Efek Suara (SFX) secara dinamis menggunakan gelombang suara
 */
function playSFX(type) {
  if (!state.audio.sfxEnabled) return;
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;

  switch (type) {
    case 'hover': {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.04);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    }
    
    case 'positive': {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const delay = idx * 0.08;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.06, now + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.5);
        const oscFilter = audioCtx.createBiquadFilter();
        oscFilter.type = 'lowpass';
        oscFilter.frequency.setValueAtTime(1500, now + delay);
        osc.connect(oscFilter);
        oscFilter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.6);
      });
      break;
    }

    case 'negative': {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const lowpass = audioCtx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(196.00, now);
      osc.frequency.linearRampToValueAtTime(65.41, now + 0.65);
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(320, now);
      lowpass.frequency.exponentialRampToValueAtTime(70, now + 0.6);
      lowpass.Q.setValueAtTime(3, now);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
      break;
    }

    case 'transition': {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }

    case 'fanfare': {
      const chords = [
        [261.63, 329.63, 392.00],
        [349.23, 440.00, 523.25],
        [392.00, 493.88, 587.33],
        [523.25, 659.25, 783.99, 1046.50]
      ];
      chords.forEach((freqs, chordIdx) => {
        const chordDelay = chordIdx * 0.22;
        freqs.forEach(freq => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + chordDelay);
          gain.gain.setValueAtTime(0, now + chordDelay);
          gain.gain.linearRampToValueAtTime(0.035, now + chordDelay + 0.06);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + chordDelay + 0.65);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + chordDelay);
          osc.stop(now + chordDelay + 0.8);
        });
      });
      break;
    }
  }
}

// ==========================================
// 4. NAVIGASI & ACTION HANDLERS
// ==========================================

function navigateTo(screen) {
  state.currentScreen = screen;
  
  const body = document.body;
  if (screen === 'effect-positive') {
    body.style.background = 'var(--bg-positive)';
  } else if (screen === 'effect-negative') {
    body.style.background = 'var(--bg-negative)';
  } else {
    body.style.background = 'var(--bg-normal)';
  }

  render();
}

function chooseOption(type) {
  const qIdx = state.currentQuestionIndex;
  
  // Catat pilihan PERTAMA jika belum pernah memilih sama sekali di pertanyaan ini
  if (state.firstChoice[qIdx] === null) {
    state.firstChoice[qIdx] = type; // 'positive' atau 'negative'
  }
  
  if (type === 'negative') {
    state.visited[qIdx].negative = true;
    playSFX('negative');
    navigateTo('effect-negative');
  } else {
    state.visited[qIdx].positive = true;
    playSFX('positive');
    navigateTo('effect-positive');
  }
}

/**
 * Menghitung skor berdasarkan PILIHAN PERTAMA di setiap pertanyaan.
 * - Pilih tindakan POSITIF dulu = 25 poin (kesadaran optimal)
 * - Pilih tindakan NEGATIF dulu = 10 poin (kesadaran perlu ditingkatkan)
 * Skor maksimal = 100 (semua pilihan pertama adalah positif)
 */
function calculateAwarenessScore() {
  let totalScore = 0;
  state.firstChoice.forEach(choice => {
    if (choice === 'positive') {
      totalScore += 25; // Skor penuh: memilih tindakan baik terlebih dahulu
    } else if (choice === 'negative') {
      totalScore += 10; // Skor rendah: memilih tindakan buruk terlebih dahulu
    }
  });
  return totalScore;
}

/**
 * Menentukan level kesadaran dan pesan berdasarkan skor
 */
function getAwarenessLevel(score) {
  if (score >= 90) {
    return {
      label: 'Kesadaran Optimal',
      emoji: '🌟',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      message: 'Luar biasa! Insting pertama Anda selalu condong ke tindakan positif bagi lingkungan. Anda adalah teladan kesadaran ekologis sejati!'
    };
  } else if (score >= 70) {
    return {
      label: 'Kesadaran Baik',
      emoji: '👍',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10 border-teal-500/20',
      message: 'Bagus! Sebagian besar pilihan pertama Anda mengarah pada tindakan positif. Sedikit lagi menuju kesadaran optimal!'
    };
  } else if (score >= 50) {
    return {
      label: 'Kesadaran Cukup',
      emoji: '⚠️',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      message: 'Cukup baik, namun ada beberapa pilihan pertama yang cenderung ke tindakan negatif. Tingkatkan kepekaan Anda terhadap isu lingkungan!'
    };
  } else {
    return {
      label: 'Kesadaran Perlu Ditingkatkan',
      emoji: '❗',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/20',
      message: 'Pilihan pertama Anda lebih banyak mengarah ke tindakan negatif. Mari belajar lebih dalam tentang dampak tindakan kita pada lingkungan dan ubah pola pikir kita!'
    };
  }
}

function resetQuiz() {
  playSFX('fanfare');
  state.currentQuestionIndex = 0;
  state.visited = [
    { negative: false, positive: false },
    { negative: false, positive: false },
    { negative: false, positive: false },
    { negative: false, positive: false }
  ];
  state.firstChoice = [null, null, null, null];
  navigateTo('start');
}

// ==========================================
// 5. RENDERING ENGINE (DOM MANIPULATION)
// ==========================================

function render() {
  const appContainer = document.getElementById('app-container');
  if (!appContainer) return;
  
  appContainer.className = 'w-full max-w-5xl mx-auto px-4 py-6 animate-fade-in';
  
  const currentQuestion = questions[state.currentQuestionIndex];
  
  switch (state.currentScreen) {
    case 'start':
      renderStartScreen(appContainer);
      break;
      
    case 'cause':
      renderCauseScreen(appContainer, currentQuestion);
      break;
      
    case 'effect-negative':
      renderEffectScreen(appContainer, currentQuestion, 'negative');
      break;
      
    case 'effect-positive':
      renderEffectScreen(appContainer, currentQuestion, 'positive');
      break;
      
    case 'finish':
      renderFinishScreen(appContainer);
      break;
  }
  
  attachHoverListeners();
}

/**
 * LAYAR MULAI (START SCREEN)
 */
function renderStartScreen(container) {
  container.innerHTML = `
    <div class="glass-card p-8 md:p-12 text-center flex flex-col items-center justify-center max-w-3xl mx-auto ring-1 ring-white/10">
      <div class="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30 shadow-lg shadow-emerald-950/20 animate-float">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </div>
      
      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
        Kuis Interaktif Lingkungan<br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Sebab & Akibat</span>
      </h1>
      
      <p class="text-base md:text-lg text-emerald-100/80 mb-6 max-w-xl leading-relaxed">
        Setiap tindakan kecil kita berdampak besar pada kelangsungan bumi. Jelajahi kuis bertema grafis interaktif ini untuk memahami konsekuensi logis aksi sehari-hari kita!
      </p>
      
      <div class="p-6 bg-white/5 border border-white/10 rounded-2xl mb-8 w-full max-w-lg text-left text-sm text-emerald-200/80 leading-relaxed space-y-3">
        <span class="font-bold text-white text-base block mb-2">📋 Aturan Main Kuis:</span>
        
        <div class="flex items-start gap-2">
          <span class="text-emerald-400 font-bold mt-0.5">1.</span>
          <span>Setiap pertanyaan menampilkan <span class="text-white font-semibold">2 pilihan tindakan</span>: pilihlah tindakan yang sesuai keinginanmu.</span>
        </div>
        
        <div class="flex items-start gap-2">
          <span class="text-emerald-400 font-bold mt-0.5">2.</span>
          <span><span class="text-yellow-300 font-semibold">Pilihan PERTAMA Anda menentukan skor!</span> Memilih tindakan positif terlebih dahulu menunjukkan kesadaran lingkungan yang tinggi.</span>
        </div>
        
        <div class="flex items-start gap-2">
          <span class="text-emerald-400 font-bold mt-0.5">3.</span>
          <span>Anda <span class="text-emerald-300 font-bold">WAJIB mengeksplorasi KEDUA pilihan</span> beserta akibatnya agar tombol 'Pertanyaan Berikutnya' terbuka.</span>
        </div>
        
        <div class="mt-3 pt-3 border-t border-white/10 text-xs text-white/50 flex items-center gap-2">
          <span class="text-lg">🏆</span>
          <span>Skor Maksimal: <span class="text-emerald-400 font-bold">100 poin</span> (Kesadaran Optimal) — didapat jika selalu memilih tindakan positif terlebih dahulu.</span>
        </div>
      </div>
      
      <button id="btn-start" class="btn-premium px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-emerald-400 hover:to-teal-400 active:scale-95 flex items-center gap-3">
        Mulai Kuis Sekarang
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  `;
  
  document.getElementById('btn-start').addEventListener('click', () => {
    state.audio.musicEnabled = true;
    startAmbientMusic();
    playSFX('transition');
    navigateTo('cause');
  });
}

/**
 * LAYAR SEBAB (Menampilkan visual split graphic dari Aprojek1)
 */
function renderCauseScreen(container, question) {
  const qVisited = state.visited[state.currentQuestionIndex];
  const bothVisited = qVisited.negative && qVisited.positive;
  const totalQuestions = questions.length;
  const progressPercent = (state.currentQuestionIndex / totalQuestions) * 100;
  
  container.innerHTML = `
    <!-- Header Tracker -->
    <div class="text-center mb-6 max-w-2xl mx-auto">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
        Topik ${state.currentQuestionIndex + 1} dari ${totalQuestions}: ${question.topic}
      </div>
      <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">${question.title}</h2>
      <p class="text-white/60 text-xs md:text-sm max-w-xl mx-auto">${question.description}</p>
    </div>
    
    <!-- Progress Bar -->
    <div class="w-full max-w-xs mx-auto mb-6 bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
      <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style="width: ${progressPercent || 3}%"></div>
    </div>
    
    <!-- GRID UTAMA: SPLIT GRAPHIC CONTAINER -->
    <div class="glass-card overflow-hidden ring-1 ring-white/10 max-w-4xl mx-auto mb-8">
      
      <!-- Visual Split Gambar dari Aprojek1 -->
      <div class="w-full relative bg-neutral-900 border-b border-white/10 overflow-hidden flex justify-center items-center group">
        <img 
          src="${question.cause.image}" 
          alt="${question.cause.altText}" 
          class="w-full h-auto max-h-[500px] object-contain group-hover:scale-[1.01] transition duration-700"
          onerror="this.style.display='none'; document.getElementById('cause-svg-fallback').style.display='flex';"
        />
        
        <!-- Teks Indikator Status di Atas Gambar -->
        <div class="absolute top-4 left-4 right-4 flex justify-between z-10 pointer-events-none">
          <div class="bg-red-950/80 border border-red-500/30 text-red-200 text-[10px] sm:text-xs px-3 py-1 rounded-full font-bold shadow-md">
            ${qVisited.negative ? '✓ Dampak Negatif Dilihat' : '🔴 Opsi Belum Dieksplorasi'}
          </div>
          <div class="bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-[10px] sm:text-xs px-3 py-1 rounded-full font-bold shadow-md">
            ${qVisited.positive ? '✓ Dampak Positif Dilihat' : '🟢 Opsi Belum Dieksplorasi'}
          </div>
        </div>
        
        <!-- SVG Fallback jika path tidak terbaca -->
        <div id="cause-svg-fallback" class="hidden absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-emerald-400/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-sm font-bold text-white mb-1">ASSET GAMBAR PENYEBAB TIDAK DITEMUKAN</span>
          <span class="text-xs text-white/40">Pastikan folder 'Aprojek1' berada di dalam workspace Anda</span>
        </div>
      </div>
      
      <!-- DUA TOMBOL DI BAWAH MASING-MASING SETENGAH BAGIAN GAMBAR -->
      <div class="grid grid-cols-2 bg-black/20 divide-x divide-white/10">
        
        <!-- Tombol Pilih Opsi Negatif (Kiri) -->
        <div class="p-4 flex flex-col items-center justify-center">
          <p class="text-[10px] sm:text-xs text-red-300/80 font-bold mb-2 uppercase tracking-widest text-center">${question.cause.negative.action}</p>
          <button 
            id="btn-choose-neg"
            class="w-full max-w-xs py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 ${qVisited.negative ? 'bg-gray-500/10 text-gray-500/50 border border-transparent cursor-not-allowed pointer-events-none' : 'bg-red-950/40 hover:bg-red-800/60 text-red-200 border border-red-500/30 active:scale-[0.98]'}"
            ${qVisited.negative ? 'disabled' : ''}
          >
            ${qVisited.negative ? '✓ Opsi Selesai' : 'Pilih Tindakan Kiri ➔'}
          </button>
        </div>
        
        <!-- Tombol Pilih Opsi Positif (Kanan) -->
        <div class="p-4 flex flex-col items-center justify-center">
          <p class="text-[10px] sm:text-xs text-emerald-300/80 font-bold mb-2 uppercase tracking-widest text-center">${question.cause.positive.action}</p>
          <button 
            id="btn-choose-pos"
            class="w-full max-w-xs py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 ${qVisited.positive ? 'bg-gray-500/10 text-gray-500/50 border border-transparent cursor-not-allowed pointer-events-none' : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30 active:scale-[0.98]'}"
            ${qVisited.positive ? 'disabled' : ''}
          >
            ${qVisited.positive ? '✓ Opsi Selesai' : 'Pilih Tindakan Kanan ➔'}
          </button>
        </div>
        
      </div>
      
    </div>
    
    <!-- TOMBOL NEXT UTAMA (Lock/Unlock) -->
    <div class="text-center">
      <button 
        id="btn-next" 
        class="w-full max-w-md py-4 px-8 rounded-xl font-bold text-base md:text-lg border transition-all duration-500 ${bothVisited ? 'btn-premium bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white border-emerald-500/30 cursor-pointer shadow-lg shadow-emerald-950/50 scale-100 opacity-100 animate-pulse' : 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed opacity-60 pointer-events-none'}"
        ${bothVisited ? '' : 'disabled'}
      >
        ${bothVisited ? (state.currentQuestionIndex === totalQuestions - 1 ? 'Selesaikan Kuis & Lihat Hasil ✓' : 'Lanjut ke Pertanyaan Berikutnya ➔') : '🔒 Pelajari Kedua Dampak di Atas untuk Melanjutkan'}
      </button>
      
      ${!bothVisited ? `
        <p class="text-xs text-white/35 mt-2.5 italic">
          Kuis Terkunci: Klik tombol pilihan tindakan kiri dan tindakan kanan di atas untuk melihat akibat buruk/baiknya.
        </p>
      ` : ''}
    </div>
  `;
  
  // Attach Button Handlers
  document.getElementById('btn-choose-neg').addEventListener('click', () => chooseOption('negative'));
  document.getElementById('btn-choose-pos').addEventListener('click', () => chooseOption('positive'));
  
  if (bothVisited) {
    document.getElementById('btn-next').addEventListener('click', () => {
      playSFX('transition');
      if (state.currentQuestionIndex === totalQuestions - 1) {
        navigateTo('finish');
      } else {
        state.currentQuestionIndex++;
        navigateTo('cause');
      }
    });
  }
}

/**
 * LAYAR AKIBAT (Menampilkan Full Graphic Dampak Akibat dari Aprojek1)
 */
function renderEffectScreen(container, question, type) {
  const isPositive = type === 'positive';
  const effectData = isPositive ? question.effect.positive : question.effect.negative;
  const causeText = isPositive ? question.cause.positive.action : question.cause.negative.action;
  
  container.innerHTML = `
    <div class="glass-card max-w-4xl mx-auto overflow-hidden ring-1 ${isPositive ? 'glow-positive border-emerald-500/20' : 'glow-negative border-red-500/20'} ${isPositive ? 'animate-float' : 'animate-shake'}">
      
      <!-- Visual Banner Dampak dari Aprojek1 -->
      <div class="w-full relative bg-neutral-900 border-b border-white/10 flex justify-center items-center">
        <img 
          src="${effectData.image}" 
          alt="${effectData.headline}" 
          class="w-full h-auto max-h-[550px] object-contain"
          onerror="this.style.display='none'; document.getElementById('effect-svg-fallback').style.display='flex';"
        />
        
        <!-- SVG Fallback jika gambar gagal dimuat -->
        <div id="effect-svg-fallback" class="hidden absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center text-center p-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-rose-500/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="text-sm font-bold text-white mb-1">ASSET GAMBAR AKIBAT TIDAK DITEMUKAN</span>
          <span class="text-xs text-white/40">Pastikan folder 'Aprojek1' berada di dalam workspace Anda</span>
        </div>
      </div>
      
      <!-- Papan Edukasi Tambahan di Bawah Gambar -->
      <div class="p-6 md:p-8 bg-gradient-to-b ${effectData.themeColor} text-white">
        <div class="max-w-2xl mx-auto">
          
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-block w-2.5 h-2.5 rounded-full ${isPositive ? 'bg-emerald-400 animate-ping' : 'bg-red-500 animate-pulse'}"></span>
            <span class="text-xs font-bold uppercase tracking-widest text-white/50">Detail Studi Kasus:</span>
            <span class="text-xs font-bold uppercase ${isPositive ? 'text-emerald-400' : 'text-red-400'}">${causeText}</span>
          </div>
          
          <h4 class="text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">${effectData.headline}</h4>
          <p class="text-white/80 text-sm md:text-base leading-relaxed mb-6">${effectData.description}</p>
          
          <!-- Tombol Kembali ke Halaman Sebab -->
          <div class="flex justify-center border-t border-white/10 pt-6">
            <button 
              id="btn-back" 
              class="btn-premium px-8 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 active:scale-95 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              ➔ Kembali ke Halaman Sebab
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  `;
  
  document.getElementById('btn-back').addEventListener('click', () => {
    playSFX('transition');
    navigateTo('cause');
  });
}

/**
 * LAYAR RINGKASAN AKHIR (FINISH)
 */
function renderFinishScreen(container) {
  const score = calculateAwarenessScore();
  const level = getAwarenessLevel(score);
  
  // Detail pilihan pertama per pertanyaan
  const choiceDetails = state.firstChoice.map((choice, idx) => {
    const q = questions[idx];
    const isPositive = choice === 'positive';
    const points = isPositive ? 25 : 10;
    return { question: q.topic, choice, isPositive, points, actionText: isPositive ? q.cause.positive.action : q.cause.negative.action };
  });
  
  container.innerHTML = `
    <div class="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto ring-1 ring-emerald-500/20">
      
      <!-- Icon Tropi Medali -->
      <div class="w-24 h-24 bg-gradient-to-tr from-amber-500 to-yellow-300 text-yellow-950 rounded-full flex items-center justify-center mb-6 border-4 border-yellow-400/40 shadow-xl shadow-yellow-950/20 mx-auto animate-float">
        <span class="text-4xl">${level.emoji}</span>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2">Kuis Selesai!</h1>
      <p class="text-white/60 mb-8 text-xs md:text-sm">Berikut adalah hasil analisis kesadaran lingkungan Anda berdasarkan pilihan pertama di setiap pertanyaan.</p>
      
      <!-- Box Skor Kesadaran Lingkungan -->
      <div class="p-8 ${level.bgColor} border rounded-2xl mb-8">
        <div class="flex flex-col items-center gap-2 mb-4">
          <span class="text-xs font-bold ${level.color} uppercase tracking-widest">Skor Kesadaran Lingkungan:</span>
          <div class="text-6xl font-extrabold text-white">${score}<span class="text-2xl text-white/40">/100</span></div>
          <span class="text-sm font-bold ${level.color} mt-1">${level.emoji} ${level.label}</span>
        </div>
        
        <!-- Progress Bar Visual -->
        <div class="w-full max-w-sm mx-auto bg-black/30 h-3 rounded-full overflow-hidden mb-4">
          <div class="h-full rounded-full transition-all duration-1000 ${score >= 70 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : score >= 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 'bg-gradient-to-r from-red-500 to-orange-400'}" style="width: ${score}%"></div>
        </div>
        
        <p class="text-sm text-white/80 leading-relaxed max-w-lg mx-auto italic">
          "${level.message}"
        </p>
      </div>
      
      <!-- Detail Pilihan Pertama Per Pertanyaan -->
      <div class="mb-8 text-left max-w-xl mx-auto">
        <h4 class="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 text-center">📊 Rincian Pilihan Pertama Anda:</h4>
        <div class="space-y-3">
          ${choiceDetails.map((d, i) => `
            <div class="flex items-center gap-3 p-4 rounded-xl border ${d.isPositive ? 'bg-emerald-500/5 border-emerald-500/15' : 'bg-red-500/5 border-red-500/15'}">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${d.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}">
                ${i + 1}
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-sm font-bold text-white block">${d.question}</span>
                <span class="text-xs ${d.isPositive ? 'text-emerald-300/70' : 'text-red-300/70'}">Pilihan pertama: ${d.actionText}</span>
              </div>
              <div class="text-right">
                <span class="text-lg font-extrabold ${d.isPositive ? 'text-emerald-400' : 'text-red-400'}">${d.points}</span>
                <span class="text-[10px] text-white/40 block">poin</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- List Ringkasan 4 Topik -->
      <div class="mb-10 text-left max-w-xl mx-auto">
        <h4 class="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 text-center">🌍 Rangkuman 4 Isu Bumi:</h4>
        <div class="space-y-4">
          <div class="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
            <span class="text-xl">🌊</span>
            <div>
              <span class="text-sm font-bold text-white">Sungai Bersih = Bebas Banjir</span>
              <p class="text-xs text-white/60">Sungai bukan tong sampah. Kerja bakti membebaskan kita dari bencana air bah dan air tercemar.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
            <span class="text-xl">🍃</span>
            <div>
              <span class="text-sm font-bold text-white">Udara Segar = Lingkungan Sejuk</span>
              <p class="text-xs text-white/60">Bertanam pohon dan membatasi asap pribadi mengembalikan nafas segar dan langit biru cerah.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
            <span class="text-xl">🌳</span>
            <div>
              <span class="text-sm font-bold text-white">Hutan Rimbun = Spons Air & Longsor</span>
              <p class="text-xs text-white/60">Akar pohon mengikat tanah tebing, menyediakan cadangan mata air melimpah, dan melestarikan margasatwa.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
            <span class="text-xl">🐢</span>
            <div>
              <span class="text-sm font-bold text-white">Bijak Listrik & Tas Kain = Samudra Lestari</span>
              <p class="text-xs text-white/60">Mengganti plastik belanja dengan totebag menyudahi invasi plastik beracun di lautan.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tombol Mengulang -->
      <button id="btn-reset" class="btn-premium px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-emerald-400 hover:to-teal-400 active:scale-95 transition-all">
        Mulai Ulang Kuis ↺
      </button>
      
    </div>
  `;
  
  document.getElementById('btn-reset').addEventListener('click', resetQuiz);
}

// ==========================================
// 6. UTILITIES (EVENT LISTENERS & EQUALIZER)
// ==========================================

function attachHoverListeners() {
  const buttons = document.querySelectorAll('button:not([disabled])');
  buttons.forEach(button => {
    button.removeEventListener('mouseenter', playHoverSound);
    button.addEventListener('mouseenter', playHoverSound);
  });
}

function playHoverSound() {
  playSFX('hover');
}

function updateEqualizerUI(isPlaying) {
  const eqContainer = document.getElementById('eq-container');
  if (!eqContainer) return;
  
  if (isPlaying) {
    eqContainer.innerHTML = `
      <span class="eq-bar eq-bar-1"></span>
      <span class="eq-bar eq-bar-2"></span>
      <span class="eq-bar eq-bar-3"></span>
      <span class="eq-bar eq-bar-4"></span>
    `;
    eqContainer.classList.add('px-1');
  } else {
    eqContainer.innerHTML = `
      <span class="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
    `;
    eqContainer.classList.remove('px-1');
  }
}

// ==========================================
// 7. INISIALISASI KONTROL PANEL AUDIO
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const toggleMusicBtn = document.getElementById('toggle-music');
  const toggleSfxBtn = document.getElementById('toggle-sfx');
  
  if (toggleMusicBtn) {
    toggleMusicBtn.addEventListener('click', () => {
      state.audio.musicEnabled = !state.audio.musicEnabled;
      playSFX('transition');
      
      if (state.audio.musicEnabled) {
        startAmbientMusic();
        toggleMusicBtn.classList.remove('bg-white/5', 'text-white/40');
        toggleMusicBtn.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/30');
        toggleMusicBtn.querySelector('.music-status').innerText = 'ON';
      } else {
        stopAmbientMusic();
        toggleMusicBtn.classList.remove('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/30');
        toggleMusicBtn.classList.add('bg-white/5', 'text-white/40');
        toggleMusicBtn.querySelector('.music-status').innerText = 'OFF';
      }
    });
  }
  
  if (toggleSfxBtn) {
    toggleSfxBtn.addEventListener('click', () => {
      state.audio.sfxEnabled = !state.audio.sfxEnabled;
      playSFX('transition');
      
      if (state.audio.sfxEnabled) {
        toggleSfxBtn.classList.remove('bg-white/5', 'text-white/40');
        toggleSfxBtn.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/30');
        toggleSfxBtn.querySelector('.sfx-status').innerText = 'ON';
      } else {
        toggleSfxBtn.classList.remove('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/30');
        toggleSfxBtn.classList.add('bg-white/5', 'text-white/40');
        toggleSfxBtn.querySelector('.sfx-status').innerText = 'OFF';
      }
    });
  }
  
  render();
});
