export const useDateUtils = () => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('default', { month: 'short' }).format(date);
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return {
    formatDate,
  };
};
