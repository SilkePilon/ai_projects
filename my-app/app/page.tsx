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
import { UserTwitterCard } from "./card";
export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Popover showArrow placement="bottom">
        <PopoverTrigger>
          <User
            as="button"
            name="Zoe Lang"
            description="Product Designer"
            className="transition-transform"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="p-1">
          <UserTwitterCard />
        </PopoverContent>
      </Popover>
    </>
  );
}
