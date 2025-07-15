// timeUtils.js

export const getTimeRange = (xAxisData) => {
    const firstDate = new Date(xAxisData[0]);
    const lastDate = new Date(xAxisData[xAxisData.length - 1]);
    const timeDiff = lastDate - firstDate;

    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const oneMonth = 30 * oneDay; // Approximate month
    const oneYear = 365 * oneDay; // Year

    if (timeDiff <= oneDay) return '24hours';
    if (timeDiff <= oneMonth) return 'days';
    if (timeDiff <= oneYear) return 'months';
    return 'years';
};

export const getFormatter = (timeRange) => {
    switch (timeRange) {
        case '24hours':
            return (value) => new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        case 'days':
            return (value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
        case 'months':
            return (value) => new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        case 'years':
            return (value) => new Date(value).toLocaleDateString('en-US', { year: 'numeric' });
        default:
            return (value) => new Date(value).toLocaleDateString('en-US');
    }
};
