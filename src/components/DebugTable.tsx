import { config } from "../config";

export interface DebugTableProps {
  /** Supply state variables to display here */
  variables: { [key: string]: string | number | boolean | undefined | null };
}

export function DebugTable(props: DebugTableProps) {
  if (config.showDebugTables && process.env.NODE_ENV === "development")
    return (
      <table className="debug-table absolute bottom-0 left-0 text-left bg-neutral-600">
        <tbody>
          {Object.keys(props.variables).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td className="pl-2">{`{${props.variables[key]}}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  else return null;
}
