import { Tree } from "@angular-devkit/schematics";

export function applyLittleDivaTheme(tree: Tree): Tree {
  if (!tree.exists("package.json")) {
    throw new Error("package.json not found");
  }

  if (!tree.exists("angular.json")) {
    throw new Error("angular.json not found");
  }

  const packageJson = JSON.parse(tree.read("package.json")!.toString());
  const projectName = packageJson.name;

  const angularJson = JSON.parse(tree.read("angular.json")!.toString());
  const styles =
    angularJson.projects[projectName].architect.build.options.styles || [];

  const littleDivaTheme =
    "@yu-ko-ba/ngx-mat-little-diva-theme/little-diva-theme.scss";

  const rc = new RegExp("^@angular/material/prebuilt-themes/");

  angularJson.projects[projectName].architect.build.options.styles = [
    littleDivaTheme,
    ...styles.filter((style: string) => {
      return style !== littleDivaTheme && !rc.test(style);
    }),
  ];

  const testStyles =
    angularJson.projects[projectName].architect.test.options.styles || [];

  angularJson.projects[projectName].architect.test.options.styles = [
    littleDivaTheme,
    ...testStyles.filter((style: string) => {
      return style !== littleDivaTheme && !rc.test(style);
    }),
  ];

  tree.overwrite("angular.json", JSON.stringify(angularJson, null, 2));

  return tree;
}
