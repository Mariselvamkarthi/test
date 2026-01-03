export const createPageTexture = (text: string, color: string = "white", textColor: string = "black") => {
    if (typeof document === 'undefined') return '';

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 724; // ~A4 ratio
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Subtext
    ctx.font = '24px Arial';
    ctx.fillStyle = '#888';
    ctx.fillText("Brand Manual", canvas.width / 2, canvas.height / 2 + 50);

    return canvas.toDataURL('image/jpeg');
};
