"use client";

import { useState } from "react";
import { HiPlusCircle, HiOutlineTrash } from "react-icons/hi";
import { Button, Spinner } from "flowbite-react";
import { Divider } from "@/components/Divider";
import { useStorageState } from "@/hooks/useStorageState";
import { City } from "@/types";
import { ManageBranchesModal } from "@/modules/ManageBranchesModal";
import { WeatherResume } from "@/modules/WeatherResume";
import Link from "next/link";
import { getCityLink } from "@/utils/city";

export default function Home() {
  const [showManageBranchesModal, setShowManageBranchesModal] = useState(false);

  const [[loading, branches], setBranches] = useStorageState<City[]>(
    "branches",
    []
  );

  const deleteBranch = (branch: City) => {
    setBranches((branches || []).filter(({ id }) => id !== branch.id));
  };

  return (
    <>
      <ManageBranchesModal
        show={showManageBranchesModal}
        onDismiss={() => setShowManageBranchesModal(false)}
        branches={branches || []}
        setBranches={setBranches}
      />
      <div className="w-full">
        <section id="header" className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">
            Listado de sucursales
          </h2>
          <Button
            size="xs"
            type="button"
            onClick={() => setShowManageBranchesModal(true)}
          >
            <HiPlusCircle className="mr-2 h-4 w-4" /> Agregar sucursal
          </Button>
        </section>
        <Divider />
        <section id="branches">
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : branches && branches.length > 0 ? (
            branches?.map((branch) => (
              <Link
                key={branch.id}
                href={getCityLink(branch)}
                className="flex items-center py-1 border-b gap-2 flex-wrap md:flex-nowrap"
              >
                <p className="text-gray-600 dark:text-white flex gap-2">
                  <span>{branch.name}</span>
                  <span>({[branch.state, branch.country].join(", ")})</span>
                </p>
                <div className="ml-0 md:ml-auto mr-0 md:mr-4 order-1 md:order-0 w-full md:w-auto">
                  <WeatherResume city={branch} />
                </div>
                <Button
                  outline
                  size="xs"
                  color="warning"
                  onClick={() => deleteBranch(branch)}
                  className="ml-auto md:ml-0"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </Button>
              </Link>
            ))
          ) : (
            <div className="flex gap-2 items-center">
              <p>No hay sucursales registradas.</p>
              <Button
                size="xs"
                outline
                type="button"
                onClick={() => setShowManageBranchesModal(true)}
              >
                ¡Agrega una nueva!
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
