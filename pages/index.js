import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
export default function Home() {
  const [session]=useSession();
  if (!session) return <Login/>

  return (
    <div className="">
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className="bg-[#F1F3F4] pb-10 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="py-6 justify-between flex items-center">
            <h2 className="text-gray-900 text-md">Start a new document</h2>
            <Button
              color="gray"
              ripple="grays"
              buttonType="outline"
              iconOnly
              ripple="dark"
              className="border-0 "
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div className="relative h-52 w-40 hover:shadow-xl transition duration-200 bottom-3 border-2 rounded-md hover:border-blue-500">
            <Image
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              layout="fill"
              className="cursor-pointer rounded-md"
            />
          </div>{" "}
          <h3 className="mx-1">Blank</h3>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex justify-between items-center pb-5">
            <h2 className="font-medium flex-grow">My documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
      </section>
    </div>
  );
}
export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props:{
      session,
    }
  }
}