/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    disable: process.env.NEXT_PUBLIC_ENV === 'dev' ? false : true,
    // cacheOnFrontEndNav: true,
    // reloadOnOnline: true,
    // disable: false,
});

const nextConfig = {
    images: {
        domains: [
            'avatar.iran.liara.run',
            'res.cloudinary.com',
            'img.freepik.com',
            'img.clerk.com',
            'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        ],
    },
    // Add other Next.js config options if needed
};

module.exports = withPWA(nextConfig);