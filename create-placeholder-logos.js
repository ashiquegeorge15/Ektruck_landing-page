// Script to create placeholder logos for partners
// Run this with Node.js

const fs = require('fs');
const path = require('path');

// Directory where partner logos should be stored
const partnersDir = path.join(__dirname, 'assets', 'partners');

// Ensure the directory exists
if (!fs.existsSync(partnersDir)) {
    fs.mkdirSync(partnersDir, { recursive: true });
}

// Generate a simple SVG for each missing logo
function createPlaceholderLogo(name, color) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#121212" rx="10" ry="10"/>
    <path d="M20,100 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0" fill="none" stroke="${color}" stroke-width="8"/>
    <text x="100" y="105" font-family="Arial" font-size="24" text-anchor="middle" fill="white">${name}</text>
</svg>`;

    // Convert SVG to a data URL (this would be better with a real image library, but this is just a demo)
    const svgBase64 = Buffer.from(svgContent).toString('base64');
    return `data:image/svg+xml;base64,${svgBase64}`;
}

// Get list of existing logos
const existingLogos = fs.readdirSync(partnersDir);

// List of needed partner logos
const partnerLogos = [
    { name: 'aws', displayName: 'AWS', color: '#FF9900' },
    { name: 'google', displayName: 'Google', color: '#4285F4' },
    { name: 'microsoft', displayName: 'Microsoft', color: '#00A4EF' },
    { name: 'ulip', displayName: 'ULIP', color: '#0078D7' },
    { name: 'telenity', displayName: 'Telenity', color: '#6EBE4A' },
    { name: 'streamax', displayName: 'Streamax', color: '#E74C3C' }
];

// Create missing logos
for (const partner of partnerLogos) {
    const logoFilename = `${partner.name}.png`;
    const logoPath = path.join(partnersDir, logoFilename);
    
    // Check if logo already exists
    if (!existingLogos.includes(logoFilename)) {
        console.log(`Creating placeholder for ${partner.displayName}...`);
        
        // In a real implementation, you would use a library like sharp or canvas to convert SVG to PNG
        // For this demo, we will just write out the SVG directly
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#121212" rx="10" ry="10"/>
    <path d="M20,100 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0" fill="none" stroke="${partner.color}" stroke-width="8"/>
    <text x="100" y="105" font-family="Arial" font-size="24" text-anchor="middle" fill="white">${partner.displayName}</text>
</svg>`;
        
        const svgFilePath = path.join(partnersDir, `${partner.name}.svg`);
        fs.writeFileSync(svgFilePath, svgContent);
        console.log(`Created SVG placeholder at ${svgFilePath}`);
        console.log('Note: In a production environment, convert this SVG to PNG');
    } else {
        console.log(`Logo for ${partner.displayName} already exists.`);
    }
}

console.log('Placeholder creation complete.'); 