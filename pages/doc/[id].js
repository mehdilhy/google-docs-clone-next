
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { getSession, signout, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";
import Image from "next/image";

import { db } from "../../firebase";

function Doc() {
  const [session] = useSession();
  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;
  const [snapshot, loadingSnapshot] = useDocumentOnce(db.collection("userDocs").doc(session?.user.email).collection("docs").doc(id));

  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
        <Image
            alt=""
            src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
            width="40px"
            height="40px"
            layout="fixed"
          />        </span>
        <div className="flex-grow px-2">
          <h2>File Name : {snapshot?.data()?.fileName}</h2>

        </div>

        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          className="hidden md:inline-flex h-10"
        >
          <Icon name="people" size="md" /> SHARE
        </Button>
        <img className="rounded-full cursor-pointer h-10 w-10 ml-2" src={session.user.image} alt="" />
      </header>
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}