function DarkMode({ setTheme  }) {
  return (
    <>
      <button
        className="theme-toggle-settings"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className="theme-toggle-settings"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
    </>
  );
}
export default DarkMode;
