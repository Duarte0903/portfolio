export function toggleSwitch (theme) {
    const themeSwitch = document.getElementById('switch');

    if (theme === 'dark') {
        themeSwitch.style.setProperty('--margin-left', '2px');
    }

    if (theme === 'light') {
        themeSwitch.style.setProperty('--margin-left', '16px');
    }
}