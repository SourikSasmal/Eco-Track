/* EcoTrack — Production Ready Modular Application Logic */

// Global Constants
const GLOBAL_AVERAGE_FOOTPRINT = 4700;
const INDIA_AVERAGE_FOOTPRINT = 1900;
const TREES_ABSORPTION_FACTOR = 22; // 1 tree absorbs 22 kg CO2 per year
const COAL_BURN_FACTOR = 2.42; // 2.42 kg CO2 per kg of coal burned
const SMARTPHONE_CHARGE_FACTOR = 0.0083; // 8.3 grams (0.0083 kg) CO2 per smartphone charge
const DRIVING_KM_FACTOR = 0.20; // 0.20 kg CO2 per km driven

// Action Cards data structure
const ACTIONS = [
  {
    id: 'plant_based',
    title: 'Switch to a plant-based diet 2 days/week',
    saving: 600,
    difficulty: 'Easy',
    category: 'Food',
    desc: 'Swap meat and dairy for plant-based meals twice a week. Reduces carbon intensive farming pressure.'
  },
  {
    id: 'public_transit',
    title: 'Take public transport instead of car',
    saving: 1200,
    difficulty: 'Medium',
    category: 'Transport',
    desc: 'Commute via bus, train, or subway instead of driving solo. Dramatically cuts direct gasoline combustion.'
  },
  {
    id: 'renewable_energy',
    title: 'Switch to renewable electricity',
    saving: 1500,
    difficulty: 'Hard',
    category: 'Energy',
    desc: 'Install solar panels or purchase a certified green energy contract to eliminate fossil grid supply.'
  },
  {
    id: 'reduce_flights',
    title: 'Reduce air travel by 1 short flight',
    saving: 510,
    difficulty: 'Medium',
    category: 'Transport',
    desc: 'Avoid one short-haul round-trip flight per year. Opt for local rail alternatives or video meetings.'
  },
  {
    id: 'line_dry',
    title: 'Line-dry laundry instead of dryer',
    saving: 150,
    difficulty: 'Easy',
    category: 'Energy',
    desc: 'Hang clothes to dry naturally. Electric clothes dryers are massive domestic power drawers.'
  },
  {
    id: 'secondhand_clothes',
    title: 'Buy second-hand clothes',
    saving: 200,
    difficulty: 'Easy',
    category: 'Shopping',
    desc: 'Shop thrift, vintage, or consignment items. Prevents carbon intensive fast fashion textile manufacturing.'
  },
  {
    id: 'food_waste',
    title: 'Reduce food waste by 50%',
    saving: 300,
    difficulty: 'Easy',
    category: 'Food',
    desc: 'Plan weekly recipes, optimize storage, and compost leftovers. Avoids methane emissions from landfills.'
  },
  {
    id: 'led_bulbs',
    title: 'Install LED bulbs throughout home',
    saving: 100,
    difficulty: 'Easy',
    category: 'Energy',
    desc: 'Swap out legacy incandescent bulbs for efficiency LEDs. Consumes up to 80% less electricity.'
  },
  {
    id: 'wfh_commute',
    title: 'Work from home 2 days/week',
    saving: 600,
    difficulty: 'Easy',
    category: 'Transport',
    desc: 'Avoid road commutes twice a week by working remotely, reducing fuel use and city traffic congestion.'
  },
  {
    id: 'offset_footprint',
    title: 'Offset remaining footprint via certified programs',
    saving: 1000,
    difficulty: 'Medium',
    category: 'General',
    desc: 'Invest in certified carbon offset operations (reforestation, methane recapture) to cancel emissions.'
  }
];

const ECO_TIPS = [
  "Lower your water heater temperature to 120°F (49°C). This simple step saves energy and prevents accidental scalding without lowering shower quality.",
  "Unplug appliances like TVs, computers, and chargers when not in use. These 'vampire' loads account for up to 10% of home electricity bills.",
  "Ensure your car tires are fully inflated. Properly inflated tires improve gas mileage by up to 3% and reduce tyre wear emissions.",
  "Batch your online shopping orders. Consolidating orders reduces shipping packaging waste and logistics carrier route mileage.",
  "Keep a reusable bag inside your daypack or car. Transitioning away from plastic shopping bags saves petroleum footprint refining."
];

// Achievements Badge config
const BADGES = [
  {
    id: 'plant_pioneer',
    name: 'Plant-Based Pioneer',
    desc: 'Unlock by having a low-meat diet or committing to plant-based days.',
    icon: '🥗'
  },
  {
    id: 'solar_champion',
    name: 'Solar Champion',
    desc: 'Unlock by selecting solar energy sources or committing to renewable electricity.',
    icon: '☀️'
  },
  {
    id: 'zero_waste',
    name: 'Zero-Waste Warrior',
    desc: 'Unlock by minimizing food waste or committing to waste reduction.',
    icon: '🗑️'
  },
  {
    id: 'eco_commuter',
    name: 'Eco Commuter',
    desc: 'Unlock by choosing low emission transit or committing to transit alternatives.',
    icon: '🚲'
  },
  {
    id: 'conscious_shopper',
    name: 'Conscious Shopper',
    desc: 'Unlock by limiting fast fashion purchases or committing to secondhand shopping.',
    icon: '🛍️'
  },
  {
    id: 'neutral_hero',
    name: 'Carbon Neutral Hero',
    desc: 'Unlock by committing to offset your remaining carbon footprint.',
    icon: '🌍'
  }
];

