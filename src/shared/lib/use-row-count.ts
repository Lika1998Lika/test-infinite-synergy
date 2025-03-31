import { useMemo, useRef } from "react"

export const useRowCount = (count: number | undefined) => {
  const rowCountRef = useRef(count || 0);

  const rowCount = useMemo(() => {
    if(count !== undefined) {
      rowCountRef.current = count;
    }
    return rowCountRef.current
  }, [count]);

  return rowCount;
}