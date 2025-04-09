import React from "react";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function MainTitle({ children, className }: TypographyProps) {
  return (
    <h1
      className={`font-inter font-bold text-gray-800 dark:text-gray-200 text-3xl ${
        className ?? ""
      }`}
    >
      {children}
    </h1>
  );
}

export function SectionTitle({ children, className }: TypographyProps) {
  return (
    <h2
      className={`font-semibold text-xl text-gray-700 dark:text-gray-300 mb-4 ${
        className ?? ""
      }`}
    >
      {children}
    </h2>
  );
}

export function SubTitle({ children, className }: TypographyProps) {
  return (
    <h3
      className={`font-medium text-lg text-gray-700 dark:text-gray-300 mb-2 ${
        className ?? ""
      }`}
    >
      {children}
    </h3>
  );
}

export function BodyText({ children, className }: TypographyProps) {
  return (
    <p
      className={`text-justify text-gray-600 dark:text-gray-400 mb-4 ${
        className ?? ""
      }`}
    >
      {children}
    </p>
  );
}
