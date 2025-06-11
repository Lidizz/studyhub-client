import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../store/themeSlice";
import { themeConfig } from "../themeConfig";

const themes = [
  { name: "light", label: "Light ☀️" },
  { name: "dark", label: "Dark 🌙" },
  // { name: "ocean", label: "Ocean 🌊" },
  // { name: "forest", label: "Forest 🌲" },
  // { name: "sunset", label: "Sunset 🌅" },
];

const ThemeSwitcher = ({ className }) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { bg, text, border } = themeConfig[theme];

  return (
    <div
      className={className || "fixed top-20 md:top-20 right-2 md:right-4 z-40"}
    >
      <select
        value={theme}
        onChange={(e) => dispatch(setTheme(e.target.value))}
        className={`p-2 rounded-md border ${bg} ${text} ${border} focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base`}
      >
        {themes.map((t) => (
          <option key={t.name} value={t.name}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;
