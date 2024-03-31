export function formatTimeBasedOnRule(utcTimeString, today) {
    const utcDate = new Date(utcTimeString + 'Z');

    const now = new Date();

    const currentDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const targetDate = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());

    let formattedTime;

    if (currentDate.getTime() === targetDate.getTime()) {
        formattedTime = today + utcDate.getUTCHours().toString().padStart(2, '0') + ':' + utcDate.getUTCMinutes().toString().padStart(2, '0');
    } else {
        formattedTime = (utcDate.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + utcDate.getUTCDate().toString().padStart(2, '0') + ' ' + utcDate.getUTCHours().toString().padStart(2, '0') + ':' + utcDate.getUTCMinutes().toString().padStart(2, '0');
    }

    return formattedTime;
}
