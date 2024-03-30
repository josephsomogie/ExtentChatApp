

export default function toggleDarkMode(darkMode:boolean) {

  if (darkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

}