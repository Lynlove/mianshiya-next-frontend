"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import { useCallback, useEffect } from "react";
import { getLoginUserUsingGet } from "@/api/userController";
import store, { AppDispatch } from "@/stores";
import { Provider, useDispatch } from "react-redux";
import AccessLayout from "@/access/AccessLayout";
import ACCESS_ENUM from "@/access/accessEnum";
import {setLoginUser} from "@/stores/loginUser";

const inter = Inter({ subsets: ["latin"] });

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
    } else {
      // 仅用于测试
      setTimeout(() => {
        const testUser = {
          userName: "测试登录",
          id: 1,
          userAvatar: "https://www.code-nav.cn/logo.png",
          userRole: ACCESS_ENUM.ADMIN
        };
        dispatch(setLoginUser(testUser));
      }, 3000);
    }
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
