"use client";

import { useStorageState } from "@/hooks/useStorageState";
import { City } from "@/types";
import { getCityLink } from "@/utils/city";
import { Accordion, Sidebar, Spinner } from "flowbite-react";
import Link from "next/link";
import { memo } from "react";

export function Nav() {
  const [[loading, branches]] = useStorageState<City[]>("branches", []);

  return (
    <>
      <Sidebar
        aria-label="Navegador de sucursales"
        className="hidden lg:block rounded-md shadow-md"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup aria-disabled="true">
            <Sidebar.Item>Sucursales</Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            {loading ? (
              <Sidebar.Item>
                <div className="text-center">
                  <Spinner />
                </div>
              </Sidebar.Item>
            ) : branches && branches.length > 0 ? (
              branches.map((branch) => (
                <Sidebar.Item
                  as={Link}
                  key={branch.id}
                  href={getCityLink(branch)}
                >
                  {branch.name +
                    " (" +
                    [branch.state, branch.country].join(", ") +
                    ")"}
                </Sidebar.Item>
              ))
            ) : (
              <Sidebar.Item>No hay sucursales registradas</Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <Accordion className="block lg:hidden" collapseAll={true}>
        <Accordion.Panel>
          <Accordion.Title>Sucursales</Accordion.Title>
          <Accordion.Content>
            {loading ? (
              <div className="text-center">
                <Spinner />
              </div>
            ) : branches && branches.length > 0 ? (
              <ul>
                {branches.map((branch) => (
                  <li key={branch.id} className="border-b mb-1">
                    <Link key={branch.id} href={getCityLink(branch)}>
                      {branch.name +
                        " (" +
                        [branch.state, branch.country].join(", ") +
                        ")"}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay sucursales registradas</p>
            )}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
}

export const BranchNavigator = memo(Nav);
