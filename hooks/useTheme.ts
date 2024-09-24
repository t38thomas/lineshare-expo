import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { useContext } from "react";

export default function useTheme(){
    return useContext(ThemeContext);
}