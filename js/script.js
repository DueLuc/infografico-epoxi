document.addEventListener("DOMContentLoaded", () => {
  // --- Language Logic ---
  let currentLang = localStorage.getItem('lang') || 'pt'; // Default to Portuguese

  const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateContent(lang);
    updateLanguageButtons(lang);

    // Explicitly update mobile nav links
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
      const key = link.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        link.textContent = translations[lang][key];
      }
    });
  };

  const updateContent = (lang) => {
    // Update static content
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        // Check if the element contains an <a> tag
        const linkElement = element.querySelector('a');
        if (linkElement) {
          // If it has a link, update the text content of the link
          linkElement.textContent = translations[lang][key];
        } else {
          // Otherwise, update the innerHTML (for content that might contain HTML like strong tags)
          element.innerHTML = translations[lang][key];
        }
      }
    });

    // Update meta tags
    document.querySelector('title').innerHTML = translations[lang]['meta_title'];
    document.querySelector('meta[name="description"]').setAttribute('content', translations[lang]['meta_description_short']);
    document.querySelector('meta[property="og:title"]').setAttribute('content', translations[lang]['meta_og_title']);
    document.querySelector('meta[property="og:description"]').setAttribute('content', translations[lang]['meta_og_description']);

    // Update dynamic content (Ciclo de Vida)
    // This part will be handled by modifying renderContent later,
    // but we need to re-render the current step if it's active.
    const activeStepDesktop = document.querySelector('.step-item.active');
    if (activeStepDesktop) {
      renderContent(activeStepDesktop.dataset.step, 'desktop');
    }

    const activeStepMobile = document.querySelector('.step-item-mobile.active');
    if (activeStepMobile) {
      renderContent(activeStepMobile.dataset.step, 'mobile');
    }
    
    // Update chart labels
    updateChartLabels(lang);
  };

  const updateLanguageButtons = (lang) => {
    document.querySelectorAll('.lang-button').forEach(button => {
      if (button.dataset.lang === lang) {
        button.classList.remove('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
        button.classList.add('bg-[#82b158]', 'text-white', 'hover:bg-[#e78341]');
      } else {
        button.classList.remove('bg-[#118AB2]', 'text-white', 'hover:bg-[#06D6A0]');
        button.classList.add('bg-gray-200', 'text-gray-800', 'hover:bg-gray-300');
      }
    });
  };

  // Add event listeners to language buttons
  document.querySelectorAll('.lang-button').forEach(button => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.lang);
    });
  });

  // --- Ciclo de Vida Logic ---
  const stepItemsDesktop = document.querySelectorAll(".step-item");
  const stepItemsMobile = document.querySelectorAll(".step-item-mobile");
  const contentContainerDesktop = document.getElementById("step-content-container-desktop");

  // Function to render content in the container (MODIFIED to handle desktop and mobile)
  const renderContent = (stepNumber, device) => {
    const stepTitleKey = `ciclo_step${stepNumber}_title`;
    const stepDescriptionKey = `ciclo_step${stepNumber}_description`;
    const stepImageSrc = stepsContent[stepNumber].imageSrc;

    const contentHTML = `
      <div class="flex flex-col md:flex-row items-center gap-4 p-4 mt-4">
        <div class="flex-shrink-0 grid place-items-center h-full">
          <img src="${stepImageSrc}" alt="${translations[currentLang][stepTitleKey]}" class="w-48 h-full object-cover rounded-lg shadow-md">
        </div>
        <div class="flex flex-col justify-center h-full flex-grow text-center md:text-left">
          <h3 class="text-2xl font-bold mb-2 my-auto">${translations[currentLang][stepTitleKey]}</h3>
          <p class="text-lg my-auto">${translations[currentLang][stepDescriptionKey]}</p>
        </div>
      </div>
    `;

    if (device === 'desktop') {
      if (contentContainerDesktop) {
        contentContainerDesktop.innerHTML = contentHTML;
      }
    } else if (device === 'mobile') {
      const mobileContentDiv = document.getElementById(`step-content-mobile-${stepNumber}`);
      if (mobileContentDiv) {
        mobileContentDiv.innerHTML = contentHTML;
      }
    }
  };

  // Original stepsContent (now only for image paths)
  const stepsContent = {
    1: { imageSrc: "assets/ciclo_1_geracao.png" },
    2: { imageSrc: "assets/ciclo_2_acondicionamento.png" },
    3: { imageSrc: "assets/ciclo_3_armazenamento.png" },
    4: { imageSrc: "assets/ciclo_4_transporte.png" },
    5: { imageSrc: "assets/ciclo_5_destinacao.png" },
  };

  // Add click events to desktop step buttons
  stepItemsDesktop.forEach((item) => {
    const activate = () => {
      const stepNumber = item.dataset.step;
      stepItemsDesktop.forEach((el) => el.classList.remove("active", "bg-slate-100"));
      item.classList.add("active", "bg-slate-100");
      renderContent(stepNumber, 'desktop');
    };

    item.addEventListener("click", activate);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  // Add click events to mobile step buttons
  stepItemsMobile.forEach((item) => {
    const activate = () => {
      const stepNumber = item.dataset.step;
      const mobileContentDiv = document.getElementById(`step-content-mobile-${stepNumber}`);

      // Toggle active class on button
      item.classList.toggle("active");
      // Toggle visibility of content div
      mobileContentDiv.classList.toggle("hidden");

      // Render content if not already rendered (or re-render on toggle)
      if (!mobileContentDiv.innerHTML || !mobileContentDiv.classList.contains('hidden')) {
        renderContent(stepNumber, 'mobile');
      }
    };

    item.addEventListener("click", activate);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  // Initial activation logic
  // Check screen size to activate appropriate initial step
  if (window.innerWidth >= 768) { // md breakpoint
    if (stepItemsDesktop.length > 0) {
      stepItemsDesktop[0].classList.add("active", "bg-slate-100");
      renderContent(1, 'desktop');
    }
  } else {
    // For mobile, no initial content is shown, it's toggled by click
  }

  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  // Set initial theme to light and show the correct icon
  document.documentElement.classList.remove('dark');
  lightIcon.classList.remove('hidden');
  darkIcon.classList.add('hidden');

  themeToggleBtn.addEventListener('click', () => {
    // Toggle the .dark class on the <html> element
    document.documentElement.classList.toggle('dark');

    // Toggle icon visibility
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    // Change logo based on theme
    const logoImg = document.getElementById('logo-img');
    if (document.documentElement.classList.contains('dark')) {
      logoImg.src = 'assets/Logo_EHS_PreventionEscuro.png';
    } else {
      logoImg.src = 'assets/Logo_EHS_Prevention.png';
    }

    // Optional: Add a smooth transition effect
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  });

  // --- Charts ---
  const chartInstances = {}; // Store chart instances

  const createDoughnutChart = (ctx, label, data, backgroundColor) => {
    if (chartInstances[ctx.id]) {
      chartInstances[ctx.id].destroy(); // Destroy existing chart if it exists
    }
    chartInstances[ctx.id] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [label, ''],
        datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
  };

  const updateChartLabels = (lang) => {
    const incorretoCtx = document.getElementById('incorreto-chart');
    if (incorretoCtx) {
      createDoughnutChart(incorretoCtx, translations[lang]['graficos_descarte_incorreto_h3'], [83, 17], ['#FF6B6B', '#E5E7EB']);
    }

    const coprocessamentoCtx = document.getElementById('coprocessamento-chart');
    if (coprocessamentoCtx) {
      createDoughnutChart(coprocessamentoCtx, translations[lang]['graficos_coprocessamento_h3'], [8, 9], ['#06D6A0', '#E5E7EB']);
    }

    const incineracaoCtx = document.getElementById('incineracao-chart');
    if (incineracaoCtx) {
      createDoughnutChart(incineracaoCtx, translations[lang]['graficos_incineracao_h3'], [5, 12], ['#118AB2', '#E5E7EB']);
    }

    const aterroCtx = document.getElementById('aterro-chart');
    if (aterroCtx) {
      createDoughnutChart(aterroCtx, translations[lang]['graficos_aterro_h3'], [4, 13], ['#073B4C', '#E5E7EB']);
    }
  };

  // --- Hamburger Menu Logic ---
  const hamburgerButton = document.getElementById('hamburger-button');
  const mobileNav = document.getElementById('mobile-nav');
  const closeMobileNavButton = document.getElementById('close-mobile-nav');
  const mobileNavLinks = mobileNav.querySelectorAll('.nav-link-mobile');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
  const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

  // Set initial theme for mobile toggle based on current theme
  if (document.documentElement.classList.contains('dark')) {
    darkIconMobile.classList.remove('hidden');
    lightIconMobile.classList.add('hidden');
  } else {
    darkIconMobile.classList.add('hidden');
    lightIconMobile.classList.remove('hidden');
  }

  hamburgerButton.addEventListener('click', () => {
    mobileNav.classList.add('active');
    updateContent(currentLang); // Call updateContent when menu opens
  });

  closeMobileNavButton.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      
    });
  });

  // Mobile Theme Toggle
  themeToggleMobile.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    darkIconMobile.classList.toggle('hidden');
    lightIconMobile.classList.toggle('hidden');

    // Change logo based on theme
    const logoImg = document.getElementById('logo-img');
    if (document.documentElement.classList.contains('dark')) {
      logoImg.src = 'assets/Logo_EHS_PreventionEscuro.png';
    } else {
      logoImg.src = 'assets/Logo_EHS_Prevention.png';
    }
  });

  // Initial language setup
  setLanguage(currentLang);
});