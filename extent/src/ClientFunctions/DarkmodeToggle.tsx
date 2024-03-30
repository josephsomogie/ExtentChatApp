//Joseph Somogie 2024
//Toggles between light and dark mode by removing/adding 'dark' tailwind class  to the body tag.
export default function toggleDarkMode(darkMode:boolean) {

  if (darkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

}