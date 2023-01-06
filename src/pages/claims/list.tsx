import {
  List,
  ScrollArea,
  Box,
  Group,
  Table,
  DateField,
  Pagination,
  Select,
} from "@pankod/refine-mantine";
import { IClaims, IStatus } from "interfaces";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { useMemo } from "react";
import { ColumnSorter } from "components/table/column-sorter";
import { ColumnFilter } from "components/table/column-filter";
import { useList } from "@pankod/refine-core";

export interface FilterElementProps {
  value: any;
  onChange: (value: any) => void;
}

export const ClaimsList: React.FC = () => {
  const statusListQueryResult = useList<IStatus>({
    resource: "claim_status",
    metaData: {
      fields: ["code", "name", "group_name"],
    },
  });

  const statusOptions = useMemo(
    () =>
      statusListQueryResult.data?.data.map(status => ({
        label: `${status.code} ( ${status.name})`,
        value: status.code,
      })),
    [statusListQueryResult.data?.data]
  );
  const columns = useMemo<ColumnDef<IClaims>[]>(
    () => [
      {
        id: "claim_number",
        header: "Claim Number",
        accessorKey: "claim_number",
      },
      {
        id: "status_code",
        header: "Status",
        accessorKey: "status_code",
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <Select
                defaultValue="published"
                data={statusOptions ?? []}
                {...props}
              />
            );
          },
          filterOperator: "eq",
        },
      },
      {
        id: "date_received",
        header: "Received",
        accessorKey: "date_received",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
      },
      {
        id: "date_of_loss",
        header: "Date of Loss",
        accessorKey: "date_of_loss",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
      },
      {
        id: "updated_at",
        header: "Last worked",
        accessorKey: "updated_at",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
      },
    ],
    [statusOptions]
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    refineCoreProps: {
      resource: "claim",
      metaData: {
        fields: [
          "claim_number",
          "status_code",
          "date_received",
          "date_of_loss",
          "updated_at",
        ],
      },
      initialFilter: [{ field: "status_code", value: "CD", operator: "eq" }],
    },
    columns,
  });

  return (
    <ScrollArea>
      <List>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <Group spacing="xs" noWrap>
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Box>
                          <Group spacing="xs" noWrap>
                            <ColumnSorter column={header.column} />
                            <ColumnFilter column={header.column} />
                          </Group>
                        </Group>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <Pagination
          position="right"
          total={pageCount}
          page={current}
          onChange={setCurrent}
        />{" "}
      </List>
    </ScrollArea>
  );
};
