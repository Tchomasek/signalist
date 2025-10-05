"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { inngest } from "../inngest/client";
import { sendWelcomeEmail } from "../nodemailer";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
    });
    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }
    await sendWelcomeEmail({
      email,
      name: fullName,
      intro: "Welcome to Signalist! We're glad to have you on board.",
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, message: "Failed to send welcome email." };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, data: response };
  } catch (error) {
    console.error("Error signing in:", error);
    return { success: false, message: "Failed to sign in." };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, message: "Failed to sign out." };
  }
};
