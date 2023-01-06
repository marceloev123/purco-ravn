import {
  List,
  ScrollArea,
  Box,
  Group,
  Table,
  DateField,
  Pagination,
} from "@pankod/refine-mantine";
import { IClaims } from "interfaces";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { useMemo } from "react";

export const ClaimsList: React.FC = () => {
  const columns = useMemo<ColumnDef<IClaims>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "claim_number",
        header: "Claim Number",
        accessorKey: "claim_number",
      },
      {
        id: "status_code",
        header: "Status",
        accessorKey: "status_code",
      },
      {
        id: "created_at",
        header: "Created At",
        accessorKey: "created_at",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
      },
      {
        id: "updated_at",
        header: "Updated At",
        accessorKey: "updated_at",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    refineCoreProps: {
      resource: "claim",
      metaData: {
        fields: ["id", "claim_number"],
      },
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
