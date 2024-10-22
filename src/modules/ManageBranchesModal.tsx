"use client";

import { useEffect, useRef, useState } from "react";
import { HiPlusCircle, HiOutlineXCircle, HiOutlineX } from "react-icons/hi";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  TextInput,
  Spinner,
} from "flowbite-react";
import { Divider } from "@/components/Divider";
import { searchCityByName } from "@/services/city";
import { City } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { getCityId } from "@/utils/city";

type CityWithBranch = City & { isBranch: boolean };

interface IManageBranchesModal {
  show: boolean;
  onDismiss: VoidFunction;
  branches: City[];
  setBranches: (branches: City[]) => void;
}

export const ManageBranchesModal = ({
  show,
  onDismiss,
  branches,
  setBranches,
}: IManageBranchesModal) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [cities, setCities] = useState<CityWithBranch[]>([]);

  const searchCities = async (q: string) => {
    setLoadingCities(true);
    try {
      const cities = await searchCityByName({ q });
      setCities(
        cities.map((city) => ({
          ...city,
          id: getCityId(city),
          isBranch: branches.some((branch) => branch.id === getCityId(city)),
        }))
      );
    } catch (error) {
      console.error("Error searching cities", error);
    } finally {
      setLoadingCities(false);
    }
  };

  const cleanSearch = () => {
    setSearch("");
    setCities([]);
  };

  // Debounce search input search trigger
  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCities(debouncedSearchTerm);
    } else {
      setCities([]);
    }
  }, [debouncedSearchTerm]);

  const handleToggleBranch = (city: CityWithBranch) => {
    if (city.isBranch) {
      setBranches(branches.filter((branch) => branch.id !== city.id));
    } else {
      setBranches([...branches, city]);
    }
    // update search results isBranch flag
    setCities((prevCities) =>
      prevCities.map((c) => {
        if (c.id === city.id) return { ...c, isBranch: !city.isBranch };
        return c;
      })
    );
  };

  useEffect(() => {
    // clean search states on close
    if (!show) cleanSearch();
  }, [show]);

  return (
    <Modal
      show={show}
      onClose={onDismiss}
      dismissible
      initialFocus={searchInputRef}
    >
      <ModalHeader>Agregar sucursal</ModalHeader>
      <ModalBody>
        <div className="flex gap-2">
          <TextInput
            ref={searchInputRef}
            type="text"
            placeholder="Buscar ciudad por nombre"
            className="flex-grow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button size="xs" outline onClick={cleanSearch}>
              <HiOutlineX className="h-4 w-4 mt-1.5" />
            </Button>
          )}
        </div>
        <Divider className="dark:border-gray-500" />

        <section className="h-72 overflow-y-scroll">
          {loadingCities ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : cities?.length ? (
            cities?.map((city) => (
              <div
                key={getCityId(city)}
                className="flex justify-between items-center my-1 border-b pb-1"
              >
                <p className="text-gray-600 dark:text-white flex gap-2">
                  <span>{city.name}</span>
                  <span>({[city.state, city.country].join(", ")})</span>
                </p>
                <Button
                  color={city.isBranch ? "warning" : undefined}
                  type="button"
                  outline
                  size="xs"
                  onClick={() => handleToggleBranch(city)}
                >
                  {city.isBranch ? (
                    <HiOutlineXCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <HiPlusCircle className="mr-2 h-4 w-4" />
                  )}
                  {city.isBranch ? "Quitar" : "Agregar"}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {debouncedSearchTerm
                ? 'No se encontraron ciudades con el nombre "' + search + '"'
                : "Busca una ciudad por nombre"}
            </p>
          )}
        </section>
      </ModalBody>
    </Modal>
  );
};
