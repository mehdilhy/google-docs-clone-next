import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import firebase from "firebase";
import { db } from "../firebase";
import { React, useState } from "react";
import {useCollectionOnce} from "react-firebase-hooks/firestore"
import DocumentRow from "../components/DocumentRow";
export default function Home() {
  const [session] = useSession();

  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [snapshot]=useCollectionOnce(db.collection('userDocs').doc(session?.user?.email).collection("docs").orderBy('timestamp','desc'))
  const createDocument = () => {
    if (!input) return;
    if (session!=null){
    db.collection("userDocs").doc(session?.user?.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setShowModal(false);}
  };
  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline-none w-full"
          placeholder="Enter name of document..."
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={()=>setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={()=>createDocument()} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
  if (!session) return <Login />;

  return (
    <div className="">
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="bg-[#F1F3F4] pb-10 px-5">      {showModal && modal}

        <div className="max-w-3xl mx-auto">
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
          <div
            className="relative h-52 w-40 hover:shadow-xl transition duration-200 bottom-3 border-2 rounded-md hover:border-blue-500"
            onClick={() => setShowModal(true)}
          >
            <Image
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              layout="fill"
              className="cursor-pointer rounded-md"
            />
          </div>{" "}
          <h3 className="mx-1">Blank</h3>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0 max-w-3xl mx-auto">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex justify-between items-center pb-5">
            <h2 className="font-medium flex-grow">My documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
        {snapshot?.docs.map((doc) => (
            <DocumentRow key={doc.id} id={doc.id} fileName={doc.data().fileName} date={doc.data().timestamp} />
          ))}
      </section>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
