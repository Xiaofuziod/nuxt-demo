function formatTimeBasedOnRule(utcTimeString, today) {
    const utcDate = new Date(utcTimeString + 'Z');

    // Get the current date and time
    const now = new Date();

    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(utcDate.getFullYear(), utcDate.getMonth(), utcDate.getDate());

    let formattedTime;

    if (currentDate.getTime() === targetDate.getTime()) {
        formattedTime = today + utcDate.getHours().toString().padStart(2, '0') + ':' + utcDate.getMinutes().toString().padStart(2, '0');
    } else {
        formattedTime = (utcDate.getMonth() + 1).toString().padStart(2, '0') + '/' + utcDate.getDate().toString().padStart(2, '0') + ' ' + utcDate.getHours().toString().padStart(2, '0') + ':' + utcDate.getMinutes().toString().padStart(2, '0');
    }

    return formattedTime;
}