// Tree SVG blueprints for dynamic rendering
const TREE_SVGS = {
  Food: `<svg class="forest-tree" viewBox="0 0 100 100" fill="none">
          <path d="M50 85 V65 C50 60, 43 55, 38 52 M50 72 C53 66, 61 62, 66 58" stroke="#5d4037" stroke-width="4" stroke-linecap="round"/>
          <circle cx="34" cy="50" r="10" fill="#FF8A80" opacity="0.9"/>
          <circle cx="68" cy="55" r="9" fill="#FF8A80" opacity="0.9"/>
          <circle cx="50" cy="40" r="13" fill="#FFB74D" opacity="0.9"/>
        </svg>`,
  Transport: `<svg class="forest-tree" viewBox="0 0 100 100" fill="none">
          <path d="M50 85 V52 C50 42, 33 37, 23 46 M50 58 C50 44, 67 40, 77 49" stroke="#37474F" stroke-width="3" stroke-linecap="round"/>
          <circle cx="23" cy="46" r="8" fill="#69F0AE" opacity="0.8"/>
          <circle cx="77" cy="49" r="8" fill="#69F0AE" opacity="0.8"/>
          <circle cx="50" cy="34" r="12" fill="#00FF87" opacity="0.8"/>
        </svg>`,
  Energy: `<svg class="forest-tree" viewBox="0 0 100 100" fill="none">
          <path d="M50 85 V35" stroke="#212121" stroke-width="4"/>
          <polygon points="50,15 25,48 75,48" fill="#00FF87" />
          <polygon points="50,30 30,62 70,62" fill="#00E676" />
          <polygon points="50,45 35,76 65,76" fill="#00b0ff" />
        </svg>`,
  Shopping: `<svg class="forest-tree" viewBox="0 0 100 100" fill="none">
          <path d="M50 85 V50" stroke="#4E342E" stroke-width="5" stroke-linecap="round"/>
          <circle cx="50" cy="36" r="18" fill="#60FFA3" opacity="0.9"/>
          <circle cx="38" cy="30" r="12" fill="#00FF87" opacity="0.8"/>
          <circle cx="62" cy="30" r="12" fill="#1A2825" opacity="0.85"/>
        </svg>`,
  General: `<svg class="forest-tree" viewBox="0 0 100 100" fill="none">
          <path d="M50 85 V50" stroke="#4E342E" stroke-width="5" stroke-linecap="round"/>
          <circle cx="50" cy="36" r="18" fill="#00FF87" opacity="0.9"/>
          <circle cx="38" cy="30" r="12" fill="#60FFA3" opacity="0.8"/>
          <circle cx="62" cy="30" r="12" fill="#1A2825" opacity="0.85"/>
        </svg>`
};

// 1. STORAGE MANAGER
const StorageManager = {
  KEY: 'ecotrack_state_prod_v2',

  getDefaultState() {
    return {
      quizCompleted: false,
      answers: {},
      categoryFootprints: {
        Transport: 0,
        Energy: 0,
        Food: 0,
        Shopping: 0
      },
      totalFootprint: 0,
      commitments: [],
      monthlyLogs: [],
      streak: 0,
      lastActivityDate: null,
      carbonSaved: 0,
      unlockedBadges: []
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.getDefaultState();
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to load local storage.", e);
      return this.getDefaultState();
    }
  },

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state.", e);
    }
  },

  clear() {
    try {
      localStorage.removeItem(this.KEY);
    } catch (e) {
      console.error("Failed to clear state.", e);
    }
  }
};

