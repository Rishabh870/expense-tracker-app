export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
  
    if (isNaN(date.getTime())) return 'Invalid Date';
  
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' }); 
    const year = date.getFullYear();
  
    const getDaySuffix = (d: number) => {
      if (d >= 11 && d <= 13) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${getDaySuffix(day)} ${month} ${year}`;
  };
  