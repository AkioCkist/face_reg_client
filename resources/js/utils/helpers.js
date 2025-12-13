export function formatDate(date, format = 'DD/MM/YYYY') {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year);
}

export function formatTime(time) {
    if (!time) return '';
    return time.substring(0, 5); // HH:mm
}

export function formatDateTime(datetime) {
    if (!datetime) return '';
    const d = new Date(datetime);
    const date = formatDate(d);
    const time = formatTime(d.toTimeString());
    return `${date} ${time}`;
}

export function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export function dataUrlToBase64(dataUrl) {
    return dataUrl.split(',')[1];
}

export function getMonthName(month) {
    const months = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
    ];
    return months[month - 1];
}
