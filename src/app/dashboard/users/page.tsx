"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { userColumns, userFields, userFormSchema } from "@/models/identity/user/utils";
import { ModalForm, ModalFormProvider, TableView } from "@discovery-solutions/struct/client";
import { SiteHeader } from "@/components/site-header";
import { useState } from "react";

export default function Page() {
  const [tab, setTab] = useState("clients");

  return (
    <Tabs onValueChange={setTab} value={tab} className="w-full">
      <SiteHeader
        heading={[
          { link: "/dashboard/users", label: "Usuários do Sistema" },
        ]}
      >
        <TabsList className="grid grid-cols-2 w-fit mx-4 h-8">
          <TabsTrigger value="clients" className="px-6 h-6 text-xs">Clientes</TabsTrigger>
          <TabsTrigger value="admins" className="px-6 h-6 text-xs">Admins</TabsTrigger>
        </TabsList>
      </SiteHeader>

      <ModalFormProvider>
        <TabsContent value="clients" key="clients">
          <TableView
            asChild
            columns={userColumns}
            endpoint="user"
            modalId="user"
            queryParams={{ role: "user" }}
          />
        </TabsContent>

        <TabsContent value="admins" key="admins">
          <TableView
            asChild
            columns={userColumns}
            endpoint="user"
            modalId="user"
            queryParams={{ role: "admin" }}
          />
        </TabsContent>

        <ModalForm
          schema={userFormSchema}
          fields={userFields}
          endpoint="user"
          modalId="user"
          title="Registrar/Editar Usuário"
          buttonLabel="Salvar"
          cols={3}
        />
      </ModalFormProvider>
    </Tabs>
  );
}