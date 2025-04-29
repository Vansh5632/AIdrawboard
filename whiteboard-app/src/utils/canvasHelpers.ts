export const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (context) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.fillStyle = '#ffffff'; // Set background color
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};

export const drawLine = (canvas: HTMLCanvasElement, start: { x: number; y: number }, end: { x: number; y: number }, color: string = 'black', width: number = 2) => {
    const context = canvas.getContext('2d');
    if (context) {
        context.strokeStyle = color;
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
    }
};