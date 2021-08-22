import "tailwindcss/tailwind.css";
import "@material-tailwind/react/tailwind.css";
import Head from "next/head";
import {Provider} from "next-auth/client"
function MyApp({ Component, pageProps }) {
  return (
    <>      
    {/* To allow the use of material Icons */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <Provider session={pageProps.session}>
      <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
