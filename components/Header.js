import React, { useState } from "react";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import { Input, Avatar } from "@material-ui/core";
import { signOut, useSession } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));
function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [session] = useSession();
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex items-center top-0 sticky z-50 justify-between px-1 h-20">
      <div className=" md:flex sm:flex lg:flex  flex-row items-center">
        <Button
          color="#5F6368"
          ripple="light"
          buttonType="outline"
          rounded
          iconOnly
          ripple="dark"
          className="inline-flex h-14 w-14 border-0 text-gray-700 mx-2 hover:bg-gray-200"
        >
          <Icon name="menu" />
        </Button>
        <div className="hidden md:flex lg:flex">
          <Image
            alt=""
            src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
            width="40px"
            height="40px"
            layout="fixed"
          />
          <h1 className="text-gray-700 p-2 text-xl">Docs</h1>
        </div>
      </div>
      {/* Search bar */}
   
        <div className=" rounded-md  flex flex-grow items-center px-5 py-2 bg-gray-200 placeholder-gray-100 ml-[15%] mr-[10%]  md:mr[20%]  xl:mr[20%]  lg:mr[30%] shadow-md  ">
          <div className="flex items-center hover:bg-gray-200 rounded-full w-8 h-8 justify-center cursor-pointer text-gray-600">
            <Icon name="search" size="3xl" className="justify-center" />
          </div>
          <Input
            disableUnderline
            placeholder="Search"
            className="px-5 flex-grow outline-none bg-transparent"
          />
        </div>
       
      {/* Avatar and left menu */}
      <div className="flex items-center mx-4 space-x-5">
        <Icon name="apps" size="2xl" />
        <div className="hidden md:flex sm:flex lg:flex ">
          <Avatar
            src={session.user.image}
            className="hidden md:flex sm:flex lg:flex "
            onClick={handleClick}
            aria-describedby={id}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Button
              color="#5F6368"
              ripple="light"
              buttonType="outline"
              ripple="dark"
              className=" h-15 w-15 border-0 text-gray-700 mx-2"
              onClick={signOut}
            >
              Sign out.
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Header;
