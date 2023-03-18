import { useEffect, useState } from "react";
import TopBar from "../../../components/TopBar";
import { SupplierInterface } from "../../../modules/supplier/interfaces/supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import SupplierTable from "./SuppliersTable";

export default function List() {
  const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);

  useEffect(() => {
    supplierService
      .getAll()
      .then((response) => {
        setSuppliers(response.data.data);
      })
      .catch((error) => {
        console.log("Deu erro aqui em", error);
      });
  }, []);

  return (
    <>
      <TopBar />
      <SupplierTable suppliers={suppliers} />
    </>
  );
}
