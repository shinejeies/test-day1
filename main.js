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
