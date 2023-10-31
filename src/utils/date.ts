export function addDays(days: number): number {
    return days*24*60*60*1000
}

export function formatDate(inputDate: Date | string) {
    const date = new Date(inputDate);
    const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
}

// export function compareDates(date1: string, date2: string): number {
//     date1 = date1.split("/") as string
// }