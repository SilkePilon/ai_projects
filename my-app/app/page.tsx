"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useDisclosure } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { NotificationIcon } from "@/components/icons/NotificationIcon.jsx";
import { SkinViewer, WalkingAnimation } from "skinview3d";
import ReactSkinview3d from "react-skinview3d";
import { Switch } from "@nextui-org/react";
export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSelected, setIsSelected] = React.useState(true);
  const [viewer, setViewer] = React.useState(new SkinViewer);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://httpbin.org/get");
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error as null);
      }
    };

    const interval = setInterval(() => {
      if (!loading) {
        clearInterval(interval);
        return;
      }
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Card radius="lg">
              <CardBody>
                <CircularProgress />
              </CardBody>
            </Card>
          </div>
          <Spacer y={4} />
          <div>
            <Chip color="danger" variant="dot">
              Plugin is not running!
            </Chip>
          </div>
          <Spacer y={4} />
          <div>
            <Snippet>npm install @soon/soon</Snippet>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://mc-heads.net/avatar/customcapes"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">CustomCapes</p>
            <Image
              alt="nextui logo"
              width={150}
              src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/59/Healthbar.png"
            />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <ReactSkinview3d
            className="viewer"
            skinUrl="https://mc-heads.net/skin/CustomCapes"
            height={500}
            width={300}
            onReady={({ viewer }) => {
              viewer.animation = new WalkingAnimation();
              viewer.autoRotate = isSelected;
              setViewer(viewer);
            }}
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <Switch
            isSelected={isSelected}
            onValueChange={(value) => {
              setIsSelected(value);
              viewer.autoRotate = value;
            }}
          >
            Auto Rotate
          </Switch>
        </CardFooter>
      </Card>
    </div>
  );
}
