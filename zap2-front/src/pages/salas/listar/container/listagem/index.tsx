import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Context } from "../../contexts";

export function Lista() {
  const { chats } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Table className="">
      <TableBody>
        {chats.map((item) => (
          <TableRow onClick={() => setSearchParams(`chat=${item.codigo}`)}>
            <TableCell>
              {item.codigo}
              <br />
              {item.id}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
