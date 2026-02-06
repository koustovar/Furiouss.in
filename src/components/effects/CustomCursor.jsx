import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Disable on mobile/touch devices for performance
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Use quickSetter for better performance on high-frequency events
        const xCursorSet = gsap.quickSetter(cursor, "x", "px");
        const yCursorSet = gsap.quickSetter(cursor, "y", "px");
        const xFollowerSet = gsap.quickSetter(follower, "x", "px");
        const yFollowerSet = gsap.quickSetter(follower, "y", "px");

        const onMouseMove = (e) => {
            xCursorSet(e.clientX);
            yCursorSet(e.clientY);

            // Subtle delay for follower
            gsap.to({}, {
                duration: 0.1,
                onUpdate: function () {
                    xFollowerSet(e.clientX);
                    yFollowerSet(e.clientY);
                }
            });
        };

        // Hover effects
        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        // Attach listeners to clickable elements
        const clickables = document.querySelectorAll('button, a, .cursor-pointer');
        clickables.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        // Observer for dynamic elements
        const observer = new MutationObserver(() => {
            const clickables = document.querySelectorAll('button, a, .cursor-pointer');
            clickables.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            clickables.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2`}
            />
            <div
                ref={followerRef}
                className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none z-[9998] mix-blend-difference transition-transform duration-300 -translate-x-1/2 -translate-y-1/2 ${isHovering ? "scale-150 bg-white/10" : "scale-100"
                    }`}
            />
        </>
    );
};

export default CustomCursor;
