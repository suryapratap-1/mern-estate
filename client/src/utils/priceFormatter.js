export const priceFormatter = (price) => {
    const formatter = new Intl.NumberFormat('en-IN');
    return formatter.format(price);
}