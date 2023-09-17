import { useEffect, useMemo, useState } from "react";

const useDate = (myDate) => {
  const [date, setDate] = useState({
    val: (new Date().getTime() - new Date(myDate).getTime()) / 31104000000,
    unit: "Years",
  });

  const units = useMemo(
    () => [
      { val: 60, unit: "Seconds" },
      { val: 60, unit: "Minutes" },
      { val: 24, unit: "Hours" },
      { val: 30, unit: "Days" },
      { val: 12, unit: "Months" },
    ],
    []
  );

  useEffect(() => {
    if (Math.floor(date.val) === 0) {
      const unit = units.pop();
      if (unit)
        setDate((prevState) => {
          return { val: prevState.val * unit.val, unit: unit.unit };
        });
      else setDate({ val: 1, unit: "Seconds" });
    }
  }, [date, units]);
  return { date: Math.floor(date.val), unit: date.unit };
};

export default useDate;
