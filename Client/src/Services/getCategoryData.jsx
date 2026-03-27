const getCategoryData = (data) => {
    if (!Array.isArray(data)) return [];

    const result = {};

    data.forEach((item) => {
        const category = item.Category;

        if (!category) return;

        if (!result[category]) {
            result[category] = {
                name: category,
                expense: 0,
            };
        }

        // ✅ FIX: remove wrong condition
        result[category].expense += Number(item.Amount || 0);
    });

    return Object.values(result);
};
export default getCategoryData;