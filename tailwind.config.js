/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505', // Deep black
                surface: '#121212', // Slightly lighter black for cards/sections
                primary: '#de1c1c', // Professional strong red
                secondary: '#27272a', // Zinc-800 for borders/subtle elements
                accent: '#991b1b', // Darker red for gradients/depth
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
