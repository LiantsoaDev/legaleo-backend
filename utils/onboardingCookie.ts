"use client";

const COOKIE_KEY = "juridique_onboarding_answers";
const MAX_AGE_DAYS = 7;

type CookieRecord = Record<string, any>;

const getBrowserCookieStore = () =>
  typeof document === "undefined" ? "" : document.cookie || "";

export const readJuridiqueOnboardingAnswers = (): CookieRecord => {
  const cookieStore = getBrowserCookieStore();
  const entry = cookieStore
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${COOKIE_KEY}=`));

  if (!entry) return {};

  try {
    const serialized = entry.substring(COOKIE_KEY.length + 1);
    return JSON.parse(decodeURIComponent(serialized));
  } catch (error) {
    console.error("Unable to parse juridical onboarding cookie", error);
    return {};
  }
};

export const writeJuridiqueOnboardingAnswers = (data: CookieRecord) => {
  if (typeof document === "undefined") return;

  const serialized = encodeURIComponent(JSON.stringify(data));
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_KEY}=${serialized}; path=/; max-age=${maxAge};`; // ensure path for onboarding flow
};

export const mergeJuridiqueOnboardingAnswers = (updates: CookieRecord) => {
  const current = readJuridiqueOnboardingAnswers();
  writeJuridiqueOnboardingAnswers({ ...current, ...updates });
};

export const clearJuridiqueOnboardingAnswers = () => {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0;`;
};
