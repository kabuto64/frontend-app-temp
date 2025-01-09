import { Tabs } from "@chakra-ui/react";
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { IoMdSettings } from "react-icons/io";
import { LuFolder, LuHouse, LuUser } from "react-icons/lu";
import { Title } from "@/components/custom-ui/title";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";

export function Example() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lastPathFragment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const activeTab = lastPathFragment === "example" ? "" : lastPathFragment;
  return (
    <>
      <BreadcrumbRoot mb={3} variant="plain">
        <BreadcrumbLink href="#">
          <LuHouse /> Home
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Example</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Title title="Example" description="This is a ExamplePage" />
      <Tabs.Root
        mb={5}
        defaultValue=""
        value={activeTab}
        onValueChange={({ value }) => {
          navigate({ to: `/example/${value}` });
        }}
      >
        <Tabs.List>
          <Tabs.Trigger value={""}>
            <LuUser />
            Users
          </Tabs.Trigger>
          <Tabs.Trigger value="projects">
            <LuFolder />
            Projects
          </Tabs.Trigger>
          <Tabs.Trigger value="settings">
            <IoMdSettings />
            Settings
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Outlet />
    </>
  );
}
