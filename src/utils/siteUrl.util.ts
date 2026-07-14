export const getSiteUrl = () => {
  return (
    import.meta.env.ROOT_URL?.replace(/\/$/, "") ||
    "https://www.saiinternational.edu.in"
  );
};