// 2. CARBON FOOTPRINT CALCULATOR
const FootprintCalculator = {
  calculate(answers) {
    const breakdown = {
      Transport: 0,
      Energy: 0,
      Food: 0,
      Shopping: 0
    };

    // Commute Mode
    if (answers.commuteMode === 'car') {
      breakdown.Transport += (2.4 * 365);
    } else if (answers.commuteMode === 'public') {
      breakdown.Transport += (0.6 * 365);
    } else if (answers.commuteMode === 'ev') {
      breakdown.Transport += (0.4 * 365);
    } else if (answers.commuteMode === 'active') {
      breakdown.Transport += 0;
    }

    // Flights
    if (answers.flightHours === 'none') {
      breakdown.Transport += 0;
    } else if (answers.flightHours === 'short') {
      breakdown.Transport += (255 * 5);
    } else if (answers.flightHours === 'medium') {
      breakdown.Transport += (255 * 20);
    } else if (answers.flightHours === 'long') {
      breakdown.Transport += (255 * 50);
    }

    // Home Energy
    let baseKwh = 0;
    if (answers.electricBill === 'low') {
      baseKwh = 200 * 12;
    } else if (answers.electricBill === 'medium') {
      baseKwh = 566 * 12;
    } else if (answers.electricBill === 'high') {
      baseKwh = 1233 * 12;
    } else if (answers.electricBill === 'veryhigh') {
      baseKwh = 2333 * 12;
    }

    let energyEmissions = baseKwh * 0.4;
    if (answers.energySource === 'solar') {
      energyEmissions = 0;
    } else if (answers.energySource === 'partial') {
      energyEmissions = energyEmissions * 0.5;
    }
    breakdown.Energy = energyEmissions;

    // Diet Type
    if (answers.dietType === 'vegan') {
      breakdown.Food += 1500;
    } else if (answers.dietType === 'vegetarian') {
      breakdown.Food += 2000;
    } else if (answers.dietType === 'omnivore') {
      breakdown.Food += 3000;
    } else if (answers.dietType === 'heavy_meat') {
      breakdown.Food += 4800;
    }

    // Food Waste
    if (answers.foodWaste === 'minimal') {
      breakdown.Food += 0;
    } else if (answers.foodWaste === 'some') {
      breakdown.Food += 150;
    } else if (answers.foodWaste === 'significant') {
      breakdown.Food += 300;
    }

    // Online Shopping
    if (answers.onlineOrders === 'rarely') {
      breakdown.Shopping += (1.5 * 24);
    } else if (answers.onlineOrders === 'occasionally') {
      breakdown.Shopping += (1.5 * 72);
    } else if (answers.onlineOrders === 'frequently') {
      breakdown.Shopping += (1.5 * 180);
    } else if (answers.onlineOrders === 'heavy') {
      breakdown.Shopping += (1.5 * 360);
    }

    // Fast Fashion
    if (answers.fastFashion === 'rarely') {
      breakdown.Shopping += (200 * 1);
    } else if (answers.fastFashion === 'moderate') {
      breakdown.Shopping += (200 * 6);
    } else if (answers.fastFashion === 'high') {
      breakdown.Shopping += (200 * 18);
    } else if (answers.fastFashion === 'frequent') {
      breakdown.Shopping += (200 * 35);
    }

    const total = Math.round(breakdown.Transport + breakdown.Energy + breakdown.Food + breakdown.Shopping);
    return {
      breakdown: {
        Transport: Math.round(breakdown.Transport),
        Energy: Math.round(breakdown.Energy),
        Food: Math.round(breakdown.Food),
        Shopping: Math.round(breakdown.Shopping)
      },
      total
    };
  }
};

