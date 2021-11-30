const initialState = {
  years: [],
  month: [
    { month: "янв" },
    { month: "фев" },
    { month: "мар" },
    { month: "апр" },
    { month: "май" },
    { month: "июн" },
    { month: "июн" },
    { month: "авг" },
    { month: "сен" },
    { month: "окт" },
    { month: "ноя" },
    { month: "дек" }
  ]
};

export default  (state = initialState, action) => {
  switch (action.type) {
    case "COUNT-YEAR": {
      if (state.years.length === 0) {
        let changeStart = action.start;
        let array = [];
        while (changeStart.getFullYear() <= action.end.getFullYear()) {
          array.push(changeStart.getFullYear());
          changeStart.setFullYear(changeStart.getFullYear() + 1);
        }
        return { ...state, years: array };
      } else return state;
    }

    case "DELETE-YEAR": {
      return { ...state, years: [] };
    }
    default:
      return state;
  }
};
export const countYear = (start, end) => ({
  type: "COUNT-YEAR",
  start,
  end
});
export const deleteYear = () => ({
  type: "DELETE-YEAR"
});
