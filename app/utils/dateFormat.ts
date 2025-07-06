export const formatDate = (dateStr: string, type?: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Invalid Date';

  const today = new Date();
  const todayStr = today.toDateString();
  const targetStr = date.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  if (targetStr === todayStr && type != 'datepicker') return 'Today';
  if (targetStr === yesterdayStr && type != 'datepicker') return 'Yesterday';

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  const getDaySuffix = (d: number) => {
    if (d >= 11 && d <= 13) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
};
