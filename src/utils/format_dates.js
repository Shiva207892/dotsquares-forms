export const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate(); // Convert to JavaScript Date object
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
};