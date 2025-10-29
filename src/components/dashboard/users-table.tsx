"use client";
import { userDashboardColumns, userFields, userFormSchema } from "@/models/identity/user/utils";
import { ModalForm, ModalFormProvider, TableView, useModalForm } from "@discovery-solutions/struct/client";

export const UsersTable = () => {
  return (
    <ModalFormProvider>
      <UsersTableInner />
    </ModalFormProvider>
  )
}

const UsersTableInner = () => {
  const { openModal } = useModalForm();
  return (
    <>
      <TableView
        asChild
        key="clients"
        columns={userDashboardColumns(openModal)}
        endpoint="user"
        modalId="user"
        queryParams={{ role: "user" }}
      />
      <ModalForm
        schema={userFormSchema}
        fields={userFields}
        endpoint="user"
        modalId="user"
        title="Registrar/Editar Usuário"
        buttonLabel="Salvar"
        cols={3}
      />
    </>
  )
}