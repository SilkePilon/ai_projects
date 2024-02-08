// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
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
import { Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { NotificationIcon } from "@/components/icons/NotificationIcon.jsx";
import { SkinViewer, WalkingAnimation } from "skinview3d";
import ReactSkinview3d from "react-skinview3d";
import { Switch } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState(null);
  const [isSelected, setIsSelected] = React.useState(true);
  const [viewer, setViewer] = React.useState(null);
  const [selected, setSelected] = React.useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };
  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://httpbin.org/get");
      const data = await response.json();
      await delay(9000);
      // handle response
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

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
              Pathfinder plugin is not running!
            </Chip>
          </div>
          <Spacer y={4} />
          <div>
            <Snippet>npm install @nxg-org/mineflayer-pathfinder</Snippet>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          variant="bordered"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tab key="path" title="Path Viewer">
            <Card variant="bordered">
              <CardBody>
                <iframe src="https://platform.twitter.com/widgets/tweet_button.html"></iframe>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="benchmark" title="Benchmark">
            <div className="flex flex-col w-full">
              <Card>
                <CardBody className="overflow-hidden">
                  <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                  >
                    <Tab key="basic" title="Basic Benchmark">
                      <form className="flex flex-col gap-4">
                        <Snippet symbol="">
                          <span>Seed:</span>
                          <span>393235010621814182</span>
                          <Spacer y={4} />
                          <span>Username:</span>
                          <span>CustomCapes</span>
                          <Spacer y={4} />
                        </Snippet>
                        {/* <p className="text-center text-small">
                          Need to create an account?{" "}
                          <Link size="sm" onPress={() => setSelected("sign-up")}>
                            Run Benchmark
                          </Link>
                        </p> */}
                        <Divider />
                        <center>
                        <Slider
                                  size="lg"
                                  step={5}
                                  label="Range (chunks"
                                  showSteps={true}
                                  maxValue={100}
                                  minValue={10}
                                  defaultValue={0.6}
                                  className="max-w-md"
                                />
                        </center>
                        <Divider />
                        <div className="flex gap-2 justify-end">
                          <Button
                            color="primary"
                            isLoading={isLoading}
                            onClick={handleClick}
                            isDisabled={isLoading}
                            fullWidth
                          >
                            Run Benchmark
                          </Button>
                        </div>
                      </form>
                    </Tab>
                    <Tab key="advanced" title="Advanced Benchmark">
                      <form className="flex flex-col gap-4">
                        <Snippet symbol="">
                          <span>Seed:</span>
                          <span>393235010621814182</span>
                          <Spacer y={4} />
                          <span>pnpm add @nextui-org/react</span>
                        </Snippet>
                        <Checkbox defaultSelected>Option</Checkbox>
                        {/* <p className="text-center text-small">
                          Need to create an account?{" "}
                          <Link size="sm" onPress={() => setSelected("sign-up")}>
                            Run Benchmark
                          </Link>
                        </p> */}
                        <Divider />
                        <div className="flex gap-2 justify-end">
                          <Button
                            color="primary"
                            isLoading={isLoading}
                            onClick={handleClick}
                            isDisabled={isLoading}
                            fullWidth
                          >
                            Run Benchmark
                          </Button>
                        </div>
                      </form>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </div>
          </Tab>
          <Tab key="debug" title="Debug">
            <Card>
              <CardBody>Soon!</CardBody>
            </Card>
          </Tab>
          <Tab key="leaderboard" title="Leaderboard">
            <Card variant="bordered">
              <CardBody>
                <p>Soon!</p>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
