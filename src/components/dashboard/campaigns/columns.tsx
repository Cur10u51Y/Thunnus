import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";

import type { PhishingUser } from "@/types";
import { DataTableRowActions as CampaignRowActions } from "./table-row-actions";
import { DataTableRowActions as UserRowActions } from "./user-row-actions";
import {
  ClipboardCheck,
  Eye,
  MailCheck,
  MailOpen,
  MousePointerClick,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PhishingUserSchema } from "@/lib/typesValidator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputPassword } from "./input-password";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<PhishingUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo electrónico" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    id: "status",
    accessorFn: (row) => {
      const status = row.status;
      if (status.formSubmitted) return "submit";
      if (status.linkClicked) return "clicked";
      if (status.emailOpened) return "opened";
      if (status.emailSended) return "sent";
      return "none";
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progreso" />
    ),
    cell: ({ row }) => {
      let user: PhishingUser;
      try {
        user = PhishingUserSchema.parse(row.original) as any;
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
        return;
      }

      const status = user.status;

      const getStatusState = () => {
        if (status.formSubmitted) return "submit";
        if (status.linkClicked) return "clicked";
        if (status.emailOpened) return "opened";
        if (status.emailSended) return "sent";
        return "none";
      };

      const state = getStatusState();

      const variants = {
        sent: {
          label: "Correo Enviado",
          color: "bg-blue-100 text-blue-800",
          icon: <MailCheck className="h-4 w-4 mr-2" />,
        },
        opened: {
          label: "Email Abierto",
          color: "bg-yellow-100 text-yellow-800",
          icon: <MailOpen className="h-4 w-4 mr-2" />,
        },
        clicked: {
          label: "Enlace Clickado",
          color: "bg-orange-100 text-orange-800",
          icon: <MousePointerClick className="h-4 w-4 mr-2" />,
        },
        submit: {
          label: "Formulario Enviado",
          color: "bg-red-100 text-red-800",
          icon: <ClipboardCheck className="h-4 w-4 mr-2" />,
        },
        none: {
          label: "No Iniciado",
          color: "bg-gray-100 text-gray-800",
          icon: null,
        },
      };

      return (
        <div className="flex items-center">
          <Badge
            className={`${variants[state].color} hover:${variants[state].color}`}
          >
            {variants[state].icon}
            {variants[state].label}
          </Badge>
          {state === "clicked" && status.firstClickAt && (
            <span className="ml-2 text-sm text-muted-foreground">
              {new Date(
                status.firstClickAt.seconds * 1000
              ).toLocaleDateString()}
            </span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CampaignRowActions row={row} />,
  },
];

export const columnsUser: ColumnDef<PhishingUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo electrónico" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "clickCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visitas al Link" />
    ),
    cell: ({ row }) => <div>{row.getValue("clickCount")}</div>,
  },
  {
    accessorKey: "capturedCredentials",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Credenciales Capturadas" />
    ),
    cell: ({ row }) => {
      const credentials = row.original.capturedCredentials;
      if (!credentials) return <div>No credenciales</div>;

      const { email, password } = credentials;

      return (
        <div className="flex flex-col ">
          {email ? <InputPassword value={email} /> : <div>No email</div>}
          {password ? (
            <InputPassword value={password} />
          ) : (
            <div className="flex w-full max-w-sm items-center text-muted-foreground">
              No password
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "status",
    header: (_) => <div className="flex items-center space-x-2">Progreso</div>,
    cell: ({ row }) => {
      let user: PhishingUser;
      try {
        user = PhishingUserSchema.parse(row.original) as any;
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
        return;
      }

      const status = user.status;

      const getStatusState = () => {
        if (status.formSubmitted) return "submit";
        if (status.linkClicked) return "clicked";
        if (status.emailOpened) return "opened";
        if (status.emailSended) return "sent";
        return "none";
      };

      const state = getStatusState();

      const variants = {
        sent: {
          label: "Correo Enviado",
          color: "bg-blue-100 text-blue-800",
          icon: <MailCheck className="h-4 w-4 mr-2" />,
        },
        opened: {
          label: "Email Abierto",
          color: "bg-yellow-100 text-yellow-800",
          icon: <MailOpen className="h-4 w-4 mr-2" />,
        },
        clicked: {
          label: "Enlace Clickado",
          color: "bg-orange-100 text-orange-800",
          icon: <MousePointerClick className="h-4 w-4 mr-2" />,
        },
        submit: {
          label: "Formulario Enviado",
          color: "bg-red-100 text-red-800",
          icon: <ClipboardCheck className="h-4 w-4 mr-2" />,
        },
        none: {
          label: "No Iniciado",
          color: "bg-gray-100 text-gray-800",
          icon: null,
        },
      };

      return (
        <div className="flex items-center">
          <Badge
            className={`${variants[state].color} hover:${variants[state].color}`}
          >
            {variants[state].icon}
            {variants[state].label}
          </Badge>
          {state === "clicked" && status.firstClickAt && (
            <span className="ml-2 text-sm text-muted-foreground">
              {new Date(
                status.firstClickAt.seconds * 1000
              ).toLocaleDateString()}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "metadata",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metadata" />
    ),
    cell: ({ row }) => {
      const metadata = row.original.metadata;
      if (!metadata) return <div>No metadata</div>;

      const { ip, device } = metadata;

      return (
        <div>
          <div>IP: {ip}</div>
          <div>
            Device: {device?.os}, {device?.browser}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserRowActions row={row} />,
  },
];