// 3. QUIZ ENGINE
const QuizEngine = {
  currentIndex: 0,
  questions: [
    {
      id: 'commuteMode',
      category: 'Transport',
      title: 'What is your primary daily commute mode?',
      options: [
        { value: 'car', label: 'Car (Petrol/Diesel)', desc: 'Drive alone daily to work/school', iconSVG: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>' },
        { value: 'public', label: 'Public Transit', desc: 'Commute via bus, train, or subway', iconSVG: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M4 10h16M4 14h16M8 18h8M6 6h1M17 6h1M9 22v-2M15 22v-2"/>' },
        { value: 'ev', label: 'Electric Vehicle', desc: 'Plug-in EV or hybrid driving', iconSVG: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10M13 3l-4 6h5l-4 8"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>' },
        { value: 'active', label: 'Walk / Bike', desc: 'Active commute with zero emissions', iconSVG: '<circle cx="12" cy="5" r="2"/><path d="M12 7v5l-3 3M17 12H7M7 21h10M5 16l4-4M19 16l-4-4"/>' }
      ]
    },
    {
      id: 'flightHours',
      category: 'Transport',
      title: 'How many flight hours do you take annually?',
      options: [
        { value: 'none', label: 'No Flights', desc: 'Do not travel by air', iconSVG: '<circle cx="12" cy="12" r="10"/><path d="M8 8l8 8M16 8l-8 8"/>' },
        { value: 'short', label: '1 - 10 hours', desc: '1-2 short regional weekend trips', iconSVG: '<path d="M21 16V8a2 2 0 0 0-2-2h-3L9 2H7v4L4 9v2l3-1v3l-2 2v1l3-1h4l6 6h2a2 2 0 0 0 2-2z"/>' },
        { value: 'medium', label: '10 - 30 hours', desc: 'Several domestic or continent trips', iconSVG: '<path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM12 6v12M6 12h12"/>' },
        { value: 'long', label: '30+ hours', desc: 'Frequent long haul international flights', iconSVG: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' }
      ]
    },
    {
      id: 'energySource',
      category: 'Home Energy',
      title: 'What is your primary household electricity source?',
      options: [
        { value: 'grid', label: 'Standard Utility Grid', desc: 'Fossil mixed energy utility supplier', iconSVG: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 12h6M12 9v6"/>' },
        { value: 'partial', label: 'Partial Renewables', desc: 'Green tariffs or small local solar system', iconSVG: '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>' },
        { value: 'solar', label: '100% Solar / Wind', desc: 'Off-grid rooftop array or green contract', iconSVG: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>' }
      ]
    },
    {
      id: 'electricBill',
      category: 'Home Energy',
      title: 'What is your average monthly electricity bill?',
      options: [
        { value: 'low', label: 'Under ₹4,000', desc: 'Minimal heating, AC, and appliances', iconSVG: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
        { value: 'medium', label: '₹4,000 - ₹10,000', desc: 'Standard appliance and seasonal AC usage', iconSVG: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6M17 1v22"/>' },
        { value: 'high', label: '₹10,000 - ₹20,000', desc: 'Consistent cooling or larger household', iconSVG: '<path d="M3 12h18M3 6h18M3 18h18M12 2v20"/>' },
        { value: 'veryhigh', label: '₹20,000+', desc: 'Large home, pools, continuous climate control', iconSVG: '<path d="M2 22h20M5 17h14M8 12h8M11 7h2M12 2v5"/>' }
      ]
    },
    {
      id: 'dietType',
      category: 'Food',
      title: 'Which description best matches your daily diet?',
      options: [
        { value: 'heavy_meat', label: 'Heavy Meat Eater', desc: 'Eat beef, pork, or poultry almost daily', iconSVG: '<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>' },
        { value: 'omnivore', label: 'Balanced Omnivore', desc: 'Moderate meat, fish, and dairy intake', iconSVG: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>' },
        { value: 'vegetarian', label: 'Vegetarian', desc: 'No meat, eat eggs, cheese, and dairy', iconSVG: '<circle cx="12" cy="12" r="10"/><path d="M8 10a4 4 0 0 1 8 0"/>' },
        { value: 'vegan', label: 'Vegan', desc: '100% plant-based food habits', iconSVG: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>' }
      ]
    },
    {
      id: 'foodWaste',
      category: 'Food',
      title: 'How much food does your household throw away?',
      options: [
        { value: 'minimal', label: 'Minimal / None', desc: 'Careful meal planning, composting', iconSVG: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"/>' },
        { value: 'some', label: 'Occasional Waste', desc: 'Leftovers sometimes go unused', iconSVG: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>' },
        { value: 'significant', label: 'Significant Waste', desc: 'Discard expired items frequently', iconSVG: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>' }
      ]
    },
    {
      id: 'onlineOrders',
      category: 'Shopping',
      title: 'How often do you place online shopping deliveries?',
      options: [
        { value: 'rarely', label: 'Rarely (0-2/month)', desc: 'Shop locally, minimal home packages', iconSVG: '<path d="M12 22V12M22 7l-10-5-10 5 10 5 10-5zM2 17l10 5 10-5"/>' },
        { value: 'occasionally', label: 'Occasionally (3-8/month)', desc: 'Weekly online parcels and deliveries', iconSVG: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/>' },
        { value: 'frequently', label: 'Frequently (8-20/month)', desc: 'Multiple orders arriving weekly', iconSVG: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
        { value: 'heavy', label: 'Active (20+/month)', desc: 'Daily delivery drops and shopping', iconSVG: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>' }
      ]
    },
    {
      id: 'fastFashion',
      category: 'Shopping',
      title: 'How many fast fashion clothes do you buy yearly?',
      options: [
        { value: 'rarely', label: '0 - 2 items', desc: 'Thrift clothing or long-term pieces', iconSVG: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01"/>' },
        { value: 'moderate', label: '3 - 10 items', desc: 'A few brand-new retail clothes', iconSVG: '<path d="M20.38 3.46L16 2.14 11.62 3.46a2 2 0 0 0-1.38 1.9V8h7.5V6a.5.5 0 0 1 1 0v2H22V5.36a2 2 0 0 0-1.62-1.9zM2 8h8v12h12V8H2z"/>' },
        { value: 'high', label: '10 - 25 items', desc: 'Regular shopping updates, new trends', iconSVG: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>' },
        { value: 'frequent', label: '25+ items', desc: 'Buy new styles weekly, fast turnover', iconSVG: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' }
      ]
    }
  ],

  render() {
    const wrapper = document.getElementById('quiz-slider-wrapper');
    wrapper.innerHTML = '';
    
    this.questions.forEach((q, qIndex) => {
      const slide = document.createElement('div');
      slide.className = 'quiz-slide';
      
      let optionsHTML = '';
      q.options.forEach(opt => {
        const isSelected = App.state.answers[q.id] === opt.value;
        optionsHTML += `
          <div class="option-card ${isSelected ? 'selected' : ''}" 
               onclick="QuizEngine.selectOption('${q.id}', '${opt.value}', ${qIndex})">
            <svg class="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${opt.iconSVG}
            </svg>
            <div class="option-label">${opt.label}</div>
            <div class="option-desc">${opt.desc}</div>
          </div>
        `;
      });

      slide.innerHTML = `
        <h2 class="question-title">${q.title}</h2>
        <div class="options-grid">
          ${optionsHTML}
        </div>
      `;
      wrapper.appendChild(slide);
    });

    this.updateNavigationUI();
  },

  selectOption(questionId, value, questionIndex) {
    App.state.answers[questionId] = value;
    
    const slide = document.querySelectorAll('.quiz-slide')[questionIndex];
    const cards = slide.querySelectorAll('.option-card');
    
    cards.forEach((card, idx) => {
      if (this.questions[questionIndex].options[idx].value === value) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    StorageManager.save(App.state);
    this.updateNavigationUI();
    
    setTimeout(() => {
      if (this.currentIndex === questionIndex && this.currentIndex < this.questions.length - 1) {
        this.nextQuestion();
      }
    }, 250);
  },

  updateNavigationUI() {
    const currentQ = this.questions[this.currentIndex];
    const hasAnswered = !!App.state.answers[currentQ.id];
    
    document.getElementById('quiz-active-category').innerText = currentQ.category;
    document.getElementById('quiz-active-step').innerText = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
    
    const percent = Math.round(((this.currentIndex) / this.questions.length) * 100);
    document.getElementById('quiz-progress-fill').style.width = `${percent}%`;

    document.getElementById('btn-quiz-prev').disabled = this.currentIndex === 0;
    
    const nextBtn = document.getElementById('btn-quiz-next');
    nextBtn.disabled = !hasAnswered;
    
    if (this.currentIndex === this.questions.length - 1) {
      nextBtn.innerText = 'Audit Complete';
    } else {
      nextBtn.innerText = 'Next';
    }
  },

  nextQuestion() {
    const currentQ = this.questions[this.currentIndex];
    if (!App.state.answers[currentQ.id]) return;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.slideToCurrent();
      this.updateNavigationUI();
    } else {
      App.finishQuiz();
    }
  },

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.slideToCurrent();
      this.updateNavigationUI();
    }
  },

  slideToCurrent() {
    const wrapper = document.getElementById('quiz-slider-wrapper');
    wrapper.style.transform = `translateX(-${this.currentIndex * 12.5}%)`;
  }
};

// 4. ACTION RECOMMENDER
const ActionRecommender = {
  getRankedActions() {
    const highestCategory = App.getHighestCategory();
    
    return [...ACTIONS].sort((a, b) => {
      const aIsHighest = a.category.toLowerCase() === highestCategory.toLowerCase();
      const bIsHighest = b.category.toLowerCase() === highestCategory.toLowerCase();
      
      if (aIsHighest && !bIsHighest) return -1;
      if (!aIsHighest && bIsHighest) return 1;
      
      return b.saving - a.saving;
    });
  }
};

// 5. "SOMETHING HATKE" - FOREST MANAGER (Visual Tree Spawner)
const ForestManager = {
  renderForest() {
    const canvas = document.getElementById('forest-canvas');
    canvas.innerHTML = '';

    if (App.state.commitments.length === 0) {
      canvas.innerHTML = '<div class="forest-empty-msg">No trees planted yet. Commit to an action below to plant a tree and grow your visual eco-forest!</div>';
      return;
    }

    // Render tree per committed action
    App.state.commitments.forEach((actionId, idx) => {
      const action = ACTIONS.find(a => a.id === actionId);
      if (!action) return;

      const slot = document.createElement('div');
      slot.className = 'forest-slot';
      
      // Determine tree blueprint based on category
      const treeSVGString = TREE_SVGS[action.category] || TREE_SVGS.General;
      slot.innerHTML = treeSVGString;

      canvas.appendChild(slot);

      // Trigger transition with stagger delay
      setTimeout(() => {
        const treeSVG = slot.querySelector('.forest-tree');
        if (treeSVG) {
          treeSVG.classList.add('planted');
          // Sway after growth completes
          setTimeout(() => treeSVG.classList.add('sway'), 800);
        }
      }, idx * 100);
    });

    // Update count display
    document.getElementById('forest-count').innerText = `${App.state.commitments.length} / 10 Pledged`;
  }
};

// 6. DASHBOARD RENDERER
const DashboardRenderer = {
  donutChart: null,
  lineChart: null,
  activeEquivalency: 'trees',
  tipIndex: 0,

  initializeCharts() {
    const donutCtx = document.getElementById('donutBreakdownChart').getContext('2d');
    const lineCtx = document.getElementById('lineTrendChart').getContext('2d');

    if (this.donutChart) this.donutChart.destroy();
    if (this.lineChart) this.lineChart.destroy();

    const categories = Object.keys(App.state.categoryFootprints);
    const dataValues = Object.values(App.state.categoryFootprints);

    // Donut
    this.donutChart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: dataValues,
          backgroundColor: ['#00FF87', '#00B0FF', '#FFD35C', '#FF5E62'],
          borderColor: '#0D1311',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#839691',
              font: { family: 'Inter', size: 11 }
            }
          }
        },
        cutout: '75%'
      }
    });

    // Line Chart
    const months = App.state.monthlyLogs.map(l => l.month);
    const monthlyEmissions = App.state.monthlyLogs.map(l => l.footprint);

    this.lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          data: monthlyEmissions,
          borderColor: '#00FF87',
          borderWidth: 2,
          pointBackgroundColor: '#60FFA3',
          pointBorderWidth: 0,
          pointRadius: 4,
          fill: false,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#839691', font: { family: 'Inter', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(26, 36, 33, 0.4)' },
            ticks: { color: '#839691', font: { family: 'Inter', size: 10 } }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  },

  updateDashboardStats() {
    const totalSavings = App.getSavingsTotal();
    const activeScore = Math.max(0, App.state.totalFootprint - totalSavings);

    document.getElementById('header-saved-value').innerText = totalSavings.toLocaleString();
    document.getElementById('header-streak-value').innerText = App.state.streak;
    document.getElementById('dashboard-active-score').innerText = activeScore.toLocaleString();

    // Globe
    const globe = document.getElementById('dashboard-earth');
    const healthStatus = document.getElementById('dashboard-health-status');
    globe.className = 'earth-globe';

    if (activeScore < 4000) {
      globe.classList.add('earth-pulse-green');
      globe.style.color = '#00FF87';
      healthStatus.innerText = 'Earth Health: Stable 🌿';
      healthStatus.style.color = '#00FF87';
    } else if (activeScore >= 4000 && activeScore <= 8000) {
      globe.classList.add('earth-pulse-yellow');
      globe.style.color = '#FFD35C';
      healthStatus.innerText = 'Earth Health: Warning 🌍';
      healthStatus.style.color = '#FFD35C';
    } else {
      globe.classList.add('earth-pulse-red');
      globe.style.color = '#FF5E62';
      healthStatus.innerText = 'Earth Health: Danger 🔥';
      healthStatus.style.color = '#FF5E62';
    }

    App.calculateBadges(activeScore, totalSavings);
    this.renderBadges();

    // Spawn / Sync Virtual Forest trees
    ForestManager.renderForest();

    // Updates
    document.getElementById('fact-driving-title').innerText = `Equal to driving ${(activeScore / DRIVING_KM_FACTOR).toLocaleString(undefined, {maximumFractionDigits: 0})} km 🚗`;
    document.getElementById('fact-trees-title').innerText = `Requires ${Math.round(activeScore / TREES_ABSORPTION_FACTOR).toLocaleString()} trees 🌳`;

    this.updateEquivalencyDisplay(activeScore);
  },

  renderBadges() {
    const container = document.getElementById('badges-grid-container');
    container.innerHTML = '';

    BADGES.forEach(badge => {
      const isUnlocked = App.state.unlockedBadges.includes(badge.id);
      const badgeEl = document.createElement('div');
      badgeEl.className = `badge-icon-wrapper ${isUnlocked ? 'unlocked' : ''}`;
      badgeEl.innerHTML = `
        <span style="font-size: 20px; filter: ${isUnlocked ? 'none' : 'grayscale(1)'}; opacity: ${isUnlocked ? '1' : '0.2'}">${badge.icon}</span>
        <div class="badge-tooltip">
          <div class="tooltip-name">${badge.name}</div>
          <div style="font-size: 10px; color: var(--color-text-muted); margin-bottom: 2px;">${isUnlocked ? 'Unlocked' : 'Locked'}</div>
          <div>${badge.desc}</div>
        </div>
      `;
      container.appendChild(badgeEl);
    });
  },

  renderActionTab() {
    const grid = document.getElementById('actions-list-grid');
    grid.innerHTML = '';

    const highestCategory = App.getHighestCategory();
    document.getElementById('user-priority-category').innerText = highestCategory;

    const rankedActions = ActionRecommender.getRankedActions();

    rankedActions.forEach(action => {
      const isCommitted = App.state.commitments.includes(action.id);
      const difficultyClass = action.difficulty.toLowerCase();

      const card = document.createElement('div');
      card.className = 'action-card';
      card.innerHTML = `
        <div class="action-card-header">
          <span class="action-category">${action.category}</span>
          <span class="action-diff ${difficultyClass}">${action.difficulty}</span>
        </div>
        <h4 class="action-title">${action.title}</h4>
        <p class="action-desc">${action.desc}</p>
        <div class="action-impact">
          <span>CO₂ Reduction:</span>
          <strong>-${action.saving} kg/yr</strong>
        </div>
        <button class="action-btn ${isCommitted ? 'action-btn-committed' : 'action-btn-commit'}" 
                onclick="DashboardRenderer.toggleAction('${action.id}')">
          ${isCommitted ? 'Pledged ✓ (Undo)' : 'I\'ll do this!'}
        </button>
      `;
      grid.appendChild(card);
    });
  },

  toggleAction(actionId) {
    const index = App.state.commitments.indexOf(actionId);
    const action = ACTIONS.find(a => a.id === actionId);

    if (index === -1) {
      App.state.commitments.push(actionId);
      App.state.carbonSaved += action.saving;
      App.incrementStreak();
    } else {
      App.state.commitments.splice(index, 1);
      App.state.carbonSaved = Math.max(0, App.state.carbonSaved - action.saving);
    }

    StorageManager.save(App.state);
    this.updateDashboardStats();
    this.renderActionTab();
    this.initializeCharts();
  },

  switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    btnElement.classList.add('active');

    if (tabId === 'tab-footprint') {
      this.initializeCharts();
    } else if (tabId === 'tab-actions') {
      this.renderActionTab();
    }
  },

  switchEquivalency(unit, btnElement) {
    this.activeEquivalency = unit;
    document.querySelectorAll('.eq-tab-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    
    const activeScore = Math.max(0, App.state.totalFootprint - App.getSavingsTotal());
    this.updateEquivalencyDisplay(activeScore);
  },

  updateEquivalencyDisplay(score) {
    const numberEl = document.getElementById('eq-number');
    const descEl = document.getElementById('eq-description');
    const iconEl = document.getElementById('eq-visual-icon');

    if (this.activeEquivalency === 'trees') {
      const treesVal = Math.round(score / TREES_ABSORPTION_FACTOR);
      iconEl.innerText = '🌳';
      numberEl.innerText = treesVal.toLocaleString();
      descEl.innerText = `You need ${treesVal.toLocaleString()} pine trees absorbing carbon for a whole year to offset your carbon output.`;
    } else if (this.activeEquivalency === 'coal') {
      const coalVal = Math.round(score / COAL_BURN_FACTOR);
      iconEl.innerText = '🪨';
      numberEl.innerText = `${coalVal.toLocaleString()} kg`;
      descEl.innerText = `Your yearly carbon release equals burning this total weight of raw anthracite coal.`;
    } else if (this.activeEquivalency === 'smartphone') {
      const phonesVal = Math.round(score / SMARTPHONE_CHARGE_FACTOR);
      iconEl.innerText = '🔋';
      numberEl.innerText = phonesVal.toLocaleString();
      descEl.innerText = `Equivalent to recharging a standard modern lithium-ion smartphone this many times.`;
    }
  },

  changeTip(direction) {
    this.tipIndex = (this.tipIndex + direction + ECO_TIPS.length) % ECO_TIPS.length;
    document.getElementById('eco-tip-text').innerText = `"${ECO_TIPS[this.tipIndex]}"`;
    document.getElementById('eco-tip-index').innerText = `Tip ${this.tipIndex + 1} of ${ECO_TIPS.length}`;
  },

  updateSliderValueDisplay(val) {
    document.getElementById('log-slider-value-display').innerText = `${val} kg`;
  },

  handleMonthlyLog(e) {
    e.preventDefault();
    const month = document.getElementById('log-month-select').value;
    const val = parseInt(document.getElementById('log-footprint-slider').value);

    const existingIdx = App.state.monthlyLogs.findIndex(l => l.month === month);
    if (existingIdx !== -1) {
      App.state.monthlyLogs[existingIdx].footprint = val;
    } else {
      App.state.monthlyLogs.push({ month, footprint: val });
    }

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    App.state.monthlyLogs.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

    App.incrementStreak();
    StorageManager.save(App.state);
    this.initializeCharts();
  }
};

// 7. MAIN APP ORCHESTRATOR
const App = {
  state: {},

  init() {
    this.state = StorageManager.load();
    
    if (this.state.quizCompleted) {
      this.showScreen('screen-dashboard');
      DashboardRenderer.updateDashboardStats();
      DashboardRenderer.initializeCharts();
      document.getElementById('global-stats-bar').style.display = 'flex';
    } else {
      this.showScreen('screen-welcome');
    }
  },

  startQuiz() {
    this.state.answers = {};
    this.showScreen('screen-quiz');
    QuizEngine.currentIndex = 0;
    QuizEngine.render();
  },

  finishQuiz() {
    const calculated = FootprintCalculator.calculate(this.state.answers);
    this.state.categoryFootprints = calculated.breakdown;
    this.state.totalFootprint = calculated.total;
    this.state.quizCompleted = true;

    const monthlyAverage = Math.round(calculated.total / 12);
    
    this.state.monthlyLogs = [
      { month: 'Jan', footprint: Math.round(monthlyAverage * 1.25) },
      { month: 'Feb', footprint: Math.round(monthlyAverage * 1.15) },
      { month: 'Mar', footprint: Math.round(monthlyAverage * 1.05) },
      { month: 'Apr', footprint: Math.round(monthlyAverage) },
      { month: 'May', footprint: Math.round(monthlyAverage) }
    ];

    document.getElementById('log-footprint-slider').value = monthlyAverage;
    document.getElementById('log-slider-value-display').innerText = `${monthlyAverage} kg`;

    StorageManager.save(this.state);
    this.showResults();
  },

  showResults() {
    this.showScreen('screen-results');
    
    const score = this.state.totalFootprint;
    document.getElementById('results-score-value').innerHTML = `${score.toLocaleString()} <span>kg CO₂/yr</span>`;

    const fill = document.getElementById('results-gauge-fill');
    const badge = document.getElementById('results-score-badge');

    const maxScale = 15000;
    const percentage = Math.min(1, score / maxScale);
    const offset = 628 - (628 * percentage);
    
    fill.style.strokeDashoffset = offset;

    badge.className = 'gauge-label';
    if (score < 4000) {
      fill.style.stroke = 'var(--accent-primary)';
      badge.innerText = 'Below Average 🌿';
      badge.classList.add('status-green');
    } else if (score >= 4000 && score <= 8000) {
      fill.style.stroke = 'var(--color-warning)';
      badge.innerText = 'Average 🌍';
      badge.classList.add('status-yellow');
    } else {
      fill.style.stroke = 'var(--color-danger)';
      badge.innerText = 'Above Average 🔥';
      badge.classList.add('status-red');
    }

    const maxCompareVal = Math.max(score, GLOBAL_AVERAGE_FOOTPRINT, INDIA_AVERAGE_FOOTPRINT) * 1.1;
    document.getElementById('compare-user-label').innerText = `${score.toLocaleString()} kg`;
    
    setTimeout(() => {
      document.getElementById('compare-bar-user').style.width = `${(score / maxCompareVal) * 100}%`;
      document.getElementById('compare-bar-global').style.width = `${(GLOBAL_AVERAGE_FOOTPRINT / maxCompareVal) * 100}%`;
      document.getElementById('compare-bar-india').style.width = `${(INDIA_AVERAGE_FOOTPRINT / maxCompareVal) * 100}%`;
    }, 150);
  },

  enterDashboard() {
    this.showScreen('screen-dashboard');
    document.getElementById('global-stats-bar').style.display = 'flex';
    
    DashboardRenderer.updateDashboardStats();
    DashboardRenderer.initializeCharts();
  },

  getHighestCategory() {
    const entries = Object.entries(this.state.categoryFootprints);
    let maxCat = 'Transport';
    let maxVal = -1;

    entries.forEach(([cat, val]) => {
      if (val > maxVal) {
        maxVal = val;
        maxCat = cat;
      }
    });
    return maxCat;
  },

  getSavingsTotal() {
    let total = 0;
    this.state.commitments.forEach(actionId => {
      const action = ACTIONS.find(a => a.id === actionId);
      if (action) total += action.saving;
    });
    return total;
  },

  incrementStreak() {
    const today = new Date().toDateString();
    if (this.state.lastActivityDate !== today) {
      this.state.streak += 1;
      this.state.lastActivityDate = today;
      StorageManager.save(this.state);
    }
  },

  calculateBadges(activeScore, totalSavings) {
    const badges = [];
    
    if (this.state.answers.dietType === 'vegan' || this.state.answers.dietType === 'vegetarian' || this.state.commitments.includes('plant_based')) {
      badges.push('plant_pioneer');
    }
    if (this.state.answers.energySource === 'solar' || this.state.commitments.includes('renewable_energy')) {
      badges.push('solar_champion');
    }
    if (this.state.answers.foodWaste === 'minimal' || this.state.commitments.includes('food_waste')) {
      badges.push('zero_waste');
    }
    if (this.state.answers.commuteMode === 'active' || this.state.answers.commuteMode === 'public' || this.state.commitments.includes('public_transit') || this.state.commitments.includes('wfh_commute')) {
      badges.push('eco_commuter');
    }
    if (this.state.commitments.includes('secondhand_clothes') || this.state.answers.fastFashion === 'rarely') {
      badges.push('conscious_shopper');
    }
    if (this.state.commitments.includes('offset_footprint') || activeScore === 0) {
      badges.push('neutral_hero');
    }

    this.state.unlockedBadges = badges;
    StorageManager.save(this.state);
  },

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if (screenId === 'screen-welcome' || screenId === 'screen-quiz') {
      document.getElementById('global-stats-bar').style.display = 'none';
    }
  },

  resetData() {
    if (confirm("Are you sure you want to restart your carbon audit?")) {
      StorageManager.clear();
      this.state = StorageManager.getDefaultState();
      this.showScreen('screen-welcome');
    }
  }
};

// Start application
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
