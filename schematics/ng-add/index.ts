import { chain, Rule } from "@angular-devkit/schematics";
import { applyLittleDivaTheme } from "./apply-little-diva-theme";

export default function ngAdd(): Rule {
  return chain([applyLittleDivaTheme]);
}
