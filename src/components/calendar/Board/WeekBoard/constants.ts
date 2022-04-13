export const quarterOfHourCellHeight = 1.75;

export const cellHeight = (type: 'quarter' | 'half' | 'all'): string => {
    switch (type) {
        case 'quarter':
            return `${quarterOfHourCellHeight * 1}vh`;
        case 'half':
            return `${quarterOfHourCellHeight * 2}vh`;
        case 'all':
            return `${quarterOfHourCellHeight * 4}vh`;
    }
};
