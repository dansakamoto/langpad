import { expect, test } from "vitest";
import { isValidGroup } from "../utils";

test("二", () => {
  expect(isValidGroup("二")).toBe(true);
});

test("千兆百億十万九", () => {
  expect(isValidGroup("千兆百億十万九")).toBe(true);
});

test("九万千二百四十一", () => {
  expect(isValidGroup("千兆百億十万九")).toBe(true);
});

test("二三", () => {
  expect(isValidGroup("二三")).toBe(false);
});

test("兆百億十万九", () => {
  expect(isValidGroup("兆百億十万九")).toBe(false);
});

test("兆百億十万一十", () => {
  expect(isValidGroup("兆百億十万一十")).toBe(false);
});
