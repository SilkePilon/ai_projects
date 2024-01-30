"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  cn,
} from "@nextui-org/react";
import { AddNoteIcon } from "./icons/AddNoteIcon.jsx";
import { CopyDocumentIcon } from "./icons/CopyDocumentIcon.jsx";
import { EditDocumentIcon } from "./icons/EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "./icons/DeleteDocumentIcon.jsx";
import { Logo } from "@/components/icons";
import { Chip } from "@nextui-org/react";
import { NotificationIcon } from "./icons/NotificationIcon.jsx";
import { CheckIcon } from "./icons/CheckIcon.jsx";
export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Logo />
            <p className="font-bold text-inherit">TEST</p> */}
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <Chip
          startContent={
            <CheckIcon size={18} height={undefined} width={undefined} />
          }
          variant="faded"
          color="success"
        >
          API conected
        </Chip>
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button
              variant="flat"
              className="text-sm font-normal text-default-600 bg-default-100"
            >
              Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Actions" showDivider>
              <DropdownItem
                key="new"
                shortcut="⌘N"
                description="Create a new file"
                startContent={<AddNoteIcon className={iconClasses} />}
              >
                New file
              </DropdownItem>
              <DropdownItem
                key="copy"
                shortcut="⌘C"
                description="Copy the file link"
                startContent={<CopyDocumentIcon className={iconClasses} />}
              >
                Copy link
              </DropdownItem>
              <DropdownItem
                key="edit"
                shortcut="⌘⇧E"
                description="Allows you to edit the file"
                startContent={<EditDocumentIcon className={iconClasses} />}
              >
                Edit file
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                shortcut="⌘⇧D"
                description="Permanently delete the file"
                startContent={
                  <DeleteDocumentIcon
                    className={cn(iconClasses, "text-danger")}
                  />
                }
              >
                Delete file
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <Button
          isExternal
          as={Link}
          className="text-sm font-normal text-default-600 bg-default-100"
          href={siteConfig.links.sponsor}
          startContent={<HeartFilledIcon className="text-danger" />}
          variant="flat"
        >
          Sponsor
        </Button>
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Actions" showDivider>
              <DropdownItem
                key="new"
                shortcut="⌘N"
                description="Create a new file"
                startContent={<AddNoteIcon className={iconClasses} />}
              >
                New file
              </DropdownItem>
              <DropdownItem
                key="copy"
                shortcut="⌘C"
                description="Copy the file link"
                startContent={<CopyDocumentIcon className={iconClasses} />}
              >
                Copy link
              </DropdownItem>
              <DropdownItem
                key="edit"
                shortcut="⌘⇧E"
                description="Allows you to edit the file"
                startContent={<EditDocumentIcon className={iconClasses} />}
              >
                Edit file
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                shortcut="⌘⇧D"
                description="Permanently delete the file"
                startContent={
                  <DeleteDocumentIcon
                    className={cn(iconClasses, "text-danger")}
                  />
                }
              >
                Delete file
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarMenu>
    </NextUINavbar>
  );
};
