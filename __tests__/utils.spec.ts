import {
  isPackageJsonFile,
  isValidJsonAST,
  extractPropertyObjectExpression,
} from "../src/utils";
import * as esprima from "esprima";
import { Rule } from "eslint";
import { ExpressionStatement, ObjectExpression } from "estree";

describe("utils", () => {
  test("isPackageJsonFile", () => {
    expect(isPackageJsonFile("package.json")).toBe(true);
    expect(isPackageJsonFile("./some/relative/path/package.json")).toBe(true);
    expect(isPackageJsonFile("/some/absolute/path/package.json")).toBe(true);
  });

  test("isValidJsonAST", () => {
    expect(isValidJsonAST({ type: "Literal" } as Rule.Node)).toBe(false);
    expect(
      isValidJsonAST(esprima.parseScript("const x = 1") as Rule.Node)
    ).toBe(false);
    expect(isValidJsonAST(esprima.parseScript("(1)") as Rule.Node)).toBe(false);
    expect(isValidJsonAST(esprima.parseScript("({})") as Rule.Node)).toBe(true);
  });

  test("extractPropertyObjectExpression", () => {
    const objectExpression = esprima.parseScript(
      "({'property': {'foo': 'bar', bar: []}})"
    );

    expect(
      extractPropertyObjectExpression(
        ((objectExpression.body[0] as ExpressionStatement).expression as ObjectExpression),
        "property"
      )
    ).toStrictEqual(["foo"]);
  });
});
