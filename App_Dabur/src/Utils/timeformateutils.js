

export const formatTimeRange = (timeRange) => {
    if (typeof timeRange === 'object' && timeRange !== null) {
      const { from, to } = timeRange;
      const fromDate = new Date(from).toLocaleString();
      const toDate = new Date(to).toLocaleString();
      return `From ${fromDate} To ${toDate}`;
    }

    return 'Select a time range';
  };
  