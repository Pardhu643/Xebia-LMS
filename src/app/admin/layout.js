"use client";

import React from "react";
import DashboardLayout from "../../components/common/DashboardLayout";

export default function AdminRootLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
