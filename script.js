document.addEventListener('DOMContentLoaded', function() {
    // --- Element References ---
    const preloader = document.querySelector('.preloader');
    const satelliteLauncher = document.querySelector('.satellite-launcher');
    const introPage = document.querySelector('.intro-page');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const enterDashboardBtn = document.getElementById('enter-dashboard-btn');
    const typewriterEl = document.getElementById('typewriter');
    const introContentWrapper = document.querySelector('.intro-content-wrapper');
    const spaceElementContainer = document.getElementById('space-element-container');

    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const pageTitleDisplay = document.getElementById('page-title-display');
    const liveClock = document.getElementById('live-clock');
    
    const reportModal = document.getElementById('report-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // --- Intro Sequence Logic ---
    const introText = `Project Genesis was initiated on July 20, 2025, from a small, dedicated lab in Jaipur, India. The core mission: to create a unified, real-time interface for visualizing the vast expanse of space mission data, making it accessible and engaging for everyone from seasoned astronomers to curious students.\n\nThe development team, a fusion of veteran aerospace engineers and young, passionate coders, worked tirelessly. They leveraged cutting-edge web technologies to build a platform that is not only data-rich but also visually stunning. Every line of code, every design element, was crafted with the goal of inspiring awe and wonder.\n\nThis dashboard is the culmination of thousands of hours of research, development, and a shared love for the cosmos. It stands as a testament to what a small, focused team can achieve. Welcome to the frontier.\n\nMade by Zeroday Crew ♥`;
    
    function typeWriter(text, i = 0) {
        if (i < text.length) {
            typewriterEl.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 9);
        } else {
            enterDashboardBtn.style.opacity = '1';
        }
    }

    function createSpaceElements() {
        const icons = ['fa-planet-moon', 'fa-rocket', 'fa-star-of-life', 'fa-meteor', 'fa-satellite-dish'];
        for (let i = 0; i < 20; i++) {
            const el = document.createElement('i');
            el.className = `fas ${icons[Math.floor(Math.random() * icons.length)]} space-element`;
            el.style.top = `${Math.random() * 100}vh`;
            el.style.left = `${Math.random() * 100}vw`;
            el.style.fontSize = `${Math.random() * 15 + 5}px`;
            el.dataset.speed = Math.random() * 2 + 0.5;
            spaceElementContainer.appendChild(el);
        }
    }

    introContentWrapper.addEventListener('scroll', () => {
        const scrollTop = introContentWrapper.scrollTop;
        document.querySelectorAll('.space-element').forEach(el => {
            const speed = el.dataset.speed;
            el.style.transform = `translateY(-${scrollTop * speed}px)`;
            el.style.opacity = 1 - (scrollTop / 500);
        });
    });

    function startIntroSequence() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => {
                preloader.style.display = 'none';
                satelliteLauncher.style.bottom = '120vh';
                setTimeout(() => {
                    introPage.style.display = 'flex';
                    setTimeout(() => {
                        introPage.style.opacity = '1';
                        createSpaceElements();
                        typeWriter(introText);
                    }, 50);
                }, 1000);
            });
        }, 5000);
    }

    enterDashboardBtn.addEventListener('click', () => {
        introPage.style.opacity = '0';
        introPage.addEventListener('transitionend', () => {
            introPage.style.display = 'none';
            document.body.style.overflow = 'auto';
            dashboardContainer.style.visibility = 'visible';
            showPage('dashboard');
            startDataSimulation();
        });
    });

    // --- Main App Logic ---
    const pageContent = {
        'dashboard': `<div class="traveling-astronaut"><i class="fas fa-user-astronaut"></i></div><div class="dashboard-header"><h1>Dashboard</h1></div><div class="dashboard-grid"><div class="card"><div class="card-header"><i class="fas fa-satellite"></i><h3>ISS Location</h3></div><div class="card-content"><p><strong>Latitude:</strong> <span id="iss-lat">15.45</span>° N</p><p><strong>Longitude:</strong> <span id="iss-lon">105.89</span>° E</p><p><strong>Altitude:</strong> <span id="iss-alt">408</span> km</p></div></div><div class="card"><div class="card-header"><i class="fas fa-wind"></i><h3>Mars Weather</h3></div><div class="card-content"><p><strong>Location:</strong> Jezero Crater</p><p><strong>Temperature:</strong> <span id="mars-temp">-63</span> °C</p><p><strong>Pressure:</strong> <span id="mars-press">7.5</span> hPa</p></div></div><div class="card"><div class="card-header"><i class="fas fa-signal"></i><h3>Satellite Telemetry</h3></div><div class="card-content"><div class="telemetry-item"><span>Battery</span><div class="telemetry-bar-container"><div id="sat-battery" class="telemetry-bar" style="width: 85%;"></div></div></div><div class="telemetry-item"><span>Signal</span><div class="telemetry-bar-container"><div id="sat-signal" class="telemetry-bar" style="width: 92%;"></div></div></div></div></div><div class="card"><div class="card-header"><i class="fas fa-meteor"></i><h3>Asteroid Watch</h3></div><div class="card-content"><p><strong>Monitored:</strong> 3</p><p><strong>Highest Threat:</strong> Apophis</p><p><strong>Next Approach:</strong> (2023) QZ1</p></div></div></div>`,
        'galaxy-map': `<div class="dashboard-header"><h1>Galaxy Map</h1></div><div class="card"><div class="card-header"><i class="fas fa-star-map"></i><h3>Interactive Sky Map</h3></div><div class="card-content"><p>Explore the cosmos with the WorldWide Telescope. Pan, zoom, and discover celestial objects.</p><div class="map-container"><iframe src="https://worldwidetelescope.org/webclient/"></iframe></div></div></div>`,
        'iss-tracker': `<div class="dashboard-header"><h1>ISS Tracker</h1></div><div class="page-grid"><div class="card" style="grid-column: 1 / -1;"><div class="card-header"><i class="fas fa-map-marked-alt"></i><h3>Live Position</h3></div><div class="card-content"><div class="large-map-placeholder"><span>ISS Current Location</span></div></div></div><div class="card"><div class="card-header"><i class="fas fa-tachometer-alt"></i><h3>Orbital Data</h3></div><div class="card-content"><table class="data-table"><tr><th>Velocity:</th><td>27,600 km/h</td></tr><tr><th>Orbital Period:</th><td>92.68 min</td></tr><tr><th>Crew:</th><td>7</td></tr></table></div></div><div class="card"><div class="card-header"><i class="fas fa-video"></i><h3>Live Feed</h3></div><div class="card-content"><div class="map-placeholder" style="height: 200px; background: #000; display:flex; flex-direction:column;"><i class="fas fa-play-circle" style="font-size: 4rem;"></i><p style="font-size: 1rem; margin-top: 10px;">Onboard Camera</p></div></div></div></div>`,
        'mars-weather': `<div class="dashboard-header"><h1>Mars Weather</h1></div><div class="page-grid"><div class="card"><div class="card-header"><i class="fas fa-thermometer-half"></i><h3>Jezero Crater</h3></div><div class="card-content"><p><strong>High:</strong> -20°C | <strong>Low:</strong> -75°C</p><p><strong>Pressure:</strong> 7.3 hPa</p><p><strong>Opacity:</strong> Sunny</p></div></div><div class="card"><div class="card-header"><i class="fas fa-thermometer-half"></i><h3>Gale Crater</h3></div><div class="card-content"><p><strong>High:</strong> -24°C | <strong>Low:</strong> -80°C</p><p><strong>Pressure:</strong> 8.1 hPa</p><p><strong>Opacity:</strong> Some Dust</p></div></div><div class="card" style="grid-column: 1 / -1;"><div class="card-header"><i class="fas fa-newspaper"></i><h3>Daily Report</h3></div><div class="card-content"><p>Atmospheric conditions across Mars remain stable. The northern hemisphere is experiencing late spring. A minor dust storm is being monitored near Hellas Planitia.</p></div></div></div>`,
        'telemetry': `<div class="dashboard-header"><h1>Satellite Telemetry</h1></div><div class="page-grid"><div class="card"><div class="card-header"><i class="fas fa-satellite-dish"></i><h3>SAT-7B Systems</h3></div><div class="card-content"><div class="status-indicator"><div class="dot green"></div><span>Power: <strong>Nominal</strong></span></div><div class="status-indicator"><div class="dot green"></div><span>Comms: <strong>Stable</strong></span></div><div class="status-indicator"><div class="dot yellow"></div><span>Propulsion: <strong>Low Fuel</strong></span></div></div></div><div class="card"><div class="card-header"><i class="fas fa-chart-line"></i><h3>Live Telemetry</h3></div><div class="card-content"><div class="telemetry-item"><span>Battery Level</span><div class="telemetry-bar-container"><div id="telemetry-battery" class="telemetry-bar" style="width: 85%;"></div></div></div><div class="telemetry-item"><span>Signal Strength</span><div class="telemetry-bar-container"><div id="telemetry-signal" class="telemetry-bar" style="width: 92%;"></div></div></div><div class="telemetry-item"><span>Core Temperature</span><div class="telemetry-bar-container"><div id="telemetry-temp" class="telemetry-bar" style="width: 45%;"></div></div></div></div></div></div>`,
        'asteroids': `<div class="dashboard-header"><h1>Asteroid Watch</h1></div><div class="card" style="grid-column: 1 / -1;"><div class="card-header"><i class="fas fa-binoculars"></i><h3>Tracking Near-Earth Objects</h3></div><div class="card-content"><input type="text" id="asteroid-search" class="search-input" placeholder="Search for an object..."><div style="overflow-x: auto;"><table class="data-table" id="asteroid-table"><thead><tr><th>Object</th><th>Diameter</th><th>Approach Date</th><th>Velocity</th><th>Threat</th></tr></thead><tbody><tr><td>(2021) FY9</td><td>120m</td><td>2025-08-12</td><td>14.5 km/s</td><td><div class="threat-level low">Low</div></td></tr><tr><td>Apophis</td><td>370m</td><td>2029-04-13</td><td>7.4 km/s</td><td><div class="threat-level medium">Monitored</div></td></tr><tr><td>Bennu</td><td>490m</td><td>2182-09-24</td><td>12.1 km/s</td><td><div class="threat-level high">High</div></td></tr></tbody></table></div></div></div>`,
        'mission-log': `<div class="dashboard-header"><h1>Mission Log</h1></div><div class="timeline"><div class="timeline-item" data-report-title="SAT-7B Burn" data-report-details="Detailed report: Course correction burn executed at 04:30 UTC. All thrusters fired nominally for 15.2 seconds. Post-burn telemetry confirms trajectory is within 0.01% of planned vector. Fuel consumption was 2% higher than projected."><div class="timeline-date">JUL 18, 2025</div><div class="card"><div class="card-content"><strong>Event:</strong> Course correction burn for SAT-7B. <strong>Result:</strong> Successful. New trajectory confirmed.</div></div></div><div class="timeline-item" data-report-title="Rover Sample" data-report-details="Perseverance successfully drilled and cached sample 'Delta-7-Alpha'. Spectrometer analysis shows high silicate concentration. Sample tube sealed and stored. Awaiting next command sequence."><div class="timeline-date">JUL 15, 2025</div><div class="card"><div class="card-content"><strong>Event:</strong> Mars Rover 'Perseverance' completes sample collection at location 'Delta-7'.</div></div></div><div class="timeline-item" data-report-title="ISS EVA" data-report-details="EVA completed by astronauts Clarke and Ivanova. Duration: 6 hours, 42 minutes. Replaced faulty solar array joint. All systems returned to nominal power generation. No issues reported."><div class="timeline-date">JUN 28, 2025</div><div class="card"><div class="card-content"><strong>Event:</strong> ISS crew completes EVA for solar panel maintenance.</div></div></div></div>`,
        'settings': `<div class="dashboard-header"><h1>Settings</h1></div><div class="card"><div class="card-header"><i class="fas fa-cogs"></i><h3>Preferences</h3></div><div class="card-content"><div class="setting-item"><span>Color Theme</span><div class="theme-selector"><button data-theme="theme-dark">Dark</button><button data-theme="theme-light">Light</button></div></div><div class="setting-item"><span>Notifications</span><div>[Toggle Switch Placeholder]</div></div><div class="setting-item"><span>Default Page</span><div>[Dropdown Placeholder]</div></div></div></div>`
    };

    function populatePages() {
        for (const pageId in pageContent) {
            document.getElementById('page-' + pageId).innerHTML = pageContent[pageId];
        }
        // Add event listeners for dynamically added content
        document.querySelectorAll('.theme-selector button').forEach(button => button.addEventListener('click', function() { setTheme(this.dataset.theme); }));
        document.querySelectorAll('.timeline-item').forEach(item => item.addEventListener('click', () => openReportModal(item)));
        document.getElementById('asteroid-search')?.addEventListener('keyup', filterAsteroids);
    }

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById('page-' + pageId);
        if (targetPage) {
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 0);
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
                pageTitleDisplay.textContent = link.textContent;
            }
        });
    }
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB');
        const dateString = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        liveClock.innerHTML = `${timeString} <span style="font-size:0.8rem; opacity:0.7;">${dateString}</span>`;
    }

    function setTheme(themeName) {
        document.body.className = themeName;
        document.querySelectorAll('.theme-selector button').forEach(btn => {
            btn.classList.remove('active');
            if(btn.dataset.theme === themeName) btn.classList.add('active');
        });
    }

    // --- Data Simulation ---
    function startDataSimulation() {
        setInterval(updateData, 3000);
    }
    function updateData() {
        // ISS
        const issLat = document.getElementById('iss-lat');
        if (issLat) {
            issLat.textContent = (parseFloat(issLat.textContent) + (Math.random() - 0.5) * 2).toFixed(2);
            document.getElementById('iss-lon').textContent = (parseFloat(document.getElementById('iss-lon').textContent) + (Math.random() - 0.5) * 2).toFixed(2);
            document.getElementById('iss-alt').textContent = (408 + (Math.random() - 0.5) * 5).toFixed(0);
        }
        // Mars
        const marsTemp = document.getElementById('mars-temp');
        if (marsTemp) {
            marsTemp.textContent = (-63 + (Math.random() - 0.5) * 3).toFixed(0);
            document.getElementById('mars-press').textContent = (7.5 + (Math.random() - 0.5) * 0.2).toFixed(1);
        }
        // Satellite
        const satBattery = document.getElementById('sat-battery');
        if (satBattery) {
            let currentWidth = parseFloat(satBattery.style.width);
            satBattery.style.width = Math.max(0, currentWidth - 0.5) + '%';
            document.getElementById('sat-signal').style.width = (75 + Math.random() * 25) + '%';
        }
        // Telemetry Page
        const telemetryBattery = document.getElementById('telemetry-battery');
        if(telemetryBattery) {
             telemetryBattery.style.width = (70 + Math.random() * 30) + '%';
             document.getElementById('telemetry-signal').style.width = (80 + Math.random() * 20) + '%';
             document.getElementById('telemetry-temp').style.width = (40 + Math.random() * 15) + '%';
        }
    }

    // --- Interactive Features ---
    function openReportModal(timelineItem) {
        document.getElementById('modal-title').textContent = timelineItem.dataset.reportTitle;
        document.getElementById('modal-body').textContent = timelineItem.dataset.reportDetails;
        reportModal.classList.add('active');
    }
    modalCloseBtn.addEventListener('click', () => reportModal.classList.remove('active'));
    
    function filterAsteroids(e) {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('#asteroid-table tbody tr').forEach(row => {
            const objectName = row.cells[0].textContent.toLowerCase();
            row.style.display = objectName.includes(term) ? '' : 'none';
        });
    }
    
    // --- Initial Setup & Event Listeners ---
    populatePages();
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            showPage(pageId);
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('open');
            }
        });
    });
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    
    // --- Start Processes ---
    startIntroSequence();
    updateClock();
    setInterval(updateClock, 1000);
    setTheme('theme-dark');
});
