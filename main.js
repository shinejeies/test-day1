document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const container = document.getElementById('main-container');
    const glow1 = document.getElementById('bg-glow-1');
    const glow2 = document.getElementById('bg-glow-2');
    const exploreBtn = document.getElementById('explore-btn');

    // 1. 3D Tilt Effect on Card
    if (card && container) {
        container.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Mouse position relative to the center of the card
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation angles (max 8 degrees)
            const maxTilt = 8;
            const tiltX = -(mouseY / (rect.height / 2)) * maxTilt;
            const tiltY = (mouseX / (rect.width / 2)) * maxTilt;
            
            // Apply transformation
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            
            // Soft shifting background glow coordinates
            if (glow1 && glow2) {
                glow1.style.transform = `translate(${mouseX * 0.05}px, ${mouseY * 0.05}px)`;
                glow2.style.transform = `translate(${-mouseX * 0.05}px, ${-mouseY * 0.05}px)`;
            }
        });

        // Reset card on mouse leave
        container.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.transition = 'transform 0.5s ease';
            
            if (glow1 && glow2) {
                glow1.style.transform = 'none';
                glow2.style.transform = 'none';
            }
        });

        container.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    }

    // 2. Explore Button Interaction (Micro-interaction)
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            // Add active bubble effect or alert just to make it functional
            exploreBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                exploreBtn.style.transform = 'none';
                
                // Beautiful Toast Notification
                showToast('첫번째 아이디어에 오신 것을 환영합니다! ✨');
            }, 150);
        });
    }

    // 3. Sentence & Button Color Switcher
    const changeTextBtn = document.getElementById('change-text-btn');
    const mainTitle = document.getElementById('main-title');

    const sentences = [
        '오늘도 힘내세요!',
        '이대로 계속 가봅시다.',
        '오늘도 해냈어요!',
        '조금씩 나아지고 있어요.'
    ];

    const buttonThemes = [
        { bg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', rgb: '79, 70, 229' },   // Indigo
        { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', rgb: '5, 150, 105' },   // Emerald
        { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', rgb: '217, 119, 6' },    // Amber
        { bg: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', rgb: '190, 24, 93' }    // Pink
    ];

    let currentIndex = 0;

    if (changeTextBtn && mainTitle) {
        changeTextBtn.addEventListener('click', () => {
            // Button Click Micro-interaction
            changeTextBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                changeTextBtn.style.transform = 'none';
            }, 100);

            // Update Index
            currentIndex = (currentIndex + 1) % sentences.length;
            const newSentence = sentences[currentIndex];
            const newTheme = buttonThemes[currentIndex];

            // Smooth Text Fade Out-In Animation
            mainTitle.style.opacity = '0';
            mainTitle.style.transform = 'translateY(10px)';
            mainTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

            setTimeout(() => {
                mainTitle.textContent = newSentence;
                mainTitle.style.opacity = '1';
                mainTitle.style.transform = 'translateY(0)';
            }, 300);

            // Dynamically apply color variables with smooth transition
            changeTextBtn.style.setProperty('--btn-sec-bg', newTheme.bg);
            changeTextBtn.style.setProperty('--btn-sec-shadow', `rgba(${newTheme.rgb}, 0.3)`);
            changeTextBtn.style.setProperty('--btn-sec-shadow-hover', `rgba(${newTheme.rgb}, 0.45)`);
        });
    }

    // Toast message function
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Inline styles for toast (keeping CSS decoupled, but since it's dynamic we can do it or add to style.css)
        // Let's add it to CSS to keep stylesheet clean. But wait, since we can just apply inline styles or edit CSS:
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#f8fafc',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: '500',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.1)',
            zIndex: '1000',
            opacity: '0',
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none'
        });

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Hide and remove
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, 3000);
    }
});
