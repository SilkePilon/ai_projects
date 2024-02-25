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
import { useRef } from 'react';
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
import { Avatar } from "@nextui-org/react";
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
import {Textarea} from "@nextui-org/react";
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
  const [key, setKey] = useState(0);
  const [firstPerson, setFirstPerson] = useState(false);
  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const res = await fetch("http://localhost:5000/bot-events");
      const data = await res.json();
      setGoals(data.goalSet);
    };

    fetchGoals();
  }, []);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/bot-events");
      const data = await response.json();
      await delay(9000);
      // handle response
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/switch')
      .then(res => res.json())  
      .then(data => {
        setFirstPerson(data.firstPerson); 
      });
  }, []);


  const handleChange = () => {
    fetch('http://localhost:5000/switch')
      .then(res => res.json())
      .then(data => {
        setFirstPerson(data.firstPerson);
      });
      setTimeout(() => {
        // Update key after delay
        setKey(prev => prev + 1);
      }, 10000); // 1 second delay
    
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/bot-events");
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
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
                <iframe
                  key={key}
                  style={{ borderRadius: "15px" }}
                  height={600}
                  src="http://localhost:5001"
                ></iframe>
                <Switch 
                  defaultSelected={firstPerson}
                  onValueChange={handleChange}
                >
                  First Person View
                </Switch>
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
            <center>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {goals.map((goal) => (
                  <>
                    <Card
                      className="max-w-[340px]"
                      key={JSON.stringify(goal.refVec)}
                    >
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <Avatar
                            isBordered
                            radius="sm"
                            size="md"
                            src="https://mc-heads.net/avatar/CustomCapes/800/nohelm.png"
                          />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                              CustomCapes
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                              10:55 pm
                            </h5>
                          </div>
                        </div>
                        <Popover placement="bottom">
                          <PopoverTrigger>
                            <Button
                              className={"font-semibold"}
                              color="primary"
                              radius="full"
                              size="sm"
                              variant={"ghost"}
                            >
                              JSON
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Textarea
                              isReadOnly
                              label="Raw JSON"
                              variant="bordered"
                              labelPlacement="outside"
                              placeholder="."
                              defaultValue={JSON.stringify(goal, null, 2)}
                              className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                            />
                          </PopoverContent>
                        </Popover>
                      </CardHeader>
                      <CardBody className="px-3 py-0 text-small text-default-400">
                        <p className="font-semibold">
                          x: {goal.x}
                          <br />
                          y: {goal.y}
                          <br />
                          z: {goal.z}
                          <br />
                        </p>
                        <span className="pt-2 font-semibold">
                          {goal.eventKeys} | {goal.validKeys}
                        </span>
                      </CardBody>
                      <CardFooter className="gap-3">
                        <div className="flex gap-1">
                          <p className=" text-default-400 text-small">
                            dynamic
                          </p>
                          <p className="font-semibold text-default-400 text-small">
                            {goal.dynamic}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {data.goalAborted.some(
                            (aborted) =>
                              JSON.stringify(aborted.refVec) ===
                              JSON.stringify(goal.refVec)
                          ) && (
                            <span className="font-semibold text-red-400 text-small">
                              Canceled
                            </span>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </>
                ))}
              </div>
            </center>
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
