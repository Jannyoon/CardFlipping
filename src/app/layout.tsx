import type { Metadata } from "next";
import "@/common/scss/global.scss";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/common/modal-component/modal-provider";
import ReactQueryProvider from "@/common/ReactQueryProvider";
//import MSWProvider from "@/mocks/MSWProvider";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <ReactQueryProvider>
        <html lang="en">
          <body>     
            {/*<MSWProvider>*/}
              {children}            
              <ModalProvider/>
            {/*</MSWProvider>*/} 

          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
